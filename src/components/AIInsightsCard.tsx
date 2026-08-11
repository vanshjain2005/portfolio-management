import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Layers } from 'lucide-react';
import { cn } from '../utils';
import type { AIInsight } from '../types';

interface AIInsightsCardProps {
  projects?: any[];
  recommendations?: AIInsight[];
}

const defaultInsights: AIInsight[] = [
  {
    priority: 'high',
    impact: 'increase',
    difficulty: 'low',
    suggestion: 'Improve Portfolio Quality',
    action: 'Add more case studies and project results to strengthen the portfolio',
  },
  {
    priority: 'medium',
    impact: 'increase',
    difficulty: 'medium',
    suggestion: 'Add AI-powered Analysis',
    action: 'Build an AI-powered portfolio analyzer to generate insights and recommendations',
  },
  {
    priority: 'medium',
    impact: 'increase',
    difficulty: 'high',
    suggestion: 'Optimize Portfolio Visibility',
    action: 'Ensure consistent brand presence and optimize portfolio for search engines',
  },
  {
    priority: 'low',
    impact: 'maintain',
    difficulty: 'low',
    suggestion: 'Improve Organizational Structure',
    action: 'Ensure all projects are properly categorized and tagged for better searchability',
  },
];

const priorityIcon = {
  high: Zap,
  medium: Target,
  low: Layers,
};

const AIInsightsCard: React.FC<AIInsightsCardProps> = ({ recommendations }) => {
  const insights = recommendations && recommendations.length > 0 ? recommendations : defaultInsights;

  return (
    <div className="space-y-3">
      {insights.map((insight, index) => {
        const Icon = priorityIcon[insight.priority as keyof typeof priorityIcon] || Sparkles;
        return (
          <motion.div
            key={insight.suggestion + index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className={cn(
              'p-4 rounded-xl border backdrop-blur-xl',
              insight.priority === 'high'
                ? 'bg-rose-500/[0.07] border-rose-500/20 hover:bg-rose-500/[0.12]'
                : insight.priority === 'medium'
                  ? 'bg-indigo-500/[0.07] border-indigo-500/20 hover:bg-indigo-500/[0.12]'
                  : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
            )}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={cn(
                  'w-7 h-7 flex items-center justify-center rounded-full',
                  insight.priority === 'high'
                    ? 'bg-rose-500/20 text-rose-300'
                    : insight.priority === 'medium'
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-white/[0.08] text-white/50'
                )}
              >
                <Icon width="14" height="14" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-white/90">{insight.suggestion}</p>
                <p className="text-xs text-white/40 capitalize">
                  {insight.difficulty} difficulty &bull; {insight.impact} portfolio
                </p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{insight.action}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AIInsightsCard;