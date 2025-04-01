'use client'

import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Pluma PSI</h1>
        <SignIn 
          routing="hash" 
          redirectUrl="/agenda"
          signUpUrl="/sign-up"
          locale="pt-BR"
          localization={{
            signIn: {
              start: {
                title: "Entre na sua conta",
                subtitle: "para continuar na Pluma PSI",
                actionText: "Não tem uma conta?",
                actionLink: "Cadastre-se"
              }
            }
          }}
        />
      </div>
    </main>
  )
}
