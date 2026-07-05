import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BarChart3, Layers, Zap, HardDrive, ShieldAlert, KeyRound, LogIn, Eye } from "lucide-react";
import type { ElementType } from "react";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string; viewId: string }> };

interface ViewContent {
  desc: string;
  cols: [string, string][];
}
interface ViewDef {
  name: string;
  sql: string;
  icon: ElementType;
  source: string;
  latency: string;
  nl: ViewContent;
  en: ViewContent;
  de: ViewContent;
}

const views: Record<string, ViewDef> = {
  "warehouse-cost": {
    name: "warehouse_cost",
    source: "SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY",
    latency: "~3h",
    icon: BarChart3,
    sql: `create or replace view warehouse_cost
    comment = 'Daily credit consumption per warehouse, split into compute and cloud services (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
select date_trunc('day', start_time)::date as day
     , warehouse_name
     , warehouse_size
     , sum(credits_used) as credits_used
     , sum(credits_used_compute) as credits_compute
     , sum(credits_used_cloud_services) as credits_cloud_services
  from snowflake.account_usage.warehouse_metering_history
 group by 1, 2, 3
 order by 1 desc, 4 desc;`,
    nl: {
      desc: "Dagelijks creditverbruik per warehouse, uitgesplitst in compute en cloud services kosten.",
      cols: [["day","Datum"],["warehouse_name","Naam van het warehouse"],["warehouse_size","Grootte op het moment van meten"],["credits_used","Totaal credits (compute + cloud services)"],["credits_compute","Alleen compute credits"],["credits_cloud_services","Alleen cloud services credits"]],
    },
    en: {
      desc: "Daily credit consumption per warehouse, split into compute and cloud services.",
      cols: [["day","Date"],["warehouse_name","Warehouse name"],["warehouse_size","Size at time of metering"],["credits_used","Total credits (compute + cloud services)"],["credits_compute","Compute credits only"],["credits_cloud_services","Cloud services credits only"]],
    },
    de: {
      desc: "Täglicher Credit-Verbrauch pro Warehouse, aufgeteilt in Compute- und Cloud-Service-Kosten.",
      cols: [["day","Datum"],["warehouse_name","Warehouse-Name"],["warehouse_size","Größe zum Zeitpunkt der Messung"],["credits_used","Gesamt-Credits (Compute + Cloud Services)"],["credits_compute","Nur Compute-Credits"],["credits_cloud_services","Nur Cloud-Service-Credits"]],
    },
  },

  "search-optimization-cost": {
    name: "search_optimization_cost",
    source: "SNOWFLAKE.ACCOUNT_USAGE.SEARCH_OPTIMIZATION_HISTORY + ACCESS_HISTORY + QUERY_HISTORY",
    latency: "~3h",
    icon: Layers,
    sql: `create or replace view search_optimization_cost
    comment = 'Daily search optimization credit consumption per table, including the role and user that enabled it (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
with enabler as (
    select split_part(replace(om.value:objectName::string, '"', ''), '.', 1) as database_name
         , split_part(replace(om.value:objectName::string, '"', ''), '.', 2) as schema_name
         , split_part(replace(om.value:objectName::string, '"', ''), '.', 3) as table_name
         , qh.role_name
         , ah.user_name
      from snowflake.account_usage.access_history ah
      join snowflake.account_usage.query_history qh
        on qh.query_id = ah.query_id
         , lateral flatten(ah.objects_modified) om
     where om.value:objectDomain::string ilike 'Table'
       and qh.query_type = 'ALTER'
       and qh.query_text ilike '%search optimization%'
           qualify row_number() over (partition by database_name
                                                 , schema_name
                                                 , table_name
                                          order by qh.start_time desc) = 1)
select date_trunc('day', h.start_time)::date as day
     , h.database_name
     , h.schema_name
     , h.table_name
     , h.status
     , e.role_name as enabled_by_role
     , e.user_name as enabled_by_user
     , sum(h.credits_used) as credits_used
     , count(*) as maintenance_runs
  from snowflake.account_usage.search_optimization_history h
  left join enabler e
         on upper(e.database_name) = upper(h.database_name)
        and upper(e.schema_name) = upper(h.schema_name)
        and upper(e.table_name) = upper(h.table_name)
 group by 1, 2, 3, 4, 5, 6, 7;`,
    nl: {
      desc: "Dagelijkse kosten voor zoekoptimalisatie per tabel, inclusief de rol en gebruiker die het heeft ingeschakeld. enabled_by_role en enabled_by_user worden afgeleid uit de meest recente ALTER TABLE ... ADD SEARCH OPTIMIZATION in ACCESS_HISTORY.",
      cols: [["day","Datum"],["database_name","Database van de geoptimaliseerde tabel"],["schema_name","Schema van de geoptimaliseerde tabel"],["table_name","Tabelnaam"],["status","ACTIVE of DISABLED"],["enabled_by_role","Rol die de ALTER TABLE uitvoerde"],["enabled_by_user","Gebruiker die de ALTER TABLE uitvoerde"],["credits_used","Credits verbruikt die dag"],["maintenance_runs","Aantal onderhoudsjobs die dag"]],
    },
    en: {
      desc: "Daily search optimization credit consumption per table, with the role and user that enabled it. enabled_by_role and enabled_by_user are derived from the most recent ALTER TABLE ... ADD SEARCH OPTIMIZATION in ACCESS_HISTORY.",
      cols: [["day","Date"],["database_name","Database of the optimised table"],["schema_name","Schema of the optimised table"],["table_name","Table name"],["status","ACTIVE or DISABLED"],["enabled_by_role","Role that ran the enabling ALTER TABLE"],["enabled_by_user","User that ran the enabling ALTER TABLE"],["credits_used","Credits consumed that day"],["maintenance_runs","Number of maintenance jobs that day"]],
    },
    de: {
      desc: "Täglicher Suchoptimierungs-Credit-Verbrauch pro Tabelle, mit der Rolle und dem Benutzer, der ihn aktiviert hat. enabled_by_role und enabled_by_user werden aus dem jüngsten ALTER TABLE ... ADD SEARCH OPTIMIZATION in ACCESS_HISTORY abgeleitet.",
      cols: [["day","Datum"],["database_name","Datenbank der optimierten Tabelle"],["schema_name","Schema der optimierten Tabelle"],["table_name","Tabellenname"],["status","ACTIVE oder DISABLED"],["enabled_by_role","Rolle, die das aktivierende ALTER TABLE ausgeführt hat"],["enabled_by_user","Benutzer, der das aktivierende ALTER TABLE ausgeführt hat"],["credits_used","Credits verbraucht an diesem Tag"],["maintenance_runs","Anzahl der Wartungsjobs an diesem Tag"]],
    },
  },

  "clustering-cost": {
    name: "clustering_cost",
    source: "SNOWFLAKE.ACCOUNT_USAGE.AUTOMATIC_CLUSTERING_HISTORY + ACCESS_HISTORY + QUERY_HISTORY",
    latency: "~3h",
    icon: Layers,
    sql: `create or replace view clustering_cost
    comment = 'Daily automatic clustering credit consumption per table, including the role and user that enabled it (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
with enabler as (
    select split_part(replace(om.value:objectName::string, '"', ''), '.', 1) as database_name
         , split_part(replace(om.value:objectName::string, '"', ''), '.', 2) as schema_name
         , split_part(replace(om.value:objectName::string, '"', ''), '.', 3) as table_name
         , qh.role_name
         , ah.user_name
      from snowflake.account_usage.access_history ah
      join snowflake.account_usage.query_history qh
        on qh.query_id = ah.query_id
         , lateral flatten(ah.objects_modified) om
     where om.value:objectDomain::string ilike 'Table'
       and qh.query_type = 'ALTER'
       and qh.query_text ilike '%cluster by%'
           qualify row_number() over (partition by database_name
                                                 , schema_name
                                                 , table_name
                                          order by qh.start_time desc) = 1)
select date_trunc('day', h.start_time)::date as day
     , h.database_name
     , h.schema_name
     , h.table_name
     , e.role_name as enabled_by_role
     , e.user_name as enabled_by_user
     , sum(h.credits_used) as credits_used
     , sum(h.num_bytes_reclustered) as bytes_reclustered
     , sum(h.num_rows_reclustered) as rows_reclustered
     , count(*) as clustering_runs
  from snowflake.account_usage.automatic_clustering_history h
  left join enabler e
         on upper(e.database_name) = upper(h.database_name)
        and upper(e.schema_name) = upper(h.schema_name)
        and upper(e.table_name) = upper(h.table_name)
 group by 1, 2, 3, 4, 5, 6;`,
    nl: {
      desc: "Dagelijkse automatische clusteringkosten per tabel, inclusief de rol en gebruiker die clustering heeft ingeschakeld. enabled_by_role en enabled_by_user worden afgeleid uit de meest recente ALTER TABLE ... CLUSTER BY in ACCESS_HISTORY.",
      cols: [["day","Datum"],["database_name","Database van de geclusterde tabel"],["schema_name","Schema van de geclusterde tabel"],["table_name","Tabelnaam"],["enabled_by_role","Rol die CLUSTER BY heeft uitgevoerd"],["enabled_by_user","Gebruiker die CLUSTER BY heeft uitgevoerd"],["credits_used","Credits verbruikt die dag"],["bytes_reclustered","Bytes herschreven tijdens clustering"],["rows_reclustered","Rijen herschreven tijdens clustering"],["clustering_runs","Aantal clusteringjobs die dag"]],
    },
    en: {
      desc: "Daily automatic clustering credit consumption per table, with the role and user that enabled it. enabled_by_role and enabled_by_user are derived from the most recent ALTER TABLE ... CLUSTER BY in ACCESS_HISTORY.",
      cols: [["day","Date"],["database_name","Database of the clustered table"],["schema_name","Schema of the clustered table"],["table_name","Table name"],["enabled_by_role","Role that ran the CLUSTER BY"],["enabled_by_user","User that ran the CLUSTER BY"],["credits_used","Credits consumed that day"],["bytes_reclustered","Bytes rewritten during clustering"],["rows_reclustered","Rows rewritten during clustering"],["clustering_runs","Number of clustering jobs that day"]],
    },
    de: {
      desc: "Täglicher automatischer Clustering-Credit-Verbrauch pro Tabelle, mit der Rolle und dem Benutzer, der Clustering aktiviert hat. enabled_by_role und enabled_by_user werden aus dem jüngsten ALTER TABLE ... CLUSTER BY in ACCESS_HISTORY abgeleitet.",
      cols: [["day","Datum"],["database_name","Datenbank der geclusterten Tabelle"],["schema_name","Schema der geclusterten Tabelle"],["table_name","Tabellenname"],["enabled_by_role","Rolle, die CLUSTER BY ausgeführt hat"],["enabled_by_user","Benutzer, der CLUSTER BY ausgeführt hat"],["credits_used","Credits verbraucht an diesem Tag"],["bytes_reclustered","Bytes beim Clustering neu geschrieben"],["rows_reclustered","Zeilen beim Clustering neu geschrieben"],["clustering_runs","Anzahl der Clustering-Jobs an diesem Tag"]],
    },
  },

  "expensive-queries": {
    name: "expensive_queries",
    source: "SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY",
    latency: "~45min",
    icon: Zap,
    sql: `create or replace view expensive_queries
    comment = 'Queries with execution time >= 60 seconds (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
select start_time::date as date
     , user_name
     , role_name
     , warehouse_name
     , query_type
     , execution_status
     , round(total_elapsed_time / 1000.0, 1) as execution_seconds
     , round(bytes_scanned / 1024.0 / 1024 / 1024, 2) as gb_scanned
     , partitions_scanned
     , partitions_total
     , credits_used_cloud_services
     , query_text as statement
  from snowflake.account_usage.query_history
 where total_elapsed_time >= 60000
 order by total_elapsed_time desc;`,
    nl: {
      desc: "Queries met een uitvoertijd van 60 seconden of langer, inclusief mislukte queries. De drempel van 60 seconden kan worden aangepast door de view opnieuw aan te maken met een andere waarde voor total_elapsed_time.",
      cols: [["date","Datum"],["user_name","Gebruiker"],["role_name","Rol"],["warehouse_name","Warehouse"],["query_type","Bijv. SELECT, INSERT"],["execution_status","SUCCESS, FAIL of INCIDENT"],["execution_seconds","Totale uitvoertijd in seconden"],["gb_scanned","Gescande data in GB"],["partitions_scanned","Gescande micropartities"],["partitions_total","Totale beschikbare micropartities"],["credits_used_cloud_services","Cloud services credits voor deze query"],["statement","Volledige querytekst"]],
    },
    en: {
      desc: "Queries with an execution time of 60 seconds or longer, including failed queries. The 60-second threshold can be adjusted by recreating the view with a different value for total_elapsed_time.",
      cols: [["date","Date"],["user_name","User"],["role_name","Role"],["warehouse_name","Warehouse"],["query_type","e.g. SELECT, INSERT"],["execution_status","SUCCESS, FAIL or INCIDENT"],["execution_seconds","Total elapsed time in seconds"],["gb_scanned","Data scanned in GB"],["partitions_scanned","Micro-partitions scanned"],["partitions_total","Total micro-partitions available"],["credits_used_cloud_services","Cloud services credits for this query"],["statement","Full query text"]],
    },
    de: {
      desc: "Abfragen mit einer Ausführungszeit von 60 Sekunden oder länger, einschließlich fehlgeschlagener Abfragen. Der Schwellenwert kann durch Neuerstellen der View mit einem anderen Wert für total_elapsed_time angepasst werden.",
      cols: [["date","Datum"],["user_name","Benutzer"],["role_name","Rolle"],["warehouse_name","Warehouse"],["query_type","z.B. SELECT, INSERT"],["execution_status","SUCCESS, FAIL oder INCIDENT"],["execution_seconds","Gesamte Ausführungszeit in Sekunden"],["gb_scanned","Gescannte Daten in GB"],["partitions_scanned","Gescannte Micro-Partitionen"],["partitions_total","Gesamt verfügbare Micro-Partitionen"],["credits_used_cloud_services","Cloud-Service-Credits für diese Abfrage"],["statement","Vollständiger Abfragetext"]],
    },
  },

  "spilling-queries": {
    name: "spilling_queries",
    source: "SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY",
    latency: "~45min",
    icon: HardDrive,
    sql: `create or replace view spilling_queries
    comment = 'Queries that spilled to remote disk (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
select start_time::date as date
     , user_name
     , role_name
     , warehouse_name
     , query_type
     , round(total_elapsed_time / 1000.0, 1) as execution_seconds
     , round(bytes_spilled_to_local_storage  / 1024.0 / 1024 / 1024, 2) as gb_spilled_local
     , round(bytes_spilled_to_remote_storage / 1024.0 / 1024 / 1024, 2) as gb_spilled_remote
     , round(bytes_scanned / 1024.0 / 1024 / 1024, 2) as gb_scanned
     , query_text as statement
  from snowflake.account_usage.query_history
 where bytes_spilled_to_remote_storage > 0
 order by bytes_spilled_to_remote_storage desc;`,
    nl: {
      desc: "Queries die data naar een externe schijf hebben gespoeld. Remote spill is een teken dat het warehouse te klein is voor de query, of dat de query meer data scant dan noodzakelijk.",
      cols: [["date","Datum"],["user_name","Gebruiker"],["role_name","Rol"],["warehouse_name","Warehouse"],["query_type","Bijv. SELECT, INSERT"],["execution_seconds","Totale uitvoertijd in seconden"],["gb_spilled_local","Data gespoeld naar lokale schijf in GB"],["gb_spilled_remote","Data gespoeld naar externe schijf in GB"],["gb_scanned","Gescande data in GB"],["statement","Volledige querytekst"]],
    },
    en: {
      desc: "Queries that spilled data to remote disk. Remote spill indicates the warehouse is undersized for the query, or the query is scanning more data than necessary.",
      cols: [["date","Date"],["user_name","User"],["role_name","Role"],["warehouse_name","Warehouse"],["query_type","e.g. SELECT, INSERT"],["execution_seconds","Total elapsed time in seconds"],["gb_spilled_local","Data spilled to local disk in GB"],["gb_spilled_remote","Data spilled to remote disk in GB"],["gb_scanned","Data scanned in GB"],["statement","Full query text"]],
    },
    de: {
      desc: "Abfragen, die Daten auf einen externen Datenträger ausgelagert haben. Remote-Spill bedeutet, dass das Warehouse zu klein für die Abfrage ist oder die Abfrage mehr Daten scannt als nötig.",
      cols: [["date","Datum"],["user_name","Benutzer"],["role_name","Rolle"],["warehouse_name","Warehouse"],["query_type","z.B. SELECT, INSERT"],["execution_seconds","Gesamte Ausführungszeit in Sekunden"],["gb_spilled_local","Daten auf lokalen Datenträger in GB"],["gb_spilled_remote","Daten auf externen Datenträger in GB"],["gb_scanned","Gescannte Daten in GB"],["statement","Vollständiger Abfragetext"]],
    },
  },

  "system-role-usage": {
    name: "system_role_usage",
    source: "SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY",
    latency: "~45min",
    icon: ShieldAlert,
    sql: `create or replace view system_role_usage
    comment = 'Statements executed under ACCOUNTADMIN, SYSADMIN or SECURITYADMIN, including failed attempts (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
select start_time::date as date
     , user_name
     , role_name
     , query_type
     , execution_status
     , query_text as statement
  from snowflake.account_usage.query_history
 where upper(role_name) in ('ACCOUNTADMIN', 'SYSADMIN', 'SECURITYADMIN')
 order by start_time desc;`,
    nl: {
      desc: "Alle statements uitgevoerd onder ACCOUNTADMIN, SYSADMIN of SECURITYADMIN, inclusief mislukte pogingen. Handig voor audits en het detecteren van onverwacht gebruik van beheerdersdrol.",
      cols: [["date","Datum"],["user_name","Gebruiker"],["role_name","Gebruikte systeemrol"],["query_type","Bijv. SELECT, ALTER, GRANT"],["execution_status","SUCCESS, FAIL of INCIDENT"],["statement","Volledige querytekst"]],
    },
    en: {
      desc: "All statements executed under ACCOUNTADMIN, SYSADMIN or SECURITYADMIN, including failed attempts. Useful for audits and detecting unexpected use of admin roles.",
      cols: [["date","Date"],["user_name","User"],["role_name","System role used"],["query_type","e.g. SELECT, ALTER, GRANT"],["execution_status","SUCCESS, FAIL or INCIDENT"],["statement","Full query text"]],
    },
    de: {
      desc: "Alle Statements, die unter ACCOUNTADMIN, SYSADMIN oder SECURITYADMIN ausgeführt wurden, einschließlich fehlgeschlagener Versuche. Nützlich für Audits und die Erkennung unerwarteter Verwendung von Administratorrollen.",
      cols: [["date","Datum"],["user_name","Benutzer"],["role_name","Verwendete Systemrolle"],["query_type","z.B. SELECT, ALTER, GRANT"],["execution_status","SUCCESS, FAIL oder INCIDENT"],["statement","Vollständiger Abfragetext"]],
    },
  },

  "privilege-changes": {
    name: "privilege_changes",
    source: "SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY",
    latency: "~45min",
    icon: KeyRound,
    sql: `create or replace view privilege_changes
    comment = 'GRANT and REVOKE statements with the user and role that executed them (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
select start_time::date as date
     , user_name
     , role_name
     , query_type
     , execution_status
     , query_text as statement
  from snowflake.account_usage.query_history
 where query_type in ('GRANT', 'REVOKE')
 order by start_time desc;`,
    nl: {
      desc: "Alle GRANT en REVOKE statements, ongeacht de gebruikte rol. Inclusief mislukte pogingen. Biedt een volledig auditspoor van wijzigingen in rechten en toegang.",
      cols: [["date","Datum"],["user_name","Gebruiker"],["role_name","Gebruikte rol"],["query_type","GRANT of REVOKE"],["execution_status","SUCCESS, FAIL of INCIDENT"],["statement","Volledige querytekst"]],
    },
    en: {
      desc: "All GRANT and REVOKE statements, regardless of the role used. Includes failed attempts. Provides a complete audit trail of changes to privileges and access.",
      cols: [["date","Date"],["user_name","User"],["role_name","Role used"],["query_type","GRANT or REVOKE"],["execution_status","SUCCESS, FAIL or INCIDENT"],["statement","Full query text"]],
    },
    de: {
      desc: "Alle GRANT- und REVOKE-Statements, unabhängig von der verwendeten Rolle. Einschließlich fehlgeschlagener Versuche. Bietet einen vollständigen Audit-Trail für Berechtigungs- und Zugriffsänderungen.",
      cols: [["date","Datum"],["user_name","Benutzer"],["role_name","Verwendete Rolle"],["query_type","GRANT oder REVOKE"],["execution_status","SUCCESS, FAIL oder INCIDENT"],["statement","Vollständiger Abfragetext"]],
    },
  },

  "login-history": {
    name: "login_history",
    source: "SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY",
    latency: "~2h",
    icon: LogIn,
    sql: `create or replace view login_history
    comment = 'Failed login attempts per user (source: SNOWFLAKE.ACCOUNT_USAGE)'
as
select event_timestamp::date as date
     , user_name
     , client_ip
     , reported_client_type
     , reported_client_version
     , first_authentication_factor
     , error_message
  from snowflake.account_usage.login_history
 where is_success = 'NO'
 order by event_timestamp desc;`,
    nl: {
      desc: "Mislukte inlogpogingen per gebruiker, inclusief IP-adres, clienttype en foutmelding. Handig voor het opsporen van ongeautoriseerde toegangspogingen.",
      cols: [["date","Datum"],["user_name","Gebruiker"],["client_ip","IP-adres van de client"],["reported_client_type","Bijv. SNOWFLAKE_UI, JDBC_DRIVER"],["reported_client_version","Versie van de client"],["first_authentication_factor","Bijv. PASSWORD, OAUTH"],["error_message","Foutmelding van Snowflake"]],
    },
    en: {
      desc: "Failed login attempts per user, including IP address, client type and error message. Useful for detecting unauthorised access attempts.",
      cols: [["date","Date"],["user_name","User"],["client_ip","IP address of the client"],["reported_client_type","e.g. SNOWFLAKE_UI, JDBC_DRIVER"],["reported_client_version","Client version string"],["first_authentication_factor","e.g. PASSWORD, OAUTH"],["error_message","Snowflake error message"]],
    },
    de: {
      desc: "Fehlgeschlagene Anmeldeversuche pro Benutzer, einschließlich IP-Adresse, Client-Typ und Fehlermeldung. Nützlich zur Erkennung unbefugter Zugriffsversuche.",
      cols: [["date","Datum"],["user_name","Benutzer"],["client_ip","IP-Adresse des Clients"],["reported_client_type","z.B. SNOWFLAKE_UI, JDBC_DRIVER"],["reported_client_version","Client-Versionsstring"],["first_authentication_factor","z.B. PASSWORD, OAUTH"],["error_message","Snowflake-Fehlermeldung"]],
    },
  },
};

