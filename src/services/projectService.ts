import type { Project } from '../types';
import projectsData from '../data/projects.json';

const STORAGE_KEY = 'portfolio_projects';

function getFromStorage(): Project[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Project[];
    }
  } catch (e) {
    console.error('Failed to read from storage', e);
  }
  return null;
}

function saveToStorage(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save to storage', e);
  }
}

function getLocalProjects(): Project[] {
  const stored = getFromStorage();
  if (stored) return stored;
  const initial = (projectsData as { projects: Project[] }).projects;
  saveToStorage(initial);
  return initial;
}

export const projectService = {
  getAll(): Project[] {
    return getLocalProjects();
  },

  getPublished(): Project[] {
    return getLocalProjects().filter(p => p.status === 'published');
  },

  getById(id: string): Project | undefined {
    return getLocalProjects().find(p => p.id === id);
  },

  getByCategory(category: string): Project[] {
    return getLocalProjects().filter(p => p.category === category);
  },

  getFeatured(): Project[] {
    return getLocalProjects().filter(p => p.featured && p.status === 'published');
  },

  create(project: Omit<Project, 'id'>): Project {
    const projects = getLocalProjects();
    const newProject: Project = {
      ...project,
      id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    projects.unshift(newProject);
    saveToStorage(projects);
    return newProject;
  },

  update(id: string, updates: Partial<Project>): Project | null {
    const projects = getLocalProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    projects[index] = { ...projects[index], ...updates };
    saveToStorage(projects);
    return projects[index];
  },

  delete(id: string): boolean {
    const projects = getLocalProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    projects.splice(index, 1);
    saveToStorage(projects);
    return true;
  },

  duplicate(id: string): Project {
    const project = projectService.getById(id);
    if (!project) throw new Error('Project not found');
    const duplicated = projectService.create({
      ...project,
      title: `${project.title} (Copy)`,
      status: 'draft',
      featured: false,
      publishedDate: undefined,
      date: new Date().toISOString(),
      tags: [...project.tags],
      technologies: [...project.technologies],
      gallery: [...project.gallery],
    });
    return duplicated;
  },

  feature(id: string, featured: boolean): Project | null {
    return projectService.update(id, { featured });
  },

  publish(id: string): Project | null {
    return projectService.update(id, {
      status: 'published',
      publishedDate: new Date().toISOString(),
    });
  },

  unpublish(id: string): Project | null {
    return projectService.update(id, { status: 'draft' });
  },

  reset(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export default projectService;
