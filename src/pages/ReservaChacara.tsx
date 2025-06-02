
import { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, ArrowLeft, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const ReservaChacara = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chacaraId = searchParams.get('id') || '1';
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    observations: '',
    paymentMethod: 'cartao'
  });

  // Mock data para a chácara - em um app real viria de uma API
  const chacara = {
    id: chacaraId,
    nome: "Chácara Vista Verde",
    localizacao: "Atibaia, SP",
    preco: 350,
    capacidade: "Até 20 pessoas",
    rating: 4.8,
    imagem: "/placeholder.svg",
    descricao: "Linda chácara com vista para as montanhas, ideal para eventos e confraternizações.",
    comodidades: ['Wi-Fi', 'Estacionamento', 'Cozinha Completa', 'Piscina', 'Churrasqueira', 'Jardim']
  };

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays * chacara.preco;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.checkIn || !formData.checkOut) {
      toast({
        title: "Erro",
        description: "Por favor, selecione as datas de check-in e check-out.",
        variant: "destructive"
      });
      return;
    }

    const total = calculateTotal();
    
    toast({
      title: "Reserva realizada com sucesso!",
      description: `Sua reserva para ${chacara.nome} foi confirmada. Total: R$ ${total.toLocaleString()}`,
    });

    // Simular redirecionamento para página de pagamento
    setTimeout(() => {
      navigate('/pagamentos');
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reservar Chácara</h1>
            <p className="text-gray-600">Complete os dados para finalizar sua reserva</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações da Chácara */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex gap-6">
                <img 
                  src={chacara.imagem} 
                  alt={chacara.nome}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{chacara.nome}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{chacara.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>{chacara.capacidade}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{chacara.rating}</span>
                    <span className="text-gray-500">(127 avaliações)</span>
                  </div>
                  <div className="text-2xl font-bold text-teal-600">
                    R$ {chacara.preco}/dia
                  </div>
                </div>
              </div>
            </Card>

            {/* Formulário de Reserva */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Detalhes da Reserva</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkIn">Data de Check-in</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut">Data de Check-out</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Número de Hóspedes</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="observations">Observações (Opcional)</Label>
                  <Textarea
                    id="observations"
                    placeholder="Alguma observação especial ou solicitação..."
                    value={formData.observations}
                    onChange={(e) => setFormData({...formData, observations: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                  <select
                    id="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="pix">PIX</option>
                    <option value="transferencia">Transferência Bancária</option>
                  </select>
                </div>
              </form>
            </Card>
          </div>

          {/* Resumo da Reserva */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Resumo da Reserva</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span className="font-medium">
                    {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('pt-BR') : '--'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span className="font-medium">
                    {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString('pt-BR') : '--'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hóspedes:</span>
                  <span className="font-medium">{formData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diárias:</span>
                  <span className="font-medium">
                    {formData.checkIn && formData.checkOut ? 
                      Math.ceil(Math.abs(new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)) 
                      : 0
                    } dias
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Valor por dia:</span>
                  <span className="font-medium">R$ {chacara.preco.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-teal-600">R$ {calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={!formData.checkIn || !formData.checkOut}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Confirmar Reserva
              </Button>

              <div className="mt-4 text-center">
                <Badge variant="secondary" className="text-xs">
                  Cancelamento gratuito até 24h antes
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservaChacara;
