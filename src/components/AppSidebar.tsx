
import { useState } from 'react';
import { Calendar, Home, Users, CreditCard, CheckSquare, BarChart3, MapPin, Settings, TreePine } from 'lucide-react';
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

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Reservas",
    url: "/reservas",
    icon: Calendar,
  },
  {
    title: "Check-in Digital",
    url: "/checkin",
    icon: CheckSquare,
  },
  {
    title: "Pagamentos",
    url: "/pagamentos",
    icon: CreditCard,
  },
  {
    title: "Tarefas",
    url: "/tarefas",
    icon: BarChart3,
  },
  {
    title: "Localização",
    url: "/localizacao",
    icon: MapPin,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r bg-gradient-to-b from-farm-blue-50 to-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-farm-blue-500 to-farm-blue-600 shadow-lg">
            <TreePine className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chácara+</h1>
            <p className="text-sm text-gray-600">Sistema de Gestão</p>
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
        <div className="rounded-lg bg-gradient-to-r from-farm-orange-500 to-farm-orange-600 p-4 text-white">
          <p className="text-sm font-medium">Versão 1.0</p>
          <p className="text-xs opacity-90">Sistema Chácara+</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
