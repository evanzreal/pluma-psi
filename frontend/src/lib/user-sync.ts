import { auth } from "@clerk/nextjs";
import { createServerSupabaseClient } from "./supabase";

/**
 * Sincroniza o usuário atual do Clerk com o banco de dados Supabase
 * Cria ou atualiza o usuário no banco se necessário
 * 
 * @returns O registro do usuário no banco de dados ou null se não autenticado
 */
export async function syncUserWithDatabase() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }
  
  const supabase = createServerSupabaseClient();
  
  // Verificar se o usuário já existe no banco
  const { data: existingUser, error: queryError } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', userId)
    .single();
    
  if (queryError && queryError.code !== 'PGRST116') {
    // PGRST116 é o código para "nenhum resultado encontrado"
    console.error('Erro ao buscar usuário:', queryError);
    return null;
  }
  
  // Se o usuário não existir, criar um novo
  if (!existingUser) {
    // Obter dados do usuário via API do Clerk
    const clerkAuth = auth();
    const userEmail = clerkAuth.sessionClaims?.email as string;
    const userName = clerkAuth.sessionClaims?.name as string || 
                    clerkAuth.sessionClaims?.first_name as string || 
                    'Usuário';
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        clerk_id: userId,
        email: userEmail,
        name: userName
      })
      .select()
      .single();
      
    if (insertError) {
      console.error('Erro ao criar usuário:', insertError);
      return null;
    }
    
    return newUser;
  }
  
  return existingUser;
} 