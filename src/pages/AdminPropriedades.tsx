
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TreePine, Search, Eye, Check, X, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockPropriedades = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    proprietario: "João Silva",
    localizacao: "Atibaia, SP",
    capacidade: 20,
    preco: 350,
    status: "aprovada",
    reservas: 12,
    receita: 4200,
    dataCadastro: "15/01/2024"
  },
  {
    id: 2,
    nome: "Sítio do Sol",
    proprietario: "Ana Costa",
    localizacao: "Ibiúna, SP",
    capacidade: 15,
    preco: 280,
    status: "pendente",
    reservas: 0,
    receita: 0,
    dataCadastro: "20/01/2024"
  },
  {
    id: 3,
    nome: "Chácara Recanto Feliz",
    proprietario: "Pedro Lima",
    localizacao: "Mairiporã, SP",
    capacidade: 30,
    preco: 420,
    status: "aprovada",
    reservas: 8,
    receita: 3360,
    dataCadastro: "10/01/2024"
  }
];

const AdminPropriedades = () => {
  const { toast } = useToast();
  const [propriedades, setPropriedades] = useState(mockPropriedades);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = propriedades.filter(prop =>
    prop.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.proprietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovada": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "rejeitada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (id: number) => {
    setPropriedades(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'aprovada' } : p
    ));
    toast({
      title: "Propriedade aprovada!",
      description: "A propriedade foi aprovada e está disponível para reservas.",
    });
  };

  const handleReject = (id: number) => {
    setPropriedades(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'rejeitada' } : p
    ));
    toast({
      title: "Propriedade rejeitada",
      description: "A propriedade foi rejeitada e não estará disponível.",
      variant: "destructive"
    });
  };

  const totalReceita = propriedades.reduce((sum, p) => sum + p.receita, 0);
  const totalReservas = propriedades.reduce((sum, p) => sum + p.reservas, 0);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TreePine className="h-8 w-8 text-green-500" />
              Gestão de Propriedades
            </h1>
            <p className="text-gray-600 mt-1">Aprove, rejeite e gerencie todas as propriedades</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{propriedades.length}</p>
            <p className="text-sm text-gray-600">Total Propriedades</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{propriedades.filter(p => p.status === 'aprovada').length}</p>
            <p className="text-sm text-gray-600">Aprovadas</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-yellow-600">{propriedades.filter(p => p.status === 'pendente').length}</p>
            <p className="text-sm text-gray-600">Pendentes</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-green-600">R$ {totalReceita.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Receita Total</p>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar propriedades por nome, proprietário ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((propriedade) => (
            <Card key={propriedade.id} className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">{propriedade.nome}</h3>
                  <Badge className={getStatusColor(propriedade.status)}>
                    {propriedade.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Proprietário: {propriedade.proprietario}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{propriedade.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Até {propriedade.capacidade} pessoas</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{propriedade.reservas}</p>
                    <p className="text-xs text-gray-600">Reservas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">R$ {propriedade.receita}</p>
                    <p className="text-xs text-gray-600">Receita</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">R$ {propriedade.preco}/dia</p>
                  <p className="text-xs text-gray-500">Cadastrado em {propriedade.dataCadastro}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  {propriedade.status === 'pendente' && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(propriedade.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleReject(propriedade.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPropriedades;
