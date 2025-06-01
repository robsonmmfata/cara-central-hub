
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
  Users
} from "lucide-react";

const CheckIn = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center bg-gradient-to-r from-farm-blue-600 to-farm-blue-700 rounded-2xl p-8 text-white">
          <div className="flex justify-center mb-4">
            <TreePine className="h-16 w-16 text-white" />
          </div>
          <p className="text-farm-blue-200 text-sm uppercase tracking-wide mb-2">CHECK-IN DIGITAL</p>
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Chácara do Zé!</h1>
          <p className="text-farm-blue-100 text-lg">02 de abril de 2024 • Maria Oliveira</p>
          
          <Button className="mt-6 bg-white text-farm-blue-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg">
            Começar Check-in
          </Button>
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
                <p className="text-red-700 text-sm">Aviso válido até 10/04</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* House Rules */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-farm-blue-100 rounded-xl">
                <Home className="h-6 w-6 text-farm-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Regras da Chácara</h3>
            </div>
            <p className="text-gray-600 text-sm">Confira as regras de convivência e uso das instalações.</p>
          </Card>

          {/* House Guide */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
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
            <input type="checkbox" className="w-5 h-5 text-farm-blue-600" />
            <span className="text-gray-700">Cheguei na chácara</span>
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
            <Button variant="outline" className="border-farm-blue-300 text-farm-blue-700 hover:bg-farm-blue-200">
              WhatsApp
            </Button>
            <Button variant="outline" className="border-farm-blue-300 text-farm-blue-700 hover:bg-farm-blue-200">
              Telefone
            </Button>
            <Button variant="outline" className="border-farm-blue-300 text-farm-blue-700 hover:bg-farm-blue-200">
              Chat Online
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-farm-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Dias de estadia</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-farm-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">6</p>
            <p className="text-sm text-gray-600">Pessoas</p>
          </Card>
          
          <Card className="p-6 text-center">
            <TreePine className="h-8 w-8 text-farm-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">A1</p>
            <p className="text-sm text-gray-600">Chalé</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CheckIn;
