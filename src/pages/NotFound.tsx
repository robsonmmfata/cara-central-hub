
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center shadow-lg">
        <div className="mb-6">
          <div className="text-6xl font-bold text-gray-300 mb-2">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Página não encontrada</h1>
          <p className="text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Página anterior
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
