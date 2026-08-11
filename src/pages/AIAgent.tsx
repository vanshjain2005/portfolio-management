import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, LayoutGrid, TrendingUp, AlertTriangle, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { aiService } from '../services/aiService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import AIInsightsCard from '../components/AIInsightsCard';
import { cn } from '../utils';
import type { AIAnalysis, AIInsight } from '../types';

type Tab = 'analysis' | 'ideas' | 'recommendations';

const tabs: { id: Tab; label: string }[] = [
  { id: 'analysis', label: 'Analysis' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'recommendations', label: 'Recommendations' },
];

const priorityVariant = {
  high: 'danger' as const,
  medium: 'warning' as const,
  low: 'default' as const,
};

const AIAgent = () => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [ideas, setIdeas] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('analysis');

  const loadAll = async () => {
    setLoading(true);
    try {
      const [analysisResult, ideasResult] = await Promise.all([
        aiService.analyzePortfolio(),
        aiService.generateIdeas(),
      ]);
      setAnalysis(analysisResult);
      setIdeas(ideasResult);
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Analyst</h1>
            <p className="text-sm text-white/40 mt-1">AI-powered portfolio intelligence</p>
          </div>
          <button
            onClick={loadAll}
            disabled={loading}
            aria-label="Refresh analysis"
            className={cn(
              'p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 transition-all duration-300',
              'hover:text-white hover:bg-white/[0.08]',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
          </button>
        </motion.div>

        <div className="border-b border-white/[0.08] mb-8">
          <div className="flex gap-6">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'px-3 py-2.5 text-sm font-medium border-b-2 transition-colors duration-200',
                  tab === t.id ? 'text-white border-indigo-400' : 'text-white/40 border-transparent hover:text-white/70'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
            <p className="text-white/50 text-sm">Analyzing portfolio...</p>
          </div>
        ) : tab === 'analysis' && analysis ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Rating" value={`${analysis.rating}/10`} trend="Overall quality" color="purple" icon={<Star className="w-5 h-5" />} delay={0} />
              <StatCard title="Completeness" value={`${analysis.completeness}%`} trend="Content coverage" color="green" icon={<CheckCircle2 className="w-5 h-5" />} delay={0.05} />
              <StatCard title="Organization" value={`${analysis.organization}%`} trend="Structure quality" color="blue" icon={<LayoutGrid className="w-5 h-5" />} delay={0.1} />
              <StatCard title="Impact" value={`${analysis.impact}%`} trend="Perceived value" color="teal" icon={<TrendingUp className="w-5 h-5" />} delay={0.15} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-white/90">Strengths</h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.strengths.map((strength, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/[0.12] px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/70">{strength}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Card>
                  <div className="flex items-center gap-2 mb-5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-semibold text-white/90">Areas for Improvement</h3>
                  </div>
                  <div className="space-y-3">
                    {analysis.weaknesses.map((weakness, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/[0.12] px-4 py-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/70">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        ) : tab === 'ideas' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white/90">Generated Project Ideas</h2>
              <Badge variant="primary">{ideas.length} ideas</Badge>
            </div>
            {ideas.length === 0 ? (
              <Card className="text-center py-16">
                <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <p className="text-white/60">No ideas found</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ideas.map((idea, index) => (
                  <motion.div key={idea.id || index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Card hover className="h-full">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-white">{idea.title || idea.suggestion}</h3>
                        <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-white/50 mb-4 leading-relaxed">
                        {idea.description || idea.action || idea.suggestion}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge size="sm" variant={priorityVariant[idea.priority]}>{idea.priority}</Badge>
                        <Badge size="sm" variant="primary">{idea.impact}</Badge>
                        <Badge size="sm" variant="outline">{idea.difficulty}</Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-base font-semibold text-white/90 mb-6">AI Recommendations</h2>
            {analysis?.recommendations?.length ? (
              <AIInsightsCard recommendations={analysis.recommendations} />
            ) : (
              <Card className="text-center py-16">
                <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <p className="text-white/60">No recommendations yet. Run a fresh analysis to get AI suggestions.</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIAgent;
