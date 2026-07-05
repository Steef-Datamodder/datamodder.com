import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['nl', 'en', 'de']

function getLocale(request: NextRequest): string {
  const hostname = request.headers.get('host') || ''
  if (hostname.includes('datamodder.nl')) return 'nl'
  return 'en'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|images|favicon\\.ico|api).*)'],
}
