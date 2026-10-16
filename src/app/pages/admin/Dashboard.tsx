import { useMemo } from "react";
import { useApp } from "../../lib/store";
import { PageHeader } from "../../components/common/PageHeader";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { LayoutDashboard, CalendarRange, TrendingUp, Users, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { fmtDate, fmtCOP } from "../../lib/helpers";
import { motion } from "motion/react";

export function DashboardPage() {
  const { events, recreators, plans, clients, computeUtility } = useApp();

  const stats = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const eventsInYear = events.filter((e) => new Date(e.date).getFullYear() === year);
    const eventsInMonth = eventsInYear.filter((e) => new Date(e.date).getMonth() === month);
    const upcoming = events
      .filter((e) => new Date(e.date) >= new Date(now.toDateString()))
      .sort((a, b) => a.date.localeCompare(b.date));
    const weekStart = new Date(now); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6);
    const inWeek = events.filter((e) => {
      const d = new Date(e.date); return d >= weekStart && d <= weekEnd;
    });
    const avgPerMonth = eventsInYear.length / (month + 1);
    const avgPerWeek = eventsInYear.length / Math.max(1, Math.ceil(((now.getTime() - new Date(year, 0, 1).getTime()) / 86400000) / 7));
    const utilityYear = eventsInYear.reduce((sum, e) => sum + computeUtility(e), 0);
    return { eventsInYear, eventsInMonth, upcoming, inWeek, avgPerMonth, avgPerWeek, utilityYear };
  }, [events, computeUtility]);

  const cards = [
    { l: "Eventos del mes", v: stats.eventsInMonth.length, i: CalendarRange, c: "#F23545" },
    { l: "Eventos del año", v: stats.eventsInYear.length, i: TrendingUp, c: "#F27B35" },
    { l: "Promedio semanal", v: stats.avgPerWeek.toFixed(1), i: Sparkles, c: "#6BBF54" },
    { l: "Promedio mensual", v: stats.avgPerMonth.toFixed(1), i: LayoutDashboard, c: "#0D9BD8" },
    { l: "Utilidad anual", v: fmtCOP(stats.utilityYear), i: TrendingUp, c: "#F2E313", dark: true },
    { l: "Equipo activo", v: recreators.length, i: Users, c: "#0D0D0D" },
  ];

  return (
    <>
      <PageHeader title={`Hola, bienvenido de vuelta 👋`} subtitle="Resumen ejecutivo de tu operación de recreación" icon={<LayoutDashboard className="size-5" />} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <motion.div key={c.l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="border-0 shadow-sm overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: c.c }} />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{c.l}</div>
                  <div className="size-9 rounded-lg grid place-items-center" style={{ background: c.c + "22", color: c.dark ? "#0D0D0D" : c.c }}>
                    <c.i className="size-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">{c.v}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Próximos eventos</h2>
              <Link to="/admin/agenda" className="text-sm text-[#F23545] hover:underline">Ir a Agenda →</Link>
            </div>
            <ul className="divide-y">
              {stats.upcoming.slice(0, 6).map((e) => {
                const plan = plans.find((p) => p.id === e.planId);
                const client = clients.find((c) => c.id === e.clientId);
                return (
                  <li key={e.id} className="py-3 flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-gradient-to-br from-[#F23545] to-[#F27B35] text-white grid place-items-center text-sm font-bold">
                      {new Date(e.date).getDate()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{fmtDate(e.date)} · {e.startTime}–{e.endTime} · {client?.name}</div>
                    </div>
                    <Badge variant="outline" className="hidden sm:inline-flex">{plan?.name}</Badge>
                  </li>
                );
              })}
              {stats.upcoming.length === 0 && <li className="py-6 text-center text-muted-foreground text-sm">Sin eventos próximos.</li>}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="font-semibold mb-4">Esta semana</h2>
            <div className="text-3xl font-bold">{stats.inWeek.length} <span className="text-base font-normal text-muted-foreground">eventos</span></div>
            <ul className="mt-4 space-y-3">
              {stats.inWeek.slice(0, 5).map((e) => (
                <li key={e.id} className="text-sm">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {fmtDate(e.date)} · {e.recreatorIds.map((rid) => recreators.find((r) => r.id === rid)?.fullName.split(" ")[0]).join(", ")}
                  </div>
                </li>
              ))}
              {stats.inWeek.length === 0 && <li className="text-muted-foreground text-sm">Semana libre. ¡Buen momento para planear!</li>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
