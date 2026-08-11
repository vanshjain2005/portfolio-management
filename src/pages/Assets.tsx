import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Grid, List, Search, Play, Image as ImageIcon, FileText, Music, Code, Folder, X } from 'lucide-react';
import { assetService } from '../services/assetService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { cn } from '../utils';
import type { Asset } from '../types';

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ type: string | null }>({ type: null });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allAssets = assetService.getAll();
    setAssets(allAssets);
    setFilteredAssets(allAssets);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...assets];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((a) => a.name.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (filters.type) result = result.filter((a) => a.type === filters.type);
    setFilteredAssets(result);
  }, [assets, searchQuery, filters]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const type: Asset['type'] = file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : file.type.startsWith('image') ? 'image' : file.name.endsWith('.pdf') ? 'document' : file.type.startsWith('text/') ? 'code' : 'other';
      const asset = assetService.create({
        name: file.name, type, url: URL.createObjectURL(file), size: file.size,
        extension: file.name.split('.').pop() || 'unknown', uploadedAt: new Date().toISOString(), tags: [], metadata: { size: file.size },
      });
      setAssets((prev) => [...prev, asset]);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5 text-indigo-300" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-300" />;
      case 'document': return <FileText className="w-5 h-5 text-emerald-300" />;
      case 'audio': return <Music className="w-5 h-5 text-purple-300" />;
      case 'code': return <Code className="w-5 h-5 text-amber-300" />;
      default: return <Folder className="w-5 h-5 text-white/40" />;
    }
  };

  const typeTint: Record<string, string> = {
    video: 'bg-indigo-500/10', image: 'bg-blue-500/10', document: 'bg-emerald-500/10',
    audio: 'bg-purple-500/10', code: 'bg-amber-500/10', other: 'bg-white/[0.04]',
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/[0.06] rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(9)].map((_, i) => <div key={i} className="bg-white/[0.04] rounded-2xl p-4 h-40" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Assets</h1>
            <p className="text-sm text-white/40 mt-1">{filteredAssets.length} files</p>
          </div>
          <label className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
            <input type="file" multiple className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets..."
                className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['image', 'video', 'document', 'audio', 'code'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilters({ type: filters.type === t ? null : t })}
                  className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all', filters.type === t ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25' : 'bg-white/[0.03] text-white/50 border-white/[0.06] hover:bg-white/[0.06]')}
                >
                  {t}
                </button>
              ))}
              {(searchQuery || filters.type) && (
                <button onClick={() => { setFilters({ type: null }); setSearchQuery(''); }} className="p-1.5 text-white/30 hover:text-white/60">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-0.5">
            <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}><Grid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}><List className="w-4 h-4" /></button>
          </div>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold text-white/80 mb-2">{searchQuery || filters.type ? 'No assets found' : 'No assets yet'}</h3>
            <p className="text-white/40 text-sm mb-5">{searchQuery || filters.type ? 'Try adjusting your search or filters' : 'Upload files to get started'}</p>
            <label className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-xl cursor-pointer hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
              Upload Assets
              <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        ) : (
          <div className={cn('grid gap-4', viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1')}>
            {filteredAssets.map((asset, index) => (
              <motion.div key={asset.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                {viewMode === 'grid' ? (
                  <Card className="overflow-hidden group" hover>
                    <div className={cn('p-4', typeTint[asset.type])}>
                      {asset.type === 'video' || asset.type === 'image' ? (
                        <div className="w-full h-24 rounded-xl mb-3 overflow-hidden">
                          {asset.type === 'image' && asset.url ? (
                            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">{getTypeIcon(asset.type)}</div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-xl mb-3 flex items-center justify-center bg-white/[0.03] border border-white/[0.04]">
                          {getTypeIcon(asset.type)}
                        </div>
                      )}
                      <h4 className="font-medium text-white text-sm truncate">{asset.name}</h4>
                      <p className="text-xs text-white/40">{asset.extension} &middot; {formatFileSize(asset.size)}</p>
                    </div>
                  </Card>
                ) : (
                  <Card className="flex items-center p-4" hover>
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 border border-white/[0.04]', typeTint[asset.type])}>
                      {getTypeIcon(asset.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate text-sm">{asset.name}</h4>
                      <p className="text-xs text-white/40">{asset.extension} &middot; {formatFileSize(asset.size)}</p>
                      {asset.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {asset.tags.map((tag, i) => <Badge key={i} variant="outline" size="sm">{tag}</Badge>)}
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Assets;