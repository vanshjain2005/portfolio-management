import skillsData from '../data/skills.json';
import analyticsJson from '../data/analytics.json';
import activityData from '../data/activity.json';
import { projectService } from './projectService';

export const analyticsService = {
  getPortfolioHealth() {
    const projects = projectService.getAll();
    const published = projects.filter((p) => p.status === 'published').length;
    const drafts = projects.filter((p) => p.status === 'draft').length;
    const featured = projects.filter((p) => p.featured).length;
    return {
      score: 85,
      metrics: {
        totalProjects: projects.length,
        publishedProjects: published,
        draftProjects: drafts,
        featuredProjects: featured,
        totalCategories: 6,
        totalSkills: skillsData.length,
      },
    };
  },
  getCategoryBreakdown() {
    return (analyticsJson as any).categoryBreakdown || [];
  },
  getTechnologyBreakdown() {
    return (analyticsJson as any).technologyBreakdown || [];
  },
  getSkillDistribution() {
    return (analyticsJson as any).skillDistribution || [];
  },
  getActivity() {
    return activityData as any[];
  },
  getFullAnalytics(): any {
    return analyticsJson;
  },
};

export const skillService = {
  getAll() {
    return skillsData as any[];
  },
  getDistribution() {
    return (analyticsJson as any).skillDistribution || [];
  },
};