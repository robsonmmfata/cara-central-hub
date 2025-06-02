
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { PropertyDetailsModal } from "@/components/PropertyDetailsModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  MapPin, 
  Search, 
  Heart,
  Star,
  Users,
  Clock,
  Filter
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockChacaras = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    localizacao: "Atibaia, SP",
    preco: "R$ 350/dia",
    capacidade: "Até 20 pessoas",
    rating: 4.8,
    favorito: false,
    imagem: "/placeholder.svg",
    descricao: "Linda chácara com vista para as montanhas"
  },
  {
    id: 2,
    nome: "Sítio do Sol",
    localizacao: "Ibiúna, SP",
    preco: "R$ 280/dia",
    capacidade: "Até 15 pessoas",
    rating: 4.6,
    favorito: true,
    imagem: "/placeholder.svg",
    descricao: "Sítio aconchegante com piscina aquecida"
  },
  {
    id: 3,
    nome: "Chácara Recanto Feliz",
    localizacao: "Mairiporã, SP",
    preco: "R$ 420/dia",
    capacidade: "Até 30 pessoas",
    rating: 4.9,
    favorito: false,
    imagem: "/placeholder.svg",
    descricao: "Espaço amplo ideal para grandes eventos"
  }
];

const DashboardVisitante = () => {
  const { toast } = useToast();
  const [chacaras, setChacaras] = useState(mockChacaras);
  const [selectedProperty, setSelectedProperty] = useState<typeof mockChacaras[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    checkin: '',
    checkout: '',
    pessoas: '',
    localizacao: ''
  });

  const handleFavorite = (propertyId: number) => {
    setChacaras(prev => 
      prev.map(chacara => 
        chacara.id === propertyId 
          ? { ...chacara, favorito: !chacara.favorito }
          : chacara
      )
    );
  };

  const handleViewDetails = (property: typeof mockChacaras[0]) => {
    setSelectedProperty(property);
    setShowDetailsModal(true);
  };

  const handleSearch = () => {
    toast({
      title: "Busca realizada!",
      description: `Buscando chácaras em ${searchFilters.localizacao || 'todas as regiões'}`,
    });
    console.log('Filtros de busca:', searchFilters);
  };

  const favoriteCount = chacaras.filter(c => c.favorito).length;

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Encontre sua Chácara Ideal</h1>
              <p className="text-teal-100 text-lg">Descubra os melhores locais para suas festividades</p>
            </div>
            <div className="text-right">
              <p className="text-teal-200 text-sm">Bem-vindo</p>
              <p className="text-xl font-medium">Visitante</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Chácaras Disponíveis"
            value="47"
            icon={MapPin}
            bgColor="bg-teal-50"
            iconColor="text-teal-500"
          />
          <StatsCard
            title="Minhas Reservas"
            value="3"
            icon={Calendar}
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Favoritos"
            value={favoriteCount.toString()}
            icon={Heart}
            bgColor="bg-red-50"
            iconColor="text-red-500"
          />
          <StatsCard
            title="Avaliações Feitas"
            value="12"
            icon={Star}
            bgColor="bg-yellow-50"
            iconColor="text-yellow-500"
          />
        </div>

        {/* Search Filters */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filtros de Busca</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="checkin">Check-in</Label>
              <Input 
                type="date" 
                id="checkin" 
                value={searchFilters.checkin}
                onChange={(e) => setSearchFilters({...searchFilters, checkin: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="checkout">Check-out</Label>
              <Input 
                type="date" 
                id="checkout" 
                value={searchFilters.checkout}
                onChange={(e) => setSearchFilters({...searchFilters, checkout: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="pessoas">Número de pessoas</Label>
              <Input 
                type="number" 
                id="pessoas" 
                placeholder="Ex: 20" 
                value={searchFilters.pessoas}
                onChange={(e) => setSearchFilters({...searchFilters, pessoas: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="localizacao">Localização</Label>
              <Input 
                id="localizacao" 
                placeholder="Cidade ou região" 
                value={searchFilters.localizacao}
                onChange={(e) => setSearchFilters({...searchFilters, localizacao: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Search className="w-4 h-4 mr-2" />
              Buscar Chácaras
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </Card>

        {/* Available Properties */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Chácaras Disponíveis</h2>
            <Button variant="outline">Ver todas</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chacaras.map((chacara) => (
              <Card key={chacara.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={chacara.imagem} 
                    alt={chacara.nome}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="sm"
                    variant={chacara.favorito ? "default" : "outline"}
                    className="absolute top-3 right-3"
                    onClick={() => handleFavorite(chacara.id)}
                  >
                    <Heart className={`w-4 h-4 ${chacara.favorito ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{chacara.nome}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{chacara.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{chacara.capacidade}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{chacara.rating}</span>
                    </div>
                    <span className="font-bold text-teal-600">{chacara.preco}</span>
                  </div>
                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => handleViewDetails(chacara)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Reserva confirmada</p>
                <p className="text-sm text-gray-600">Chácara Vista Verde - 15/12/2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Heart className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium">Adicionado aos favoritos</p>
                <p className="text-sm text-gray-600">Sítio do Sol</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium">Avaliação enviada</p>
                <p className="text-sm text-gray-600">Chácara Recanto Feliz - 5 estrelas</p>
              </div>
            </div>
          </div>
        </Card>

        <PropertyDetailsModal 
          property={selectedProperty}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          onFavorite={handleFavorite}
        />
      </div>
    </Layout>
  );
};

export default DashboardVisitante;
