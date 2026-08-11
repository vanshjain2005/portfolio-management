export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string | null;
  status: 'published' | 'draft' | 'archived';
  visibility: 'public' | 'private';
  date: string;
  publishedDate?: string;
  technologies: string[];
  tools: string[];
  skills: string[];
  client?: string | null;
  collaborators: string[];
  goals: string[];
  challenges: string[];
  solution: string;
  process: string;
  results: string;
  lessonsLearned: string[];
  notes: string;
  featured: boolean;
  gallery: GalleryItem[];
  externalLinks?: ExternalLink[];
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  caption?: string;
}

export interface ExternalLink {
  id: string;
  label: string;
  url: string;
  type: 'website' | 'github' | 'demo' | 'other';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  projectCount: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage?: string | null;
  projectIds: string[];
  tags: string[];
  visibility: 'public' | 'private';
  ordering: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience: string;
  years: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'code' | 'other';
  url: string;
  size: number;
  extension: string;
  uploadedAt: string;
  projectId?: string | null;
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
}

export interface AIInsight {
  priority: 'high' | 'medium' | 'low';
  impact: 'increase' | 'optimize' | 'maintain';
  difficulty: 'low' | 'medium' | 'high';
  suggestion: string;
  action: string;
  id?: string;
  title?: string;
  description?: string;
}

export interface AIAnalysis {
  rating: number;
  strengths: string[];
  weaknesses: string[];
  completeness: number;
  organization: number;
  presentation: number;
  impact: number;
  recommendations: AIInsight[];
}

export interface AnalyticsData {
  portfolioHealth: {
    score: number;
    metrics: Record<string, number>;
  };
  categoryBreakdown: {
    category: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  technologyBreakdown: {
    technology: string;
    count: number;
    percentage: number;
  }[];
  skillDistribution: {
    skill: string;
    level: number;
    age: number;
  }[];
  activity: Activity[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  website: string;
  social: SocialLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export type Theme = 'light' | 'dark' | 'system';
export type ViewMode = 'grid' | 'list';
export type SortField = 'date' | 'title' | 'featured' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  category: string | null;
  technology: string | null;
  skill: string | null;
  status: string | null;
  featured: boolean | null;
  date: string | null;
  tags: string[];
}
