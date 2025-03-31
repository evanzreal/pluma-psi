import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard, Calendar, ArrowRight } from "lucide-react"

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

        {/* Plano e Faturamento */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Plano e Faturamento
            </CardTitle>
            <CardDescription>Informações sobre seu plano e assinatura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-50 p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-blue-700">Plano Premium</h3>
                      <p className="text-sm text-blue-600">Faturamento mensal</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">R$ 99,90<span className="text-sm font-normal">/mês</span></div>
                      <div className="text-sm text-muted-foreground">Próxima cobrança em 15/06/2024</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium mb-3">Benefícios do seu plano:</h4>
                  <div className="space-y-2">
                    {[
                      'Até 100 pacientes ativos',
                      'Agendamentos ilimitados',
                      'Questionários personalizados',
                      'Sistema de alertas avançado',
                      'Suporte prioritário',
                      'Backup automático de dados'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Cartão de Crédito</div>
                        <div className="text-sm text-muted-foreground">**** **** **** 4567</div>
                        <div className="text-xs text-muted-foreground">Expira em 08/2026</div>
                      </div>
                    </div>
                    <div className="text-xs inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800">
                      Principal
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 border border-dashed rounded-md hover:bg-muted/50 transition-colors text-center text-muted-foreground text-sm">
                    + Adicionar novo método de pagamento
                  </button>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Últimos Pagamentos:</h4>
                  <div className="space-y-2">
                    {[
                      { date: '15/05/2024', amount: 'R$ 99,90' },
                      { date: '15/04/2024', amount: 'R$ 99,90' },
                    ].map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{payment.date}</span>
                        </div>
                        <div className="font-medium">{payment.amount}</div>
                      </div>
                    ))}
                    <button className="w-full text-sm text-center text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center mt-1">
                      Ver histórico completo
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 