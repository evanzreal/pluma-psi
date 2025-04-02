import { PacienteData } from "@/components/pacientes/paciente-card"
import { PacienteInativoData } from "@/components/pacientes/paciente-inativo-item"

// Dados fictícios dos pacientes ativos
export const activePatientsData: PacienteData[] = [
  { 
    id: 1, 
    name: "Ana Silva", 
    email: "ana.silva@email.com", 
    phone: "(11) 98765-4321", 
    lastSession: "10/05/2024",
    nextSession: "17/05/2024",
    status: "Ativo",
    code: "PSI-45678",
    notes: "Paciente com ansiedade leve, demonstrando progresso"
  }
]

// Dados fictícios dos pacientes inativos
export const inactivePatientsData: PacienteInativoData[] = []

// Dados expandidos para detalhes do paciente
export const patientDetailsData = [
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
  }
] 