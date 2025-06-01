
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TreePine, Users, Calendar, CreditCard, CheckSquare, MapPin, Shield, Star, Phone, Mail, MapPin as Location, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400">
            <TreePine className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Chácara+</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-white/90 hover:text-white transition-colors">Como funciona</a>
          <a href="#depoimentos" className="text-white/90 hover:text-white transition-colors">Depoimentos</a>
          <a href="#contato" className="text-white/90 hover:text-white transition-colors">Contato</a>
          <Link to="/login">
            <Button className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-full">
              Entrar
            </Button>
          </Link>
        </nav>
      </header>

      {/* Decorative Circle */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-500/30 rounded-full blur-3xl"></div>
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          O sistema que deixa sua<br />
          <span className="text-teal-300">chácara no controle</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
          Reservas, clientes, pagamentos e tarefas — tudo em um só lugar.
        </p>
        
        <Button className="bg-teal-400 hover:bg-teal-300 text-teal-900 px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          Ver como funciona
        </Button>
      </main>

      {/* Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-32 fill-teal-500/30">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Features Section */}
      <section id="como-funciona" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Como funciona o Chácara+</h2>
            <p className="text-xl text-gray-600">Sistema completo de administração para sua propriedade rural</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Para Visitantes</h3>
              <p className="text-gray-600">Encontre e reserve chácaras disponíveis através de filtros personalizados por data e localização.</p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TreePine className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Para Proprietários</h3>
              <p className="text-gray-600">Gerencie suas propriedades, reservas, clientes e pagamentos em um só lugar.</p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Para Administradores</h3>
              <p className="text-gray-600">Controle total da plataforma com relatórios avançados e gestão completa do sistema.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-600 mb-8">Cadastre-se gratuitamente e comece a usar o Chácara+ hoje mesmo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg rounded-full">
                Criar conta gratuita
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 text-lg rounded-full">
                Fazer login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400">
                  <TreePine className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Chácara+</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Sistema completo de administração para propriedades rurais. 
                Controle de reservas, clientes, pagamentos e tarefas, tudo em um só lugar.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">Como funciona</a></li>
                <li><Link to="/cadastro" className="text-gray-300 hover:text-white transition-colors">Cadastre-se</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Planos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Suporte</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">(11) 9999-9999</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">contato@chacaramais.com.br</span>
                </li>
                <li className="flex items-center gap-3">
                  <Location className="h-5 w-5 text-teal-400" />
                  <span className="text-gray-300">São Paulo, SP</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Chácara+. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
