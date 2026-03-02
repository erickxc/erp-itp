import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host');
  const token = request.cookies.get('@ITP:token')?.value;

  // 1. Lógica de Domínio: Se logado na raiz, vai para o Dashboard
  if (hostname === 'itp.institutotiapretinha.org' && pathname === '/') {
    const target = token ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(target, request.url));
  }

  // 2. Rotas Privadas
  const privateRoutes = ['/matriculas', '/dashboard', '/academico', '/estoque', '/financeiro', '/doacoes'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (isPrivateRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Se logado e tentar ir para o login, manda para o dashboard
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/matriculas/:path*', '/dashboard/:path*', '/academico/:path*', '/estoque/:path*', '/financeiro/:path*', '/doacoes/:path*'],
};