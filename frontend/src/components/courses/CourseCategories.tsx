import React from 'react';
import {
  Sparkles,
  Code,
  Terminal,
  Cpu,
  Brain,
  Database,
  Shield,
  Layers,
  Briefcase
} from 'lucide-react';

export const COURSE_CATEGORIES = [
  { id: 'all', name: 'All Courses', icon: Sparkles },
  { id: 'Web Development', name: 'Web Development', icon: Code },
  { id: 'Programming', name: 'Programming', icon: Terminal },
  { id: 'Data Science', name: 'Data Science', icon: Cpu },
  { id: 'Artificial Intelligence', name: 'Artificial Intelligence', icon: Brain },
  { id: 'Database', name: 'Database', icon: Database },
  { id: 'Cyber Security', name: 'Cyber Security', icon: Shield },
  { id: 'Software Engineering', name: 'Software Engineering', icon: Layers },
  { id: 'Career Skills', name: 'Career Skills', icon: Briefcase },
] as const;

interface CourseCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export function CourseCategories({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CourseCategoriesProps) {
  return (
    <section className="w-full" aria-label="Course Categories">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {COURSE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name || (cat.id === 'all' && selectedCategory === 'All Courses');
          const count = categoryCounts ? categoryCounts[cat.name] || (cat.id === 'all' ? categoryCounts['All'] : undefined) : undefined;

          return (
            <button
              key={cat.id}
              type="button"
              id={`category-tab-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat.name)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-brand text-white border-blue-600 shadow-sm shadow-brand/20 dark:bg-brand dark:border-blue-500 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/80 dark:hover:bg-slate-700/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
              <span>{cat.name}</span>
              {typeof count === 'number' && (
                <span
                  className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full font-mono font-medium ${
                    isSelected
                      ? 'bg-blue-700/60 text-brand-100 dark:bg-blue-600/80'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
