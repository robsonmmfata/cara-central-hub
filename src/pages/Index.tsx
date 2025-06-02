
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Plus, Eye, Edit, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { NewClientForm } from "@/components/NewClientForm";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  client: string;
  property: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmada' | 'pendente' | 'cancelada';
  total: number;
}

const Index = () => {
  const { toast } = useToast();
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      client: 'João Silva',
      property: 'Chácara Vista Verde',
      checkIn: '2024-04-15',
      checkOut: '2024-04-17',
      guests: 8,
      status: 'confirmada',
      total: 1200
    },
    {
      id: '2',
      client: 'Maria Santos',
      property: 'Sítio do Sol',
      checkIn: '2024-04-20',
      checkOut: '2024-04-22',
      guests: 6,
      status: 'pendente',
      total: 800
    },
    {
      id: '3',
      client: 'Carlos Oliveira',
      property: 'Chácara Recanto Feliz',
      checkIn: '2024-04-25',
      checkOut: '2024-04-28',
      guests: 12,
      status: 'confirmada',
      total: 1800
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewReservation = (reservation: Reservation) => {
    toast({
      title: "Detalhes da Reserva",
      description: `${reservation.client} - ${reservation.property}`,
    });
    console.log('Visualizando reserva:', reservation);
  };

  const handleEditReservation = (reservation: Reservation) => {
    toast({
      title: "Editar Reserva",
      description: `Editando reserva de ${reservation.client}`,
    });
    console.log('Editando reserva:', reservation);
  };

  const handleConfirmReservation = (reservationId: string) => {
    setReservations(prev => prev.map(reservation => 
      reservation.id === reservationId 
        ? { ...reservation, status: 'confirmada' as const }
        : reservation
    ));
    
    const reservation = reservations.find(r => r.id === reservationId);
    toast({
      title: "Reserva confirmada!",
      description: `Reserva de ${reservation?.client} foi confirmada.`,
    });
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservations(prev => prev.map(reservation => 
      reservation.id === reservationId 
        ? { ...reservation, status: 'cancelada' as const }
        : reservation
    ));
    
    const reservation = reservations.find(r => r.id === reservationId);
    toast({
      title: "Reserva cancelada",
      description: `Reserva de ${reservation?.client} foi cancelada.`,
    });
  };

  const handleNewClientSave = (clientData: any) => {
    console.log('Novo cliente adicionado:', clientData);
    toast({
      title: "Cliente adicionado!",
      description: `${clientData.nome} foi adicionado com sucesso.`,
    });
  };

  const stats = {
    total: reservations.length,
    confirmadas: reservations.filter(r => r.status === 'confirmada').length,
    pendentes: reservations.filter(r => r.status === 'pendente').length,
    canceladas: reservations.filter(r => r.status === 'cancelada').length
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservas</h1>
            <p className="text-gray-600">Gerencie todas as reservas das suas propriedades</p>
          </div>
          <Button 
            onClick={() => setShowNewClientForm(true)}
            className="bg-farm-blue-500 hover:bg-farm-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                <p className="text-sm text-blue-600">Total</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">{stats.confirmadas}</p>
                <p className="text-sm text-green-600">Confirmadas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-700">{stats.pendentes}</p>
                <p className="text-sm text-yellow-600">Pendentes</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500 rounded-xl">
                <X className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-700">{stats.canceladas}</p>
                <p className="text-sm text-red-600">Canceladas</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Reservations Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Reservas Recentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriedade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hóspedes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reservation.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reservation.checkIn).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(reservation.checkOut).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {reservation.guests}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(reservation.status)}>
                        {reservation.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      R$ {reservation.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewReservation(reservation)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditReservation(reservation)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      {reservation.status === 'pendente' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleConfirmReservation(reservation.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirmar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleCancelReservation(reservation.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <NewClientForm 
          isOpen={showNewClientForm} 
          onClose={() => setShowNewClientForm(false)}
          onSave={handleNewClientSave}
        />
      </div>
    </Layout>
  );
};

export default Index;
