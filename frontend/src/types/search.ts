import { Course } from './course';
import { YouTubeVideo } from './youtube';

export interface LearningSearchQuery {
  query: string;
  topic?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  source: 'studyai' | 'youtube' | 'all';
}

export interface UnifiedSearchResults {
  query: string;
  studyAICourses: Course[];
  youTubeCourses: YouTubeVideo[];
  isSearching: boolean;
  hasSearched: boolean;
  error?: string | null;
}

export type PopularTopic = {
  label: string;
  query: string;
  category: string;
  icon?: string;
};
