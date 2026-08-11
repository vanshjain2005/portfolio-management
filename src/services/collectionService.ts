import type { Collection } from '../types';
import collectionsData from '../data/collections.json';

const STORAGE_KEY = 'portfolio_collections';

function getFromStorage(): Collection[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Collection[];
  } catch (e) {
    console.error('Failed to read collections from storage', e);
  }
  return null;
}

function saveToStorage(collections: Collection[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch (e) {
    console.error('Failed to save collections to storage', e);
  }
}

function getCollections(): Collection[] {
  const stored = getFromStorage();
  if (stored) return stored;
  const initial = collectionsData as Collection[];
  saveToStorage(initial);
  return initial;
}

export const collectionService = {
  getAll(): Collection[] {
    return getCollections();
  },

  getById(id: string): Collection | undefined {
    return getCollections().find(c => c.id === id);
  },

  create(collection: Omit<Collection, 'id'>): Collection {
    const collections = getCollections();
    const newCollection: Collection = {
      ...collection,
      id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    collections.push(newCollection);
    saveToStorage(collections);
    return newCollection;
  },

  update(id: string, updates: Partial<Collection>): Collection | null {
    const collections = getCollections();
    const index = collections.findIndex(c => c.id === id);
    if (index === -1) return null;
    collections[index] = { ...collections[index], ...updates };
    saveToStorage(collections);
    return collections[index];
  },

  delete(id: string): boolean {
    const collections = getCollections();
    const index = collections.findIndex(c => c.id === id);
    if (index === -1) return false;
    collections.splice(index, 1);
    saveToStorage(collections);
    return true;
  },

  addProject(id: string, projectId: string): Collection | null {
    const collection = collectionService.getById(id);
    if (!collection) return null;
    if (collection.projectIds.includes(projectId)) return collection;
    return collectionService.update(id, {
      projectIds: [...collection.projectIds, projectId],
    });
  },

  removeProject(id: string, projectId: string): Collection | null {
    const collection = collectionService.getById(id);
    if (!collection) return null;
    return collectionService.update(id, {
      projectIds: collection.projectIds.filter(pid => pid !== projectId),
    });
  },
};

export default collectionService;
