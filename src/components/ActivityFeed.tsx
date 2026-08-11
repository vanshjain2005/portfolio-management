import React from 'react';
import { Plus, Star, Edit, Archive, Trash, Globe } from 'lucide-react';
import { cn } from '../utils';

interface ActivityFeedProps {
  projects?: any[];
  limit?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  limit = 5,
}) => {
  const activity = [
    {
      type: 'project_created',
      title: 'New Project Created',
      date: '2026-01-15',
      projectTitle: 'Personal Portfolio Website',
      icon: <Plus className="w-4 h-4" />,
      color: 'green',
    },
    {
      type: 'project_published',
      title: 'Project Published',
      date: '2026-01-15',
      projectTitle: 'AI Analytics Dashboard',
      icon: <Globe className="w-4 h-4" />,
      color: 'blue',
    },
    {
      type: 'project_featured',
      title: 'Project Featured',
      date: '2026-04-05',
      projectTitle: 'Design System Library',
      icon: <Star className="w-4 h-4" />,
      color: 'purple',
    },
    {
      type: 'project_updated',
      title: 'Project Updated',
      date: '2026-03-15',
      projectTitle: 'E-Commerce Platform',
      icon: <Edit className="w-4 h-4" />,
      color: 'yellow',
    },
    {
      type: 'project_archived',
      title: 'Project Archived',
      date: '2026-02-01',
      projectTitle: 'Old Project Removed',
      icon: <Archive className="w-4 h-4" />,
      color: 'gray',
    },
    {
      type: 'project_deleted',
      title: 'Project Deleted',
      date: '2026-05-10',
      projectTitle: 'Old Project Removed',
      icon: <Trash className="w-4 h-4" />,
      color: 'red',
    },
  ];

  return (
    <div className="space-y-2">
      {activity.slice(0, limit).map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 cursor-pointer group"
        >
          <div className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/[0.06]',
            item.color === 'green' && 'bg-emerald-500/15 text-emerald-300',
            item.color === 'blue' && 'bg-blue-500/15 text-blue-300',
            item.color === 'purple' && 'bg-purple-500/15 text-purple-300',
            item.color === 'yellow' && 'bg-amber-500/15 text-amber-300',
            item.color === 'gray' && 'bg-white/[0.06] text-white/50',
            item.color === 'red' && 'bg-rose-500/15 text-rose-300'
          )}>
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/90">
              {item.title}
            </p>
            <p className="text-xs text-white/40">
              {item.projectTitle} • {item.date}
            </p>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-colors opacity-0 group-hover:opacity-100">
            <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;