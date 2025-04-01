import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Rotas que estarão acessíveis para usuários não autenticados
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  
  // Rotas que ignoram completamente o middleware (geralmente para API ou imagens estáticas)
  ignoredRoutes: ["/api/public", "/_next/static", "/favicon.ico"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 