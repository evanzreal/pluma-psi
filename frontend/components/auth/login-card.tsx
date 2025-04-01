'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function LoginCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login com:', email, password);
      // Implementar login aqui
    } else {
      console.log('Cadastro com:', name, email, password);
      // Implementar cadastro aqui
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
        <p className="text-gray-500 mt-1">
          {isLogin ? 'Acesse sua conta para continuar' : 'Crie sua conta para começar'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-blue-600 hover:underline font-medium"
        >
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
        </button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou continue com</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </button>
        <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18.258 3.266c-.693.263-1.08.961-1.081 1.717 0 .13.01.258.029.382.582 4.239-2.878 8.232-7.153 8.232-1.276 0-2.493-.328-3.541-.921a5.097 5.097 0 003.558-3.169.21.21 0 00-.098-.252 5.086 5.086 0 01-2.867-4.612c0-.76.19-1.512.522-2.176a.206.206 0 00-.094-.275 5.108 5.108 0 01-2.614-4.45c.902.45 1.904.718 2.932.778C7.308 2.16 6.424 4.267 6.424 6.531c0 .009 0 .018.002.027.031.871.099 1.77.224 2.677.943-.566 2.583-1.924 4.088-1.915 1.321.008 2.488.455 3.396 1.356s1.331 2.056 1.283 3.307c-.044 1.142-.73 2.196-1.75 2.691a3.222 3.222 0 01-1.08.244c-.392.017-.778-.064-1.137-.234a3.241 3.241 0 01-1.419-1.313 3.206 3.206 0 01-.455-1.806c.009-.527.233-1.021.62-1.393-2.088-.939-2.945-3.094-2.637-4.975.018-.111-.059-.217-.173-.237-.83-.146-1.652-.324-2.453-.566a.202.202 0 00-.162.016.208.208 0 00-.1.133c-.476 2.07-.143 4.275.913 6.123-1.779.166-3.471.907-4.643 2.118a.205.205 0 00-.017.289c2.161 2.454 4.687 4.349 7.438 5.282 1.462.466 3.013.701 4.583.701 6.336 0 12.142-3.921 14.38-9.749a.205.205 0 00-.105-.245 8.267 8.267 0 01-3.018-3.845 8.195 8.195 0 01-.774-3.758c0-.119.029-.232.081-.332a8.3 8.3 0 002.631-1.686.2.2 0 00.03-.27 8.24 8.24 0 01-1.074-1.452.207.207 0 00-.287-.68z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 