import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Rota para configurar as políticas RLS no Supabase
 * Esta rota deve ser chamada apenas durante a configuração inicial do aplicativo
 * ou quando houver mudanças nas políticas RLS
 */
export async function GET(req: NextRequest) {
  const API_KEY = req.headers.get("x-api-key");

  // Verificar se a API_KEY é válida
  if (API_KEY !== process.env.SETUP_API_KEY) {
    return NextResponse.json({ error: "Chave de API inválida" }, { status: 401 });
  }

  try {
    // Conectar ao Supabase com a chave de serviço
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Executar SQL para criar políticas RLS
    const { error } = await supabase.rpc("setup_rls_policies", {});

    if (error) {
      console.error("Erro ao configurar políticas RLS:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao configurar políticas RLS:", error);
    return NextResponse.json(
      { error: "Erro ao configurar políticas RLS" },
      { status: 500 }
    );
  }
} 