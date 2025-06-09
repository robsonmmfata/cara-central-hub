
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  Wifi, 
  Home, 
  HelpCircle,
  TreePine,
  Calendar,
  Users,
  Phone,
  MessageCircle,
  Globe
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useReservations } from "@/context/ReservationContext";
import { useAuth } from "@/context/AuthContext";

const CheckIn = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { getCurrentReservation } = useReservations();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const currentReservation = getCurrentReservation();
  const propertyName = currentReservation?.propertyName || 'Chácara do Zé';
  const clientName = currentReservation?.clientName || user?.name || 'Visitante';
  const checkInDate = currentReservation?.checkIn ? new Date(currentReservation.checkIn).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');
  const guests = currentReservation?.guests || 1;
  const totalDays = currentReservation ? Math.ceil((new Date(currentReservation.checkOut).getTime() - new Date(currentReservation.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1;

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast({
      title: "Check-in realizado!",
      description: `Bem-vindo à ${propertyName}! Tenha uma ótima estadia.`,
    });
  };

  const handleContactSupport = (method: string) => {
    toast({
      title: "Redirecionando...",
      description: `Abrindo ${method} para contato com o suporte.`,
    });
    
    if (method === 'WhatsApp') {
      window.open('https://wa.me/5511999999999', '_blank');
    } else if (method === 'Telefone') {
      window.open('tel:+5511333333333', '_blank');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center bg-gradient-to-r from-farm-blue-600 to-farm-blue-700 rounded-2xl p-8 text-white">
          <div className="flex justify-center mb-4">
            <TreePine className="h-16 w-16 text-white" />
          </div>
          <p className="text-farm-blue-200 text-sm uppercase tracking-wide mb-2">CHECK-IN DIGITAL</p>
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à {propertyName}!</h1>
          <p className="text-farm-blue-100 text-lg mb-4">{checkInDate} • {clientName}</p>
          
          {!isCheckedIn ? (
            <Button 
              onClick={handleCheckIn}
              className="mt-6 bg-white text-farm-blue-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg"
            >
              Começar Check-in
            </Button>
          ) : (
            <div className="mt-6">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                Check-in Realizado!
              </Badge>
            </div>
          )}
        </div>

        {/* Notice Board */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Mural de Avisos</h2>
          </div>
          
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Geladeira com problema</h3>
                <p className="text-red-700 text-sm">Aviso válido até 10/04 - Use a geladeira da área gourmet</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* House Rules */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowRules(true)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-farm-blue-100 rounded-xl">
                <Home className="h-6 w-6 text-farm-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Regras da Chácara</h3>
            </div>
            <p className="text-gray-600 text-sm">Confira as regras de convivência e uso das instalações.</p>
          </Card>

          {/* House Guide */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowGuide(true)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-farm-green-100 rounded-xl">
                <Wifi className="h-6 w-6 text-farm-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Guia da Casa</h3>
            </div>
            <p className="text-gray-600 text-sm">Informações sobre WiFi, equipamentos e comodidades.</p>
          </Card>
        </div>

        {/* Presence Confirmation */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-farm-green-100 rounded-xl">
              <CheckCircle className="h-6 w-6 text-farm-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Confirmação de Presença</h3>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-farm-blue-600" 
              checked={isCheckedIn}
              onChange={(e) => setIsCheckedIn(e.target.checked)}
            />
            <span className="text-gray-700">Cheguei na {propertyName}</span>
            {isCheckedIn && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
          </div>
        </Card>

        {/* Help Section */}
        <Card className="p-6 bg-gradient-to-r from-farm-blue-50 to-farm-blue-100 border-farm-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-farm-blue-500 rounded-xl">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-farm-blue-800">Preciso de ajuda</h3>
          </div>
          <p className="text-farm-blue-700 mb-4">Está com alguma dúvida ou problema? Entre em contato conosco!</p>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="border-farm-blue-300 text-farm-blue-700 hover:bg-farm-blue-200"
              onClick={() => handleContactSupport('WhatsApp')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="border-farm-blue-300 text-farm-blue-700 hover:bg-farm-blue-200"
              onClick={() => handleContactSupport('Telefone')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Telefone
            </Button>
            <Button 
              variant="outline" 
              className="border-farm-blue-300 text-farm-blue-700 hover:bg-farm-blue-200"
              onClick={() => handleContactSupport('Chat Online')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Chat Online
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-farm-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalDays}</p>
            <p className="text-sm text-gray-600">Dias de estadia</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-farm-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{guests}</p>
            <p className="text-sm text-gray-600">Pessoas</p>
          </Card>
          
          <Card className="p-6 text-center">
            <TreePine className="h-8 w-8 text-farm-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">A1</p>
            <p className="text-sm text-gray-600">Chalé</p>
          </Card>
        </div>

        {/* Rules Modal */}
        {showRules && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Regras da {propertyName}</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2">Horários</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Check-in: 14h00</li>
                      <li>Check-out: 12h00</li>
                      <li>Silêncio após 22h00</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Área da Piscina</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Uso sob própria responsabilidade</li>
                      <li>Crianças devem estar acompanhadas</li>
                      <li>Não é permitido vidro na área da piscina</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Limpeza</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Mantenha a propriedade limpa</li>
                      <li>Descarte o lixo nos locais apropriados</li>
                      <li>Deixe a louça lavada</li>
                    </ul>
                  </div>
                </div>
                <Button onClick={() => setShowRules(false)} className="mt-6 w-full">
                  Entendi
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Guia da {propertyName}</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2">WiFi</h3>
                    <p className="text-gray-600 mb-1">Rede: <strong>Chacara_Wifi</strong></p>
                    <p className="text-gray-600">Senha: <strong>chacara2024</strong></p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Equipamentos</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>TV com Netflix na sala</li>
                      <li>Som bluetooth disponível</li>
                      <li>Churrasqueira com utensílios</li>
                      <li>Geladeira, fogão e micro-ondas</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Emergências</h3>
                    <p className="text-gray-600 mb-1">Proprietário: <strong>(11) 99999-9999</strong></p>
                    <p className="text-gray-600 mb-1">Bombeiros: <strong>193</strong></p>
                    <p className="text-gray-600">Polícia: <strong>190</strong></p>
                  </div>
                </div>
                <Button onClick={() => setShowGuide(false)} className="mt-6 w-full">
                  Entendi
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckIn;
