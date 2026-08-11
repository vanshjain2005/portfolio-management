import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Calendar } from 'lucide-react';
import { cn, formatDate } from '../../utils';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link to={`/projects/${project.id}`} className="group block">
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300 shadow-xl shadow-black/20 card-hover">
          <div className="relative h-48 bg-white/[0.03] overflow-hidden">
            {project.gallery && project.gallery.length > 0 ? (
              <img src={project.gallery[0].url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10">
                <span className="text-5xl font-bold bg-gradient-to-br from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">{project.title.charAt(0)}</span>
              </div>
            )}
            {project.featured && (
              <span className="absolute top-3 left-3 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-lg shadow-amber-500/25">
                Featured
              </span>
            )}
            <span className={cn(
              'absolute top-3 right-3 px-2 py-0.5 text-[11px] font-medium rounded-full backdrop-blur-xl',
              project.status === 'published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' : project.status === 'draft' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20' : 'bg-white/[0.08] text-white/60 border border-white/[0.08]'
            )}>
              {project.status}
            </span>
          </div>
          <div className="p-5">
            <div className="mb-2.5">
              <span className={cn(
                'px-2.5 py-0.5 rounded-full text-[11px] font-medium',
                project.category === 'Web Design' && 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
                project.category === 'Web App' && 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
                project.category === 'Mobile App' && 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20',
                project.category === 'UI/UX' && 'bg-purple-500/15 text-purple-300 border border-purple-500/20',
                project.category === 'Data Visualization' && 'bg-amber-500/15 text-amber-300 border border-amber-500/20',
                project.category === 'Case Study' && 'bg-rose-500/15 text-rose-300 border border-rose-500/20'
              )}>
                {project.category}
              </span>
            </div>
            <h3 className="font-semibold text-white text-base line-clamp-2 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
            {project.subtitle && <p className="text-sm text-white/50 mt-1 line-clamp-1">{project.subtitle}</p>}
            <p className="text-sm text-white/40 mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2.5 py-0.5 text-[11px] bg-white/[0.05] text-white/50 rounded-full border border-white/[0.05]">{tag}</span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/40">
              <span className="flex items-center"><Tag className="w-3 h-3 mr-1.5" />{project.technologies.length} technologies</span>
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" />{formatDate(project.date)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;