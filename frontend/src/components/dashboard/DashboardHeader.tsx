import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';
import { NotificationItem } from '../../types/learning';

interface DashboardHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onToggleSidebar?: () => void;
  onOpenSidebar?: () => void;
  isSidebarOpen?: boolean;
  notifications?: NotificationItem[];
  onMarkAllNotificationsRead?: () => void;
  onNotificationClick?: (id: string) => void;
  onClearAllNotifications?: () => void;
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  title?: string;
}

export function DashboardHeader({
  darkMode,
  onToggleTheme,
  onToggleSidebar,
  onOpenSidebar,
  isSidebarOpen,
  notifications = [],
  onMarkAllNotificationsRead = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  title = 'Dashboard',
}: DashboardHeaderProps) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebarFn = onToggleSidebar || onOpenSidebar;
  const unreadCount = notifications.filter((n) => !n.read).length;


  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Title */}
        <div className="flex items-center gap-3">
          {toggleSidebarFn && (
            <button
              id="sidebar-toggle-button"
              onClick={toggleSidebarFn}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              {title}
            </h1>
          </div>
        </div>

        {/* Right Side: Search, Notifications, Theme Toggle, Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search bar */}
          <div className="relative hidden md:block w-56 lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="dashboard-header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search courses, topics..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile search trigger or button */}
          <button
            id="mobile-search-toggle"
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Search"
            onClick={() => {
              const el = document.getElementById('mobile-search-bar');
              if (el) el.classList.toggle('hidden');
            }}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              id="dashboard-notifications-button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            <NotificationDropdown
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
              onMarkAllRead={onMarkAllNotificationsRead}
            />
          </div>

          {/* Theme Toggle */}
          <button
            id="dashboard-theme-toggle-button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-brand text-white font-bold text-sm shadow-sm select-none">
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
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {user?.name || 'Student'}
              </p>
              <p className="text-[11px] text-slate-400 leading-tight">Learner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      <div id="mobile-search-bar" className="hidden md:hidden px-4 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search courses, topics..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>
    </header>
  );
}
