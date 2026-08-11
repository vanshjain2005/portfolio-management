import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Folder, Star, Activity, LayoutGrid, Brain, CheckCircle } from 'lucide-react';
import { projectService } from '../services/projectService';
import StatCard from '../components/ui/StatCard';
import ActivityFeed from '../components/ActivityFeed';
import AIInsightsCard from '../components/AIInsightsCard';
import QuickActions from '../components/QuickActions';
import ProjectGrowthChart from '../components/charts/ProjectGrowthChart';
import CategoryBreakdownChart from '../components/charts/CategoryBreakdownChart';
import SkillDistributionChart from '../components/charts/SkillDistributionChart';
import Card from '../components/ui/Card';
import type { Project } from '../types';

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setProjects(projectService.getAll());
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const draftProjects = projects.filter((p) => p.status === 'draft').length;
  const featuredProjects = projects.filter((p) => p.featured && p.status === 'published').length;
  const categories = new Set(projects.map((p) => p.category)).size;

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/[0.06] rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/[0.04] rounded-2xl p-6 h-24" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-white/40 mt-1">Overview of your portfolio studio</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live overview
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <StatCard title="Total Projects" value={totalProjects} trend="+12% this month" icon={<Folder className="w-5 h-5" />} color="blue" delay={0} />
          <StatCard title="Published" value={publishedProjects} trend={`${Math.round((publishedProjects / Math.max(totalProjects, 1)) * 100)}% of total`} icon={<CheckCircle className="w-5 h-5" />} color="green" delay={0.05} />
          <StatCard title="Drafts" value={draftProjects} trend="+3 this week" icon={<Activity className="w-5 h-5" />} color="yellow" delay={0.1} />
          <StatCard title="Featured" value={featuredProjects} trend="+1 this week" icon={<Star className="w-5 h-5" />} color="purple" delay={0.15} />
          <StatCard title="Categories" value={categories} trend="+1 new" icon={<LayoutGrid className="w-5 h-5" />} color="indigo" delay={0.2} />
          <StatCard title="Portfolio Health" value="95%" trend="+2% this week" icon={<Brain className="w-5 h-5" />} color="teal" delay={0.25} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-white/90">Project Growth</h2>
                  <span className="text-xs text-white/30">Last 6 months</span>
                </div>
                <ProjectGrowthChart />
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card className="p-6">
                  <h2 className="text-base font-semibold text-white/90 mb-4">Category Breakdown</h2>
                  <CategoryBreakdownChart />
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <h2 className="text-base font-semibold text-white/90 mb-4">Skill Distribution</h2>
                  <SkillDistributionChart />
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-white/90">Recent Activity</h2>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
                </div>
                <ActivityFeed projects={projects} limit={5} />
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}>
              <Card className="p-6">
                <h2 className="text-base font-semibold text-white/90 mb-4">AI Insights</h2>
                <AIInsightsCard projects={projects} />
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              <Card className="p-6">
                <h2 className="text-base font-semibold text-white/90 mb-4">Quick Actions</h2>
                <QuickActions />
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;