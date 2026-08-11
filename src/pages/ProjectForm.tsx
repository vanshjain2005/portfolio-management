import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { projectService } from '../services/projectService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import { cn } from '../utils';
import type { Project } from '../types';
import type { ChangeEvent, FormEvent } from 'react';

const categoryOptions = [
  { label: 'Web Design', value: 'Web Design' },
  { label: 'Web App', value: 'Web App' },
  { label: 'Mobile App', value: 'Mobile App' },
  { label: 'UI/UX', value: 'UI/UX' },
  { label: 'Data Visualization', value: 'Data Visualization' },
  { label: 'Case Study', value: 'Case Study' },
];

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

const splitList = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean);

const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'Web Design',
    status: 'draft' as Project['status'],
    featured: false,
    tags: '',
    technologies: '',
    tools: '',
    skills: '',
  });
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const existing = projectService.getById(id);
      if (existing) {
        setForm({
          title: existing.title,
          subtitle: existing.subtitle || '',
          description: existing.description,
          category: existing.category,
          status: existing.status,
          featured: existing.featured,
          tags: existing.tags.join(', '),
          technologies: existing.technologies.join(', '),
          tools: existing.tools.join(', '),
          skills: existing.skills.join(', '),
        });
      } else {
        navigate('/projects');
        return;
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: Omit<Project, 'id'> = {
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      category: form.category,
      status: form.status,
      featured: form.featured,
      tags: splitList(form.tags),
      technologies: splitList(form.technologies),
      tools: splitList(form.tools),
      skills: splitList(form.skills),
      date: new Date().toISOString().slice(0, 10),
      visibility: 'private',
      collaborators: [],
      goals: [],
      challenges: [],
      solution: '',
      process: '',
      results: '',
      lessonsLearned: [],
      notes: '',
      gallery: [],
    };

    try {
      if (editing && id) {
        projectService.update(id, payload);
      } else {
        projectService.create(payload);
      }
      navigate('/projects');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-4 bg-white/[0.06] rounded w-28" />
          <div className="h-9 bg-white/[0.08] rounded w-1/3" />
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 h-72" />
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 h-48" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">{editing ? 'Edit Project' : 'New Project'}</h1>
          <p className="text-sm text-white/40 mt-1">
            {editing ? 'Update the details of your project' : 'Create a new project for your portfolio'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <h2 className="text-base font-semibold text-white/90 mb-5">Project Information</h2>
              <Input label="Title" name="title" value={form.title} onChange={handleChange} required placeholder="Project title" />
              <Input label="Subtitle" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Short subtitle or tagline" />
              <Textarea label="Description" name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Describe the project" />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <h2 className="text-base font-semibold text-white/90 mb-5">Classification</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select
                  label="Category"
                  value={form.category}
                  options={categoryOptions}
                  onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                />
                <Select
                  label="Status"
                  value={form.status}
                  options={statusOptions}
                  onChange={(value) => setForm((prev) => ({ ...prev, status: value as Project['status'] }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3.5">
                <div>
                  <p className="text-sm font-medium text-white/90">Feature this project</p>
                  <p className="text-xs text-white/40 mt-0.5">Showcase this project as highlighted work</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.featured}
                  onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300',
                    form.featured ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/[0.1]'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300',
                      form.featured ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <h2 className="text-base font-semibold text-white/90 mb-5">Details</h2>
              <Input label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} placeholder="React, Design, Case Study" />
              <Input label="Technologies (comma separated)" name="technologies" value={form.technologies} onChange={handleChange} placeholder="TypeScript, Tailwind CSS, Vite" />
              <Input label="Tools (comma separated)" name="tools" value={form.tools} onChange={handleChange} placeholder="Figma, Notion, Vercel" />
              <Input label="Skills (comma separated)" name="skills" value={form.skills} onChange={handleChange} placeholder="Frontend, UI Design, Motion" />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={saving}>
              <Save className="w-4 h-4" />
              {editing ? 'Save Changes' : 'Create Project'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/projects')}>
              Cancel
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProjectForm;
