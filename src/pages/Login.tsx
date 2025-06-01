
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TreePine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login baseado no email
    if (email.includes("admin")) {
      navigate("/dashboard-admin");
    } else if (email.includes("proprietario")) {
      navigate("/dashboard-proprietario");
    } else {
      navigate("/dashboard-visitante");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400">
              <TreePine className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Chácara+</h1>
          </div>
          <p className="text-teal-100">Entre na sua conta</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link to="/cadastro" className="text-teal-600 hover:text-teal-700 font-medium">
                  Cadastre-se
                </Link>
              </p>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                Voltar ao início
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Contas de teste:</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>Admin: admin@teste.com</p>
                <p>Proprietário: proprietario@teste.com</p>
                <p>Visitante: visitante@teste.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
