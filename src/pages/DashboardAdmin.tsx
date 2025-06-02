
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Home, 
  DollarSign, 
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Eye,
  Edit,
  Check,
  X
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockUsuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    tipo: "Proprietário",
    status: "ativo",
    ultimoLogin: "Hoje"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    tipo: "Visitante",
    status: "ativo",
    ultimoLogin: "Ontem"
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    tipo: "Proprietário",
    status: "pendente",
    ultimoLogin: "2 dias atrás"
  }
];

const mockChacaras = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    proprietario: "João Silva",
    status: "aprovada",
    reservas: 12,
    receita: "R$ 4.200,00"
  },
  {
    id: 2,
    nome: "Sítio do Sol",
    proprietario: "Ana Costa",
    status: "pendente",
    reservas: 0,
    receita: "R$ 0,00"
  },
  {
    id: 3,
    nome: "Chácara Recanto Feliz",
    proprietario: "Pedro Lima",
    status: "aprovada",
    reservas: 8,
    receita: "R$ 3.360,00"
  }
];

const DashboardAdmin = () => {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [chacaras, setChacaras] = useState(mockChacaras);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
      case "aprovada":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "inativo":
      case "rejeitada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUserAction = (userId: number, action: string) => {
    const usuario = usuarios.find(u => u.id === userId);
    console.log(`Ação "${action}" executada para usuário:`, usuario);
    
    toast({
      title: `${action} executado`,
      description: `Ação realizada para ${usuario?.nome}`,
    });
  };

  const handlePropertyAction = (propertyId: number, action: string) => {
    const chacara = chacaras.find(c => c.id === propertyId);
    
    if (action === 'aprovar') {
      setChacaras(prev => prev.map(c => 
        c.id === propertyId ? { ...c, status: 'aprovada' } : c
      ));
      toast({
        title: "Propriedade aprovada!",
        description: `${chacara?.nome} foi aprovada com sucesso.`,
      });
    } else {
      console.log(`Ação "${action}" executada para propriedade:`, chacara);
      toast({
        title: `${action} executado`,
        description: `Ação realizada para ${chacara?.nome}`,
      });
    }
  };

  const handleAdminAction = (action: string) => {
    console.log(`Ação administrativa: ${action}`);
    
    switch (action) {
      case 'moderacao':
        toast({
          title: "Moderação",
          description: "Abrindo painel de moderação...",
        });
        break;
      case 'relatorios':
        toast({
          title: "Relatórios",
          description: "Abrindo relatórios administrativos...",
        });
        break;
      case 'analytics':
        toast({
          title: "Analytics",
          description: "Abrindo painel de métricas...",
        });
        break;
      case 'configuracoes':
        toast({
          title: "Configurações",
          description: "Abrindo configurações do sistema...",
        });
        break;
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
              <p className="text-purple-100 text-lg">Controle total da plataforma Chácara+</p>
            </div>
            <div className="text-right">
              <p className="text-purple-200 text-sm">Taxa da plataforma</p>
              <p className="text-3xl font-bold">R$ 2.850,00</p>
              <p className="text-purple-100 text-sm">Este mês</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Usuários"
            value="1,247"
            icon={Users}
            trend="+23 novos hoje"
            trendUp={true}
            bgColor="bg-purple-50"
            iconColor="text-purple-500"
          />
          <StatsCard
            title="Propriedades Ativas"
            value="89"
            icon={Home}
            trend="+5 este mês"
            trendUp={true}
            bgColor="bg-green-50"
            iconColor="text-green-500"
          />
          <StatsCard
            title="Receita Total"
            value="R$ 125K"
            icon={DollarSign}
            trend="+18% vs mês anterior"
            trendUp={true}
            bgColor="bg-green-50"
            iconColor="text-green-500"
          />
          <StatsCard
            title="Taxa Crescimento"
            value="12.5%"
            icon={TrendingUp}
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card 
            className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAdminAction('moderacao')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Moderação</h3>
                <p className="text-sm text-gray-600">5 itens pendentes</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAdminAction('relatorios')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Relatórios</h3>
                <p className="text-sm text-gray-600">3 novos relatórios</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAdminAction('analytics')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Analytics</h3>
                <p className="text-sm text-gray-600">Ver métricas</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAdminAction('configuracoes')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-500 rounded-xl">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Configurações</h3>
                <p className="text-sm text-gray-600">Sistema</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Users */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Usuários Recentes</h2>
            <Button variant="outline" onClick={() => toast({ title: "Ver todos", description: "Abrindo lista completa de usuários..." })}>
              Ver todos
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {usuario.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usuario.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usuario.tipo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(usuario.status)}>
                          {usuario.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usuario.ultimoLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(usuario.id, 'Ver')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(usuario.id, 'Editar')}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Properties Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Gestão de Propriedades</h2>
            <Button variant="outline" onClick={() => toast({ title: "Ver todas", description: "Abrindo lista completa de propriedades..." })}>
              Ver todas
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proprietário</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receita</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chacaras.map((chacara) => (
                    <tr key={chacara.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {chacara.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chacara.proprietario}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(chacara.status)}>
                          {chacara.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chacara.reservas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {chacara.receita}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePropertyAction(chacara.id, 'Ver')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        {chacara.status === 'pendente' ? (
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handlePropertyAction(chacara.id, 'aprovar')}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Aprovar
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePropertyAction(chacara.id, 'Editar')}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Status do Sistema</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Todos os serviços operacionais</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Uptime: 99.8%</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Tempo médio de resposta</p>
            <p className="text-2xl font-bold text-blue-600">142ms</p>
            <p className="text-xs text-green-500">-15% vs semana passada</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Suporte</h3>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Tickets pendentes</p>
            <p className="text-2xl font-bold text-orange-600">7</p>
            <p className="text-xs text-gray-500">Tempo médio: 2h</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
