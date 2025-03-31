import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PacientesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Pacientes</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>Gerencie seus pacientes ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Nome</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Telefone</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">Ana Silva</td>
                  <td className="p-4 align-middle">ana.silva@email.com</td>
                  <td className="p-4 align-middle">(11) 98765-4321</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Editar</button>
                      <button className="text-red-600 hover:text-red-800">Excluir</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">Carlos Oliveira</td>
                  <td className="p-4 align-middle">carlos.oliveira@email.com</td>
                  <td className="p-4 align-middle">(21) 99876-5432</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Editar</button>
                      <button className="text-red-600 hover:text-red-800">Excluir</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 