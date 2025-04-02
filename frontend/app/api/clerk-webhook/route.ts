import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Webhook secret não configurado" },
      { status: 500 }
    );
  }

  // Obtém os cabeçalhos de assinatura webhook corretamente
  const headersList = headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  // Se algum cabeçalho necessário estiver faltando, retorna erro
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Cabeçalhos webhook inválidos" },
      { status: 400 }
    );
  }

  // Pega o corpo da requisição
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Cria instância do webhook com secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verifica a assinatura
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Erro ao verificar webhook:", err);
    return NextResponse.json(
      { error: "Assinatura de webhook inválida" },
      { status: 400 }
    );
  }

  console.log("Evento recebido:", evt.type, "User ID:", evt.data.id);

  // Conecta ao Supabase admin
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY || ""
  );

  // Processa o evento
  try {
    const eventType = evt.type;
    
    if (eventType === "user.created" || eventType === "user.updated") {
      // Extrai dados do usuário
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses?.[0]?.email_address;
      const fullName = first_name && last_name 
        ? `${first_name} ${last_name}` 
        : first_name || "";

      console.log(`Processando usuário: ${id}, ${email}, ${fullName}`);

      // Busca usuário existente
      const { data: existingUser } = await supabase
        .from("users")
        .select()
        .eq("clerk_id", id)
        .single();

      if (existingUser) {
        // Atualiza usuário existente
        await supabase
          .from("users")
          .update({
            email,
            name: fullName,
            updated_at: new Date().toISOString(),
          })
          .eq("clerk_id", id);
          
        console.log(`Usuário atualizado: ${id}`);
      } else {
        // Cria novo usuário
        const { data, error } = await supabase.from("users").insert({
          clerk_id: id,
          email,
          name: fullName,
        });
        
        if (error) {
          console.error("Erro ao criar usuário:", error);
        } else {
          console.log(`Novo usuário criado: ${id}`);
        }
      }
    } else if (eventType === "user.deleted") {
      // Opcionalmente, marque o usuário como inativo ou remova completamente
      // Não removeremos para preservar dados históricos
      const { id } = evt.data;
      
      await supabase
        .from("users")
        .update({
          email: null,
          name: "Usuário removido", 
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", id);
        
      console.log(`Usuário marcado como removido: ${id}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 }
    );
  }
} 