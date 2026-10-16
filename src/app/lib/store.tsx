import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type {
  AdminUser, Category, Client, ClickEvent, MaterialTemplate, Plan, Recreator, ScheduledEvent, Tag,
} from "./types";
import {
  seedAdmin, seedCategories, seedClients, seedEvents, seedMaterials, seedPlans, seedRecreadores, seedTags,
} from "./seed";

const KEY = "total-recreacion-store-v2";

interface AppState {
  tags: Tag[];
  recreators: Recreator[];
  clients: Client[];
  categories: Category[];
  plans: Plan[];
  materials: MaterialTemplate[];
  events: ScheduledEvent[];
  clicks: ClickEvent[];
  admin: AdminUser;
  authed: boolean;
}

const defaultState: AppState = {
  tags: seedTags,
  recreators: seedRecreadores,
  clients: seedClients,
  categories: seedCategories,
  plans: seedPlans,
  materials: seedMaterials,
  events: seedEvents,
  clicks: [],
  admin: seedAdmin,
  authed: false,
};

interface Ctx extends AppState {
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  trackClick: (planId: string) => void;
  computeUtility: (e: ScheduledEvent) => number;
}

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...defaultState, ...JSON.parse(raw), authed: false };
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    try {
      const { authed, ...persist } = state;
      localStorage.setItem(KEY, JSON.stringify(persist));
    } catch {}
  }, [state]);

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === state.admin.email.toLowerCase() && password === state.admin.password) {
      setState((s) => ({ ...s, authed: true }));
      return true;
    }
    return false;
  }, [state.admin]);

  const logout = useCallback(() => setState((s) => ({ ...s, authed: false })), []);

  const trackClick = useCallback((planId: string) => {
    setState((s) => ({
      ...s,
      clicks: [...s.clicks, { id: `cl${Date.now()}${Math.random().toString(36).slice(2,6)}`, planId, at: new Date().toISOString() }],
    }));
  }, []);

  const computeUtility = useCallback((e: ScheduledEvent) => {
    const plan = state.plans.find((p) => p.id === e.planId);
    if (!plan) return 0;
    const base = plan.basePrice + (e.selectedExtraId ? (plan.extras.find((x) => x.id === e.selectedExtraId)?.amount ?? 0) : 0);
    const salaries = e.recreatorIds.reduce((sum, rid) => sum + (state.recreators.find((r) => r.id === rid)?.salary ?? 0), 0);
    return base - salaries - (e.transportCost ?? 0) - (e.materialCost ?? 0);
  }, [state.plans, state.recreators]);

  const value = useMemo<Ctx>(() => ({
    ...state, setState, login, logout, trackClick, computeUtility,
  }), [state, login, logout, trackClick, computeUtility]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export const newId = (prefix = "id") => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
