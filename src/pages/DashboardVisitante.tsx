
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  Calendar,
  TreePine,
  Heart,
  Filter
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAppData } from "@/context/AppDataContext";

const DashboardVisitante = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getApprovedProperties } = useAppData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [capacityFilter, setCapacityFilter] = useState<string>('');

  // Usar apenas propriedades aprovadas do contexto global
  const approvedProperties = getApprovedProperties();

  const filteredProperties = approvedProperties.filter(property => {
    const matchesSearch = property.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.localizacao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = !priceFilter || 
      (priceFilter === 'low' && property.preco <= 200) ||
      (priceFilter === 'medium' && property.preco > 200 && property.preco <= 400) ||
      (priceFilter === 'high' && property.preco > 400);
    
    const matchesCapacity = !capacityFilter ||
      (capacityFilter === 'small' && property.capacidade <= 15) ||
      (capacityFilter === 'medium' && property.capacidade > 15 && property.capacidade <= 25) ||
      (capacityFilter === 'large' && property.capacidade > 25);

    return matchesSearch && matchesPrice && matchesCapacity;
  });

  const handleReservar = (property: typeof approvedProperties[0]) => {
    toast({
      title: "Redirecionando para reserva",
      description: `Preparando reserva para ${property.nome}`,
    });
    navigate('/reserva-chacara', { state: { property } });
  };

  const handleViewDetails = (property: typeof approvedProperties[0]) => {
    toast({
      title: "Detalhes da Propriedade",
      description: `${property.nome} - Capacidade: ${property.capacidade} pessoas`,
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TreePine className="h-8 w-8 text-teal-500" />
              Chácaras Disponíveis
            </h1>
            <p className="text-gray-600 mt-1">Encontre a chácara perfeita para seu evento</p>
          </div>
          <Button 
            onClick={() => navigate('/visitante/reservas')}
            className="bg-teal-500 hover:bg-teal-600"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Minhas Reservas
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome da chácara ou localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Filtros:</span>
              </div>
              
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="">Todos os preços</option>
                <option value="low">Até R$ 200</option>
                <option value="medium">R$ 200 - R$ 400</option>
                <option value="high">Acima de R$ 400</option>
              </select>
              
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="">Todas as capacidades</option>
                <option value="small">Até 15 pessoas</option>
                <option value="medium">16 - 25 pessoas</option>
                <option value="large">Mais de 25 pessoas</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <TreePine className="h-8 w-8 text-teal-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-teal-600">{approvedProperties.length}</p>
            <p className="text-sm text-gray-600">Chácaras Disponíveis</p>
          </Card>
          <Card className="p-6 text-center">
            <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-blue-600">{new Set(approvedProperties.map(p => p.localizacao.split(',')[1]?.trim())).size}</p>
            <p className="text-sm text-gray-600">Cidades</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">{Math.max(...approvedProperties.map(p => p.capacidade))}</p>
            <p className="text-sm text-gray-600">Maior Capacidade</p>
          </Card>
          <Card className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-yellow-600">R$ {Math.min(...approvedProperties.map(p => p.preco))}</p>
            <p className="text-sm text-gray-600">Menor Preço</p>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={property.imagem || "/placeholder.svg"} 
                  alt={property.nome}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                {property.rating && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    {property.rating}
                  </Badge>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{property.nome}</h3>
                  <p className="text-gray-600 text-sm">{property.descricao}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Até {property.capacidade} pessoas</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-teal-600">R$ {property.preco}</p>
                    <p className="text-sm text-gray-500">por dia</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Disponível
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetails(property)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button 
                    className="flex-1 bg-teal-500 hover:bg-teal-600"
                    onClick={() => handleReservar(property)}
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card className="p-12 text-center">
            <TreePine className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma chácara encontrada</h3>
            <p className="text-gray-600 mb-4">Tente ajustar os filtros de busca</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('');
                setCapacityFilter('');
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DashboardVisitante;
