import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Bell, CheckCircle } from "lucide-react"

export default function AlertasPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Alertas</h1>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Alertas Pendentes</CardTitle>
            <CardDescription>Notificações que requerem sua atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: 1, 
                  type: 'danger',
                  patient: 'Maria Santos', 
                  message: 'Resposta preocupante no questionário de depressão', 
                  date: '10/05/2024 10:23' 
                },
                { 
                  id: 2, 
                  type: 'warning',
                  patient: 'Carlos Oliveira', 
                  message: 'Não compareceu à sessão agendada', 
                  date: '09/05/2024 15:30' 
                },
                { 
                  id: 3, 
                  type: 'info',
                  patient: 'Ana Silva', 
                  message: 'Solicitou remarcação da sessão', 
                  date: '08/05/2024 18:15' 
                },
              ].map((alert) => (
                <div 
                  key={alert.id} 
                  className={`
                    flex items-start p-4 border rounded-md transition-colors 
                    ${alert.type === 'danger' ? 'bg-red-50 border-red-200' : 
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 
                      'bg-blue-50 border-blue-200'}
                  `}
                >
                  <div className="mr-3">
                    {alert.type === 'danger' ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : alert.type === 'warning' ? (
                      <Bell className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{alert.patient}</div>
                    <div className="text-sm">{alert.message}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{alert.date}</div>
                  </div>
                  <button className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-100 transition-colors">
                    Marcar como lido
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Alertas</CardTitle>
            <CardDescription>Alertas anteriores já revisados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: 1, 
                  patient: 'João Ferreira', 
                  message: 'Questionário de ansiedade com pontuação alta', 
                  date: '05/05/2024 09:10',
                  resolvedDate: '05/05/2024 14:25' 
                },
                { 
                  id: 2, 
                  patient: 'Paula Martins', 
                  message: 'Solicitou novos materiais de apoio', 
                  date: '03/05/2024 16:45',
                  resolvedDate: '04/05/2024 10:15' 
                },
              ].map((alert) => (
                <div 
                  key={alert.id} 
                  className="flex items-start p-4 border rounded-md opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{alert.patient}</div>
                    <div className="text-sm">{alert.message}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Criado: {alert.date} | Resolvido: {alert.resolvedDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 