import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface PatientInsights {
  id: number
  name: string
  questionnaires: {
    date: string
    type: string
    score: number
    status: string
  }[]
}

interface InsightsDashboardProps {
  patient: PatientInsights
  onViewDetails: () => void
}

export function InsightsDashboard({ patient, onViewDetails }: InsightsDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{patient.name}</h2>
          <p className="text-muted-foreground">Dashboard de Insights Clínicos</p>
        </div>
        <Button 
          onClick={onViewDetails}
          className="transition-all hover:shadow-md" 
          variant="outline"
          size="sm"
        >
          Ver Detalhes do Paciente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* Conteúdo simplificado */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
          <CardDescription>Visualize os detalhes clicando no botão acima</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Informações removidas conforme solicitado.</p>
        </CardContent>
      </Card>
    </div>
  )
} 