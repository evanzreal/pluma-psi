import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Esta função substitui o authMiddleware do Clerk quando há problemas de compatibilidade
export function middleware(request: NextRequest) {
  const publicRoutes = ["/", "/login", "/registro", "/sign-in", "/sign-up"];
  const ignoredRoutes = ["/api/public", "/_next/static", "/favicon.ico", "/api/clerk-webhook"];
  
  // Verificar se é uma rota ignorada
  if (ignoredRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Verificar se é uma rota pública
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  // Para rotas protegidas, verificar se há um token (isso é apenas um stub - substituir com sua lógica)
  // Por enquanto, permite o acesso a todas as rotas para fins de teste
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 