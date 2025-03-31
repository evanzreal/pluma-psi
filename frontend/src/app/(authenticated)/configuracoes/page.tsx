import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Configurações</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perfil Profissional</CardTitle>
            <CardDescription>Gerencie suas informações pessoais e profissionais</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome Completo
                </label>
                <input
                  id="name"
                  className="w-full p-2 border rounded-md"
                  defaultValue="Dr. João Silva"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  defaultValue="joao.silva@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Telefone
                </label>
                <input
                  id="phone"
                  className="w-full p-2 border rounded-md"
                  defaultValue="(11) 98765-4321"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="specialty" className="text-sm font-medium">
                  Especialidade
                </label>
                <select id="specialty" className="w-full p-2 border rounded-md">
                  <option value="clinica">Psicologia Clínica</option>
                  <option value="organizacional">Psicologia Organizacional</option>
                  <option value="educacional">Psicologia Educacional</option>
                  <option value="saude">Psicologia da Saúde</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="registration" className="text-sm font-medium">
                  Número de Registro (CRP)
                </label>
                <input
                  id="registration"
                  className="w-full p-2 border rounded-md"
                  defaultValue="CRP 06/12345"
                />
              </div>
              
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Salvar Alterações
              </button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências do Sistema</CardTitle>
              <CardDescription>Personalize sua experiência na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notificações por Email</div>
                    <div className="text-sm text-muted-foreground">
                      Receber alertas por email
                    </div>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary relative">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Lembretes de Consulta</div>
                    <div className="text-sm text-muted-foreground">
                      Enviar lembretes para pacientes
                    </div>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary relative">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Tema Escuro</div>
                    <div className="text-sm text-muted-foreground">
                      Ativar modo escuro
                    </div>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-gray-300 relative">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie a segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-muted transition-colors text-left"
                >
                  Alterar Senha
                </button>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Autenticação em Dois Fatores</div>
                    <div className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança
                    </div>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-gray-300 relative">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
                
                <button
                  type="button"
                  className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-left"
                >
                  Encerrar Sessões Ativas
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 