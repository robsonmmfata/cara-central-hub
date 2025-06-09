
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAppData } from "@/context/AppDataContext";

const AdminReceitas = () => {
  const { transactions } = useAppData();

  // Processar dados das transações para os gráficos
  const processMonthlyData = () => {
    const monthlyData = [];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    
    months.forEach(mes => {
      const transacoesMes = transactions.filter(t => {
        const transactionMonth = new Date(t.data.split('/').reverse().join('-')).getMonth();
        const monthIndex = months.indexOf(mes);
        return transactionMonth === monthIndex && t.status === 'pago';
      });
      
      const receita = transacoesMes.reduce((sum, t) => sum + t.valor, 0);
      const comissao = transacoesMes.reduce((sum, t) => sum + t.comissao, 0);
      
      monthlyData.push({ mes, receita, comissao });
    });
    
    return monthlyData;
  };

  const mockReceitaData = processMonthlyData();
  const receitaTotal = transactions.filter(t => t.status === 'pago').reduce((sum, t) => sum + t.valor, 0);
  const comissaoTotal = transactions.filter(t => t.status === 'pago').reduce((sum, t) => sum + t.comissao, 0);
  const crescimentoMensal = "13.5"; // Simulado

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-500" />
            Receitas e Comissões
          </h1>
          <p className="text-gray-600 mt-1">Acompanhe a receita da plataforma e comissões</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">R$ {receitaTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Receita Total</p>
          </Card>
          <Card className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-blue-600">R$ {comissaoTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Comissões (10%)</p>
          </Card>
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-purple-600">
              R$ {transactions.filter(t => {
                const today = new Date();
                const transactionDate = new Date(t.data.split('/').reverse().join('-'));
                return transactionDate.getMonth() === today.getMonth() && t.status === 'pago';
              }).reduce((sum, t) => sum + t.valor, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Este Mês</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-orange-600">+{crescimentoMensal}%</p>
            <p className="text-sm text-gray-600">Crescimento</p>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Evolução da Receita</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockReceitaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value}`, '']} />
              <Line type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={3} name="Receita Total" />
              <Line type="monotone" dataKey="comissao" stroke="#3b82f6" strokeWidth={3} name="Comissão Plataforma" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Commission Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Comissões por Mês</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockReceitaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value}`, 'Comissão']} />
              <Bar dataKey="comissao" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Transactions */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">Transações Recentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriedade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proprietário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Reserva</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comissão (10%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.slice(-10).reverse().map((transacao) => (
                  <tr key={transacao.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transacao.propriedade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transacao.proprietario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      R$ {transacao.valor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      R$ {transacao.comissao}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transacao.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(transacao.status)}>
                        {transacao.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminReceitas;
