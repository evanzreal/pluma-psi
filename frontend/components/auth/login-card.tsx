'use client';

import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';

export function LoginCard() {
  const [isSigningIn, setIsSigningIn] = useState(true);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{isSigningIn ? 'Entrar' : 'Cadastrar'}</h2>
          <p className="text-gray-500 mt-1">
            {isSigningIn ? 'Acesse sua conta para continuar' : 'Crie sua conta para começar'}
          </p>
        </div>
        
        {isSigningIn ? (
          <SignIn
            routing="hash"
            redirectUrl="/agenda"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              }
            }}
          />
        ) : (
          <SignUp
            routing="hash"
            redirectUrl="/agenda"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              }
            }}
          />
        )}
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSigningIn(!isSigningIn)} 
            className="text-blue-600 hover:underline font-medium"
          >
            {isSigningIn ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
          </button>
        </div>
      </div>
    </div>
  );
} 