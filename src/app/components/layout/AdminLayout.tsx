import { useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate, useLocation } from "react-router";
import { useApp } from "../../lib/store";
import { LogoMark } from "../common/LogoMark";
import { motion } from "motion/react";
import {
  LayoutDashboard, Users, Contact, Tags, FolderKanban, PackagePlus, Boxes,
  CalendarRange, BarChart3, UserCog, LogOut, Menu, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner";
import { WithTooltip } from "../common/WithTooltip";

const NAV = [
  { to: "/admin", label: "Inicio", icon: LayoutDashboard, end: true },
  { to: "/admin/recreadores", label: "Equipo de recreadores", icon: Users },
  { to: "/admin/clientes", label: "Clientes", icon: Contact },
  { to: "/admin/etiquetas", label: "Etiquetas", icon: Tags },
  { to: "/admin/categorias", label: "Categorías de planes", icon: FolderKanban },
  { to: "/admin/planes", label: "Planes", icon: PackagePlus },
  { to: "/admin/material", label: "Material", icon: Boxes },
  { to: "/admin/agenda", label: "Agenda", icon: CalendarRange },
  { to: "/admin/estadisticas", label: "Estadísticas", icon: BarChart3 },
];

export function AdminLayout() {
  const { authed, admin, logout } = useApp();
  const nav = useNavigate();
  const location = useLocation();
  const [openMobile, setOpenMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (!authed) return <Navigate to="/login" replace />;

  const initials = admin.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-foreground flex">
      <a
        href="#contenido-admin"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-2 focus:rounded-md focus:bg-[#F23545] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Saltar al contenido principal
      </a>
      <aside
        className={`fixed lg:static z-40 inset-y-0 left-0 bg-[#0D0D0D] text-white flex flex-col transform transition-all ${openMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${collapsed ? "w-16" : "w-72"}`}
        aria-label="Navegación administrativa"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          {!collapsed && <div className="bg-white rounded-lg p-2"><LogoMark size={32} /></div>}
          <WithTooltip label="Cerrar menú">
            <button type="button" className="lg:hidden text-white/70" onClick={() => setOpenMobile(false)} aria-label="Cerrar menú"><X className="size-5" /></button>
          </WithTooltip>
          <WithTooltip label={collapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}>
            <button
              type="button"
              className="hidden lg:inline-flex text-white/70 hover:text-white p-1 rounded hover:bg-white/10"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {collapsed ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
            </button>
          </WithTooltip>
        </div>
        <nav className="p-2 flex-1 overflow-y-auto">
          {NAV.map((n) => (
            <NavLink
              key={n.to} to={n.to} end={n.end}
              onClick={() => setOpenMobile(false)}
              title={collapsed ? n.label : undefined}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm my-0.5 transition-colors ${isActive ? "bg-[#F23545] text-white shadow" : "text-white/75 hover:bg-white/10 hover:text-white"} ${collapsed ? "justify-center" : ""}`
              }
            >
              <n.icon className="size-4 shrink-0" />
              {!collapsed && <span>{n.label}</span>}
            </NavLink>
          ))}
        </nav>
        {!collapsed && (
          <div className="p-4 border-t border-white/10 text-xs text-white/40">
            v1.0 · ISO/IEC 25010
          </div>
        )}
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 px-4 border-b bg-white flex items-center gap-3 sticky top-0 z-30">
          <WithTooltip label="Abrir menú de navegación">
            <button type="button" onClick={() => setOpenMobile(true)} className="lg:hidden p-2 rounded hover:bg-muted" aria-label="Abrir menú"><Menu className="size-5" /></button>
          </WithTooltip>
          <div className="ml-auto flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <WithTooltip label={`Menú de usuario: ${admin.name}`}>
                  <button type="button" className="flex items-center gap-2 rounded-full hover:bg-muted px-2 py-1" aria-label="Menú de usuario">
                    <Avatar className="size-8"><AvatarFallback className="bg-[#F23545] text-white text-xs">{initials}</AvatarFallback></Avatar>
                    <span className="hidden sm:inline text-sm">{admin.name}</span>
                  </button>
                </WithTooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="text-sm font-medium">{admin.name}</div>
                  <div className="text-xs text-muted-foreground">{admin.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => nav("/admin/perfil")}><UserCog className="size-4 mr-2" /> Editar perfil</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => { logout(); toast.success("Sesión cerrada correctamente."); nav("/"); }}
                  className="text-red-600 focus:text-red-600"
                ><LogOut className="size-4 mr-2" /> Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <motion.main
          id="contenido-admin"
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="p-4 sm:p-6 max-w-[1400px] mx-auto w-full"
          tabIndex={-1}
        >
          <Outlet />
        </motion.main>
      </div>

      {openMobile && <div className="fixed inset-0 bg-black/40 lg:hidden z-30" onClick={() => setOpenMobile(false)} />}

      <Button asChild
        className="fixed right-5 bottom-5 z-40 rounded-full size-12 p-0 bg-[#6BBF54] hover:bg-[#5fae4a] shadow-lg"
        aria-label="Volver al sitio público"
        tooltip="Volver al sitio público"
      >
        <NavLink to="/"><LayoutDashboard className="size-5" /></NavLink>
      </Button>
    </div>
  );
}
