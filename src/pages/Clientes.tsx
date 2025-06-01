
import { Layout } from "@/components/Layout";
import { ClientCard } from "@/components/ClientCard";
import { NewClientForm } from "@/components/NewClientForm";
import { EditClientForm } from "@/components/EditClientForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Users } from "lucide-react";
import { useState } from "react";

const mockClients = [
  {
    id: '1',
    name: 'João Ribeiro',
    phone: '(11) 91234-5678',
    email: 'joao@email.com',
    reservations: 5,
    totalSpent: 4500,
    status: 'VIP' as const,
  },
  {
    id: '2',
    name: 'Maria Souza',
    phone: '(11) 99888-7766',
    email: 'maria@email.com',
    reservations: 3,
    totalSpent: 2700,
    status: 'Regular' as const,
  },
  {
    id: '3',
    name: 'Carlos Silva',
    phone: '(11) 95555-3322',
    email: 'carlos@email.com',
    reservations: 2,
    totalSpent: 1800,
    status: 'Bloqueado' as const,
  },
  {
    id: '4',
    name: 'Ana Costa',
    phone: '(11) 97777-1234',
    email: 'ana@email.com',
    reservations: 8,
    totalSpent: 6200,
    status: 'VIP' as const,
  },
  {
    id: '5',
    name: 'Pedro Santos',
    phone: '(11) 94444-5678',
    email: 'pedro@email.com',
    reservations: 1,
    totalSpent: 800,
    status: 'Regular' as const,
  },
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const totalClients = mockClients.length;
  const vipClients = mockClients.filter(c => c.status === 'VIP').length;
  const blockedClients = mockClients.filter(c => c.status === 'Bloqueado').length;

  const handleEditClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setShowEditForm(true);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-farm-blue-500" />
              Gestão de Clientes
            </h1>
            <p className="text-gray-600 mt-1">Visualize, edite e adicione novos clientes</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-farm-blue-500 hover:bg-farm-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-farm-blue-50 to-farm-blue-100 border-farm-blue-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-farm-blue-600">{totalClients}</p>
              <p className="text-sm text-gray-600 mt-1">Total de Clientes</p>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{vipClients}</p>
              <p className="text-sm text-gray-600 mt-1">Clientes VIP</p>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-farm-green-50 to-farm-green-100 border-farm-green-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-farm-green-600">{totalClients - blockedClients}</p>
              <p className="text-sm text-gray-600 mt-1">Clientes Ativos</p>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{blockedClients}</p>
              <p className="text-sm text-gray-600 mt-1">Bloqueados</p>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar clientes por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </Card>

        {/* Clients Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de Clientes ({filteredClients.length})
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-farm-blue-100 text-farm-blue-700">
                {vipClients} VIP
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                {blockedClients} Bloqueados
              </Badge>
            </div>
          </div>
          
          {filteredClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <div key={client.id} className="relative">
                  <ClientCard client={client} />
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditClient(client)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
              <p className="text-gray-600">Tente ajustar sua busca ou adicione um novo cliente.</p>
            </Card>
          )}
        </div>

        {/* Modals */}
        <NewClientForm 
          isOpen={showAddForm} 
          onClose={() => setShowAddForm(false)} 
        />
        
        <EditClientForm 
          client={selectedClient} 
          isOpen={showEditForm} 
          onClose={() => setShowEditForm(false)} 
        />
      </div>
    </Layout>
  );
};

export default Clientes;
