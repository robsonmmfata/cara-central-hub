
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Plus,
  Home,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

const mockReservas = [
  {
    id: 1,
    cliente: "João Silva",
    chacara: "Chácara Vista Verde",
    data: "15/12/2024",
    valor: "R$ 350,00",
    status: "confirmada",
    pessoas: 18
  },
  {
    id: 2,
    cliente: "Maria Santos",
    chacara: "Sítio do Sol",
    data: "20/12/2024",
    valor: "R$ 420,00",
    status: "pendente",
    pessoas: 25
  },
  {
    id: 3,
    cliente: "Carlos Oliveira",
    chacara: "Chácara Vista Verde",
    data: "22/12/2024",
    valor: "R$ 350,00",
    status: "confirmada",
    pessoas: 15
  }
];

const mockChacaras = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    reservasEsteMe: 12,
    receita: "R$ 4.200,00",
    ocupacao: "85%",
    status: "ativa"
  },
  {
    id: 2,
    nome: "Sítio do Sol",
    reservasEsteMe: 8,
    receita: "R$ 2.800,00",
    ocupacao: "67%",
    status: "ativa"
  }
];

const DashboardProprietario = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Painel do Proprietário</h1>
              <p className="text-green-100 text-lg">Gerencie suas propriedades e reservas</p>
            </div>
            <div className="text-right">
              <p className="text-green-200 text-sm">Receita do mês</p>
              <p className="text-3xl font-bold">R$ 7.000,00</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Propriedades Ativas"
            value="2"
            icon={Home}
            bgColor="bg-green-50"
            iconColor="text-green-500"
          />
          <StatsCard
            title="Reservas Este Mês"
            value="20"
            icon={Calendar}
            trend="+15% vs mês anterior"
            trendUp={true}
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Receita Mensal"
            value="R$ 7.0K"
            icon={DollarSign}
            trend="+12% este mês"
            trendUp={true}
            bgColor="bg-green-50"
            iconColor="text-green-500"
          />
          <StatsCard
            title="Taxa Ocupação"
            value="76%"
            icon={TrendingUp}
            bgColor="bg-yellow-50"
            iconColor="text-yellow-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Nova Propriedade</h3>
                <p className="text-sm text-gray-600">Cadastre uma nova chácara</p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Reservas Pendentes</h3>
                <p className="text-sm text-gray-600">3 aguardando confirmação</p>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Clock className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Relatórios</h3>
                <p className="text-sm text-gray-600">Visualizar analytics</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <TrendingUp className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Reservations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Reservas Recentes</h2>
            <Button variant="outline">Ver todas</Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriedade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pessoas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockReservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reserva.cliente}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reserva.chacara}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reserva.data}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reserva.pessoas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {reserva.valor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(reserva.status)}>
                          {reserva.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button size="sm" variant="outline">Ver</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Properties Overview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Minhas Propriedades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockChacaras.map((chacara) => (
              <Card key={chacara.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{chacara.nome}</h3>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {chacara.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{chacara.reservasEsteMe}</p>
                    <p className="text-sm text-gray-600">Reservas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{chacara.receita}</p>
                    <p className="text-sm text-gray-600">Receita</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{chacara.ocupacao}</p>
                    <p className="text-sm text-gray-600">Ocupação</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1">Editar</Button>
                  <Button size="sm" variant="outline" className="flex-1">Relatório</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardProprietario;
