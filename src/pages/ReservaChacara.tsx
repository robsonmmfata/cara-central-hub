
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  CreditCard,
  DollarSign
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useReservations } from "@/context/ReservationContext";

const ReservaChacara = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addReservation, setCurrentReservation } = useReservations();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('id');
  
  const [reservaData, setReservaData] = useState({
    checkIn: '',
    checkOut: '',
    hospedes: 2,
    nomeCompleto: user?.name || '',
    email: user?.email || '',
    telefone: '',
    observacoes: '',
    metodoPagamento: 'pix'
  });

  // Mock properties data
  const properties = {
    '1': {
      id: '1',
      nome: 'Chácara Vista Verde',
      localizacao: 'Ibiúna, SP',
      preco: 420,
      capacidade: '8 pessoas',
      rating: 4.8,
      imagem: '/placeholder.svg',
      comodidades: ['Wi-Fi', 'Estacionamento', 'Cozinha', 'Piscina']
    },
    '2': {
      id: '2',
      nome: 'Sítio do Sol',
      localizacao: 'Atibaia, SP',
      preco: 350,
      capacidade: '12 pessoas',
      rating: 4.9,
      imagem: '/placeholder.svg',
      comodidades: ['Wi-Fi', 'Estacionamento', 'Cozinha', 'Piscina']
    },
    '3': {
      id: '3',
      nome: 'Chácara Recanto Feliz',
      localizacao: 'Mairiporã, SP',
      preco: 480,
      capacidade: '10 pessoas',
      rating: 4.7,
      imagem: '/placeholder.svg',
      comodidades: ['Wi-Fi', 'Estacionamento', 'Cozinha', 'Piscina']
    }
  };

  const property = properties[propertyId as keyof typeof properties] || properties['1'];

  const calcularTotal = () => {
    if (!reservaData.checkIn || !reservaData.checkOut) return 0;
    
    const inicio = new Date(reservaData.checkIn);
    const fim = new Date(reservaData.checkOut);
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    
    return dias > 0 ? dias * property.preco : 0;
  };

  const handleFinalizarReserva = () => {
    // Validações
    if (!reservaData.checkIn || !reservaData.checkOut || !reservaData.nomeCompleto || !reservaData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios para continuar.",
        variant: "destructive"
      });
      return;
    }

    const total = calcularTotal();
    if (total <= 0) {
      toast({
        title: "Datas inválidas",
        description: "Verifique as datas de check-in e check-out.",
        variant: "destructive"
      });
      return;
    }

    // Criar reserva
    const reservationId = addReservation({
      propertyId: property.id,
      propertyName: property.nome,
      clientName: reservaData.nomeCompleto,
      clientEmail: reservaData.email,
      checkIn: reservaData.checkIn,
      checkOut: reservaData.checkOut,
      guests: reservaData.hospedes,
      totalAmount: total,
      status: 'confirmada',
      paymentStatus: 'pendente',
      userId: user?.id
    });

    // Definir como reserva atual para o check-in
    const newReservation = {
      id: reservationId,
      propertyId: property.id,
      propertyName: property.nome,
      clientName: reservaData.nomeCompleto,
      clientEmail: reservaData.email,
      checkIn: reservaData.checkIn,
      checkOut: reservaData.checkOut,
      guests: reservaData.hospedes,
      totalAmount: total,
      status: 'confirmada' as const,
      paymentStatus: 'pendente' as const,
      createdAt: new Date().toISOString(),
      userId: user?.id
    };

    setCurrentReservation(newReservation);

    console.log('Finalizando reserva:', {
      property: property.nome,
      ...reservaData,
      total
    });

    toast({
      title: "Reserva confirmada!",
      description: `Sua reserva para ${property.nome} foi confirmada. Redirecionando para check-in...`,
    });

    // Redirecionar para check-in após 2 segundos
    setTimeout(() => {
      navigate('/checkin');
    }, 2000);
  };

  const icons = [Wifi, Car, Utensils, Waves];
  const total = calcularTotal();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservar Chácara</h1>
          <p className="text-gray-600">Complete os dados para finalizar sua reserva</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações da Propriedade */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex gap-6">
                <img 
                  src={property.imagem} 
                  alt={property.nome}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.nome}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{property.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{property.capacidade}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600">{property.rating} (127 avaliações)</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {property.comodidades.map((comodidade, index) => {
                      const IconComponent = icons[index] || Wifi;
                      return (
                        <div key={comodidade} className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-teal-500" />
                          <span className="text-sm text-gray-600">{comodidade}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Formulário de Reserva */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Dados da Reserva</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkIn">Check-in</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={reservaData.checkIn}
                      onChange={(e) => setReservaData({...reservaData, checkIn: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut">Check-out</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={reservaData.checkOut}
                      onChange={(e) => setReservaData({...reservaData, checkOut: e.target.value})}
                      min={reservaData.checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="hospedes">Número de Hóspedes</Label>
                  <Input
                    id="hospedes"
                    type="number"
                    min="1"
                    max="20"
                    value={reservaData.hospedes}
                    onChange={(e) => setReservaData({...reservaData, hospedes: parseInt(e.target.value)})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      value={reservaData.nomeCompleto}
                      onChange={(e) => setReservaData({...reservaData, nomeCompleto: e.target.value})}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={reservaData.email}
                      onChange={(e) => setReservaData({...reservaData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={reservaData.telefone}
                    onChange={(e) => setReservaData({...reservaData, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <textarea
                    id="observacoes"
                    className="w-full border border-gray-300 rounded-lg p-3 min-h-20"
                    value={reservaData.observacoes}
                    onChange={(e) => setReservaData({...reservaData, observacoes: e.target.value})}
                    placeholder="Alguma observação especial sobre sua estadia..."
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Resumo da Reserva */}
          <div>
            <Card className="p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Resumo da Reserva</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Propriedade:</span>
                  <span className="font-medium">{property.nome}</span>
                </div>
                
                {reservaData.checkIn && reservaData.checkOut && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{new Date(reservaData.checkIn).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{new Date(reservaData.checkOut).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dias:</span>
                      <span className="font-medium">{Math.ceil((new Date(reservaData.checkOut).getTime() - new Date(reservaData.checkIn).getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Hóspedes:</span>
                  <span className="font-medium">{reservaData.hospedes} pessoas</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor/dia:</span>
                  <span className="font-medium">R$ {property.preco.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-teal-600">R$ {total.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {/* Método de Pagamento */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 block">Método de Pagamento</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="pix"
                      checked={reservaData.metodoPagamento === 'pix'}
                      onChange={(e) => setReservaData({...reservaData, metodoPagamento: e.target.value})}
                    />
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <span>PIX (5% desconto)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="cartao"
                      checked={reservaData.metodoPagamento === 'cartao'}
                      onChange={(e) => setReservaData({...reservaData, metodoPagamento: e.target.value})}
                    />
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span>Cartão de Crédito</span>
                  </label>
                </div>
              </div>

              <Button 
                onClick={handleFinalizarReserva}
                className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3"
                disabled={!reservaData.checkIn || !reservaData.checkOut}
              >
                Finalizar Reserva
              </Button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Ao finalizar, você será redirecionado para o check-in digital
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservaChacara;
