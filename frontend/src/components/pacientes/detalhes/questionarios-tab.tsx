import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardList, Plus, Send } from "lucide-react"
import { useState } from "react"

interface Questionnaire {
  date: string
  type: string
  score: number
  status: string
}

interface PatientQuestionnaire {
  id: number
  name: string
  questionnaires: Questionnaire[]
}

interface QuestionariosTabProps {
  patient: PatientQuestionnaire
  onSendQuestionnaire?: (type: string) => void
  onAddResult?: (result: Questionnaire) => void
}

export function QuestionariosTab({ 
  patient, 
  onSendQuestionnaire,
  onAddResult 
}: QuestionariosTabProps) {
  const [selectedQuestionnaireType, setSelectedQuestionnaireType] = useState("")
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)
  const [isAddResultDialogOpen, setIsAddResultDialogOpen] = useState(false)
  const [newResult, setNewResult] = useState<Questionnaire>({
    date: new Date().toLocaleDateString('pt-BR'),
    type: "",
    score: 0,
    status: ""
  })
  
  const questionnaireTypes = [
    "Ansiedade", 
    "Depressão", 
    "TDAH", 
    "Estresse", 
    "Relações Familiares"
  ]
  
  const statusOptions = {
    "Ansiedade": ["Normal", "Leve", "Moderada", "Moderada a Severa", "Severa"],
    "Depressão": ["Normal", "Leve", "Moderada", "Moderada a Severa", "Severa"],
    "TDAH": ["Sem indícios", "Indícios leves", "Indícios moderados", "Indícios fortes"],
    "Estresse": ["Baixo", "Moderado", "Alto", "Muito alto"],
    "Relações Familiares": ["Saudável", "Moderado", "Disfuncional"]
  }
  
  const handleSendQuestionnaire = () => {
    if (selectedQuestionnaireType) {
      onSendQuestionnaire?.(selectedQuestionnaireType)
      setSelectedQuestionnaireType("")
      setIsSendDialogOpen(false)
    }
  }
  
  const handleResultChange = (name: string, value: string) => {
    setNewResult(prev => ({ 
      ...prev, 
      [name]: name === 'score' ? parseInt(value) || 0 : value 
    }))
  }
  
  const handleAddResult = () => {
    if (newResult.type && newResult.score && newResult.status) {
      onAddResult?.(newResult)
      setNewResult({
        date: new Date().toLocaleDateString('pt-BR'),
        type: "",
        score: 0,
        status: ""
      })
      setIsAddResultDialogOpen(false)
    }
  }
  
  // Agrupar questionários por tipo
  const groupedQuestionnaires = patient.questionnaires.reduce((acc, q) => {
    if (!acc[q.type]) {
      acc[q.type] = []
    }
    acc[q.type].push(q)
    return acc
  }, {} as Record<string, Questionnaire[]>)
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Questionários</h2>
        <div className="flex gap-2">
          <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <Send className="h-4 w-4 mr-2" />
                Enviar Questionário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Questionário</DialogTitle>
                <DialogDescription>
                  Envie um questionário para o paciente responder via aplicativo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="questionnaireType">Tipo de Questionário</Label>
                  <Select 
                    value={selectedQuestionnaireType} 
                    onValueChange={value => setSelectedQuestionnaireType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionnaireTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSendQuestionnaire}>Enviar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddResultDialogOpen} onOpenChange={setIsAddResultDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Resultado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Resultado</DialogTitle>
                <DialogDescription>
                  Registre o resultado de um questionário respondido pelo paciente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input 
                    id="date" 
                    name="date"
                    value={newResult.date}
                    onChange={(e) => handleResultChange('date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Questionário</Label>
                  <Select 
                    value={newResult.type} 
                    onValueChange={value => handleResultChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionnaireTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">Pontuação</Label>
                  <Input 
                    id="score" 
                    name="score"
                    type="number"
                    value={newResult.score.toString()}
                    onChange={(e) => handleResultChange('score', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newResult.status} 
                    onValueChange={value => handleResultChange('status', value)}
                    disabled={!newResult.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {newResult.type && statusOptions[newResult.type as keyof typeof statusOptions]?.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddResult}>Salvar Resultado</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {Object.keys(groupedQuestionnaires).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhum questionário realizado ainda</p>
          <Button variant="outline" className="mt-4" onClick={() => setIsSendDialogOpen(true)}>
            <Send className="h-4 w-4 mr-2" />
            Enviar Primeiro Questionário
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedQuestionnaires).map(([type, questionnaires]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle>Questionário: {type}</CardTitle>
                <CardDescription>
                  {questionnaires.length} resultados registrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 font-medium text-sm text-muted-foreground">
                    <div>Data</div>
                    <div>Pontuação</div>
                    <div>Status</div>
                  </div>
                  
                  {questionnaires
                    .sort((a, b) => {
                      // Ordenar por data decrescente
                      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
                      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
                      return new Date(yearB, monthB-1, dayB).getTime() - new Date(yearA, monthA-1, dayA).getTime()
                    })
                    .map((q, index) => (
                      <div key={index} className="grid grid-cols-3 py-2 border-b last:border-b-0">
                        <div>{q.date}</div>
                        <div>{q.score}</div>
                        <div>{q.status}</div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 