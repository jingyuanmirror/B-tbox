'use client';

import { Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { usePageStore } from '@/store/usePageStore';

interface AppHeaderProps {
  onMenuToggle?: () => void;
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  const { currentPageTitle, showTitleInHeader } = usePageStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left - Mobile menu button and title */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden mr-2"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          {/* Page title - shown when scrolled */}
          <div className={`transition-all duration-300 ${
            showTitleInHeader 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentPageTitle}
            </h1>
          </div>
        </div>

        {/* Center - Empty space */}
        <div className="flex-1"></div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}