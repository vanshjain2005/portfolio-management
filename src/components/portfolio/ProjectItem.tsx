import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { formatDate } from '../../utils';

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    category: string;
    tags: string[];
    status: 'published' | 'draft' | 'archived';
    featured: boolean;
    date: string;
    technologies?: string[];
  };
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
      <Link to={`/projects/${project.id}`} className="block bg-white/[0.04] backdrop-blur-xl rounded-xl border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.07] transition-all duration-300 shadow-lg shadow-black/10">
        <div className="flex items-center space-x-4 p-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/[0.06]">
            <span className="text-lg font-bold text-indigo-300">{project.title.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white/90 truncate text-sm">{project.title}</h3>
              <span className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ml-2',
                project.category === 'Web Design' && 'bg-blue-500/10 text-blue-300 border-blue-500/20',
                project.category === 'Web App' && 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
                project.category === 'Mobile App' && 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
                project.category === 'UI/UX' && 'bg-purple-500/10 text-purple-300 border-purple-500/20'
              )}>
                {project.category}
              </span>
            </div>
            <p className="text-xs text-white/40 mt-1 line-clamp-1">{project.description}</p>
            <div className="flex items-center space-x-3 mt-2 text-[11px] text-white/30">
              <span>{formatDate(project.date)}</span>
              <span>{project.tags.length} tags</span>
              <span>{project.technologies?.length || 0} techs</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectItem;