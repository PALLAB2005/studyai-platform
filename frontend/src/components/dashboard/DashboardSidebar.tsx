import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Sparkles,
  Video,
  Bookmark,
  TrendingUp,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AppRoute } from '../../types/auth';

interface DashboardSidebarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({
  currentRoute,
  onNavigate,
  isOpen = false,
  onClose,
}: DashboardSidebarProps) {
  const { user, logout } = useAuth();

  const navItems: { label: string; route: AppRoute; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Courses', route: '/courses', icon: BookOpen },
    { label: 'My Learning', route: '/my-learning', icon: GraduationCap },
    { label: 'AI Quiz', route: '/quiz', icon: Sparkles },
    { label: 'Video Tutorials', route: '/tutorials', icon: Video },
    { label: 'Bookmarks', route: '/bookmarks', icon: Bookmark },
    { label: 'Progress', route: '/progress', icon: TrendingUp },
    { label: 'Settings', route: '/settings', icon: Settings },
  ];

  const handleNav = (route: AppRoute) => {
    onNavigate(route);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    logout();
    onNavigate('/login');
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="dashboard-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Brand Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center text-white shadow-md shadow-brand/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Study<span className="text-brand-600 dark:text-brand-400">AI</span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
                Student Portal
              </span>
            </div>
          </button>

          {/* Close button on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const isActive =
              currentRoute === item.route ||
              (item.route === '/courses' && currentRoute.startsWith('/courses'));
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                id={`sidebar-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNav(item.route)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group cursor-pointer ${isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                      }`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand dark:bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Student Profile & Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-xs mb-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand text-white font-bold flex items-center justify-center shrink-0 shadow-xs text-xs">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{(user?.name || 'S').charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user?.name || 'Pallab Bag'}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {user?.email || 'student@studyai.edu'}
                </p>
              </div>
            </div>
          </div>

          <button
            id="sidebar-logout-button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
