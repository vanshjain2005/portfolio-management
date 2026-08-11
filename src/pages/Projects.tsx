import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { projectService } from '../services/projectService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import type { Project } from '../types';

const statusVariant = {
  published: 'success' as const,
  draft: 'warning' as const,
  archived: 'default' as const,
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(projectService.getAll());
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      projectService.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
            <p className="text-white/40 mt-1 text-sm">Manage your portfolio projects</p>
          </div>
          <Link to="/projects/new">
            <Button>
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </Link>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/[0.04] rounded-2xl border border-white/[0.06] p-5 animate-pulse">
                <div className="h-5 bg-white/[0.08] rounded w-1/3 mb-3" />
                <div className="h-4 bg-white/[0.06] rounded w-2/3 mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 bg-white/[0.06] rounded-full w-16" />
                  <div className="h-5 bg-white/[0.06] rounded-full w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center py-16 px-6">
              <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
              <p className="text-white/40 mb-6">Create your first project to get started.</p>
              <Link to="/projects/new">
                <Button>
                  <Plus className="w-4 h-4" /> Create Project
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="flex items-center justify-between p-5">
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <h3 className="font-semibold text-white truncate hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/60 truncate mt-0.5">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge size="sm" variant={statusVariant[project.status]}>
                        {project.status}
                      </Badge>
                      <Badge size="sm" variant="primary">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4 shrink-0">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      aria-label={`Delete ${project.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
