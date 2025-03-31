import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgendaPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Agenda</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>Visualize e gerencie seus compromissos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {/* Cabeçalho dos dias da semana */}
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium py-2">
                    {day}
                  </div>
                ))}
                
                {/* Dias do mês (exemplo para maio) */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Ajuste para começar no dia correto da semana
                  return (
                    <div 
                      key={i} 
                      className={`
                        h-16 p-1 border rounded-md transition-colors
                        ${day > 0 && day <= 31 ? 'hover:bg-muted cursor-pointer' : 'opacity-30 cursor-default'}
                        ${day === 15 ? 'bg-blue-50 border-blue-200' : ''}
                      `}
                    >
                      {day > 0 && day <= 31 && (
                        <>
                          <div className="text-sm">{day}</div>
                          {day === 15 && (
                            <div className="mt-1 text-xs bg-blue-100 p-1 rounded text-blue-800 truncate">
                              13:00 - Ana Silva
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Atendimentos</CardTitle>
              <CardDescription>Hoje, {new Date().toLocaleDateString('pt-BR')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Lista de atendimentos do dia */}
                <div className="flex items-start space-x-4 p-3 border rounded-md bg-blue-50">
                  <div className="font-medium">13:00</div>
                  <div>
                    <div className="font-medium">Ana Silva</div>
                    <div className="text-sm text-muted-foreground">Sessão regular</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 border rounded-md">
                  <div className="font-medium">15:30</div>
                  <div>
                    <div className="font-medium">Carlos Oliveira</div>
                    <div className="text-sm text-muted-foreground">Primeira consulta</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-3 border rounded-md">
                  <div className="font-medium">17:00</div>
                  <div>
                    <div className="font-medium">Maria Santos</div>
                    <div className="text-sm text-muted-foreground">Sessão regular</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 