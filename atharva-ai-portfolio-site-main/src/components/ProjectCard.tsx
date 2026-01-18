
import React from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card className="group glass-effect hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 overflow-hidden relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-emerald-500/0 group-hover:from-blue-500/5 group-hover:to-emerald-500/5 transition-all duration-500"></div>
      
      <CardContent className="p-0 relative z-10">
        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-lg overflow-hidden relative">
          {!imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-emerald-600/20">
              <div className="text-center p-4">
                <Code className="h-12 w-12 mx-auto mb-2 text-primary/50" />
                <p className="text-xs text-muted-foreground">{project.title}</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-0.5 sm:py-1 glass-effect text-primary rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {project.liveUrl !== '#' && (
              <Button 
                variant="default" 
                size="sm" 
                className="w-full sm:flex-1 glass-effect bg-gradient-to-r from-blue-500 to-emerald-500 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Live Demo
              </Button>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:flex-1 glass-effect hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                GitHub
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
