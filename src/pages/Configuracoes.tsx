
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, User, Mail, Lock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Configuracoes = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo, SP',
    senha: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const handleSave = () => {
    console.log('Dados salvos:', userData);
    toast({
      title: "Configurações salvas!",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const handlePhotoChange = () => {
    toast({
      title: "Foto atualizada!",
      description: "Sua foto de perfil foi alterada.",
    });
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
            <h2 className="text-xl font-semibold mb-4">Foto de Perfil</h2>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
              <Button onClick={handlePhotoChange} variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Alterar Foto
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB
              </p>
            </div>
          </Card>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
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
                    onChange={(e) => setUserData({...userData, nome: e.target.value})}
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
                      onChange={(e) => setUserData({...userData, telefone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Endereço
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={userData.endereco}
                    onChange={(e) => setUserData({...userData, endereco: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={userData.cidade}
                    onChange={(e) => setUserData({...userData, cidade: e.target.value})}
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
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input
                    id="senha-atual"
                    type="password"
                    value={userData.senha}
                    onChange={(e) => setUserData({...userData, senha: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input
                      id="nova-senha"
                      type="password"
                      value={userData.novaSenha}
                      onChange={(e) => setUserData({...userData, novaSenha: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmar-senha"
                      type="password"
                      value={userData.confirmarSenha}
                      onChange={(e) => setUserData({...userData, confirmarSenha: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-farm-blue-500 hover:bg-farm-blue-600 px-8">
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
