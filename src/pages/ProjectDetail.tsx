import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, CheckCircle, Calendar } from 'lucide-react';
import { projectService } from '../services/projectService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import { formatDate } from '../utils';
import type { Project } from '../types';

const statusVariant = {
  published: 'success' as const,
  draft: 'warning' as const,
  archived: 'default' as const,
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const found = projectService.getById(id);
      if (found) {
        setProject(found);
      } else {
        navigate('/projects');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-4 bg-white/[0.06] rounded w-28 mb-6" />
          <div className="h-9 bg-white/[0.08] rounded w-1/3 mb-3" />
          <div className="h-5 bg-white/[0.06] rounded w-1/2 mb-4" />
          <div className="flex gap-2 mb-8">
            <div className="h-6 bg-white/[0.06] rounded-full w-20" />
            <div className="h-6 bg-white/[0.06] rounded-full w-20" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] p-6 h-40" />
              <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] p-6 h-56" />
            </div>
            <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] p-6 h-80" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg text-white/60 mb-4">{project.subtitle}</p>
          )}

          <div className="flex items-center flex-wrap gap-3 mb-8">
            <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
            {project.featured && <Badge variant="primary">Featured</Badge>}
            <span className="flex items-center gap-1.5 text-sm text-white/40">
              <Calendar className="w-4 h-4" />
              {formatDate(project.date)}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h2 className="text-lg font-semibold text-white/90 mb-3">Description</h2>
                <p className="text-white/60 leading-relaxed">{project.description}</p>
              </Card>
            </motion.div>

            {project.gallery && project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card>
                  <h2 className="text-lg font-semibold text-white/90 mb-3">Gallery</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((item, index) => (
                      <div
                        key={item.id || index}
                        className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06]"
                      >
                        {item.type === 'video' ? (
                          <video
                            src={item.url}
                            controls
                            className="w-full h-40 object-cover"
                          />
                        ) : item.type === 'audio' ? (
                          <audio src={item.url} controls className="w-full p-4" />
                        ) : (
                          <img
                            src={item.url}
                            alt={item.caption || 'Gallery image'}
                            className="w-full h-40 object-cover"
                          />
                        )}
                        {item.caption && (
                          <p className="text-xs text-white/40 p-2">{item.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <div className="space-y-4">
                <StatCard
                  title="Category"
                  value={project.category}
                  icon={<CheckCircle className="w-5 h-5" />}
                  color="purple"
                />
                <StatCard
                  title="Technologies"
                  value={project.technologies.length}
                  icon={<Globe className="w-5 h-5" />}
                  color="blue"
                />
              </div>
            </Card>

            {project.technologies.length > 0 && (
              <Card>
                <h3 className="text-sm font-semibold text-white/90 mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {project.tags.length > 0 && (
              <Card>
                <h3 className="text-sm font-semibold text-white/90 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
