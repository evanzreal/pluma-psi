'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Copy, Check } from "lucide-react"
import Image from "next/image"

// Definindo a interface para os dados do paciente
export interface PacienteData {
  id: number
  name: string
  email: string
  phone: string
  lastSession: string
  nextSession: string
  status: string
  avatar?: string
  code: string
  notes?: string
}

interface PacienteCardProps {
  paciente: PacienteData
}

export function PacienteCard({ paciente }: PacienteCardProps) {
  const router = useRouter()
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [useGeneratedAvatar, setUseGeneratedAvatar] = useState(!paciente.avatar)
  
  // Função para navegar para a página do paciente
  const navigateToPatient = () => {
    router.push(`/pacientes/${paciente.id}`)
  }
  
  // Função para lidar com a cópia do código
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation() // Impede que o clique propague para o card
    navigator.clipboard.writeText(paciente.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Função para alternar a visibilidade do código
  const toggleCodeVisibility = (e: React.MouseEvent) => {
    e.stopPropagation() // Impede que o clique propague para o card
    setShowCode(prev => !prev)
  }

  // Gerar URL do avatar baseado no nome do paciente
  const getAvatarUrl = () => {
    const name = encodeURIComponent(paciente.name);
    // Usando cores que combinam com o design da aplicação
    const backgroundColor = '4F46E5'; // Azul indigo
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
    <div 
      className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
      onClick={navigateToPatient}
    >
      <div className="flex space-x-3 mb-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <img
            src={useGeneratedAvatar ? getAvatarUrl() : paciente.avatar}
            alt={paciente.name}
            className="h-full w-full object-cover"
            onError={() => setUseGeneratedAvatar(true)}
          />
        </div>
        <div>
          <h3 className="font-semibold text-base">{paciente.name}</h3>
          <p className="text-sm text-muted-foreground">{paciente.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div>
          <p className="text-muted-foreground">Última sessão:</p>
          <p>{paciente.lastSession}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Próxima sessão:</p>
          <p>{paciente.nextSession}</p>
        </div>
      </div>
      
      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <div 
            className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 flex items-center"
            onClick={toggleCodeVisibility}
          >
            {showCode ? "Ocultar código" : "Ver código de conexão"}
          </div>
          
          {showCode && (
            <div className="mt-2 flex items-center space-x-1">
              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{paciente.code}</span>
              <button 
                onClick={handleCopyCode}
                className="text-gray-500 hover:text-gray-700"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
        
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={(e) => {
            e.stopPropagation() // Impede que o clique propague para o card
            navigateToPatient()
          }}
        >
          Detalhes
        </button>
      </div>
    </div>
  )
} 