import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarPlus, Plus } from "lucide-react"
import { useState } from "react"

interface Session {
  date: string
  notes: string
}

interface PatientSession {
  id: number
  name: string
  sessions: Session[]
}

interface SessoesTabProps {
  patient: PatientSession
  onAddSession?: (newSession: Session) => void
}

export function SessoesTab({ patient, onAddSession }: SessoesTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSession, setNewSession] = useState<Session>({
    date: new Date().toLocaleDateString('pt-BR'),
    notes: ""
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewSession(prev => ({ ...prev, [name]: value }))
  }
  
  const handleAddSession = () => {
    onAddSession?.(newSession)
    setNewSession({
      date: new Date().toLocaleDateString('pt-BR'),
      notes: ""
    })
    setIsDialogOpen(false)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Histórico de Sessões</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Sessão
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Sessão</DialogTitle>
              <DialogDescription>
                Registre os detalhes da nova sessão com {patient.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input 
                  id="date" 
                  name="date"
                  value={newSession.date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Anotações</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  value={newSession.notes}
                  onChange={handleChange}
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddSession}>Salvar Sessão</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {patient.sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
          <CalendarPlus className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhuma sessão registrada ainda</p>
          <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Primeira Sessão
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {patient.sessions.map((session, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Sessão de {session.date}
                </CardTitle>
                <CardDescription>
                  Sessão #{patient.sessions.length - index}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{session.notes}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 pb-2 flex justify-end">
                <Button variant="outline" size="sm">Editar Anotações</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 