
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, Clock, CheckCircle, Search, Eye, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReservations } from "@/context/ReservationContext";

export function PaymentsManager() {
  const { toast } = useToast();
  const { payments, confirmPayment } = useReservations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<typeof payments[0] | null>(null);

  const filteredPayments = payments.filter(payment =>
    payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPayment = (payment: typeof payments[0]) => {
    setSelectedPayment(payment);
    console.log('Visualizando pagamento:', payment);
  };

  const handleConfirmPayment = (paymentId: string) => {
    confirmPayment(paymentId);
    
    const payment = payments.find(p => p.id === paymentId);
    toast({
      title: "Pagamento confirmado!",
      description: `Pagamento de ${payment?.client} foi confirmado e contabilizado nas receitas.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pendente': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'atrasado': return <Clock className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const totalReceitas = payments.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.amount, 0);
  const totalPendente = payments.filter(p => p.status === 'pendente').reduce((sum, p) => sum + p.amount, 0);
  const totalAtrasado = payments.filter(p => p.status === 'atrasado').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestão de Pagamentos</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">R$ {totalReceitas.toLocaleString()}</p>
              <p className="text-sm text-green-600">Receitas</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-700">R$ {totalPendente.toLocaleString()}</p>
              <p className="text-sm text-yellow-600">Pendentes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">R$ {totalAtrasado.toLocaleString()}</p>
              <p className="text-sm text-red-600">Em Atraso</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{payments.length}</p>
              <p className="text-sm text-blue-600">Total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar pagamentos por cliente ou propriedade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriedade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Método</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    R$ {payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.method || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewPayment(payment)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {payment.status === 'pendente' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleConfirmPayment(payment.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Confirmar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Detalhes do Pagamento</h2>
                <Button variant="outline" size="icon" onClick={() => setSelectedPayment(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cliente</label>
                    <p className="text-lg font-semibold">{selectedPayment.client}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Propriedade</label>
                    <p className="text-lg">{selectedPayment.property}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valor</label>
                    <p className="text-2xl font-bold text-green-600">R$ {selectedPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <Badge className={getStatusColor(selectedPayment.status)}>
                      {selectedPayment.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Vencimento</label>
                    <p>{new Date(selectedPayment.dueDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Método</label>
                    <p>{selectedPayment.method || 'Não informado'}</p>
                  </div>
                </div>
                
                {selectedPayment.paymentDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data do Pagamento</label>
                    <p>{new Date(selectedPayment.paymentDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                {selectedPayment.status === 'pendente' && (
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handleConfirmPayment(selectedPayment.id);
                      setSelectedPayment(null);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Confirmar Pagamento
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  function getStatusColor(status: string) {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'pago': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pendente': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'atrasado': return <Clock className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  }

  const totalReceitas = payments.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.amount, 0);
  const totalPendente = payments.filter(p => p.status === 'pendente').reduce((sum, p) => sum + p.amount, 0);
  const totalAtrasado = payments.filter(p => p.status === 'atrasado').reduce((sum, p) => sum + p.amount, 0);
}
