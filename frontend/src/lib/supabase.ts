import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';

// Tipos para nosso banco de dados
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          email: string | null;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email?: string | null;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string | null;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pacientes: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          status: string;
          avatar: string | null;
          code: string;
          notes: string | null;
          reason: string | null;
          terapeuta_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          status?: string;
          avatar?: string | null;
          code?: string;
          notes?: string | null;
          reason?: string | null;
          terapeuta_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          status?: string;
          avatar?: string | null;
          code?: string;
          notes?: string | null;
          reason?: string | null;
          terapeuta_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      sessoes: {
        Row: {
          id: string;
          paciente_id: string;
          date: string;
          start_time: string;
          end_time: string;
          status: string;
          notes: string | null;
          topics: string[] | null;
          attendance: string | null;
          session_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          paciente_id: string;
          date: string;
          start_time: string;
          end_time: string;
          status?: string;
          notes?: string | null;
          topics?: string[] | null;
          attendance?: string | null;
          session_number?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          paciente_id?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          status?: string;
          notes?: string | null;
          topics?: string[] | null;
          attendance?: string | null;
          session_number?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      questionarios: {
        Row: {
          id: string;
          paciente_id: string;
          type: string;
          date: string;
          score: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          paciente_id: string;
          type: string;
          date: string;
          score: number;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          paciente_id?: string;
          type?: string;
          date?: string;
          score?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

// Cliente para o lado do servidor usando Clerk Auth
export function createServerSupabaseClient() {
  const { getToken } = auth();
  
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          'x-my-custom-header': 'Pluma App'
        }
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        // Usa o Clerk sem depender de JWT template
        async accessToken() {
          return await getToken();
        }
      }
    }
  );
  
  return supabase;
}

// Cliente para o lado do cliente usando token de sessão do Clerk
// Para uso em componentes client
export function createClientSupabaseClient(getToken: () => Promise<string | null>) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        // Usa o Clerk sem depender de JWT template
        accessToken: getToken
      }
    }
  );
} 