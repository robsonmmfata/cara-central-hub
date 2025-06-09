
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  TreePine, 
  DollarSign, 
  TrendingUp, 
  UserCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  ArrowRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAppData } from "@/context/AppDataContext";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { 
    users, 
    properties, 
    transactions, 
    getTotalRevenue, 
    getRecentUsers, 
    getRecentTransactions 
  } = useAppData();

  // Dados para gráficos
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Fev', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Abr', revenue: 22000 },
    { month: 'Mai', revenue: 25000 },
    { month: 'Jun', revenue: getTotalRevenue() },
  ];

  const propertyStatusData = [
    { name: 'Aprovadas', value: properties.filter(p => p.status === 'aprovada').length, color: '#10B981' },
    { name: 'Pendentes', value: properties.filter(p => p.status === 'pendente').length, color: '#F59E0B' },
    { name: 'Rejeitadas', value: properties.filter(p => p.status === 'rejeitada').length, color: '#EF4444' },
  ];

  const recentUsers = getRecentUsers(5);
  const recentTransactions = getRecentTransactions(5);
  const totalRevenue = getTotalRevenue();
  const approvedProperties = properties.filter(p => p.status === 'aprovada').length;
  const pendingProperties = properties.filter(p => p.status === 'pendente').length;
  const activeUsers = users.filter(u => u.status === 'ativo').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": case "aprovada": case "pago": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "inativo": case "rejeitada": case "cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600 mt-1">Visão geral completa da plataforma</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{users.length}</p>
                <p className="text-sm text-blue-600">Total Usuários</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-xl">
                <TreePine className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">{properties.length}</p>
                <p className="text-sm text-green-600">Propriedades</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-700">R$ {totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-yellow-600">Receita Total</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">{transactions.length}</p>
                <p className="text-sm text-purple-600">Transações</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Receita Mensal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Receita']} />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Status das Propriedades</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propertyStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Usuários Recentes</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/usuarios')}
              >
                Ver Todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{user.nome}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{user.dataCadastro}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Transações Recentes</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin/receitas')}
              >
                Ver Todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.propriedade}</p>
                    <p className="text-sm text-gray-600">{transaction.proprietario}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R$ {transaction.valor.toLocaleString()}</p>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/usuarios')}>
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Gerenciar Usuários</h3>
            <p className="text-gray-600 text-sm">Visualize e gerencie todos os usuários da plataforma</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/propriedades')}>
            <TreePine className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Aprovar Propriedades</h3>
            <p className="text-gray-600 text-sm">Revise e aprove novas propriedades cadastradas</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/receitas')}>
            <DollarSign className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Controle Financeiro</h3>
            <p className="text-gray-600 text-sm">Acompanhe receitas e transações financeiras</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
