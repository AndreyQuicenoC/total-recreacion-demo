import { useMemo, useState } from "react";
import { useApp } from "../../lib/store";
import { PageHeader } from "../../components/common/PageHeader";
import { WithTooltip } from "../../components/common/WithTooltip";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { BarChart3, Download, TrendingUp, Wallet, PiggyBank, CalendarRange, Filter as FilterIcon, MousePointerClick } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";
import { fmtCOP, downloadHtmlAsPdf, BRAND } from "../../lib/helpers";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

type ChartView = "bar" | "pie";

export function EstadisticasPage() {
  const { events, recreators, plans, categories, clicks, computeUtility } = useApp();

  const yearNow = new Date().getFullYear();
  const [start, setStart] = useState<string>(`${yearNow}-01-01`);
  const [end, setEnd] = useState<string>(`${yearNow}-12-31`);
  const [appliedStart, setAppliedStart] = useState<string>(start);
  const [appliedEnd, setAppliedEnd] = useState<string>(end);
  const [recView, setRecView] = useState<ChartView>("bar");
  const [planView, setPlanView] = useState<ChartView>("bar");

  const applyFilter = () => { setAppliedStart(start); setAppliedEnd(end); };

  const data = useMemo(() => {
    const sDate = new Date(appliedStart);
    const eDate = new Date(appliedEnd);
    const filtered = events.filter((e) => {
      const d = new Date(e.date);
      return d >= sDate && d <= eDate;
    });

    const incomeFor = (e: typeof events[number]) => {
      const plan = plans.find((p) => p.id === e.planId);
      return (plan?.basePrice ?? 0) + (plan?.extras.find((x) => x.id === e.selectedExtraId)?.amount ?? 0);
    };
    const expenseFor = (e: typeof events[number]) => {
      const salaries = e.recreatorIds.reduce((s, rid) => s + (recreators.find((r) => r.id === rid)?.salary ?? 0), 0);
      return salaries + (e.transportCost ?? 0) + (e.materialCost ?? 0);
    };

    const totalEvents = filtered.length;
    const totalIncome = filtered.reduce((s, e) => s + incomeFor(e), 0);
    const totalExpenses = filtered.reduce((s, e) => s + expenseFor(e), 0);
    const totalUtility = filtered.reduce((s, e) => s + computeUtility(e), 0);
    const avgIncome = totalEvents ? totalIncome / totalEvents : 0;
    const avgExpense = totalEvents ? totalExpenses / totalEvents : 0;
    const avgUtility = totalEvents ? totalUtility / totalEvents : 0;

    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeks = Math.max(1, (eDate.getTime() - sDate.getTime()) / msInWeek);
    const eventsPerWeek = totalEvents / weeks;

    // Monthly aggregated across years in range. Build full 12 months.
    const monthly = MONTHS.map((m, i) => {
      const evs = filtered.filter((e) => new Date(e.date).getMonth() === i);
      const ingresos = evs.reduce((s, e) => s + incomeFor(e), 0);
      const gastos = evs.reduce((s, e) => s + expenseFor(e), 0);
      const utilidad = ingresos - gastos;
      return { m, eventos: evs.length, ingresos, gastos, utilidad };
    });

    const eventsPerRecreator = recreators.map((r) => ({
      name: r.fullName,
      eventos: filtered.filter((e) => e.recreatorIds.includes(r.id)).length,
    })).filter((x) => x.eventos > 0).sort((a, b) => b.eventos - a.eventos);

    const eventsPerCategoryRaw: Record<string, number> = {};
    filtered.forEach((e) => {
      const plan = plans.find((p) => p.id === e.planId);
      const catId = plan?.categoryId ?? "unknown";
      eventsPerCategoryRaw[catId] = (eventsPerCategoryRaw[catId] ?? 0) + 1;
    });
    const eventsPerCategory = Object.entries(eventsPerCategoryRaw).map(([cid, n]) => ({
      name: categories.find((c) => c.id === cid)?.name ?? "Sin categoría",
      value: n,
    }));

    const eventsPerPlanRaw: Record<string, number> = {};
    filtered.forEach((e) => { eventsPerPlanRaw[e.planId] = (eventsPerPlanRaw[e.planId] ?? 0) + 1; });
    const eventsPerPlan = Object.entries(eventsPerPlanRaw).map(([pid, n]) => ({
      name: plans.find((p) => p.id === pid)?.name ?? "Plan",
      value: n,
    })).sort((a, b) => b.value - a.value);
    const topPlanes = eventsPerPlan.slice(0, 5);

    // Clicks per month (full 12 months range across years inside the filter)
    const clicksFiltered = clicks.filter((c) => {
      const d = new Date(c.at);
      return d >= sDate && d <= eDate;
    });
    const monthlyClicks = MONTHS.map((m, i) => ({
      m,
      clicks: clicksFiltered.filter((c) => new Date(c.at).getMonth() === i).length,
    }));

    return {
      totalEvents, totalIncome, totalExpenses, totalUtility,
      avgIncome, avgExpense, avgUtility, eventsPerWeek,
      monthly, eventsPerRecreator, eventsPerCategory, eventsPerPlan, topPlanes, monthlyClicks,
    };
  }, [events, plans, recreators, categories, clicks, appliedStart, appliedEnd, computeUtility]);

  const cards = [
    { l: "Total eventos", v: data.totalEvents, i: CalendarRange, c: BRAND.red },
    { l: "Eventos por semana", v: data.eventsPerWeek.toFixed(1), i: CalendarRange, c: BRAND.orange },
    { l: "Ingresos totales", v: fmtCOP(data.totalIncome), i: Wallet, c: BRAND.green },
    { l: "Ingresos promedio", v: fmtCOP(data.avgIncome), i: Wallet, c: BRAND.green },
    { l: "Gastos totales", v: fmtCOP(data.totalExpenses), i: PiggyBank, c: BRAND.red },
    { l: "Gastos promedio", v: fmtCOP(data.avgExpense), i: PiggyBank, c: BRAND.red },
    { l: "Utilidad total", v: fmtCOP(data.totalUtility), i: TrendingUp, c: BRAND.yellow },
    { l: "Utilidad promedio", v: fmtCOP(data.avgUtility), i: TrendingUp, c: BRAND.green },
  ];

  const COLORS = [BRAND.red, BRAND.green, BRAND.orange, BRAND.yellow, BRAND.black, "#0D9BD8", "#9333EA", "#EC4899"];

  const generatePdf = () => {
    const html = `
      <div class="brand"><h1>Reporte de Estadísticas · Total Recreación</h1></div>
      <div class="meta">Rango: ${appliedStart} a ${appliedEnd} · Generado ${new Date().toLocaleString("es-CO")}</div>
      <h2>Resumen ejecutivo</h2>
      <div class="grid">
        ${cards.map((c) => `<div class="card"><div class="label">${c.l}</div><div><strong>${c.v}</strong></div></div>`).join("")}
      </div>
      <h2>Ingresos, gastos y utilidad mensual</h2>
      <table><thead><tr><th>Mes</th><th>Eventos</th><th>Ingresos</th><th>Gastos</th><th>Utilidad</th></tr></thead>
      <tbody>${data.monthly.map((r) => `<tr><td>${r.m}</td><td>${r.eventos}</td><td>${fmtCOP(r.ingresos)}</td><td>${fmtCOP(r.gastos)}</td><td>${fmtCOP(r.utilidad)}</td></tr>`).join("")}</tbody></table>
      <h2>Eventos por recreador</h2>
      <table><thead><tr><th>Recreador</th><th>Eventos</th></tr></thead>
      <tbody>${data.eventsPerRecreator.map((r) => `<tr><td>${r.name}</td><td>${r.eventos}</td></tr>`).join("")}</tbody></table>
      <h2>Distribución por categoría</h2>
      <table><thead><tr><th>Categoría</th><th>Eventos</th></tr></thead>
      <tbody>${data.eventsPerCategory.map((c) => `<tr><td>${c.name}</td><td>${c.value}</td></tr>`).join("")}</tbody></table>
      <h2>Top 5 planes</h2>
      <table><thead><tr><th>Plan</th><th>Eventos</th></tr></thead>
      <tbody>${data.topPlanes.map((p) => `<tr><td>${p.name}</td><td>${p.value}</td></tr>`).join("")}</tbody></table>
      <h2>Clicks por mes</h2>
      <table><thead><tr><th>Mes</th><th>Clicks</th></tr></thead>
      <tbody>${data.monthlyClicks.map((c) => `<tr><td>${c.m}</td><td>${c.clicks}</td></tr>`).join("")}</tbody></table>
      <p style="margin-top:32px;color:#777;font-size:11px">Reporte generado automáticamente — Total Recreación · ISO/IEC 25010</p>
    `;
    downloadHtmlAsPdf("Estadisticas_TotalRecreacion", html);
  };

  return (
    <>
      <PageHeader
        title="Estadísticas" subtitle="Visión 360° de la operación recreativa." icon={<BarChart3 className="size-5" />}
        actions={<Button onClick={generatePdf} className="bg-[#F23545] hover:bg-[#d92a39]"><Download className="size-4 mr-1" /> Generar PDF</Button>}
      />

      <Card className="mb-5">
        <CardContent className="p-4 flex flex-wrap gap-3 items-end">
          <div>
            <Label className="text-xs">Desde</Label>
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Hasta</Label>
            <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
          <Button onClick={applyFilter} className="bg-[#F23545] hover:bg-[#d92a39]"><FilterIcon className="size-4 mr-1" /> Filtrar</Button>
          <div className="ml-auto text-sm text-muted-foreground">
            Rango aplicado: <strong>{appliedStart}</strong> → <strong>{appliedEnd}</strong>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((c) => (
            <Card key={c.l} className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1" style={{ background: c.c }} />
              <CardContent className="p-4 pl-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{c.l}</div>
                  <c.i className="size-4" style={{ color: c.c }} />
                </div>
                <div className="text-xl font-bold mt-1">{c.v}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <ChartCard title="Ingresos por mes">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="m" /><YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number | string) => fmtCOP(Number(v))} />
                <Bar dataKey="ingresos" fill={BRAND.green} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Gastos por mes">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="m" /><YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number | string) => fmtCOP(Number(v))} />
                <Bar dataKey="gastos" fill={BRAND.red} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Utilidad por mes">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="m" /><YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number | string) => fmtCOP(Number(v))} />
                <Bar dataKey="utilidad" fill={BRAND.orange} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Eventos por mes">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="m" /><YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="eventos" fill={BRAND.yellow} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard
          title="Eventos por recreador"
          actions={<ToggleView view={recView} onChange={setRecView} />}
        >
          {data.eventsPerRecreator.length === 0 ? <Empty msg="Sin datos en el rango seleccionado." /> : recView === "bar" ? (
            <ResponsiveContainer width="100%" height={Math.max(260, data.eventsPerRecreator.length * 32)}>
              <BarChart data={data.eventsPerRecreator} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={140} />
                <Tooltip />
                <Bar dataKey="eventos" fill={BRAND.red} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={data.eventsPerRecreator} dataKey="eventos" nameKey="name" outerRadius={110} label>
                  {data.eventsPerRecreator.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <div className="grid lg:grid-cols-2 gap-4">
          <ChartCard title="Distribución por categoría">
            {data.eventsPerCategory.length === 0 ? <Empty msg="Sin datos." /> : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={data.eventsPerCategory} dataKey="value" nameKey="name" outerRadius={100} label>
                    {data.eventsPerCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard
            title="Eventos por plan"
            actions={<ToggleView view={planView} onChange={setPlanView} />}
          >
            {data.eventsPerPlan.length === 0 ? <Empty msg="Sin datos." /> : planView === "bar" ? (
              <ResponsiveContainer width="100%" height={Math.max(260, data.eventsPerPlan.length * 28)}>
                <BarChart data={data.eventsPerPlan} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={140} />
                  <Tooltip />
                  <Bar dataKey="value" name="eventos" fill={BRAND.orange} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={data.eventsPerPlan} dataKey="value" nameKey="name" outerRadius={110} label>
                    {data.eventsPerPlan.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        <ChartCard title="Top 5 planes">
          {data.topPlanes.length === 0 ? <Empty msg="Sin datos." /> : (
            <ol className="space-y-2">
              {data.topPlanes.map((p, i) => (
                <li key={p.name} className="flex items-center gap-3 text-sm">
                  <Badge className="bg-[#F23545]">{i + 1}</Badge>
                  <span className="flex-1 truncate">{p.name}</span>
                  <Badge variant="secondary">{p.value} evento(s)</Badge>
                </li>
              ))}
            </ol>
          )}
        </ChartCard>

        <ChartCard title="Clicks por mes" icon={<MousePointerClick className="size-4" />}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.monthlyClicks}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="m" /><YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="clicks" fill={BRAND.green} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  );
}

function ChartCard({ title, children, actions, icon }: { title: string; children: React.ReactNode; actions?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Card><CardContent className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">{icon}{title}</h3>
        {actions}
      </div>
      {children}
    </CardContent></Card>
  );
}

function ToggleView({ view, onChange }: { view: ChartView; onChange: (v: ChartView) => void }) {
  return (
    <div className="inline-flex rounded-md border p-0.5 text-xs" role="group" aria-label="Tipo de gráfica">
      <WithTooltip label="Ver gráfica de barras">
        <button type="button" onClick={() => onChange("bar")} aria-pressed={view === "bar"} className={`px-2.5 py-1 rounded ${view === "bar" ? "bg-[#F23545] text-white" : "hover:bg-muted"}`}>Barras</button>
      </WithTooltip>
      <WithTooltip label="Ver gráfica circular">
        <button type="button" onClick={() => onChange("pie")} aria-pressed={view === "pie"} className={`px-2.5 py-1 rounded ${view === "pie" ? "bg-[#F23545] text-white" : "hover:bg-muted"}`}>Torta</button>
      </WithTooltip>
    </div>
  );
}

function Empty({ msg }: { msg: string }) {
  return <p className="text-center text-muted-foreground text-sm py-12">{msg}</p>;
}
