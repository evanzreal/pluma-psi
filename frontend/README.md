# Pluma PSI - Frontend

Este é o frontend do Pluma PSI, um sistema para gerenciamento de pacientes e sessões de terapia.

## Configuração

### 1. Variáveis de Ambiente

Primeiro, crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua-url-supabase
NEXT_PUBLIC_SUPABASE_KEY=sua-chave-anon-supabase
SUPABASE_SERVICE_KEY=sua-chave-service-supabase

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=sua-chave-publishable-clerk
CLERK_SECRET_KEY=sua-chave-secret-clerk
CLERK_WEBHOOK_SECRET=sua-chave-webhook-clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Setup
SETUP_API_KEY=sua-chave-secreta-setup
```

### 2. Configuração Rápida

Execute o script de configuração automatizado:

```bash
./scripts/setup.sh
```

Este script irá:
- Verificar o arquivo `.env.local`
- Instalar dependências
- Configurar políticas RLS no Supabase

### 3. Configuração Manual

Alternativamente, você pode instalar as dependências e iniciar o servidor manualmente:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Para configurar as políticas RLS manualmente:

```bash
npm run setup-rls
```

## Segurança de Dados com Row Level Security (RLS)

Este projeto utiliza Row Level Security (RLS) do Supabase para garantir a segurança dos dados. As políticas RLS configuram:

- Terapeutas só podem ver seus próprios pacientes
- Terapeutas só podem ver sessões e questionários de seus pacientes
- Proteção adequada contra acesso não autorizado

Para mais detalhes sobre as políticas RLS, consulte [./supabase/README.md](./supabase/README.md).

## Desenvolvimento

### Estrutura do Projeto

- `app/`: Páginas e rotas da aplicação
- `app/api/`: Endpoints da API
- `scripts/`: Scripts de configuração
- `supabase/`: Arquivos relacionados ao Supabase, incluindo configuração RLS

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar versão de produção
npm run start

# Testes
npm run test

# Configurar RLS
npm run setup-rls
```

## Tecnologias Utilizadas

- Next.js 15+
- React 19+
- TypeScript
- Supabase (PostgreSQL com RLS)
- Clerk (Autenticação)
- Tailwind CSS
- Shadcn UI
