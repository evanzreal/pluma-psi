import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"
import { syncUserWithDatabase } from "@/lib/user-sync"
import { auth } from "@clerk/nextjs"

export default async function DashboardPage() {
  // Sincronizar usuário com o banco
  const user = await syncUserWithDatabase()
  const { userId } = auth()
  
  // Criar cliente Supabase autenticado
  const supabase = createServerSupabaseClient()
  
  // Buscar dados para o dashboard
  const { data: pacientes, error: pacientesError } = await supabase
    .from('pacientes')
    .select('*')
    .eq('terapeuta_id', user?.id)
    
  const { data: sessoes, error: sessoesError } = await supabase
    .from('sessoes')
    .select('*')
    .eq('status', 'scheduled')
    .in('paciente_id', pacientes?.map(p => p.id) || [])
    
  const { data: questionarios, error: questionariosError } = await supabase
    .from('questionarios')
    .select('*')
    .in('paciente_id', pacientes?.map(p => p.id) || [])
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
  
  // Total de pacientes ativos
  const pacientesAtivos = pacientes?.filter(p => p.status === 'Ativo').length || 0
  
  // Alertas (implementação básica - poderia ser mais sofisticada)
  const alertas = (pacientes?.filter(p => p.status === 'Necessita Atenção').length || 0) + 
                 (questionarios?.filter(q => q.status.includes('Severa')).length || 0)
  
  // Questionários respondidos hoje
  const questionariosHoje = questionarios?.length || 0

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Pacientes</CardTitle>
            <CardDescription>Pacientes ativos no momento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pacientesAtivos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>Alertas pendentes de revisão</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{alertas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Questionários</CardTitle>
            <CardDescription>Respostas recebidas hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{questionariosHoje}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 