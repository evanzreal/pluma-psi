'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoTab } from "@/components/pacientes/detalhes/info-tab"
import { SessoesTab } from "@/components/pacientes/detalhes/sessoes-tab"
import { QuestionariosTab } from "@/components/pacientes/detalhes/questionarios-tab"
import { InsightsDashboard } from "@/components/pacientes/detalhes/insights-dashboard"
import { patientDetailsData } from "@/lib/mock/pacientes-data"

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = Number(params.id)
  
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [activeDetailTab, setActiveDetailTab] = useState("overview")
  
  // Buscar dados do paciente com base no ID
  useEffect(() => {
    // Em um cenário real, isso seria uma chamada API
    const fetchPatient = () => {
      setLoading(true)
      
      // Simulando um atraso de rede
      setTimeout(() => {
        const foundPatient = patientDetailsData.find(p => p.id === patientId)
        
        if (foundPatient) {
          setPatient(foundPatient)
        } else {
          // Paciente não encontrado
          router.push('/pacientes')
        }
        
        setLoading(false)
      }, 500)
    }
    
    fetchPatient()
  }, [patientId, router])
  
  // Handler para atualizar informações do paciente
  const handleUpdatePatient = (updatedData: any) => {
    setPatient({ ...patient, ...updatedData })
    // Em um cenário real, aqui seria feita uma chamada API para salvar as alterações
    console.log("Salvando alterações:", updatedData)
  }
  
  // Handler para adicionar uma nova sessão
  const handleAddSession = (newSession: any) => {
    if (!patient) return
    
    const updatedSessions = [newSession, ...patient.sessions]
    setPatient({ ...patient, sessions: updatedSessions })
    // Em um cenário real, aqui seria feita uma chamada API para salvar a nova sessão
    console.log("Nova sessão adicionada:", newSession)
  }
  
  // Handler para enviar questionário
  const handleSendQuestionnaire = (type: string) => {
    if (!patient) return
    
    // Em um cenário real, aqui seria feita uma chamada API para enviar o questionário
    console.log(`Enviando questionário de ${type} para ${patient.name}`)
  }
  
  // Handler para adicionar resultado de questionário
  const handleAddQuestionnaireResult = (result: any) => {
    if (!patient) return
    
    const updatedQuestionnaires = [result, ...patient.questionnaires]
    setPatient({ ...patient, questionnaires: updatedQuestionnaires })
    // Em um cenário real, aqui seria feita uma chamada API para salvar o resultado
    console.log("Novo resultado de questionário:", result)
  }
  
  // Mostrar estado de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando informações do paciente...</p>
        </div>
      </div>
    )
  }
  
  // Se paciente não for encontrado
  if (!patient) {
    return (
      <div className="text-center py-10 space-y-4">
        <h2 className="text-2xl font-bold">Paciente não encontrado</h2>
        <p className="text-muted-foreground">O paciente que você está procurando não existe ou foi removido.</p>
        <Button onClick={() => router.push('/pacientes')}>
          Voltar para lista de pacientes
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Botão de voltar */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-2" 
        onClick={() => router.push('/pacientes')}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para pacientes
      </Button>
      
      {/* Dashboard de Insights (conteúdo principal) */}
      <InsightsDashboard 
        patient={patient} 
        onViewDetails={() => setDetailsDialogOpen(true)} 
      />
      
      {/* Modal de detalhes do paciente */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Detalhes do Paciente: {patient.name}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            <Tabs defaultValue="overview" value={activeDetailTab} onValueChange={setActiveDetailTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Informações</TabsTrigger>
                <TabsTrigger value="sessions">Sessões</TabsTrigger>
                <TabsTrigger value="questionnaires">Questionários</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <InfoTab patient={patient} onSave={handleUpdatePatient} />
              </TabsContent>

              <TabsContent value="sessions" className="mt-6">
                <SessoesTab patient={patient} onAddSession={handleAddSession} />
              </TabsContent>

              <TabsContent value="questionnaires" className="mt-6">
                <QuestionariosTab 
                  patient={patient} 
                  onSendQuestionnaire={handleSendQuestionnaire}
                  onAddResult={handleAddQuestionnaireResult}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 