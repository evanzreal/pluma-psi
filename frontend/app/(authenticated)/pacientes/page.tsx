'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { PacienteCard } from "@/components/pacientes/paciente-card"
import { PacienteInativoItem } from "@/components/pacientes/paciente-inativo-item"
import { AdicionarPacienteModal } from "@/components/pacientes/adicionar-paciente-modal"
import { useCodeGenerator } from "@/lib/hooks/useCodeGenerator"
import { activePatientsData, inactivePatientsData } from "@/lib/mock/pacientes-data"

export default function PacientesPage() {
  // Estados para controlar o modal e os dados
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { generateConnectionCode } = useCodeGenerator()
  
  // Filtragem de pacientes com base na busca
  const filteredActivePatients = activePatientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredInactivePatients = inactivePatientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Função para adicionar um novo paciente
  const handleAddPatient = (newPatientData: any) => {
    // Aqui seria a lógica para adicionar o paciente no backend
    const code = generateConnectionCode()
    console.log("Novo paciente:", { ...newPatientData, code })
    alert(`Paciente adicionado com sucesso! Código de conexão: ${code}`)
    setShowModal(false)
  }
  
  // Função para reativar um paciente inativo
  const handleReactivatePatient = (patientId: number) => {
    console.log("Reativando paciente:", patientId)
    // Aqui seria a lógica para reativar o paciente
    alert("Paciente reativado com sucesso!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Buscar paciente..." 
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={() => setShowModal(true)} 
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Novo Paciente</span>
          </Button>
        </div>
      </div>
      
      {/* Seção de pacientes ativos - Visualização em galeria */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Ativos</CardTitle>
          <CardDescription>Pacientes em atendimento regular</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredActivePatients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum paciente encontrado com os critérios de busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActivePatients.map(patient => (
                <PacienteCard 
                  key={patient.id} 
                  paciente={patient}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Seção de pacientes inativos */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Inativos</CardTitle>
          <CardDescription>Pacientes que não estão mais em atendimento regular</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInactivePatients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum paciente inativo encontrado.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredInactivePatients.map(patient => (
                <PacienteInativoItem 
                  key={patient.id} 
                  paciente={patient}
                  onReactivate={() => handleReactivatePatient(patient.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Modal para adicionar novo paciente */}
      <AdicionarPacienteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  )
} 