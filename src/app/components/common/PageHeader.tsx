import { motion } from "motion/react";

export function PageHeader({
  title, subtitle, actions, icon,
}: { title: string; subtitle?: string; actions?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="flex flex-wrap items-end justify-between gap-3 mb-6"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="grid place-items-center size-10 rounded-lg bg-gradient-to-br from-[#F23545] to-[#F27B35] text-white">{icon}</div>}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}
