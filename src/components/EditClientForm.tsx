
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'VIP' | 'Regular' | 'Bloqueado';
}

interface EditClientFormProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditClientForm({ client, isOpen, onClose }: EditClientFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: client?.name || '',
    email: client?.email || '',
    telefone: client?.phone || '',
    status: client?.status || 'Regular'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cliente editado:', formData);
    toast({
      title: "Cliente atualizado!",
      description: `${formData.nome} foi atualizado com sucesso.`,
    });
    onClose();
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Editar Cliente</h2>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <Input 
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <Input 
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
                <option value="Bloqueado">Bloqueado</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-farm-blue-500 hover:bg-farm-blue-600">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
