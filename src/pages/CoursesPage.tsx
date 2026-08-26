import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { AppRoute } from '../types/auth';
import { YouTubeVideo } from '../types/youtube';
import { initialNotifications } from '../data/dashboard';

import { searchYouTubeCourses, getRecommendedVideos } from '../services/youtubeService';

import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { CourseSearch } from '../components/courses/CourseSearch';
import { SearchSuggestions } from '../components/courses/SearchSuggestions';
import { SearchResults } from '../components/courses/SearchResults';
import { YouTubeCourseCard } from '../components/courses/YouTubeCourseCard';
import { VideoFilters } from '../components/learning/VideoFilters';

import {
  Compass,
  Sparkles,
  Youtube,
  ArrowRight
} from 'lucide-react';

export function CoursesPage() {
  const { navigate } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [videoFilters, setVideoFilters] = useState({ language: '', duration: '', sort: 'relevance' });
  const [notifications, setNotifications] = useState(initialNotifications);

  // YouTube search states
  const [youTubeVideos, setYouTubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingYouTube, setIsLoadingYouTube] = useState(false);
  const [youTubeError, setYouTubeError] = useState<string | null>(null);

  // Default recommended YouTube videos for browsing mode
  const [defaultYouTubeVideos, setDefaultYouTubeVideos] = useState<YouTubeVideo[]>([]);

  const darkMode = theme === 'dark';

  const handleNavigate = (route: AppRoute) => {
    navigate(route);
  };

  // Perform search across YouTube
  const executeYouTubeSearch = useCallback(async (query: string, category: string, currentFilters = videoFilters) => {
    if (!query.trim() && category === 'All') {
      return;
    }

    setIsLoadingYouTube(true);
    setYouTubeError(null);

    const term = query.trim() || (category !== 'All' ? category : 'programming');

    try {
      const res = await searchYouTubeCourses(term, currentFilters);
      setYouTubeVideos(res.items);
    } catch (err: any) {
      console.error('Error fetching YouTube courses:', err);
      setYouTubeError(err.message || 'Unable to load YouTube resources');
    } finally {
      setIsLoadingYouTube(false);
    }
  }, [videoFilters]);

  // Load initial default YouTube recommendations when page loads
  useEffect(() => {
    let isMounted = true;
    getRecommendedVideos('web development programming', 4).then((videos) => {
      if (isMounted) {
        setDefaultYouTubeVideos(videos);
      }
    }).catch(() => {
      if (isMounted) setDefaultYouTubeVideos([]);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync search input and category triggers
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      setActiveQuery(trimmed);
      const timer = setTimeout(() => {
        executeYouTubeSearch(trimmed, selectedCategory);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setActiveQuery('');
      if (selectedCategory !== 'All' && selectedCategory !== 'All Courses') {
        executeYouTubeSearch('', selectedCategory);
      }
    }
  }, [searchQuery, selectedCategory, executeYouTubeSearch]);

  const handleSearchSubmit = (query: string) => {
    setActiveQuery(query.trim());
    if (query.trim()) {
      executeYouTubeSearch(query.trim(), selectedCategory);
    }
  };

  const handleSelectTopic = (topic: string) => {
    setSearchQuery(topic);
    setActiveQuery(topic);
    executeYouTubeSearch(topic, selectedCategory);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveQuery('');
    setYouTubeVideos([]);
    setYouTubeError(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (!searchQuery.trim() && category !== 'All' && category !== 'All Courses') {
      executeYouTubeSearch('', category);
    }
  };

  const handleFilterChange = (filter: 'language' | 'duration' | 'sort', value: string) => {
    const next = { ...videoFilters, [filter]: value };
    setVideoFilters(next);
    if (activeQuery || selectedCategory !== 'All') executeYouTubeSearch(activeQuery || searchQuery, selectedCategory, next);
  };

  const isSearchActive = activeQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        currentRoute="/courses"
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <DashboardHeader
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          notifications={notifications}
          onMarkAllNotificationsRead={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
          }
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          title="Explore Courses"
        />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header Banner */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-blue-950/50 dark:text-brand-300 border border-blue-200/50 dark:border-brand-800/40">
              <Compass className="w-3.5 h-3.5" />
              <span>Unified Learning Discovery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-display">
              Explore Courses
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Search any subject and learn from real educational videos on YouTube, right here.
            </p>
          </div>

          {/* Large Search Bar */}
          <div className="max-w-4xl space-y-4">
            <CourseSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              onClear={handleClearSearch}
              isSearching={isLoadingYouTube}
            />

            {/* Popular Topics / Suggestions */}
            <SearchSuggestions
              onSelectTopic={handleSelectTopic}
              activeTopic={searchQuery}
            />
            <VideoFilters {...videoFilters} onChange={handleFilterChange} />
          </div>

          {/* =========================================================================
              MAIN CONTENT: Search Mode vs. Catalog Browsing Mode
              ========================================================================= */}
          {isSearchActive ? (
            /* Unified Smart Search Results View */
            <SearchResults
              query={activeQuery}
              studyAICourses={[]}
              youTubeCourses={youTubeVideos}
              isLoadingYouTube={isLoadingYouTube}
              youTubeError={youTubeError}
              onRetryYouTube={() => executeYouTubeSearch(activeQuery, selectedCategory)}
              onClearSearch={handleClearSearch}
            />
          ) : (
            /* Default YouTube browsing view */
            <div className="space-y-12">
              {/* Curated YouTube Learning Playlists (Unified Platform Experience) */}
              {defaultYouTubeVideos.length > 0 && (
                <div className="space-y-5 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                        <Youtube className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                          Recommended from YouTube
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          Popular supplementary video courses and high-yield walkthroughs
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectTopic('Web Development')}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
                    >
                      <span>Search More on YouTube</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {defaultYouTubeVideos.map((video) => (
                      <YouTubeCourseCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
