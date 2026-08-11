import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateLong(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getRandomColor(): string {
  const colors = ['#4F46E5', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];
  return colors[Math.floor(Math.random() * colors.length)];
}

interface StatusConfig {
  [key: string]: { label: string; color: string };
}

export const statusConfig: StatusConfig = {
  published: { label: 'Published', color: 'green' },
  draft: { label: 'Draft', color: 'yellow' },
  archived: { label: 'Archived', color: 'gray' },
};

export function getStatusColor(status: string): string {
  return statusConfig[status]?.color || 'gray';
}

export function calculatePortfolioHealth(projects: unknown[]): number {
  if (projects.length === 0) return 0;
  const published = projects.filter((p: any) => p.status === 'published').length;
  const featured = projects.filter((p: any) => p.featured).length;
  const withImages = projects.filter((p: any) => p.thumbnail).length;
  const score = Math.round(
    ((published / projects.length) * 40 +
    (Math.min(featured / 3, 1) * 30) +
    (withImages / projects.length) * 30)
  );
  return score;
}
