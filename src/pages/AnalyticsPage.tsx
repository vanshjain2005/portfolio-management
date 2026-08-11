import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip } from 'recharts';
import { Brain, Globe, Package, LayoutGrid, Loader2 } from 'lucide-react';
import { projectService } from '../services/projectService';
import { analyticsService } from '../services/analyticsService';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import type { Project } from '../types';

const tooltipContentStyle = {
  backgroundColor: '#18182a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: 'rgba(255,255,255,0.9)',
};

const tooltipLabelStyle = { color: 'rgba(255,255,255,0.9)' };
const tooltipItemStyle = { color: '#a5b4fc' };

const axisTick = { fontSize: 11, fill: 'rgba(255,255,255,0.3)' };
const cursorFill = 'rgba(255,255,255,0.03)';

const AnalyticsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [health, setHealth] = useState<{ score: number; metrics: Record<string, number> } | null>(null);
  const [categoryData, setCategoryData] = useState<{ category: string; count: number; color: string }[]>([]);
  const [technologyData, setTechnologyData] = useState<{ technology: string; count: number }[]>([]);
  const [skillData, setSkillData] = useState<{ skill: string; level: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setProjects(projectService.getAll());
      setHealth(analyticsService.getPortfolioHealth());
      setCategoryData(analyticsService.getCategoryBreakdown());
      setTechnologyData(analyticsService.getTechnologyBreakdown());
      setSkillData(analyticsService.getSkillDistribution());
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const growthData = useMemo(() => {
    const byMonth: Record<string, number> = {};
    projects.forEach((project) => {
      const key = new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      byMonth[key] = (byMonth[key] || 0) + 1;
    });
    return Object.entries(byMonth).map(([month, count]) => ({ month, count }));
  }, [projects]);

  if (loading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
          <p className="text-white/50 text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-sm text-white/40 mt-1">Portfolio performance and insights</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Portfolio Health" value={`${health?.score || 0}%`} trend="Strong portfolio" color="teal" icon={<Brain className="w-5 h-5" />} delay={0} />
          <StatCard title="Published" value={health?.metrics.publishedProjects || 0} trend="Live" color="green" icon={<Globe className="w-5 h-5" />} delay={0.05} />
          <StatCard title="Drafts" value={health?.metrics.draftProjects || 0} trend="Needs attention" color="yellow" icon={<Package className="w-5 h-5" />} delay={0.1} />
          <StatCard title="Categories" value={health?.metrics.totalCategories || 0} trend="Diverse" color="indigo" icon={<LayoutGrid className="w-5 h-5" />} delay={0.15} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white/90">Project Growth</h2>
                <span className="text-xs text-white/30">By month</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={growthData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={axisTick} tickMargin={8} />
                  <YAxis axisLine={false} tickLine={false} tick={axisTick} tickMargin={8} width={24} />
                  <Tooltip
                    cursor={{ fill: cursorFill }}
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                  />
                  <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="count" fill="url(#growthGrad)" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white/90">Category Breakdown</h2>
                <span className="text-xs text-white/30">Distribution</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    stroke="transparent"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || '#6366f1'} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white/90">Technology Usage</h2>
                <span className="text-xs text-white/30">Most used</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={technologyData}>
                  <XAxis dataKey="technology" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} tickMargin={8} interval={0} />
                  <YAxis axisLine={false} tickLine={false} tick={axisTick} tickMargin={8} width={24} />
                  <Tooltip
                    cursor={{ fill: cursorFill }}
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                  />
                  <defs>
                    <linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="count" fill="url(#techGrad)" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white/90">Skill Distribution</h2>
                <span className="text-xs text-white/30">Proficiency level</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={skillData} layout="vertical">
                  <XAxis type="number" domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }} />
                  <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }} width={90} />
                  <Tooltip
                    cursor={{ fill: cursorFill }}
                    contentStyle={tooltipContentStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                  />
                  <defs>
                    <linearGradient id="skillGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="level" fill="url(#skillGrad)" radius={[0, 6, 6, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
