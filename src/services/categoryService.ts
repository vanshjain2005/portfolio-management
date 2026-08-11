import type { Category } from '../types';
import categoriesData from '../data/categories.json';

let categories = categoriesData as Category[];

function updateProjectCounts(projects: { category: string }[]): void {
  categories = categories.map(cat => ({
    ...cat,
    projectCount: projects.filter(p => p.category === cat.name).length,
  }));
}

export async function fetchProjects(): Promise<{ category: string }[]> {
  const { projectService } = await import('./projectService');
  return projectService.getAll();
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const projects = await fetchProjects();
    updateProjectCounts(projects);
    return categories;
  },

  getById(id: string): Category | undefined {
    return categories.find(c => c.id === id);
  },

  getByName(name: string): Category | undefined {
    return categories.find(c => c.name === name);
  },
};

export default categoryService;
