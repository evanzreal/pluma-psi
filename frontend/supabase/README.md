# Configuração de Políticas RLS no Supabase

Este diretório contém arquivos relacionados à configuração de Row Level Security (RLS) no Supabase para o Pluma PSI.

## O que é RLS?

Row Level Security (RLS) é um recurso do PostgreSQL que permite controlar o acesso aos dados em nível de linha. Isso significa que podemos definir políticas que determinam quais linhas um usuário pode ver, inserir, atualizar ou excluir em uma tabela.

No contexto do Pluma PSI, usamos RLS para garantir que:

1. Terapeutas só possam ver seus próprios pacientes
2. Terapeutas só possam ver sessões e questionários de seus pacientes
3. Os dados sejam adequadamente protegidos contra acesso não autorizado

## Arquivo setup-rls.sql

O arquivo `setup-rls.sql` contém a função `setup_rls_policies()` que configura todas as políticas RLS necessárias para o Pluma PSI. Esta função:

1. Remove políticas existentes para evitar conflitos
2. Cria novas políticas para as tabelas:
   - `users` (usuários/terapeutas)
   - `patients` (pacientes)
   - `sessions` (sessões de terapia)
   - `questionnaires` (questionários)

## Como aplicar as políticas RLS

Existem duas maneiras de aplicar as políticas RLS:

### 1. Usando o script de configuração

Execute o script de configuração na raiz do projeto frontend:

```bash
./scripts/setup.sh
```

Este script:
- Verifica a existência do arquivo `.env.local`
- Instala dependências
- Inicia o servidor Next.js temporariamente
- Executa a configuração RLS
- Encerra o servidor

### 2. Manualmente através da API

1. Primeiro, certifique-se de que o servidor Next.js está em execução:
   ```bash
   npm run dev
   ```

2. Em outro terminal, execute o script de configuração RLS:
   ```bash
   npm run setup-rls
   ```

## Requisitos

Para que a configuração RLS funcione corretamente, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=sua-url-supabase
NEXT_PUBLIC_SUPABASE_KEY=sua-chave-anon-supabase
SUPABASE_SERVICE_KEY=sua-chave-service-supabase
SETUP_API_KEY=sua-chave-secreta-setup
```

A `SETUP_API_KEY` é usada para proteger a API de configuração RLS contra acesso não autorizado. 