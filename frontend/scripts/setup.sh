#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando configuração do Pluma PSI...${NC}"

# Verificar se .env.local existe
if [ ! -f .env.local ]; then
  echo -e "${RED}Arquivo .env.local não encontrado!${NC}"
  echo -e "${YELLOW}Criando arquivo .env.local de exemplo...${NC}"
  
  cat > .env.local << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cnvxuuylsbrbanlfdrdk.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Setup
SETUP_API_KEY=\$(openssl rand -hex 16)
EOF

  echo -e "${GREEN}Arquivo .env.local criado com sucesso! Preencha com suas credenciais.${NC}"
  echo -e "${YELLOW}Uma chave SETUP_API_KEY foi gerada automaticamente.${NC}"
  exit 1
fi

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install

# Iniciar o servidor Next.js em segundo plano
echo -e "${YELLOW}Iniciando servidor Next.js em segundo plano...${NC}"
npm run dev &
SERVER_PID=$!

# Aguardar o servidor iniciar
echo -e "${YELLOW}Aguardando o servidor iniciar (10 segundos)...${NC}"
sleep 10

# Configurar RLS
echo -e "${YELLOW}Configurando políticas RLS...${NC}"
npm run setup-rls

# Encerrar o servidor Next.js
echo -e "${YELLOW}Encerrando servidor Next.js...${NC}"
kill $SERVER_PID

echo -e "${GREEN}Configuração concluída com sucesso!${NC}"
echo -e "${YELLOW}Você pode iniciar a aplicação normalmente com:${NC} npm run dev" 