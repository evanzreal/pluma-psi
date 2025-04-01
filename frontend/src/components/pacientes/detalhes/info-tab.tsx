import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X } from "lucide-react"
import { useState } from "react"

interface PatientDetails {
  id: number
  name: string
  email: string
  phone: string
  birthdate: string
  occupation: string
  startDate: string
  lastSession: string
  nextSession: string
  avatar?: string
  code: string
  notes: string
}

interface InfoTabProps {
  patient: PatientDetails
  onSave?: (updatedPatient: PatientDetails) => void
}

export function InfoTab({ patient, onSave }: InfoTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<PatientDetails>(patient)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSave = () => {
    onSave?.(formData)
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setFormData(patient)
    setIsEditing(false)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={patient.avatar || ""} />
            <AvatarFallback className="text-2xl">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">Código: {patient.code}</p>
            <p className="text-sm text-muted-foreground">Início: {patient.startDate}</p>
          </div>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        ) : (
          <div className="space-x-2">
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              {isEditing ? (
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              {isEditing ? (
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Data de Nascimento</Label>
              {isEditing ? (
                <Input 
                  id="birthdate" 
                  name="birthdate" 
                  value={formData.birthdate} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.birthdate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Profissão</Label>
              {isEditing ? (
                <Input 
                  id="occupation" 
                  name="occupation" 
                  value={formData.occupation} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.occupation}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              {isEditing ? (
                <Input 
                  id="startDate" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.startDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastSession">Última Sessão</Label>
              {isEditing ? (
                <Input 
                  id="lastSession" 
                  name="lastSession" 
                  value={formData.lastSession} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.lastSession}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextSession">Próxima Sessão</Label>
              {isEditing ? (
                <Input 
                  id="nextSession" 
                  name="nextSession" 
                  value={formData.nextSession} 
                  onChange={handleChange} 
                />
              ) : (
                <p>{patient.nextSession}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Código de Conexão</Label>
              <p>{patient.code}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Anotações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                className="min-h-[120px]"
              />
            ) : (
              <p className="whitespace-pre-line">{patient.notes}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 