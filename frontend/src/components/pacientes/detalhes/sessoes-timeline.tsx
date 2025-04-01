import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Plus, ChevronDown, ChevronUp, Clock, CheckCircle, NotebookPen } from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Session {
  id: string
  date: string
  startTime: string
  endTime: string
  status: "completed" | "scheduled" | "canceled"
  notes?: string
  topics?: string[]
  attendance?: string
  sessionNumber: number
}

interface SessoesTimelineProps {
  sessions: Session[]
  onAddSession: () => void
  onEditSession: (sessionId: string) => void
}

export function SessoesTimeline({ sessions, onAddSession, onEditSession }: SessoesTimelineProps) {
  const [openSessionId, setOpenSessionId] = useState<string | null>(null)
  
  const toggleSession = (sessionId: string) => {
    setOpenSessionId(openSessionId === sessionId ? null : sessionId)
  }
  
  const sortedSessions = [...sessions].sort((a, b) => {
    // Ordenar do mais recente para o mais antigo
    const [dayA, monthA, yearA] = a.date.split('/').map(Number)
    const [dayB, monthB, yearB] = b.date.split('/').map(Number)
    return new Date(yearB, monthB-1, dayB).getTime() - new Date(yearA, monthA-1, dayA).getTime()
  })
  
  const getSessionStatusInfo = (status: Session['status']) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Realizada',
          icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
          class: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }
      case 'scheduled':
        return {
          label: 'Agendada',
          icon: <Clock className="h-4 w-4 text-blue-500" />,
          class: 'bg-blue-50 text-blue-700 border-blue-200'
        }
      case 'canceled':
        return {
          label: 'Cancelada',
          icon: <ChevronDown className="h-4 w-4 text-rose-500" />,
          class: 'bg-rose-50 text-rose-700 border-rose-200'
        }
      default:
        return {
          label: 'Desconhecido',
          icon: null,
          class: 'bg-slate-50 text-slate-700 border-slate-200'
        }
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Histórico de Sessões</h3>
        <Button 
          onClick={onAddSession}
          size="sm"
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Nova Sessão
        </Button>
      </div>
      
      {sortedSessions.length === 0 ? (
        <Card className="border-dashed border-slate-300 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarIcon className="h-10 w-10 text-slate-300 mb-4" />
            <p className="text-slate-500 mb-4">Nenhuma sessão registrada ainda</p>
            <Button 
              onClick={onAddSession}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Registrar Primeira Sessão
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 relative before:absolute before:top-0 before:bottom-0 before:left-4 before:w-0.5 before:bg-slate-200">
          {sortedSessions.map((session) => {
            const statusInfo = getSessionStatusInfo(session.status)
            
            return (
              <Collapsible 
                key={session.id}
                open={openSessionId === session.id}
                onOpenChange={() => toggleSession(session.id)}
                className="ml-8 relative"
              >
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full border-2 border-white bg-white z-10">
                  {statusInfo.icon}
                </div>
                
                <Card className={`border overflow-hidden transition-all duration-200 ${openSessionId === session.id ? 'shadow-md' : 'shadow-sm'}`}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className={`py-4 cursor-pointer ${statusInfo.class} hover:opacity-90 transition-opacity`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">Sessão #{session.sessionNumber}</CardTitle>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 flex items-center gap-1">
                              {statusInfo.label}
                            </span>
                          </div>
                          <CardDescription className="mt-1 flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" /> 
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> 
                              {session.startTime} - {session.endTime}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7 rounded-full bg-white/30 text-current hover:bg-white/50"
                            onClick={(e) => {
                              e.stopPropagation()
                              onEditSession(session.id)
                            }}
                          >
                            <NotebookPen className="h-3.5 w-3.5" />
                          </Button>
                          {openSessionId === session.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="p-4 pt-0 pb-5 bg-white">
                      <div className="border-t border-current border-opacity-10 pt-4 space-y-4">
                        {session.attendance && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-1">Comparecimento</h4>
                            <p className="text-sm text-slate-600">{session.attendance}</p>
                          </div>
                        )}
                        
                        {session.topics && session.topics.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-1">Tópicos abordados</h4>
                            <div className="flex flex-wrap gap-1">
                              {session.topics.map((topic, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700 bg-slate-50"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {session.notes && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-1">Anotações</h4>
                            <p className="text-sm text-slate-600 whitespace-pre-line">{session.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )
          })}
        </div>
      )}
    </div>
  )
} 