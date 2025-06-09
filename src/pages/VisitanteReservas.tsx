
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useReservations } from "@/context/ReservationContext";
import { useAuth } from "@/context/AuthContext";

const VisitanteReservas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { reservations, updateReservationStatus, setCurrentReservation } = useReservations();

  // Filtrar reservas do usuário atual
  const userReservations = reservations.filter(res => res.userId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmada": return CheckCircle;
      case "pendente": return Clock;
      case "cancelada": return AlertCircle;
      default: return Clock;
    }
  };

  const handleCheckin = (reserva: typeof userReservations[0]) => {
    const hoje = new Date();
    const checkInDate = new Date(reserva.checkIn);
    const canCheckin = hoje >= checkInDate;

    if (canCheckin) {
      setCurrentReservation(reserva);
      toast({
        title: "Redirecionando para check-in",
        description: `Preparando check-in para ${reserva.propertyName}`,
      });
      navigate('/checkin');
    } else {
      toast({
        title: "Check-in não disponível",
        description: "O check-in só estará disponível na data da reserva.",
        variant: "destructive"
      });
    }
  };

  const handleCancelReservation = (reservaId: string) => {
    updateReservationStatus(reservaId, 'cancelada');
    toast({
      title: "Reserva cancelada",
      description: "Sua reserva foi cancelada com sucesso.",
    });
  };

  const handleViewDetails = (reserva: typeof userReservations[0]) => {
    toast({
      title: "Detalhes da Reserva",
      description: `${reserva.propertyName} - ${reserva.guests} pessoas - R$ ${reserva.totalAmount.toLocaleString()}`,
    });
  };

  const totalGasto = userReservations.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-teal-500" />
              Minhas Reservas
            </h1>
            <p className="text-gray-600 mt-1">Acompanhe suas reservas e realize check-in</p>
          </div>
          <Button 
            onClick={() => navigate('/dashboard-visitante')}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Nova Reserva
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-teal-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-teal-600">{userReservations.length}</p>
            <p className="text-sm text-gray-600">Total Reservas</p>
          </Card>
          <Card className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">{userReservations.filter(r => r.status === 'confirmada').length}</p>
            <p className="text-sm text-gray-600">Confirmadas</p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-yellow-600">{userReservations.filter(r => r.status === 'pendente').length}</p>
            <p className="text-sm text-gray-600">Pendentes</p>
          </Card>
          <Card className="p-6 text-center">
            <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-orange-600">R$ {totalGasto.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Gasto</p>
          </Card>
        </div>

        {/* Reservations List */}
        <div className="space-y-6">
          {userReservations.map((reserva) => {
            const StatusIcon = getStatusIcon(reserva.status);
            const hoje = new Date();
            const checkInDate = new Date(reserva.checkIn);
            const canCheckin = hoje >= checkInDate && reserva.status === 'confirmada';
            
            return (
              <Card key={reserva.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{reserva.propertyName}</h3>
                      <Badge className={getStatusColor(reserva.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {reserva.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Propriedade ID: {reserva.propertyId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(reserva.checkIn).toLocaleDateString('pt-BR')} - {new Date(reserva.checkOut).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{reserva.guests} pessoas</span>
                      </div>
                    </div>
                    
                    <div className="text-right mb-4">
                      <p className="text-2xl font-bold text-green-600">R$ {reserva.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-40">
                    {reserva.status === 'confirmada' && (
                      <Button 
                        onClick={() => handleCheckin(reserva)}
                        className={`w-full ${canCheckin ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!canCheckin}
                      >
                        {canCheckin ? 'Fazer Check-in' : 'Check-in em breve'}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(reserva)}
                    >
                      Ver Detalhes
                    </Button>
                    {reserva.status !== 'cancelada' && (
                      <Button 
                        variant="outline" 
                        className="w-full text-red-600 hover:text-red-800"
                        onClick={() => handleCancelReservation(reserva.id)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {userReservations.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-gray-600 mb-4">Que tal fazer sua primeira reserva?</p>
            <Button 
              onClick={() => navigate('/dashboard-visitante')}
              className="bg-teal-500 hover:bg-teal-600"
            >
              Buscar Chácaras
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VisitanteReservas;
