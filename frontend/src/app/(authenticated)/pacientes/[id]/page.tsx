'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Mail, Phone, Copy, Check, Edit, PlusCircle, FileText } from "lucide-react"

// Dados fictícios dos pacientes (mesmo array da página de lista)
const patientsData = [
  { 
    id: 1, 
    name: "Ana Silva", 
    email: "ana.silva@email.com", 
    phone: "(11) 98765-4321", 
    birthdate: "15/03/1985",
    occupation: "Professora",
    startDate: "10/01/2024",
    lastSession: "10/05/2024",
    nextSession: "17/05/2024",
    status: "Ativo",
    avatar: "/avatars/ana.jpg",
    code: "PSI-45678",
    notes: "Paciente com ansiedade leve, demonstrando progresso",
    sessions: [
      { date: "10/05/2024", notes: "Sessão produtiva. Paciente relatou melhora no sono." },
      { date: "03/05/2024", notes: "Discutimos estratégias para lidar com ansiedade em ambientes sociais." },
      { date: "26/04/2024", notes: "Paciente relatou episódio de ansiedade no trabalho." },
      { date: "19/04/2024", notes: "Continuamos trabalhando nas técnicas de respiração e mindfulness." },
      { date: "12/04/2024", notes: "Primeira sessão após avaliação. Definimos objetivos iniciais." }
    ],
    questionnaires: [
      { date: "05/05/2024", type: "Ansiedade", score: 12, status: "Leve" },
      { date: "15/04/2024", type: "Ansiedade", score: 18, status: "Moderada" },
      { date: "15/03/2024", type: "Ansiedade", score: 22, status: "Moderada a Severa" }
    ]
  },
  { 
    id: 2, 
    name: "Carlos Oliveira", 
    email: "carlos.oliveira@email.com", 
    phone: "(21) 99876-5432", 
    birthdate: "22/07/1990",
    occupation: "Engenheiro",
    startDate: "15/02/2024",
    lastSession: "09/05/2024",
    nextSession: "16/05/2024",
    status: "Ativo",
    avatar: "/avatars/carlos.jpg",
    code: "PSI-56789",
    notes: "Iniciou tratamento recentemente",
    sessions: [
      { date: "09/05/2024", notes: "Paciente relatou conflitos com colegas de trabalho." },
      { date: "02/05/2024", notes: "Exploramos padrões de comportamento no ambiente de trabalho." },
      { date: "25/04/2024", notes: "Paciente demonstrou interesse em técnicas de meditação." }
    ],
    questionnaires: [
      { date: "01/05/2024", type: "Depressão", score: 8, status: "Leve" },
      { date: "01/04/2024", type: "Depressão", score: 12, status: "Moderada" }
    ]
  },
  { 
    id: 3, 
    name: "Maria Santos", 
    email: "maria.santos@email.com", 
    phone: "(31) 97654-3210", 
    birthdate: "05/10/1978",
    occupation: "Advogada",
    startDate: "05/12/2023",
    lastSession: "08/05/2024",
    nextSession: "15/05/2024",
    status: "Ativo",
    avatar: "/avatars/maria.jpg",
    code: "PSI-67890",
    notes: "Apresenta sintomas de depressão, em acompanhamento constante",
    sessions: [
      { date: "08/05/2024", notes: "Discutimos eventos traumáticos recentes e estratégias de enfrentamento." },
      { date: "01/05/2024", notes: "Paciente relatou melhora no humor após iniciar medicação." },
      { date: "24/04/2024", notes: "Focamos em técnicas para melhorar qualidade do sono." },
      { date: "17/04/2024", notes: "Paciente relatou dificuldade em manter rotina diária." }
    ],
    questionnaires: [
      { date: "06/05/2024", type: "Depressão", score: 15, status: "Moderada" },
      { date: "06/04/2024", type: "Depressão", score: 20, status: "Moderada a Severa" },
      { date: "06/03/2024", type: "Depressão", score: 22, status: "Moderada a Severa" }
    ]
  },
  { 
    id: 4, 
    name: "João Ferreira", 
    email: "joao.ferreira@email.com", 
    phone: "(41) 96543-2109", 
    birthdate: "18/05/1982",
    occupation: "Contador",
    startDate: "20/03/2022",
    lastSession: "07/05/2024",
    nextSession: "14/05/2024",
    status: "Ativo",
    avatar: "/avatars/joao.jpg",
    code: "PSI-78901",
    notes: "Paciente há 2 anos, boa evolução",
    sessions: [
      { date: "07/05/2024", notes: "Revisamos progresso dos últimos meses. Paciente demonstra estabilidade." },
      { date: "30/04/2024", notes: "Continuamos trabalho em estratégias para gestão de estresse." },
      { date: "23/04/2024", notes: "Paciente relatou situação de estresse no ambiente familiar." }
    ],
    questionnaires: [
      { date: "02/05/2024", type: "Ansiedade", score: 8, status: "Leve" },
      { date: "02/04/2024", type: "Ansiedade", score: 10, status: "Leve" },
      { date: "02/03/2024", type: "Ansiedade", score: 14, status: "Moderada" }
    ]
  },
  { 
    id: 5, 
    name: "Paula Martins", 
    email: "paula.martins@email.com", 
    phone: "(51) 95432-1098", 
    birthdate: "30/12/1975",
    occupation: "Médica",
    startDate: "15/02/2024",
    lastSession: "06/05/2024",
    nextSession: "13/05/2024",
    status: "Ativo",
    avatar: "/avatars/paula.jpg",
    code: "PSI-89012",
    notes: "Terapia familiar, junto com filhos",
    sessions: [
      { date: "06/05/2024", notes: "Sessão com a mãe e os dois filhos. Trabalhamos comunicação familiar." },
      { date: "29/04/2024", notes: "Sessão individual com a mãe. Discutimos estratégias parentais." },
      { date: "22/04/2024", notes: "Primeira sessão com os filhos presentes. Estabelecemos dinâmica." }
    ],
    questionnaires: [
      { date: "04/05/2024", type: "Relações Familiares", score: 65, status: "Moderado" },
      { date: "04/04/2024", type: "Relações Familiares", score: 55, status: "Moderado" }
    ]
  }
]

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = Number(params.id)
  
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [copied, setCopied] = useState(false)
  
  // Buscar dados do paciente com base no ID
  useEffect(() => {
    // Em um cenário real, isso seria uma chamada API
    const fetchPatient = () => {
      setLoading(true)
      
      // Simulando um atraso de rede
      setTimeout(() => {
        const foundPatient = patientsData.find(p => p.id === patientId)
        
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
  
  // Função para copiar o código de conexão
  const handleCopyCode = () => {
    if (!patient) return
    
    navigator.clipboard.writeText(patient.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
  
  // Renderização dos dados do paciente
  return (
    <div className="space-y-6">
      {/* Cabeçalho com botão de voltar e informações principais */}
      <div className="flex items-start justify-between">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2" 
            onClick={() => router.push('/pacientes')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para pacientes
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
              {patient.name.charAt(0)}
              {/* Aqui seria a imagem quando disponível */}
              {/* <img src={patient.avatar} alt={patient.name} className="h-full w-full object-cover rounded-full" /> */}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                {patient.name}
                <Button variant="ghost" size="sm" className="ml-2">
                  <Edit className="h-4 w-4" />
                </Button>
              </h1>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Paciente desde {patient.startDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Sessão
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nova Nota
          </Button>
        </div>
      </div>
      
      {/* Abas de conteúdo */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="questionnaires">Questionários</TabsTrigger>
          <TabsTrigger value="notes">Observações</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
        </TabsList>
        
        {/* Aba de Visão Geral */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Informações de Contato */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.phone}</p>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-1">Código de conexão</p>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted p-1 rounded text-sm">{patient.code}</code>
                    <button
                      onClick={handleCopyCode}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Usado para conectar com o aplicativo do paciente
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                    <p className="font-medium">{patient.birthdate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ocupação</p>
                    <p className="font-medium">{patient.occupation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Última Consulta</p>
                    <p className="font-medium">{patient.lastSession}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Próxima Consulta</p>
                    <p className="font-medium">{patient.nextSession}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Resumo de Atividade */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sessões Realizadas</p>
                    <p className="font-medium text-lg">{patient.sessions.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Questionários</p>
                    <p className="font-medium text-lg">{patient.questionnaires.length}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Anotações Recentes</h4>
                  <p className="text-sm">{patient.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Gráfico fictício de evolução */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Recente</CardTitle>
              <CardDescription>Baseado em questionários e observações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md">
                <div className="text-center space-y-2">
                  <FileText className="h-10 w-10 mx-auto text-primary/50" />
                  <p>Gráficos de evolução aparecerão aqui</p>
                  <p className="text-sm">Dados baseados em respostas dos questionários</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba de Sessões */}
        <TabsContent value="sessions" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Histórico de Sessões</CardTitle>
                <CardDescription>
                  Registro de todas as sessões realizadas com {patient.name}
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Registrar Sessão
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patient.sessions.map((session: any, index: number) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{session.date}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                    </div>
                    <p className="text-sm">{session.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba de Questionários */}
        <TabsContent value="questionnaires" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Questionários Respondidos</CardTitle>
                <CardDescription>
                  Resultados dos questionários preenchidos pelo paciente
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Solicitar Questionário
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Pontuação</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.questionnaires.map((questionnaire: any, index: number) => (
                      <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">{questionnaire.date}</td>
                        <td className="p-4 align-middle">{questionnaire.type}</td>
                        <td className="p-4 align-middle">{questionnaire.score}</td>
                        <td className="p-4 align-middle">
                          <span 
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              questionnaire.status.includes("Severa") 
                                ? "bg-red-100 text-red-800" 
                                : questionnaire.status.includes("Moderada") 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {questionnaire.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba de Observações */}
        <TabsContent value="notes" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Observações Clínicas</CardTitle>
                <CardDescription>
                  Anotações e observações sobre o paciente
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Observação
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Avaliação Inicial</h4>
                      <p className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {patient.startDate}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                  <p className="text-sm">{patient.notes}</p>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <p>Adicione mais observações clínicas para este paciente.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba de Progresso */}
        <TabsContent value="progress" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Acompanhamento de Progresso</CardTitle>
              <CardDescription>
                Visualização gráfica da evolução do paciente ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md">
                  <div className="text-center space-y-2">
                    <FileText className="h-10 w-10 mx-auto text-primary/50" />
                    <p>Gráfico de evolução de ansiedade</p>
                    <p className="text-sm">Baseado nas pontuações dos questionários</p>
                  </div>
                </div>
                
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md">
                  <div className="text-center space-y-2">
                    <FileText className="h-10 w-10 mx-auto text-primary/50" />
                    <p>Gráfico de humor auto-reportado</p>
                    <p className="text-sm">Baseado nos relatos diários do paciente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 