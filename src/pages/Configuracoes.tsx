
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, User, Mail, Lock, MapPin, Phone, Shield, Bell } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const Configuracoes = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo, SP',
    cep: '01234-567',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
    notificacoes: true,
    emailMarketing: false,
    foto: '/placeholder.svg'
  });

  const handleSave = () => {
    console.log('Salvando configurações:', userData);
    
    // Validar senhas se estiverem preenchidas
    if (userData.novaSenha || userData.confirmarSenha || userData.senhaAtual) {
      if (!userData.senhaAtual) {
        toast({
          title: "Erro",
          description: "Digite sua senha atual para alterar a senha.",
          variant: "destructive"
        });
        return;
      }
      
      if (userData.novaSenha !== userData.confirmarSenha) {
        toast({
          title: "Erro",
          description: "As novas senhas não coincidem.",
          variant: "destructive"
        });
        return;
      }
      
      if (userData.novaSenha.length < 6) {
        toast({
          title: "Erro",
          description: "A nova senha deve ter pelo menos 6 caracteres.",
          variant: "destructive"
        });
        return;
      }
    }

    // Simular salvamento
    toast({
      title: "Configurações salvas!",
      description: "Suas informações foram atualizadas com sucesso.",
    });

    // Limpar campos de senha após salvar
    setUserData(prev => ({
      ...prev,
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: ''
    }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validações
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive"
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 2MB.",
          variant: "destructive"
        });
        return;
      }

      // Criar URL da imagem
      const imageUrl = URL.createObjectURL(file);
      setUserData(prev => ({ ...prev, foto: imageUrl }));
      
      console.log('Foto atualizada:', file.name);
      toast({
        title: "Foto atualizada!",
        description: "Sua foto de perfil foi alterada com sucesso.",
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    console.log(`Campo ${field} alterado para:`, value);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo */}
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Foto de Perfil
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={userData.foto} alt="Foto de perfil" />
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              
              <Button onClick={triggerFileInput} variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Alterar Foto
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Formatos aceitos: JPG, PNG, GIF<br />
                Tamanho máximo: 2MB
              </p>
            </div>
          </Card>

          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={userData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="telefone"
                      className="pl-10"
                      value={userData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Endereço
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={userData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={userData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={userData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Account Security */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Segurança da Conta
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Alterar Senha
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input
                    id="senha-atual"
                    type="password"
                    value={userData.senhaAtual}
                    onChange={(e) => handleInputChange('senhaAtual', e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input
                      id="nova-senha"
                      type="password"
                      value={userData.novaSenha}
                      onChange={(e) => handleInputChange('novaSenha', e.target.value)}
                      placeholder="Digite a nova senha"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmar-senha"
                      type="password"
                      value={userData.confirmarSenha}
                      onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                      placeholder="Confirme a nova senha"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações de Reservas</p>
                    <p className="text-sm text-gray-600">Receba alertas sobre suas reservas</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userData.notificacoes}
                      onChange={(e) => handleInputChange('notificacoes', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">E-mails de Marketing</p>
                    <p className="text-sm text-gray-600">Receba ofertas e novidades</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userData.emailMarketing}
                      onChange={(e) => handleInputChange('emailMarketing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700 px-8">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Configuracoes;
