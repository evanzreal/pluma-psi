import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Bem-vindo ao Pluma PSI</CardTitle>
          <CardDescription>
            Plataforma de gestão para psicólogos e seus pacientes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Faça login ou cadastre-se para começar a usar a plataforma.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
