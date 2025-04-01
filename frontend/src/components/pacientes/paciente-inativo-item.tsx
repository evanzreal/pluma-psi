'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SmartAvatar } from "@/components/ui/avatar"

// Interface para os dados de paciente inativo
export interface PacienteInativoData {
  id: number
  name: string
  email: string
  phone: string
  lastSession: string
  status: string
  reason: string
  avatar?: string
}

interface PacienteInativoItemProps {
  paciente: PacienteInativoData
  onReactivate?: (id: number) => void
}

export function PacienteInativoItem({ paciente, onReactivate }: PacienteInativoItemProps) {
  const router = useRouter()
  
  // Função para navegar para a página do paciente
  const navigateToPatient = () => {
    router.push(`/pacientes/${paciente.id}`)
  }
  
  // Função para reativar o paciente
  const handleReactivate = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onReactivate) {
      onReactivate(paciente.id)
    }
  }

  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <SmartAvatar 
          name={paciente.name}
          avatarUrl={paciente.avatar}
          className="h-10 w-10"
          backgroundColor="9CA3AF"
          foregroundColor="FFFFFF"
        />
        <div>
          <h3 className="font-semibold">{paciente.name}</h3>
          <p className="text-sm text-muted-foreground">
            Última sessão: {paciente.lastSession} • Razão: {paciente.reason}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={handleReactivate}
        >
          Reativar
        </button>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={navigateToPatient}
        >
          Detalhes
        </button>
      </div>
    </div>
  )
} 