
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillItem {
  name: string;
  icon: LucideIcon;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

interface SkillBadgeProps {
  skill: SkillItem;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const Icon = skill.icon;
  
  return (
    <div className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-sm flex items-center gap-2 group hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
      <Icon className="h-3.5 w-3.5 text-blue-400" />
      <span className="text-white/90">{skill.name}</span>
    </div>
  );
};

export default SkillBadge;

// Export the skill interfaces for use in other components
export type { SkillItem, SkillCategory };
