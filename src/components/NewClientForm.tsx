
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (clientData: any) => void;
}

export function NewClientForm({ isOpen, onClose, onSave }: NewClientFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    tipoCliente: '',
    observacoes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo cliente:', formData);
    
    if (onSave) {
      onSave(formData);
    }
    
    toast({
      title: "Cliente adicionado!",
      description: `${formData.nome} foi adicionado com sucesso.`,
    });
    
    onClose();
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      genero: '',
      tipoCliente: '',
      observacoes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Adicionar Novo Cliente</h2>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                <Input 
                  placeholder="Nome completo" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de nascimento</label>
                <Input 
                  type="date" 
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.genero}
                onChange={(e) => setFormData({...formData, genero: e.target.value})}
              >
                <option value="">Selecione o gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <Input 
                  placeholder="(00) 00000-0000" 
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <Input 
                  type="email"
                  placeholder="exemplo@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cliente</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.tipoCliente}
                onChange={(e) => setFormData({...formData, tipoCliente: e.target.value})}
              >
                <option value="">Selecione o tipo de cliente</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações gerais</label>
              <textarea 
                placeholder="Histórico, detalhes importantes, etc."
                className="w-full border border-gray-300 rounded-lg p-3 h-24"
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-farm-blue-500 hover:bg-farm-blue-600">
                Salvar Cliente
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
