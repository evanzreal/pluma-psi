import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Edit, Mail, Phone, Calendar, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

interface PacienteInfoProps {
  paciente: {
    id: string
    name: string
    email: string
    phone: string
    status: string
    avatar?: string
    code: string
    lastSession?: string
    nextSession?: string
    notes?: string
    reason?: string
  }
  onEdit: () => void
  onReactivate?: () => void
}

export function PacienteInfoCard({ paciente, onEdit, onReactivate }: PacienteInfoProps) {
  const [isCopying, setIsCopying] = useState(false)
  
  const copyCode = () => {
    navigator.clipboard.writeText(paciente.code)
    setIsCopying(true)
    toast.success("Código copiado para a área de transferência")
    setTimeout(() => setIsCopying(false), 2000)
  }
  
  // Determinar a cor do status
  const getStatusColor = () => {
    if (paciente.status === 'Ativo') return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
    if (paciente.status === 'Inativo') return 'bg-slate-100 text-slate-800 hover:bg-slate-200'
    return 'bg-amber-100 text-amber-800 hover:bg-amber-200'
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="bg-slate-50 bg-opacity-50 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 flex items-center justify-center text-lg font-medium text-indigo-600">
                {paciente.avatar ? (
                  <img 
                    src={paciente.avatar} 
                    alt={paciente.name} 
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  paciente.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                paciente.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'
              }`} />
            </div>
            <div>
              <CardTitle className="text-xl">{paciente.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-1">
                <Badge variant="outline" className={getStatusColor()}>
                  {paciente.status}
                </Badge>
                {paciente.status === 'Inativo' && paciente.reason && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span><AlertTriangle className="h-4 w-4 text-amber-500 ml-1" /></span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Motivo: {paciente.reason}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1 mt-1"
            onClick={onEdit}
          >
            <Edit className="h-3.5 w-3.5" />
            Editar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <a 
                href={`mailto:${paciente.email}`} 
                className="text-sm text-slate-600 hover:text-slate-900 hover:underline"
              >
                {paciente.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              <a 
                href={`tel:${paciente.phone}`} 
                className="text-sm text-slate-600 hover:text-slate-900 hover:underline"
              >
                {paciente.phone}
              </a>
            </div>
          </div>
          
          <div className="space-y-2">
            {paciente.lastSession && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  Última sessão: {paciente.lastSession}
                </span>
              </div>
            )}
            {paciente.nextSession && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  Próxima sessão: {paciente.nextSession}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {paciente.notes && (
          <div className="mt-5 pt-5 border-t">
            <h4 className="text-sm font-medium text-slate-600 mb-2">Observações</h4>
            <p className="text-sm text-slate-600 whitespace-pre-line">{paciente.notes}</p>
          </div>
        )}
        
        <div className={`mt-5 pt-5 border-t ${!paciente.status || paciente.status === 'Ativo' ? 'block' : 'hidden'}`}>
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
            <div>
              <h4 className="text-sm font-medium text-slate-600 mb-1">Código de conexão</h4>
              <p className="text-xs text-slate-500">
                Compartilhe este código com seu paciente para conexão ao aplicativo
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 px-3 py-1.5 rounded-md font-mono text-sm text-indigo-700">
                {paciente.code}
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-slate-500"
                onClick={copyCode}
              >
                {isCopying ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      {paciente.status === 'Inativo' && onReactivate && (
        <CardFooter className="px-6 pb-6 pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1 mt-2"
            onClick={onReactivate}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            Reativar Paciente
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 