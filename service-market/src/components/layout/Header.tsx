'use client';

import { Search, Menu, User, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">百</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">百宝箱</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">企业版服务市场</p>
            </div>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="搜索服务、插件或工具..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile search button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}