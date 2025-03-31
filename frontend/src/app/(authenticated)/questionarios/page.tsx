import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuestionariosPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Questionários</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Questionários Ativos</CardTitle>
            <CardDescription>Questionários disponíveis para pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, name: 'Avaliação de Ansiedade', sent: 24, responses: 18 },
                { id: 2, name: 'Avaliação de Humor', sent: 30, responses: 25 },
                { id: 3, name: 'Escala de Depressão', sent: 15, responses: 12 },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Enviados: {item.sent} | Respondidos: {item.responses}
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Ativo
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Últimas Respostas</CardTitle>
            <CardDescription>Respostas recentes de pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, patient: 'Ana Silva', form: 'Avaliação de Ansiedade', date: '10/05/2024', score: 'Leve' },
                { id: 2, patient: 'Carlos Oliveira', form: 'Avaliação de Humor', date: '09/05/2024', score: 'Moderado' },
                { id: 3, patient: 'Maria Santos', form: 'Escala de Depressão', date: '08/05/2024', score: 'Grave' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium">{item.patient}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.form}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.date}
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${item.score === 'Leve' ? 'bg-green-100 text-green-800' : 
                      item.score === 'Moderado' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`
                    }>
                      {item.score}
                    </span>
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