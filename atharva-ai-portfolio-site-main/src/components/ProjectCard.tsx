
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imageError, setImageError] = React.useState(false);
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="terminal-card group h-full flex flex-col">

      {/* macOS window header */}
      <div className="terminal-header">
        <span className="win-dot" style={{ background: '#ff5f57' }} />
        <span className="win-dot" style={{ background: '#febc2e' }} />
        <span className="win-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 text-xs font-mono opacity-40 truncate flex-1"
          style={{ color: isDark ? '#fff' : '#000' }}>
          ~/projects/{project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
        </span>
      </div>

      {/* Project image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4"
            style={{ background: isDark ? '#0d0d0d' : '#f3f3f3' }}>
            <div className="terminal-prompt mb-2">$ ls -la projects/</div>
            <div className="text-xs font-mono opacity-50 text-center"
              style={{ color: isDark ? '#fff' : '#000' }}>
              {project.title}
            </div>
          </div>
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Terminal prompt */}
        <div className="terminal-prompt mb-1">$ describe project</div>

        <h3 className="font-bold text-base mb-2 leading-snug"
          style={{ color: isDark ? '#fff' : '#111' }}>
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="skill-chip" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>{t}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {project.liveUrl !== '#' && (
            <button
              className="btn-push flex-1 justify-center text-sm"
              style={{ padding: '7px 12px', fontSize: '0.8rem' }}
              onClick={() => window.open(project.liveUrl, '_blank')}>
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <button
              className="btn-outline-push flex-1 justify-center"
              style={{ padding: '7px 12px', fontSize: '0.8rem' }}
              onClick={() => window.open(project.githubUrl, '_blank')}>
              <Github className="w-3.5 h-3.5" /> GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
