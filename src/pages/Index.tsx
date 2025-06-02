
import { Layout } from "@/components/Layout";
import { EditReservationModal } from "@/components/EditReservationModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Calendar, Users, MapPin, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  client: string;
  property: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  total: number;
}

const Reservas = () => {
  const { toast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      client: "João Silva",
      property: "Chácara Vista Verde",
      checkIn: "2024-04-15",
      checkOut: "2024-04-17",
      guests: 8,
      status: "confirmada",
      total: 1200
    },
    {
      id: "2",
      client: "Maria Santos",
      property: "Sítio do Sol",
      checkIn: "2024-04-20",
      checkOut: "2024-04-22",
      guests: 15,
      status: "pendente",
      total: 800
    },
    {
      id: "3",
      client: "Carlos Oliveira",
      property: "Chácara Recanto Feliz",
      checkIn: "2024-04-25",
      checkOut: "2024-04-27",
      guests: 12,
      status: "confirmada",
      total: 950
    }
  ]);

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowEditModal(true);
    console.log('Visualizando reserva:', reservation);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowEditModal(true);
    console.log('Editando reserva:', reservation);
  };

  const handleSaveReservation = (updatedReservation: Reservation) => {
    setReservations(prev => 
      prev.map(res => res.id === updatedReservation.id ? updatedReservation : res)
    );
  };

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

  const confirmedReservations = reservations.filter(r => r.status === 'confirmada').length;
  const pendingReservations = reservations.filter(r => r.status === 'pendente').length;
  const totalRevenue = reservations.filter(r => r.status === 'confirmada').reduce((sum, r) => sum + r.total, 0);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservas</h1>
            <p className="text-gray-600">Gerencie todas as reservas das propriedades</p>
          </div>
          <Button className="bg-farm-blue-500 hover:bg-farm-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Nova Reserva
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
                <p className="text-2xl font-bold text-blue-700">{reservations.length}</p>
                <p className="text-sm text-blue-600">Total de Reservas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">{confirmedReservations}</p>
                <p className="text-sm text-green-600">Confirmadas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-700">{pendingReservations}</p>
                <p className="text-sm text-yellow-600">Pendentes</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">R$ {totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-purple-600">Receita Total</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Reservations Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriedade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hóspedes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
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
                      {reservation.guests}
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
                        onClick={() => handleEditReservation(reservation)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <EditReservationModal 
          reservation={selectedReservation}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveReservation}
        />
      </div>
    </Layout>
  );
};

export default Reservas;
