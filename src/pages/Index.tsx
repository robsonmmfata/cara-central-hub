
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { ClientCard } from "@/components/ClientCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus,
  Clock,
  Star,
  AlertCircle
} from "lucide-react";

const mockClients = [
  {
    id: '1',
    name: 'João Ribeiro',
    phone: '(11) 91234-5678',
    reservations: 5,
    totalSpent: 4500,
    status: 'VIP' as const,
  },
  {
    id: '2',
    name: 'Maria Souza',
    phone: '(11) 99888-7766',
    reservations: 3,
    totalSpent: 2700,
    status: 'Regular' as const,
  },
  {
    id: '3',
    name: 'Carlos Silva',
    phone: '(11) 95555-3322',
    reservations: 2,
    totalSpent: 1800,
    status: 'Bloqueado' as const,
  },
];

const Index = () => {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-farm-blue-600 to-farm-blue-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Painel de Gestão da Chácara</h1>
              <p className="text-farm-blue-100 text-lg">Sistema de administração e controle de reservas</p>
            </div>
            <div className="text-right">
              <p className="text-farm-blue-200 text-sm">Hoje</p>
              <p className="text-xl font-medium capitalize">{today.split(',')[0]}</p>
              <p className="text-farm-blue-100">{today.split(',')[1]}</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-farm-green-50 to-farm-green-100 border-farm-green-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Painel Geral</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-600 text-lg">Saldo Total:</span>
                <span className="text-4xl font-bold text-farm-green-600">R$ 12.450,00</span>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="border-farm-green-500 text-farm-green-700 bg-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% este mês
              </Badge>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Clientes Ativos"
            value="124"
            icon={Users}
            trend="+12% este mês"
            trendUp={true}
          />
          <StatsCard
            title="Reservas Hoje"
            value="8"
            icon={Calendar}
            bgColor="bg-farm-orange-50"
            iconColor="text-farm-orange-500"
          />
          <StatsCard
            title="Receita Mensal"
            value="R$ 18.5K"
            icon={DollarSign}
            trend="+8% vs mês anterior"
            trendUp={true}
            bgColor="bg-farm-green-50"
            iconColor="text-farm-green-500"
          />
          <StatsCard
            title="Taxa Ocupação"
            value="87%"
            icon={Star}
            bgColor="bg-yellow-50"
            iconColor="text-yellow-500"
          />
        </div>

        {/* Clients Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-farm-blue-700">Clientes</h2>
              <p className="text-gray-600">Visualize, edite e adicione novos clientes.</p>
            </div>
            <Button className="bg-farm-blue-500 hover:bg-farm-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Lista de Clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-farm-blue-50 to-farm-blue-100 border-farm-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-farm-blue-500 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Próximas Reservas</h3>
                <p className="text-sm text-gray-600">3 check-ins hoje</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-farm-orange-50 to-farm-orange-100 border-farm-orange-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-farm-orange-500 rounded-xl">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Tarefas Pendentes</h3>
                <p className="text-sm text-gray-600">5 itens para revisar</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-farm-green-50 to-farm-green-100 border-farm-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-farm-green-500 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Pagamentos</h3>
                <p className="text-sm text-gray-600">2 pendentes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
