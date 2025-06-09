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
import { useAppData } from "@/context/AppDataContext";

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
  const { properties, addTransaction } = useAppData();
  
  // Filtrar apenas propriedades aprovadas para visitantes
  const availableProperties = properties.filter(p => p.status === 'aprovada');
  
  const [chacaras, setChacaras] = useState(availableProperties.map(p => ({
    id: p.id,
    nome: p.nome,
    localizacao: p.localizacao,
    preco: `R$ ${p.preco}/dia`,
    capacidade: `Até ${p.capacidade} pessoas`,
    rating: p.rating || 4.5,
    favorito: false,
    imagem: p.imagem || "/placeholder.svg",
    descricao: p.descricao || "Propriedade disponível para reserva"
  })));
  
  const [filteredChacaras, setFilteredChacaras] = useState(chacaras);
  const [selectedProperty, setSelectedProperty] = useState<typeof chacaras[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    checkin: '',
    checkout: '',
    pessoas: '',
    localizacao: ''
  });

  // Atualizar chácaras quando propriedades mudarem
  useState(() => {
    const updatedChacaras = availableProperties.map(p => ({
      id: p.id,
      nome: p.nome,
      localizacao: p.localizacao,
      preco: `R$ ${p.preco}/dia`,
      capacidade: `Até ${p.capacidade} pessoas`,
      rating: p.rating || 4.5,
      favorito: chacaras.find(c => c.id === p.id)?.favorito || false,
      imagem: p.imagem || "/placeholder.svg",
      descricao: p.descricao || "Propriedade disponível para reserva"
    }));
    setChacaras(updatedChacaras);
    setFilteredChacaras(updatedChacaras);
  });

  const handleFavorite = (propertyId: number) => {
    const updateChacaras = (prev: typeof chacaras) => 
      prev.map(chacara => 
        chacara.id === propertyId 
          ? { ...chacara, favorito: !chacara.favorito }
          : chacara
      );
    
    setChacaras(updateChacaras);
    setFilteredChacaras(updateChacaras);
    
    const property = chacaras.find(c => c.id === propertyId);
    toast({
      title: property?.favorito ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: property?.nome,
    });
  };

  const handleViewDetails = (property: typeof chacaras[0]) => {
    setSelectedProperty(property);
    setShowDetailsModal(true);
  };

  const handleSearch = () => {
    let filtered = chacaras;

    // Filtrar por localização
    if (searchFilters.localizacao.trim()) {
      filtered = filtered.filter(chacara => 
        chacara.localizacao.toLowerCase().includes(searchFilters.localizacao.toLowerCase()) ||
        chacara.nome.toLowerCase().includes(searchFilters.localizacao.toLowerCase())
      );
    }

    // Filtrar por capacidade (pessoas)
    if (searchFilters.pessoas.trim()) {
      const pessoasNum = parseInt(searchFilters.pessoas);
      if (!isNaN(pessoasNum)) {
        filtered = filtered.filter(chacara => {
          const capacidade = parseInt(chacara.capacidade.match(/\d+/)?.[0] || '0');
          return capacidade >= pessoasNum;
        });
      }
    }

    setFilteredChacaras(filtered);
    
    toast({
      title: "Busca realizada!",
      description: `Encontradas ${filtered.length} chácaras que atendem aos critérios.`,
    });
    console.log('Filtros de busca aplicados:', searchFilters);
    console.log('Resultados da busca:', filtered);
  };

  const handleAdvancedFilters = () => {
    // Aplicar filtros mais específicos
    let filtered = chacaras;

    // Se há data de check-in e check-out, simular disponibilidade
    if (searchFilters.checkin && searchFilters.checkout) {
      const checkinDate = new Date(searchFilters.checkin);
      const checkoutDate = new Date(searchFilters.checkout);
      
      if (checkoutDate <= checkinDate) {
        toast({
          title: "Erro nas datas",
          description: "A data de check-out deve ser posterior ao check-in.",
          variant: "destructive"
        });
        return;
      }
      
      // Simular que todas as chácaras estão disponíveis para as datas selecionadas
      filtered = chacaras.filter(chacara => {
        // Aqui você faria uma verificação real de disponibilidade
        return true; // Por enquanto, todas estão disponíveis
      });
    }

    // Aplicar outros filtros já existentes
    if (searchFilters.localizacao.trim()) {
      filtered = filtered.filter(chacara => 
        chacara.localizacao.toLowerCase().includes(searchFilters.localizacao.toLowerCase()) ||
        chacara.nome.toLowerCase().includes(searchFilters.localizacao.toLowerCase())
      );
    }

    if (searchFilters.pessoas.trim()) {
      const pessoasNum = parseInt(searchFilters.pessoas);
      if (!isNaN(pessoasNum)) {
        filtered = filtered.filter(chacara => {
          const capacidade = parseInt(chacara.capacidade.match(/\d+/)?.[0] || '0');
          return capacidade >= pessoasNum;
        });
      }
    }

    setFilteredChacaras(filtered);
    
    toast({
      title: "Filtros avançados aplicados!",
      description: `${filtered.length} chácaras encontradas com os critérios selecionados.`,
    });
  };

  const clearFilters = () => {
    setSearchFilters({ checkin: '', checkout: '', pessoas: '', localizacao: '' });
    setFilteredChacaras(chacaras);
    toast({
      title: "Filtros limpos",
      description: "Mostrando todas as chácaras disponíveis.",
    });
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
            value={filteredChacaras.length.toString()}
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
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="checkout">Check-out</Label>
              <Input 
                type="date" 
                id="checkout" 
                value={searchFilters.checkout}
                onChange={(e) => setSearchFilters({...searchFilters, checkout: e.target.value})}
                min={searchFilters.checkin || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="pessoas">Número de pessoas</Label>
              <Input 
                type="number" 
                id="pessoas" 
                placeholder="Ex: 20" 
                min="1"
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
            <Button variant="outline" onClick={handleAdvancedFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </Card>

        {/* Available Properties */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Chácaras Disponíveis ({filteredChacaras.length})
            </h2>
            <Button variant="outline" onClick={() => setFilteredChacaras(chacaras)}>Ver todas</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChacaras.map((chacara) => (
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
          
          {filteredChacaras.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma chácara encontrada com os filtros selecionados.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearFilters}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
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
