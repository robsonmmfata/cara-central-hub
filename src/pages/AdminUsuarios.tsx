
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, UserPlus, Edit, Trash2, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockUsuarios = [
  { id: 1, nome: "João Silva", email: "joao@email.com", tipo: "Proprietário", status: "ativo", ultimoLogin: "Hoje", propriedades: 2 },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", tipo: "Visitante", status: "ativo", ultimoLogin: "Ontem", reservas: 5 },
  { id: 3, nome: "Carlos Oliveira", email: "carlos@email.com", tipo: "Proprietário", status: "pendente", ultimoLogin: "2 dias atrás", propriedades: 1 },
  { id: 4, nome: "Ana Costa", email: "ana@email.com", tipo: "Visitante", status: "ativo", ultimoLogin: "3 dias atrás", reservas: 12 },
];

const AdminUsuarios = () => {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usuarios.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "inativo": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteUser = (userId: number) => {
    setUsuarios(prev => prev.filter(u => u.id !== userId));
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
    });
  };

  const handlePromoteToAdmin = (userId: number) => {
    setUsuarios(prev => prev.map(u => 
      u.id === userId ? { ...u, tipo: "Admin" } : u
    ));
    toast({
      title: "Usuário promovido",
      description: "O usuário agora é um administrador.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-500" />
              Gestão de Usuários
            </h1>
            <p className="text-gray-600 mt-1">Administre todos os usuários da plataforma</p>
          </div>
          <Button className="bg-purple-500 hover:bg-purple-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">{usuarios.length}</p>
            <p className="text-sm text-gray-600">Total Usuários</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{usuarios.filter(u => u.status === 'ativo').length}</p>
            <p className="text-sm text-gray-600">Usuários Ativos</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{usuarios.filter(u => u.tipo === 'Proprietário').length}</p>
            <p className="text-sm text-gray-600">Proprietários</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">{usuarios.filter(u => u.tipo === 'Visitante').length}</p>
            <p className="text-sm text-gray-600">Visitantes</p>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar usuários por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Último Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Atividade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {usuario.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(usuario.status)}>
                        {usuario.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.ultimoLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.tipo === 'Proprietário' ? `${usuario.propriedades} propriedades` : `${usuario.reservas} reservas`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {usuario.tipo !== 'Admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePromoteToAdmin(usuario.id)}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteUser(usuario.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsuarios;
