import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, X } from 'lucide-react';
import { projectService } from '../services/projectService';
import { cn } from '../utils';
import ProjectCard from '../components/ui/ProjectCard';
import FilterSidebar from '../components/portfolio/FilterSidebar';
import type { Project } from '../types';

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});
  const [sortField, setSortField] = useState('date');
  const [sortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => { setProjects(projectService.getAll()); }, []);

  const filteredProjects = useMemo(() => {
    let result = [...projects];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.status) result = result.filter((p) => p.status === filters.status);
    if (filters.featured === true) result = result.filter((p) => p.featured);
    if (filters.sort) setSortField(filters.sort as string);
    result.sort((a, b) => {
      const valA = String(a[sortField as keyof Project] ?? '').toLowerCase();
      const valB = String(b[sortField as keyof Project] ?? '').toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    return result;
  }, [projects, searchQuery, filters, sortField, sortOrder]);

  const handleFilterChange = (key: string, value: string | boolean) => setFilters((prev) => ({ ...prev, [key]: value }));
  const resetFilters = () => { setFilters({}); setSearchQuery(''); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Library</h1>
            <p className="text-sm text-white/40 mt-1">{filteredProjects.length} projects</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-0.5">
              <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-56 flex-shrink-0 hidden lg:block">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          <div className="flex-1 min-w-0">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-24 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white/80 mb-2">No projects found</h3>
                <p className="text-white/40 text-sm mb-5">Try adjusting your search or filters</p>
                <button onClick={resetFilters} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={cn('grid gap-5', viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
                {filteredProjects.map((project, i) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;