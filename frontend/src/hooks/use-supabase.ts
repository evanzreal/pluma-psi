'use client';

import { createClientSupabaseClient } from "@/lib/supabase";
import { useSession } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase";

export function useSupabase() {
  const { session, isLoaded } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // Função para obter token do Clerk
    async function getToken() {
      try {
        return session ? await session.getToken({ template: 'supabase' }) : null;
      } catch (error) {
        console.error('Erro ao obter token do Clerk:', error);
        return null;
      }
    }

    // Criar cliente Supabase com o token do Clerk
    const client = createClientSupabaseClient(getToken);
    setSupabase(client);
    setIsLoading(false);
  }, [isLoaded, session]);

  return { supabase, isLoading };
} 