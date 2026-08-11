import type { Asset } from '../types';
import assetsData from '../data/assets.json';

const STORAGE_KEY = 'portfolio_assets';

function getFromStorage(): Asset[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Asset[];
  } catch (e) { console.error('Failed to read from storage', e); }
  return null;
}

function saveToStorage(assets: Asset[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(assets)); } catch (e) { console.error('Failed to save', e); }
}

function getAssets(): Asset[] {
  const stored = getFromStorage();
  if (stored) return stored;
  const initial = (assetsData as any)?.assets || [];
  saveToStorage(initial);
  return initial;
}

export const assetService = {
  getAll(): Asset[] { return getAssets(); },
  getById(id: string): Asset | undefined { return getAssets().find((a) => a.id === id); },
  create(data: Omit<Asset, 'id'>): Asset {
    const assets = getAssets();
    const newAsset: Asset = { ...data, id: `a_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
    assets.unshift(newAsset);
    saveToStorage(assets);
    return newAsset;
  },
  update(id: string, data: Partial<Asset>): Asset | null {
    const assets = getAssets();
    const index = assets.findIndex((a) => a.id === id);
    if (index === -1) return null;
    assets[index] = { ...assets[index], ...data };
    saveToStorage(assets);
    return assets[index];
  },
  remove(id: string): boolean {
    const assets = getAssets();
    const index = assets.findIndex((a) => a.id === id);
    if (index === -1) return false;
    assets.splice(index, 1);
    saveToStorage(assets);
    return true;
  },
  findByProject(projectId: string): Asset[] { return getAssets().filter((a) => a.projectId === projectId); },
};