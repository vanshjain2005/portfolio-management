import ProjectCard from '../ui/ProjectCard';
import ProjectItem from '../portfolio/ProjectItem';

interface LayoutGridProps {
  viewMode: 'grid' | 'list';
  projects: any[];
  onViewChange?: (mode: 'grid' | 'list') => void;
  onToggleFavorite?: (projectId: string) => void;
}

const LayoutGrid: React.FC<LayoutGridProps> = ({
  viewMode,
  projects,
}) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default LayoutGrid;
