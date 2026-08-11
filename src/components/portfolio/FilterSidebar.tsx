import { SlidersHorizontal } from 'lucide-react';
import { cn } from '../../utils';
import Card from '../ui/Card';

interface FilterSidebarProps {
  filters?: {
    category?: string;
    technology?: string;
    skill?: string;
    status?: string;
    date?: string;
    sort?: string;
    featured?: boolean;
  };
  onChange?: (key: string, value: string | boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters = {},
  onChange = () => {},
}) => {
  const categories = [
    { value: 'Web Design', label: 'Web Design' },
    { value: 'Web App', label: 'Web App' },
    { value: 'Mobile App', label: 'Mobile App' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'Data Visualization', label: 'Data Viz' },
    { value: 'Case Study', label: 'Case Study' },
  ];

  const statuses = [
    { value: 'published', label: 'Published', active: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
    { value: 'draft', label: 'Draft', active: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
    { value: 'archived', label: 'Archived', active: 'bg-white/[0.06] text-white/50 border-white/[0.1]' },
  ];

  const handleFilter = (key: string, value: string | boolean) => {
    onChange(key, value);
  };

  const isCatActive = (value: string) => filters.category === value;

  return (
    <Card className="p-5 space-y-6">
      <h3 className="text-[13px] font-semibold text-white/90 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
        Filters
      </h3>

      <div>
        <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2.5">Category</label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleFilter('category', isCatActive(cat.value) ? '' : cat.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                isCatActive(cat.value)
                  ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.03] text-white/50 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/80'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2.5">Status</label>
        <div className="flex flex-wrap gap-1.5">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => handleFilter('status', filters.status === status.value ? '' : status.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                filters.status === status.value
                  ? status.active
                  : 'bg-white/[0.03] text-white/50 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/80'
              )}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2.5">Featured</label>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleFilter('featured', filters.featured === true ? false : true)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
              filters.featured === true
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/25'
                : 'bg-white/[0.03] text-white/50 border-white/[0.06] hover:bg-white/[0.06]'
            )}
          >
            Only Featured
          </button>
          {filters.featured === true && (
            <button
              onClick={() => handleFilter('featured', false)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] text-white/50 border border-white/[0.06] hover:bg-white/[0.06]"
            >
              Any
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2.5">Sort by</label>
        <select
          value={filters.sort || 'date'}
          onChange={(e) => handleFilter('sort', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 appearance-none"
        >
          <option value="date" className="bg-[#14141f]">Newest first</option>
          <option value="title" className="bg-[#14141f]">Title (A-Z)</option>
          <option value="featured" className="bg-[#14141f]">Featured</option>
        </select>
      </div>
    </Card>
  );
};

export default FilterSidebar;