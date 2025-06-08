
import { useState } from 'react';
import { Calendar, Home, Users, CreditCard, CheckSquare, BarChart3, MapPin, Settings, TreePine, FileText, HelpCircle, Plus, Shield, UserPlus, DollarSign, Eye, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard-admin", icon: Home },
  { title: "Usuários", url: "/admin/usuarios", icon: Users },
  { title: "Propriedades", url: "/admin/propriedades", icon: TreePine },
  { title: "Receitas", url: "/admin/receitas", icon: DollarSign },
  { title: "Relatórios", url: "/admin/relatorios", icon: FileText },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

const proprietarioMenuItems = [
  { title: "Dashboard", url: "/dashboard-proprietario", icon: Home },
  { title: "Minhas Propriedades", url: "/proprietario/propriedades", icon: TreePine },
  { title: "Reservas", url: "/proprietario/reservas", icon: Calendar },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Pagamentos", url: "/pagamentos", icon: CreditCard },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

const visitanteMenuItems = [
  { title: "Buscar Chácaras", url: "/dashboard-visitante", icon: MapPin },
  { title: "Minhas Reservas", url: "/visitante/reservas", icon: Calendar },
  { title: "Check-in Digital", url: "/checkin", icon: CheckSquare },
  { title: "Ajuda", url: "/ajuda", icon: HelpCircle },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    switch (user?.type) {
      case 'admin': return adminMenuItems;
      case 'proprietario': return proprietarioMenuItems;
      case 'visitante': return visitanteMenuItems;
      default: return [];
    }
  };

  const getUserTypeLabel = () => {
    switch (user?.type) {
      case 'admin': return 'Administrador';
      case 'proprietario': return 'Proprietário';
      case 'visitante': return 'Visitante';
      default: return 'Usuário';
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r bg-gradient-to-b from-farm-blue-50 to-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-farm-blue-500 to-farm-blue-600 shadow-lg">
            <TreePine className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chácara+</h1>
            <p className="text-sm text-gray-600">{getUserTypeLabel()}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`group transition-all duration-200 hover:bg-farm-blue-100 hover:shadow-sm ${
                      location.pathname === item.url 
                        ? 'bg-farm-blue-500 text-white hover:bg-farm-blue-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                      <item.icon className={`h-5 w-5 transition-colors ${
                        location.pathname === item.url ? 'text-white' : 'text-gray-500'
                      }`} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <div className="rounded-lg bg-gradient-to-r from-farm-orange-500 to-farm-orange-600 p-4 text-white">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs opacity-90">{user?.email}</p>
          </div>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
