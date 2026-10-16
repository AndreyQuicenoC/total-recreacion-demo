import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { AppProvider } from "./lib/store";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { LandingPage } from "./pages/Landing";
import { AboutPage } from "./pages/About";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/admin/Dashboard";
import { RecreadoresPage } from "./pages/admin/Recreadores";
import { ClientesPage } from "./pages/admin/Clientes";
import { EtiquetasPage } from "./pages/admin/Etiquetas";
import { CategoriasPage } from "./pages/admin/Categorias";
import { PlanesPage } from "./pages/admin/Planes";
import { MaterialPage } from "./pages/admin/Material";
import { AgendaPage } from "./pages/admin/Agenda";
import { AgendaDetailPage } from "./pages/admin/AgendaDetail";
import { EstadisticasPage } from "./pages/admin/Estadisticas";
import { PerfilPage } from "./pages/admin/Perfil";

export default function App() {
  return (
    <AppProvider>
      <TooltipProvider delayDuration={300}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="sobre-nosotros" element={<AboutPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="recreadores" element={<RecreadoresPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="etiquetas" element={<EtiquetasPage />} />
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="planes" element={<PlanesPage />} />
            <Route path="material" element={<MaterialPage />} />
            <Route path="agenda" element={<AgendaPage />} />
            <Route path="agenda/:id" element={<AgendaDetailPage />} />
            <Route path="estadisticas" element={<EstadisticasPage />} />
            <Route path="perfil" element={<PerfilPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  );
}
