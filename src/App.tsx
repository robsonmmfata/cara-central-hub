
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Index from "./pages/Index";
import Clientes from "./pages/Clientes";
import CheckIn from "./pages/CheckIn";
import DashboardVisitante from "./pages/DashboardVisitante";
import DashboardProprietario from "./pages/DashboardProprietario";
import DashboardAdmin from "./pages/DashboardAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/dashboard-visitante" element={<DashboardVisitante />} />
          <Route path="/dashboard-proprietario" element={<DashboardProprietario />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/reservas" element={<Index />} />
          <Route path="/pagamentos" element={<Index />} />
          <Route path="/tarefas" element={<Index />} />
          <Route path="/localizacao" element={<Index />} />
          <Route path="/configuracoes" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
