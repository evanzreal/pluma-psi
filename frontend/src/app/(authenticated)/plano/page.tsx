import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Check, Calendar, ArrowRight } from "lucide-react"

export default function PlanoPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Plano e Faturamento</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Seu Plano Atual
            </CardTitle>
            <CardDescription>Informações sobre seu plano e assinatura</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>Seus pagamentos recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '15/05/2024', amount: 'R$ 99,90', status: 'Pago', method: 'Cartão final 4567' },
                { date: '15/04/2024', amount: 'R$ 99,90', status: 'Pago', method: 'Cartão final 4567' },
                { date: '15/03/2024', amount: 'R$ 99,90', status: 'Pago', method: 'Cartão final 4567' },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{payment.date}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{payment.method}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{payment.amount}</div>
                    <div className="text-xs inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800">
                      {payment.status}
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full text-sm text-center text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center mt-2">
                Ver todos os pagamentos
                <ArrowRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Método de Pagamento</CardTitle>
            <CardDescription>Gerencie suas formas de pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
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
            </div>
            
            <div className="space-y-2">
              <button className="w-full px-4 py-2 border border-dashed rounded-md hover:bg-muted/50 transition-colors text-center text-muted-foreground">
                + Adicionar novo método de pagamento
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 