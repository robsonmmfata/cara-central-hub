
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TreePine, Plus, Edit, Eye, MapPin, Users, DollarSign, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockPropriedades = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    localizacao: "Atibaia, SP",
    capacidade: 20,
    preco: 350,
    status: "aprovada",
    reservas: 12,
    receita: 4200,
    rating: 4.8,
    fotos: 8,
    descricao: "Linda chácara com piscina, churrasqueira e muito verde."
  },
  {
    id: 2,
    nome: "Sítio Recanto do Sol",
    localizacao: "Ibiúna, SP",
    capacidade: 15,
    preco: 280,
    status: "pendente",
    reservas: 0,
    receita: 0,
    rating: 0,
    fotos: 5,
    descricao: "Sítio aconchegante perfeito para descanso em família."
  }
];

const ProprietarioPropriedades = () => {
  const { toast } = useToast();
  const [propriedades, setPropriedades] = useState(mockPropriedades);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof mockPropriedades[0] | null>(null);
  const [editingProperty, setEditingProperty] = useState<typeof mockPropriedades[0] | null>(null);
  const [newProperty, setNewProperty] = useState({
    nome: '',
    localizacao: '',
    capacidade: '',
    preco: '',
    descricao: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovada": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "rejeitada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewProperty = (propriedade: typeof mockPropriedades[0]) => {
    setSelectedProperty(propriedade);
    console.log('Visualizando propriedade:', propriedade);
  };

  const handleEditProperty = (propriedade: typeof mockPropriedades[0]) => {
    setEditingProperty(propriedade);
    console.log('Editando propriedade:', propriedade);
  };

  const handleSaveEdit = () => {
    if (editingProperty) {
      setPropriedades(prev => prev.map(p => 
        p.id === editingProperty.id ? editingProperty : p
      ));
      setEditingProperty(null);
      toast({
        title: "Propriedade atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
    }
  };

  const handleAddProperty = () => {
    if (!newProperty.nome || !newProperty.localizacao || !newProperty.capacidade || !newProperty.preco) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const novaPropriedade = {
      id: propriedades.length + 1,
      nome: newProperty.nome,
      localizacao: newProperty.localizacao,
      capacidade: parseInt(newProperty.capacidade),
      preco: parseFloat(newProperty.preco),
      status: "pendente" as const,
      reservas: 0,
      receita: 0,
      rating: 0,
      fotos: 0,
      descricao: newProperty.descricao
    };

    setPropriedades([...propriedades, novaPropriedade]);
    setNewProperty({ nome: '', localizacao: '', capacidade: '', preco: '', descricao: '' });
    setShowAddForm(false);
    
    toast({
      title: "Propriedade cadastrada!",
      description: "Sua propriedade foi enviada para análise da administração.",
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
              Minhas Propriedades
            </h1>
            <p className="text-gray-600 mt-1">Gerencie suas chácaras e sítios</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Propriedade
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <TreePine className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">{propriedades.length}</p>
            <p className="text-sm text-gray-600">Propriedades</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-blue-600">{totalReservas}</p>
            <p className="text-sm text-gray-600">Total Reservas</p>
          </Card>
          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">R$ {totalReceita.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Receita Total</p>
          </Card>
          <Card className="p-6 text-center">
            <Badge className="bg-green-100 text-green-800">
              {propriedades.filter(p => p.status === 'aprovada').length} Ativas
            </Badge>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {propriedades.map((propriedade) => (
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
                    <MapPin className="w-4 h-4" />
                    <span>{propriedade.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Até {propriedade.capacidade} pessoas</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{propriedade.reservas}</p>
                    <p className="text-xs text-gray-600">Reservas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">R$ {propriedade.receita}</p>
                    <p className="text-xs text-gray-600">Receita</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{propriedade.rating || 'N/A'}</p>
                    <p className="text-xs text-gray-600">Avaliação</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">R$ {propriedade.preco}/dia</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewProperty(propriedade)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleEditProperty(propriedade)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View Property Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Detalhes da Propriedade</h2>
                  <Button variant="outline" size="icon" onClick={() => setSelectedProperty(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedProperty.nome}</h3>
                    <Badge className={getStatusColor(selectedProperty.status)}>
                      {selectedProperty.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Localização</label>
                      <p>{selectedProperty.localizacao}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Capacidade</label>
                      <p>{selectedProperty.capacidade} pessoas</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preço por dia</label>
                      <p className="text-lg font-bold text-green-600">R$ {selectedProperty.preco}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Avaliação</label>
                      <p>{selectedProperty.rating || 'Sem avaliações'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <p>{selectedProperty.descricao}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total de Reservas</label>
                      <p className="text-lg font-bold text-blue-600">{selectedProperty.reservas}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Receita Total</label>
                      <p className="text-lg font-bold text-green-600">R$ {selectedProperty.receita}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Edit Property Modal */}
        {editingProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Editar Propriedade</h2>
                  <Button variant="outline" size="icon" onClick={() => setEditingProperty(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-nome">Nome da Propriedade</Label>
                    <Input
                      id="edit-nome"
                      value={editingProperty.nome}
                      onChange={(e) => setEditingProperty({...editingProperty, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-localizacao">Localização</Label>
                    <Input
                      id="edit-localizacao"
                      value={editingProperty.localizacao}
                      onChange={(e) => setEditingProperty({...editingProperty, localizacao: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-capacidade">Capacidade</Label>
                      <Input
                        id="edit-capacidade"
                        type="number"
                        value={editingProperty.capacidade}
                        onChange={(e) => setEditingProperty({...editingProperty, capacidade: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-preco">Preço por dia</Label>
                      <Input
                        id="edit-preco"
                        type="number"
                        value={editingProperty.preco}
                        onChange={(e) => setEditingProperty({...editingProperty, preco: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-descricao">Descrição</Label>
                    <textarea
                      id="edit-descricao"
                      className="w-full border border-gray-300 rounded-lg p-3 min-h-20"
                      value={editingProperty.descricao}
                      onChange={(e) => setEditingProperty({...editingProperty, descricao: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSaveEdit} className="flex-1 bg-green-500 hover:bg-green-600">
                    Salvar Alterações
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProperty(null)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Add Property Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Cadastrar Nova Propriedade</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome da Propriedade *</Label>
                    <Input
                      id="nome"
                      value={newProperty.nome}
                      onChange={(e) => setNewProperty({...newProperty, nome: e.target.value})}
                      placeholder="Ex: Chácara Vista Verde"
                    />
                  </div>
                  <div>
                    <Label htmlFor="localizacao">Localização *</Label>
                    <Input
                      id="localizacao"
                      value={newProperty.localizacao}
                      onChange={(e) => setNewProperty({...newProperty, localizacao: e.target.value})}
                      placeholder="Ex: Atibaia, SP"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacidade">Capacidade (pessoas) *</Label>
                      <Input
                        id="capacidade"
                        type="number"
                        value={newProperty.capacidade}
                        onChange={(e) => setNewProperty({...newProperty, capacidade: e.target.value})}
                        placeholder="20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preco">Preço por dia (R$) *</Label>
                      <Input
                        id="preco"
                        type="number"
                        value={newProperty.preco}
                        onChange={(e) => setNewProperty({...newProperty, preco: e.target.value})}
                        placeholder="350"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <textarea
                      id="descricao"
                      className="w-full border border-gray-300 rounded-lg p-3 min-h-20"
                      value={newProperty.descricao}
                      onChange={(e) => setNewProperty({...newProperty, descricao: e.target.value})}
                      placeholder="Descreva sua propriedade..."
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleAddProperty} className="flex-1 bg-green-500 hover:bg-green-600">
                    Cadastrar Propriedade
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProprietarioPropriedades;
