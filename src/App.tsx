
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppDataProvider } from "@/context/AppDataContext";
import { ReservationProvider } from "@/context/ReservationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import CheckIn from "./pages/CheckIn";
import Localizacao from "./pages/Localizacao";
import Tarefas from "./pages/Tarefas";
import Pagamentos from "./pages/Pagamentos";
import Ajuda from "./pages/Ajuda";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import DashboardVisitante from "./pages/DashboardVisitante";
import DashboardProprietario from "./pages/DashboardProprietario";
import DashboardAdmin from "./pages/DashboardAdmin";
import ReservaChacara from "./pages/ReservaChacara";
import NotFound from "./pages/NotFound";

// New Admin Pages
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminPropriedades from "./pages/AdminPropriedades";
import AdminReceitas from "./pages/AdminReceitas";

// New Proprietario Pages
import ProprietarioPropriedades from "./pages/ProprietarioPropriedades";

// New Visitante Pages
import VisitanteReservas from "./pages/VisitanteReservas";

const queryClient = new QueryClient();

function DashboardRedirect() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.type) {
    case 'admin':
      return <Navigate to="/dashboard-admin" replace />;
    case 'proprietario':
      return <Navigate to="/dashboard-proprietario" replace />;
    case 'visitante':
      return <Navigate to="/dashboard-visitante" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={isAuthenticated ? <DashboardRedirect /> : <Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* Protected routes - redirect to dashboard based on user type */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRedirect />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/dashboard-admin" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <DashboardAdmin />
        </ProtectedRoute>
      } />
      <Route path="/admin/usuarios" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <AdminUsuarios />
        </ProtectedRoute>
      } />
      <Route path="/admin/propriedades" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <AdminPropriedades />
        </ProtectedRoute>
      } />
      <Route path="/admin/receitas" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <AdminReceitas />
        </ProtectedRoute>
      } />
      <Route path="/admin/relatorios" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <Relatorios />
        </ProtectedRoute>
      } />
      
      {/* Proprietario routes */}
      <Route path="/dashboard-proprietario" element={
        <ProtectedRoute allowedTypes={['proprietario']}>
          <DashboardProprietario />
        </ProtectedRoute>
      } />
      <Route path="/proprietario/propriedades" element={
        <ProtectedRoute allowedTypes={['proprietario']}>
          <ProprietarioPropriedades />
        </ProtectedRoute>
      } />
      <Route path="/proprietario/reservas" element={
        <ProtectedRoute allowedTypes={['proprietario']}>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/clientes" element={
        <ProtectedRoute allowedTypes={['proprietario', 'admin']}>
          <Clientes />
        </ProtectedRoute>
      } />
      <Route path="/pagamentos" element={
        <ProtectedRoute allowedTypes={['proprietario', 'admin']}>
          <Pagamentos />
        </ProtectedRoute>
      } />
      <Route path="/relatorios" element={
        <ProtectedRoute allowedTypes={['proprietario', 'admin']}>
          <Relatorios />
        </ProtectedRoute>
      } />
      
      {/* Visitante routes */}
      <Route path="/dashboard-visitante" element={
        <ProtectedRoute allowedTypes={['visitante']}>
          <DashboardVisitante />
        </ProtectedRoute>
      } />
      <Route path="/visitante/reservas" element={
        <ProtectedRoute allowedTypes={['visitante']}>
          <VisitanteReservas />
        </ProtectedRoute>
      } />
      <Route path="/reserva-chacara" element={
        <ProtectedRoute allowedTypes={['visitante']}>
          <ReservaChacara />
        </ProtectedRoute>
      } />
      
      {/* Shared routes */}
      <Route path="/checkin" element={
        <ProtectedRoute>
          <CheckIn />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <Configuracoes />
        </ProtectedRoute>
      } />
      <Route path="/ajuda" element={
        <ProtectedRoute>
          <Ajuda />
        </ProtectedRoute>
      } />
      
      {/* Legacy routes - redirect to appropriate dashboard */}
      <Route path="/reservas" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/localizacao" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <Localizacao />
        </ProtectedRoute>
      } />
      <Route path="/tarefas" element={
        <ProtectedRoute allowedTypes={['admin']}>
          <Tarefas />
        </ProtectedRoute>
      } />
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppDataProvider>
          <ReservationProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ReservationProvider>
        </AppDataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
