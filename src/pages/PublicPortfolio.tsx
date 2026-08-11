import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, Star, Globe, LayoutGrid, X } from 'lucide-react';
import { projectService } from '../services/projectService';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectItem from '../components/portfolio/ProjectItem';
import FilterSidebar from '../components/portfolio/FilterSidebar';
import StatCard from '../components/ui/StatCard';
import { cn } from '../utils';

const PublicPortfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const allProjects = useMemo(() => projectService.getAll(), []);

  const filteredProjects = useMemo(() => {
    let result = [...allProjects];
    const query = searchQuery.toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.subtitle?.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.status) result = result.filter((p) => p.status === filters.status);
    if (filters.featured === true) result = result.filter((p) => p.featured);
    if (filters.sort === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === 'featured') {
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
    } else {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return result;
  }, [allProjects, searchQuery, filters]);

  const featuredCount = allProjects.filter((p) => p.featured).length;
  const publishedCount = allProjects.filter((p) => p.status === 'published').length;
  const categoryCount = new Set(allProjects.map((p) => p.category)).size;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Public Portfolio</h1>
            <p className="text-sm text-white/40 mt-1">Explore and showcase your work</p>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Featured" value={featuredCount} trend="Highlighted work" color="purple" icon={<Star className="w-5 h-5" />} delay={0} />
          <StatCard title="Published" value={publishedCount} trend="Public projects" color="green" icon={<Globe className="w-5 h-5" />} delay={0.05} />
          <StatCard title="Categories" value={categoryCount} trend="Areas covered" color="indigo" icon={<LayoutGrid className="w-5 h-5" />} delay={0.1} />
        </div>

        <div className="flex gap-6">
          <div className="w-56 flex-shrink-0 hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-white/40">{filteredProjects.length} projects found</span>
              <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-24 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white/80 mb-2">No projects found</h3>
                <p className="text-white/40 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={cn('grid gap-5', viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                    {viewMode === 'grid' ? <ProjectCard project={project} /> : <ProjectItem project={project} />}
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

export default PublicPortfolio;
