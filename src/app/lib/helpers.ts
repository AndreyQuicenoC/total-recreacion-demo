export const BRAND = {
  red: "#F23545",
  green: "#6BBF54",
  yellow: "#F2E313",
  orange: "#F27B35",
  black: "#0D0D0D",
  whatsapp: "+573043677885",
};

export const fmtCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

export const fmtDate = (d: string) => {
  try {
    return new Date(d + (d.length === 10 ? "T00:00:00" : "")).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return d; }
};

export const yearsBetween = (iso: string) => {
  const start = new Date(iso); const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years--;
  return Math.max(0, years);
};

export const normalizePhone = (phone: string) => {
  const digits = (phone ?? "").replace(/[^\d]/g, "");
  if (!digits) return "";
  // Already includes a country code (Colombia mobile = 10 digits without code, ~12 with 57)
  if (digits.length >= 11) return digits;
  if (digits.length === 10) return `57${digits}`; // assume Colombia
  return digits;
};

export const whatsappLink = (msg: string, phone = BRAND.whatsapp) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(msg)}`;

export const googleCalendarLink = (opts: {
  title: string; date: string; start: string; end: string; description: string; location: string;
}) => {
  const fmt = (d: string, t: string) => {
    const dt = new Date(`${d}T${t}:00`);
    const pad = (n: number) => String(n).padStart(2, "0");
    // local time without offset — Google interprets as floating; safer to use Z
    return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`;
  };
  const dates = `${fmt(opts.date, opts.start)}/${fmt(opts.date, opts.end)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates,
    details: opts.description,
    location: opts.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadHtmlAsPdf = (title: string, html: string) => {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
  <style>
    body{font-family:-apple-system,system-ui,Segoe UI,Roboto,sans-serif;color:#111;padding:32px;line-height:1.5}
    h1{color:#F23545;margin:0 0 8px;font-size:26px} h2{color:#0D0D0D;margin:24px 0 8px;border-bottom:2px solid #F2E313;padding-bottom:4px;font-size:18px}
    .meta{color:#555;margin-bottom:24px;font-size:13px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .card{border:1px solid #eee;border-radius:8px;padding:12px;background:#fafafa}
    .label{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:.5px}
    table{width:100%;border-collapse:collapse;margin-top:8px} th,td{text-align:left;padding:6px;border-bottom:1px solid #eee;font-size:13px}
    ul{margin:6px 0;padding-left:18px} li{margin:2px 0}
    .brand{display:flex;align-items:center;gap:10px;border-bottom:3px solid #F23545;padding-bottom:12px;margin-bottom:16px}
    .badge{display:inline-block;background:#F2E313;color:#0D0D0D;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600}
    @media print{ body{padding:14px} .no-print{display:none} }
  </style></head><body>${html}
  <script>window.onload=()=>setTimeout(()=>window.print(),350)</script>
  </body></html>`);
  w.document.close();
};

export const monthKey = (d: string) => d.slice(0, 7);
export const weekKey = (d: string) => {
  const date = new Date(d);
  const onejan = new Date(date.getFullYear(), 0, 1);
  const week = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
};
