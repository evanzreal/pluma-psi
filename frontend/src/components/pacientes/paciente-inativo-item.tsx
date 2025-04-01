'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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
  const [useGeneratedAvatar, setUseGeneratedAvatar] = useState(!paciente.avatar)
  
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
  
  // Gerar URL do avatar baseado no nome do paciente
  const getAvatarUrl = () => {
    const name = encodeURIComponent(paciente.name);
    // Usando cores que combinam com o design da aplicação para pacientes inativos
    const backgroundColor = '9CA3AF'; // Cinza
    const foregroundColor = 'FFFFFF'; // Branco
    return `https://ui-avatars.com/api/?name=${name}&background=${backgroundColor}&color=${foregroundColor}&size=200`;
  };

  // Verificar se o avatar existe quando o componente montar
  useEffect(() => {
    // Se não tiver avatar, use o gerado
    if (!paciente.avatar) {
      setUseGeneratedAvatar(true);
      return;
    }

    // Se tiver avatar, verifique se a URL é válida
    // Se for uma URL relativa simples (começando com /avatars), considere inválida
    if (paciente.avatar.startsWith('/avatars/') || paciente.avatar.startsWith('avatars/')) {
      setUseGeneratedAvatar(true);
      return;
    }

    // Para outros casos, sempre use o avatar gerado para evitar problemas
    setUseGeneratedAvatar(true);
  }, [paciente.avatar]);

  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <img
            src={useGeneratedAvatar ? getAvatarUrl() : paciente.avatar}
            alt={paciente.name}
            className="h-full w-full object-cover"
            onError={() => setUseGeneratedAvatar(true)}
          />
        </div>
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