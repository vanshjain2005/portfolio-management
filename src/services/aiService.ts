import type { AIInsight, AIAnalysis } from '../types';
import aiData from '../data/ai-insights.json';

const aiInsights = aiData.portfolioAnalysis || {
  portfolioQuality: {
    rating: 8.5,
    strengths: ['Complete project variety', 'Solid technical skills', 'Strong presentation quality'],
    weaknesses: ['Could add more detail', 'Missing some metadata', 'Limited visual variety'],
  },
  completeness: 95,
  organization: 85,
  presentation: 90,
  impact: 92,
  recommendations: []
};

const quality = aiInsights.portfolioQuality || {};

const analysis: AIAnalysis = {
  rating: quality.rating || 8.5,
  strengths: quality.strengths || ['Complete project variety', 'Solid technical skills'],
  weaknesses: quality.weaknesses || ['Could add more detail', 'Missing some metadata'],
  completeness: quality.completeness || 95,
  organization: quality.organization || 85,
  presentation: quality.presentation || 90,
  impact: quality.impact || 92,
  recommendations: (aiData.portfolioAnalysis?.recommendations || []).map((r: any) => ({
    priority: r.priority.toLowerCase() as 'high' | 'medium' | 'low',
    impact: (r.impact || 'increase').toLowerCase() as 'increase' | 'optimize' | 'maintain',
    difficulty: r.difficulty.toLowerCase() as 'low' | 'medium' | 'high',
    suggestion: r.suggestion,
    action: r.action,
  })),
};

const projectIdeas: AIInsight[] = (aiData.projectSuggestions || []).map((s: any) => ({
  priority: 'medium' as 'low' | 'medium' | 'high',
  impact: 'increase' as 'increase' | 'optimize' | 'maintain',
  difficulty: 'low' as 'low' | 'medium' | 'high',
  suggestion: s.suggestedTitle,
  action: s.reason,
  id: s.originalTitle,
  title: s.suggestedTitle,
  description: s.reason,
}));

export async function analyzePortfolio(): Promise<AIAnalysis> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...analysis,
        completeness: analysis.completeness + Math.floor(Math.random() * 5),
        organization: analysis.organization + Math.floor(Math.random() * 3),
      });
    }, 800);
  });
}

export async function generateIdeas(): Promise<AIInsight[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projectIdeas);
    }, 600);
  });
}

export async function getRecommendations(): Promise<AIInsight[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(analysis.recommendations);
    }, 500);
  });
}

export const aiService = {
  analyzePortfolio,
  generateIdeas,
  getRecommendations,
};

export default aiService;
