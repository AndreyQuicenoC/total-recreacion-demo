export type ID = string;

export interface Tag {
  id: ID;
  name: string;
  color: string;
  description?: string;
}

export interface Recreator {
  id: ID;
  fullName: string;
  phone: string;
  email?: string;
  documentId?: string;
  joinDate: string; // ISO
  courses: string[];
  salary: number;
  tagId?: ID | null;
  active: boolean;
}

export interface Client {
  id: ID;
  name: string;
  phone: string;
  municipality: string;
  email?: string;
  address?: string;
  documentId?: string;
  description?: string;
}

export interface Category {
  id: ID;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface PlanInclude {
  id: ID;
  label: string;
}

export interface PlanExtra {
  id: ID;
  amount: number;
  reason: string;
}

export interface Plan {
  id: ID;
  categoryId: ID;
  name: string;
  basePrice: number;
  extras: PlanExtra[];
  description: string;
  audience: string;
  whatsappMessage: string;
  includes: PlanInclude[];
  image?: string;
}

export interface MaterialItem {
  id: ID;
  label: string;
}

export interface MaterialTemplate {
  id: ID;
  name: string;
  description?: string;
  items: MaterialItem[];
}

export interface EventChecklistItem {
  id: ID;
  label: string;
  done: boolean;
}

export interface ScheduledEvent {
  id: ID;
  title: string;
  description: string;
  address: string;
  contactPhone?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  planId: ID;
  selectedExtraId?: ID | null;
  clientId: ID;
  recreatorIds: ID[];
  checklist: EventChecklistItem[];
  transportCost: number;
  materialCost: number;
  rating?: number | null;
  ratingComment?: string;
  utility?: number;
  createdAt: string;
}

export interface ClickEvent {
  id: ID;
  planId: ID;
  at: string; // ISO datetime
}

export interface AdminUser {
  id: ID;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
