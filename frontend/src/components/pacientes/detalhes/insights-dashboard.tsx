import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingDown, TrendingUp, FileText, AlertCircle, CheckCircle, Clock, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"

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
  // Agrupar questionários por tipo para análise
  const groupedByType = patient.questionnaires.reduce((acc, q) => {
    if (!acc[q.type]) acc[q.type] = []
    acc[q.type].push(q)
    return acc
  }, {} as Record<string, typeof patient.questionnaires>)
  
  // Identificar tendências (simulação simplificada)
  const getTrend = (questionnaires: typeof patient.questionnaires) => {
    if (questionnaires.length < 2) return 'neutral'
    
    // Ordenar por data (mais recente primeiro)
    const sortedQuest = [...questionnaires].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      return new Date(yearB, monthB-1, dayB).getTime() - new Date(yearA, monthA-1, dayA).getTime()
    })
    
    // Comparar último com penúltimo
    const latest = sortedQuest[0].score
    const previous = sortedQuest[1].score
    
    if (latest < previous) return 'improving'
    if (latest > previous) return 'worsening'
    return 'stable'
  }
  
  // Obter dados de gráfico formatados para cada tipo
  const getChartData = (type: string, questionnaires: typeof patient.questionnaires) => {
    const sortedData = [...questionnaires].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      return new Date(yearA, monthA-1, dayA).getTime() - new Date(yearB, monthB-1, dayB).getTime()
    })
    
    // Retornar dados formatados para o gráfico
    return sortedData.map(q => ({
      data: q.date.split('/').slice(0, 2).join('/'),
      valor: q.score,
      status: q.status
    }))
  }
  
  // Obter configurações de gráfico para cada tipo
  const getChartConfig = (type: string): ChartConfig => {
    return {
      valor: {
        label: type,
        color: "var(--chart-1)"
      }
    }
  }
  
  // Calcular porcentagem de melhora ou piora
  const calculateTrendPercentage = (questionnaires: typeof patient.questionnaires) => {
    if (questionnaires.length < 2) return { value: 0, trend: 'neutral' }
    
    const sortedQuest = [...questionnaires].sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      return new Date(yearB, monthB-1, dayB).getTime() - new Date(yearA, monthA-1, dayA).getTime()
    })
    
    const latest = sortedQuest[0].score
    const previous = sortedQuest[1].score
    
    // No caso de ansiedade/depressão, um score mais baixo é melhor
    const percentChange = Math.round(((previous - latest) / previous) * 100)
    
    return {
      value: Math.abs(percentChange),
      trend: percentChange > 0 ? 'improving' : percentChange < 0 ? 'worsening' : 'stable'
    }
  }
  
  // Preparar dados para gráfico na visualização principal
  const prepareSummaryChartData = () => {
    const results: any[] = []
    const types = Object.keys(groupedByType)
    
    // Para cada tipo de questionário, pegar a data e score mais recente
    types.forEach(type => {
      const sortedQuest = [...groupedByType[type]].sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number)
        const [dayB, monthB, yearB] = b.date.split('/').map(Number)
        return new Date(yearB, monthB-1, dayB).getTime() - new Date(yearA, monthA-1, dayA).getTime()
      })
      
      if (sortedQuest.length > 0) {
        results.push({
          name: type,
          valor: sortedQuest[0].score,
          fill: `var(--chart-${results.length + 1 <= 5 ? results.length + 1 : 1})`
        })
      }
    })
    
    return results
  }
  
  const summaryChartConfig: ChartConfig = Object.keys(groupedByType).reduce((acc, type, index) => {
    acc[type.toLowerCase().replace(/\s+/g, '_')] = {
      label: type,
      color: `var(--chart-${index + 1 <= 5 ? index + 1 : 1})`
    }
    return acc
  }, {} as ChartConfig)
  
  // Obter dados agregados para mostrar evolução de todos os questionários ao longo do tempo
  const getAggregatedTimelineData = () => {
    // Recolhe todas as datas únicas de questionários
    let allDates = new Set<string>()
    Object.values(groupedByType).forEach(questionnaires => {
      questionnaires.forEach(q => allDates.add(q.date))
    })
    
    // Ordena datas cronologicamente
    const sortedDates = Array.from(allDates).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/').map(Number)
      const [dayB, monthB, yearB] = b.split('/').map(Number)
      return new Date(yearA, monthA-1, dayA).getTime() - new Date(yearB, monthB-1, dayB).getTime()
    })
    
    // Cria dados agregados para cada data
    return sortedDates.map(date => {
      const dataPoint: any = { data: date.split('/').slice(0, 2).join('/') }
      
      Object.entries(groupedByType).forEach(([type, questionnaires]) => {
        const matchingQuestionnaire = questionnaires.find(q => q.date === date)
        if (matchingQuestionnaire) {
          const safeKey = type.toLowerCase().replace(/\s+/g, '_')
          dataPoint[safeKey] = matchingQuestionnaire.score
        }
      })
      
      return dataPoint
    })
  }
  
  const timelineConfig = Object.keys(groupedByType).reduce((acc, type, index) => {
    const safeKey = type.toLowerCase().replace(/\s+/g, '_')
    acc[safeKey] = {
      label: type,
      color: `var(--chart-${index + 1 <= 5 ? index + 1 : 1})`
    }
    return acc
  }, {} as ChartConfig)
  
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
      
      {/* Resumo agregado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Visão geral</CardTitle>
            <CardDescription>
              Pontuações mais recentes por instrumento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={summaryChartConfig} 
                className="w-full h-full"
              >
                <BarChart 
                  data={prepareSummaryChartData()} 
                  barCategoryGap={16}
                  margin={{ top: 10, right: 10, left: 0, bottom: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tickMargin={8}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.length > 10 ? `${value.slice(0, 8)}...` : value}
                  />
                  <YAxis axisLine={false} tickLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend 
                    content={<ChartLegendContent />} 
                  />
                  <Bar 
                    dataKey="valor" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Evolução no tempo</CardTitle>
            <CardDescription>
              Tendências dos instrumentos clínicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={timelineConfig} 
                className="w-full h-full"
              >
                <LineChart
                  data={getAggregatedTimelineData()}
                  margin={{ top: 10, right: 10, left: 0, bottom: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="data" 
                    axisLine={false} 
                    tickLine={false} 
                    tickMargin={8}
                  />
                  <YAxis axisLine={false} tickLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  
                  {Object.keys(groupedByType).map((type, index) => {
                    const safeKey = type.toLowerCase().replace(/\s+/g, '_')
                    return (
                      <Line
                        key={type}
                        type="monotone"
                        dataKey={safeKey}
                        activeDot={{ r: 6 }}
                        stroke={`var(--chart-${index + 1 <= 5 ? index + 1 : 1})`}
                        strokeWidth={2}
                      />
                    )
                  })}
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Visualização detalhada dos dados */}
      <Tabs defaultValue={Object.keys(groupedByType)[0] || "default"} className="mt-8">
        <TabsList className="w-full mb-4 bg-slate-50">
          {Object.keys(groupedByType).map((type) => (
            <TabsTrigger key={type} value={type} className="data-[state=active]:shadow-sm">{type}</TabsTrigger>
          ))}
          {Object.keys(groupedByType).length === 0 && (
            <TabsTrigger value="default">Sem dados</TabsTrigger>
          )}
        </TabsList>
        
        {Object.entries(groupedByType).map(([type, questionnaires]) => {
          const trendData = calculateTrendPercentage(questionnaires)
          const chartConfig = getChartConfig(type)
          
          return (
            <TabsContent key={type} value={type} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="border-none shadow-sm lg:col-span-2">
                  <CardHeader className="bg-slate-50 bg-opacity-50">
                    <CardTitle className="flex items-center justify-between">
                      <span>Evolução de {type}</span>
                      <div className="flex items-center gap-1 text-sm font-normal">
                        {trendData.trend === 'improving' && (
                          <>
                            <TrendingDown className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-600">Melhora de {trendData.value}%</span>
                          </>
                        )}
                        {trendData.trend === 'worsening' && (
                          <>
                            <TrendingUp className="h-4 w-4 text-rose-500" />
                            <span className="text-rose-600">Piora de {trendData.value}%</span>
                          </>
                        )}
                        {trendData.trend === 'neutral' && (
                          <>
                            <BarChart3 className="h-4 w-4 text-amber-500" />
                            <span className="text-amber-600">Estável</span>
                          </>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Visualização da evolução ao longo do tempo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-64">
                      <ChartContainer 
                        config={chartConfig} 
                        className="w-full h-full"
                      >
                        <AreaChart
                          data={getChartData(type, questionnaires)}
                          margin={{ top: 10, right: 10, left: 0, bottom: 24 }}
                        >
                          <defs>
                            <linearGradient id={`color-${type}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis 
                            dataKey="data" 
                            axisLine={false} 
                            tickLine={false} 
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            domain={[0, 'dataMax + 5']}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent />} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="valor" 
                            stroke="var(--chart-1)" 
                            fillOpacity={1} 
                            fill={`url(#color-${type})`} 
                          />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm">
                  <CardHeader className="bg-slate-50 bg-opacity-50">
                    <CardTitle>Proporção de Resultados</CardTitle>
                    <CardDescription>
                      Distribuição por severidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ChartContainer 
                        config={{
                          leve: { label: "Leve", color: "var(--chart-3)" },
                          moderada: { label: "Moderada", color: "var(--chart-4)" },
                          severa: { label: "Severa", color: "var(--chart-5)" }
                        }} 
                        className="w-full h-full"
                      >
                        <PieChart>
                          <Pie
                            data={(() => {
                              // Agrupar por severidade
                              const counts: Record<string, number> = {}
                              questionnaires.forEach(q => {
                                let category = "leve"
                                if (q.status.includes("Severa")) category = "severa"
                                else if (q.status.includes("Moderada")) category = "moderada"
                                
                                counts[category] = (counts[category] || 0) + 1
                              })
                              
                              return [
                                { name: "Leve", value: counts.leve || 0, fill: "var(--chart-3)" },
                                { name: "Moderada", value: counts.moderada || 0, fill: "var(--chart-4)" },
                                { name: "Severa", value: counts.severa || 0, fill: "var(--chart-5)" }
                              ].filter(item => item.value > 0)
                            })()}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            label
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-none shadow-sm">
                <CardHeader className="bg-slate-50 bg-opacity-50">
                  <CardTitle>Resultados Detalhados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="h-12 px-4 text-left font-medium text-slate-500">Data</th>
                          <th className="h-12 px-4 text-left font-medium text-slate-500">Pontuação</th>
                          <th className="h-12 px-4 text-left font-medium text-slate-500">Status</th>
                          <th className="h-12 px-4 text-left font-medium text-slate-500">Variação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...questionnaires]
                          .sort((a, b) => {
                            const [dayA, monthA, yearA] = a.date.split('/').map(Number)
                            const [dayB, monthB, yearB] = b.date.split('/').map(Number)
                            return new Date(yearB, monthB-1, dayB).getTime() - new Date(yearA, monthA-1, dayA).getTime()
                          })
                          .map((q, index, arr) => {
                            const prevScore = index < arr.length - 1 ? arr[index + 1].score : q.score
                            const variation = q.score - prevScore
                            return (
                              <tr key={index} className="border-b hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-slate-700">{q.date}</td>
                                <td className="p-4 text-slate-700">{q.score}</td>
                                <td className="p-4">
                                  <span 
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      q.status.includes("Severa") 
                                        ? "bg-rose-50 text-rose-800" 
                                        : q.status.includes("Moderada") 
                                          ? "bg-amber-50 text-amber-800" 
                                          : "bg-green-50 text-green-800"
                                    }`}
                                  >
                                    {q.status}
                                  </span>
                                </td>
                                <td className="p-4">
                                  {index < arr.length - 1 && (
                                    <span className={`flex items-center ${
                                      variation < 0 ? "text-emerald-600" : 
                                      variation > 0 ? "text-rose-600" : 
                                      "text-slate-500"
                                    }`}>
                                      {variation < 0 && <TrendingDown className="h-4 w-4 mr-1" />}
                                      {variation > 0 && <TrendingUp className="h-4 w-4 mr-1" />}
                                      {variation === 0 && <span className="text-slate-400 mr-1">—</span>}
                                      {variation !== 0 && Math.abs(variation)}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
        
        {Object.keys(groupedByType).length === 0 && (
          <TabsContent value="default">
            <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-16 w-16 text-slate-300 mb-6" />
                <p className="text-slate-500 text-center text-lg">
                  Nenhum dado de questionário disponível para este paciente.
                  <br />
                  <span className="text-sm">
                    Aplique questionários para visualizar insights.
                  </span>
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
} 