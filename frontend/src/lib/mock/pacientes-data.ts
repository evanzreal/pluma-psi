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
  },
  { 
    id: 2, 
    name: "Carlos Oliveira", 
    email: "carlos.oliveira@email.com", 
    phone: "(21) 99876-5432", 
    lastSession: "09/05/2024",
    nextSession: "16/05/2024",
    status: "Ativo",
    code: "PSI-56789",
    notes: "Iniciou tratamento recentemente"
  },
  { 
    id: 3, 
    name: "Maria Santos", 
    email: "maria.santos@email.com", 
    phone: "(31) 97654-3210", 
    lastSession: "08/05/2024",
    nextSession: "15/05/2024",
    status: "Ativo",
    code: "PSI-67890",
    notes: "Apresenta sintomas de depressão, em acompanhamento constante"
  },
  { 
    id: 4, 
    name: "João Ferreira", 
    email: "joao.ferreira@email.com", 
    phone: "(41) 96543-2109", 
    lastSession: "07/05/2024",
    nextSession: "14/05/2024",
    status: "Ativo",
    code: "PSI-78901",
    notes: "Paciente há 2 anos, boa evolução"
  },
  { 
    id: 5, 
    name: "Paula Martins", 
    email: "paula.martins@email.com", 
    phone: "(51) 95432-1098", 
    lastSession: "06/05/2024",
    nextSession: "13/05/2024",
    status: "Ativo",
    code: "PSI-89012",
    notes: "Terapia familiar, junto com filhos"
  },
]

// Dados fictícios dos pacientes inativos
export const inactivePatientsData: PacienteInativoData[] = [
  { 
    id: 6, 
    name: "Roberto Alves", 
    email: "roberto.alves@email.com", 
    phone: "(61) 94321-0987", 
    lastSession: "10/03/2024",
    status: "Inativo",
    reason: "Tratamento concluído"
  },
  { 
    id: 7, 
    name: "Fernanda Lima", 
    email: "fernanda.lima@email.com", 
    phone: "(71) 93210-9876", 
    lastSession: "15/02/2024",
    status: "Inativo",
    reason: "Mudou de cidade"
  },
]

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