'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Copy, Check, X, Search } from "lucide-react"

// Função para gerar código fictício
const generateFakeCode = () => {
  const prefix = "PSI"
  const numbers = Math.floor(10000 + Math.random() * 90000)
  return `${prefix}-${numbers}`
}

// Dados fictícios dos pacientes ativos
const activePatientsData = [
  { 
    id: 1, 
    name: "Ana Silva", 
    email: "ana.silva@email.com", 
    phone: "(11) 98765-4321", 
    lastSession: "10/05/2024",
    nextSession: "17/05/2024",
    status: "Ativo",
    avatar: "/avatars/ana.jpg",
    code: generateFakeCode(),
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
    avatar: "/avatars/carlos.jpg",
    code: generateFakeCode(),
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
    avatar: "/avatars/maria.jpg",
    code: generateFakeCode(),
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
    avatar: "/avatars/joao.jpg",
    code: generateFakeCode(),
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
    avatar: "/avatars/paula.jpg",
    code: generateFakeCode(),
    notes: "Terapia familiar, junto com filhos"
  },
]

// Dados fictícios dos pacientes inativos
const inactivePatientsData = [
  { 
    id: 6, 
    name: "Roberto Alves", 
    email: "roberto.alves@email.com", 
    phone: "(61) 94321-0987", 
    lastSession: "10/03/2024",
    status: "Inativo",
    reason: "Tratamento concluído",
    avatar: "/avatars/roberto.jpg"
  },
  { 
    id: 7, 
    name: "Fernanda Lima", 
    email: "fernanda.lima@email.com", 
    phone: "(71) 93210-9876", 
    lastSession: "15/02/2024",
    status: "Inativo",
    reason: "Mudou de cidade",
    avatar: "/avatars/fernanda.jpg"
  },
]

export default function PacientesPage() {
  // Estados para controlar o modal e os dados
  const [showModal, setShowModal] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [showCode, setShowCode] = useState<{id: number, show: boolean}>({id: 0, show: false})
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Função para lidar com a cópia do código
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Filtragem de pacientes com base na busca
  const filteredActivePatients = activePatientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Renderização do modal de criação de paciente
  const renderModal = () => {
    if (!showModal) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Adicionar Novo Paciente</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome Completo *</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md" 
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Telefone *</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Observações Iniciais</label>
              <textarea 
                className="w-full p-2 border rounded-md h-24" 
                value={newPatient.notes}
                onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
              />
            </div>
            
            <div className="flex space-x-2 justify-end pt-2">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  // Aqui seria a lógica para adicionar o paciente
                  setShowModal(false)
                  // Resetar o formulário
                  setNewPatient({name: '', email: '', phone: '', notes: ''})
                  // Mostrar mensagem de sucesso
                  alert("Paciente adicionado com sucesso! Código de conexão: " + generateFakeCode())
                }}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                disabled={!newPatient.name || !newPatient.email || !newPatient.phone}
              >
                Adicionar Paciente
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente..." 
              className="pl-10 pr-4 py-2 border rounded-md w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setShowModal(true)} 
            className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Novo Paciente</span>
          </button>
        </div>
      </div>
      
      {/* Seção de pacientes ativos - Visualização em galeria */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Ativos</CardTitle>
          <CardDescription>Pacientes em atendimento regular</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivePatients.map(patient => (
              <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex space-x-3 mb-3">
                  <div className="relative h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary overflow-hidden">
                    {patient.name.charAt(0)}
                    {/* Aqui poderia ser a imagem quando disponível */}
                    {/* <img src={patient.avatar} alt={patient.name} className="h-full w-full object-cover" /> */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Última sessão:</p>
                    <p>{patient.lastSession}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Próxima sessão:</p>
                    <p>{patient.nextSession}</p>
                  </div>
                </div>
                
                <div className="border-t pt-3 flex justify-between items-center">
                  <div>
                    <div 
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => setShowCode({id: patient.id, show: !showCode.show || showCode.id !== patient.id})}
                    >
                      {showCode.id === patient.id && showCode.show ? "Ocultar código" : "Ver código de conexão"}
                    </div>
                    
                    {showCode.id === patient.id && showCode.show && (
                      <div className="mt-2 flex items-center space-x-1">
                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{patient.code}</span>
                        <button 
                          onClick={() => handleCopyCode(patient.code)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredActivePatients.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              {searchQuery 
                ? `Nenhum paciente encontrado para "${searchQuery}"` 
                : "Você ainda não possui pacientes ativos."}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Seção de pacientes inativos */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Inativos</CardTitle>
          <CardDescription>Pacientes que não estão mais em atendimento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {inactivePatientsData.map(patient => (
              <div key={patient.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 overflow-hidden">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Última sessão: {patient.lastSession} • Razão: {patient.reason}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Reativar
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
            
            {inactivePatientsData.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                Você não possui pacientes inativos.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Modal para criar novo paciente */}
      {renderModal()}
    </div>
  )
} 