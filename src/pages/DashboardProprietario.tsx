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
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useReservations } from "@/context/ReservationContext";
import { useAuth } from "@/context/AuthContext";

const DashboardProprietario = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { reservations, payments } = useReservations();

  // Filtrar reservas das propriedades do proprietário
  const proprietarioReservas = reservations.filter(r => r.userId === user?.id || r.userId === '2'); // Incluindo reservas do proprietário
  const proprietarioReceitas = payments.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.amount, 0);

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

  const handleViewReservation = (reserva: typeof proprietarioReservas[0]) => {
    toast({
      title: "Detalhes da Reserva",
      description: `${reserva.clientName} - ${reserva.propertyName} - R$ ${reserva.totalAmount.toLocaleString()}`,
    });
    console.log('Visualizando reserva:', reserva);
  };

  const handleViewAllReservations = () => {
    navigate('/proprietario/reservas');
    toast({
      title: "Carregando todas as reservas",
      description: "Redirecionando para a página de reservas...",
    });
  };

  const handleNewProperty = () => {
    navigate('/proprietario/propriedades');
    toast({
      title: "Nova Propriedade",
      description: "Redirecionando para cadastro de propriedades...",
    });
  };

  const handlePendingReservations = () => {
    navigate('/proprietario/reservas');
    toast({
      title: "Reservas Pendentes",
      description: "Visualizando reservas que aguardam confirmação...",
    });
  };

  const handleReports = () => {
    navigate('/relatorios');
    toast({
      title: "Relatórios",
      description: "Abrindo página de relatórios...",
    });
  };

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
              <p className="text-3xl font-bold">R$ {proprietarioReceitas.toLocaleString()}</p>
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
            value={proprietarioReservas.length.toString()}
            icon={Calendar}
            trend="+15% vs mês anterior"
            trendUp={true}
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Receita Mensal"
            value={`R$ ${(proprietarioReceitas / 1000).toFixed(1)}K`}
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
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  navigate('/proprietario/propriedades');
                  toast({
                    title: "Nova Propriedade",
                    description: "Redirecionando para cadastro de propriedades...",
                  });
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Reservas Pendentes</h3>
                <p className="text-sm text-gray-600">{proprietarioReservas.filter(r => r.status === 'pendente').length} aguardando confirmação</p>
              </div>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  navigate('/proprietario/reservas');
                  toast({
                    title: "Reservas Pendentes",
                    description: "Visualizando reservas que aguardam confirmação...",
                  });
                }}
              >
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
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  navigate('/relatorios');
                  toast({
                    title: "Relatórios",
                    description: "Abrindo página de relatórios...",
                  });
                }}
              >
                <TrendingUp className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Reservations - Mostrando TODAS as reservas incluindo de visitantes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Todas as Reservas</h2>
            <Button 
              variant="outline"
              onClick={() => {
                navigate('/proprietario/reservas');
                toast({
                  title: "Carregando todas as reservas",
                  description: "Redirecionando para a página de reservas...",
                });
              }}
            >
              Ver todas
            </Button>
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
                  {proprietarioReservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reserva.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reserva.propertyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reserva.checkIn).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reserva.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        R$ {reserva.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(reserva.status)}>
                          {reserva.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Detalhes da Reserva",
                              description: `${reserva.clientName} - ${reserva.propertyName} - R$ ${reserva.totalAmount.toLocaleString()}`,
                            });
                            console.log('Visualizando reserva:', reserva);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
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
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      navigate('/proprietario/propriedades');
                      toast({
                        title: "Editando Propriedade",
                        description: `Abrindo edição de ${chacara.nome}`,
                      });
                    }}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      navigate('/relatorios');
                      toast({
                        title: "Relatório da Propriedade",
                        description: `Gerando relatório de ${chacara.nome}`,
                      });
                    }}
                  >
                    Relatório
                  </Button>
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
