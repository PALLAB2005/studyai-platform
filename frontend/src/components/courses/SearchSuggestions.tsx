import React from 'react';
import { Sparkles, Code, Terminal, Brain, Database, Shield, Cpu, Layers } from 'lucide-react';

interface SearchSuggestionsProps {
  onSelectTopic: (topic: string) => void;
  activeTopic?: string;
}

export const POPULAR_TOPICS = [
  { label: 'Web Development', query: 'Web Development', icon: Code },
  { label: 'Python', query: 'Python', icon: Terminal },
  { label: 'JavaScript', query: 'JavaScript', icon: Code },
  { label: 'React', query: 'React', icon: Layers },
  { label: 'Data Structures', query: 'Data Structures', icon: Cpu },
  { label: 'DBMS', query: 'DBMS', icon: Database },
  { label: 'Machine Learning', query: 'Machine Learning', icon: Brain },
  { label: 'Artificial Intelligence', query: 'Artificial Intelligence', icon: Brain },
  { label: 'Cyber Security', query: 'Cyber Security', icon: Shield },
];

export function SearchSuggestions({ onSelectTopic, activeTopic }: SearchSuggestionsProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Popular topics to explore:</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar -mx-1 px-1">
        {POPULAR_TOPICS.map((topic) => {
          const Icon = topic.icon;
          const isActive = activeTopic?.toLowerCase() === topic.query.toLowerCase();

          return (
            <button
              key={topic.label}
              type="button"
              id={`topic-suggestion-${topic.query.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectTopic(topic.query)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-brand text-white dark:bg-brand shadow-xs'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{topic.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