const labels = {
  nl: { colH: "Kolom", descH: "Beschrijving", sqlH: "Broncode", srcH: "Bron", latH: "Latentie" },
  en: { colH: "Column", descH: "Description", sqlH: "Source code", srcH: "Source", latH: "Latency" },
  de: { colH: "Spalte", descH: "Beschreibung", sqlH: "Quellcode", srcH: "Quelle", latH: "Latenz" },
};

export async function generateStaticParams() {
  return Object.keys(views).map((viewId) => ({ viewId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, viewId } = await params;
  const v = views[viewId];
  if (!v) return { title: "View — Datamodder" };
  const l = (lang as Lang) in { nl: 1, en: 1, de: 1 } ? lang as Lang : "nl";
  const t = v[l] ?? v.en;
  return {
    title: `${v.name} — Views — Datamodder`,
    description: t.desc,
  };
}

export default async function ViewDetailPage({ params }: PageProps) {
  const { lang, viewId } = await params;
  const v = views[viewId];
  const l = (lang as Lang) in { nl: 1, en: 1, de: 1 } ? lang as Lang : "nl";
  const t = v?.[l] ?? v?.en;
  const lb = labels[l] ?? labels.en;
  const u = dict[l]?.utils ?? dict.nl.utils;

  if (!v || !t) return null;

  const Icon = v.icon as React.ElementType<{ size?: number }>;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/utils`} className="inline-flex items-center gap-2 text-[#9a8f85] text-sm hover:text-orange-400 transition-colors mb-10">
          <ArrowLeft size={14} /> {u.back}
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
            <Icon size={24} />
          </div>
          <div>
            <p className="text-orange-500/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Snowflake · View</p>
            <h1 className="text-3xl font-black text-[#f5f0eb] font-mono">{v.name}</h1>
          </div>
        </div>
        <p className="text-[#9a8f85] text-lg leading-relaxed mb-4">{t.desc}</p>
        <p className="text-[#9a8f85]/60 text-xs font-mono mb-12">
          {lb.srcH}: {v.source} · {lb.latH}: {v.latency}
        </p>

        <section className="mb-12">
          <div className="rounded-xl bg-[#1a1612] border border-orange-900/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-900/20">
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold font-mono text-xs">{lb.colH}</th>
                  <th className="text-left px-5 py-3 text-orange-400 font-semibold text-xs uppercase tracking-widest">{lb.descH}</th>
                </tr>
              </thead>
              <tbody className="text-[#9a8f85]">
                {t.cols.map(([col, desc]) => (
                  <tr key={col} className="border-b border-orange-900/10 last:border-0">
                    <td className="px-5 py-2.5 font-mono text-orange-300/70 text-xs">{col}</td>
                    <td className="px-5 py-2.5 text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black text-[#f5f0eb] mb-4">{lb.sqlH}</h2>
          <div className="rounded-xl bg-[#0c0a08] border border-orange-900/20 overflow-hidden">
            <div className="flex items-center px-5 py-3 border-b border-orange-900/20">
              <span className="text-[#9a8f85] text-xs font-mono">create_admin_views.sql</span>
            </div>
            <pre className="p-5 font-mono text-sm text-orange-300/80 overflow-x-auto leading-relaxed whitespace-pre">{v.sql}</pre>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-orange-900/20">
          <a href="https://github.com/Steef-Datamodder/datamodder_utils/blob/main/views/create_admin_views.sql" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-200 glow-orange text-sm">
            <ExternalLink size={16} /> {u.github}
          </a>
          <Link href={`/${lang}/utils`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 text-[#f5f0eb] font-medium hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200 text-sm">
            <ArrowLeft size={16} /> {u.allUtils}
          </Link>
        </div>
      </div>
    </div>
  );
}
