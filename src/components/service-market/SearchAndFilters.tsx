'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ServiceFilter, ServiceCategory } from '@/types/service';
import { CATEGORY_CONFIG } from '@/constants/categories';
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: ServiceFilter;
  onFilterChange: (filter: Partial<ServiceFilter>) => void;
  totalResults: number;
  selectedCategory?: ServiceCategory | null;
  onCategoryChange?: (category: ServiceCategory | null) => void;
  selectedScope?: 'all' | 'published' | 'favorited';
  onScopeChange?: (scope: 'all' | 'published' | 'favorited') => void;
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  totalResults,
  selectedCategory,
  onCategoryChange,
  selectedScope = 'all',
  onScopeChange
}: SearchAndFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-1">
      {/* First Row: Scope Tabs + Search and Sort */}
      <div className="flex items-center justify-between">
        {/* Left side - Scope Filter Tabs */}
        {onScopeChange && (
          <div className="flex items-center space-x-1">
            <Button
              variant={selectedScope === 'all' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onScopeChange('all')}
              className="h-8 px-3 text-sm rounded-full"
            >
              精选
            </Button>
            <Button
              variant={selectedScope === 'published' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onScopeChange('published')}
              className="h-8 px-3 text-sm rounded-full"
            >
              我发布的
            </Button>
            <Button
              variant={selectedScope === 'favorited' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onScopeChange('favorited')}
              className="h-8 px-3 text-sm rounded-full"
            >
              收藏的
            </Button>
          </div>
        )}
        
        {/* Right side - Search and Sort */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="搜索你需要的组件"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-9 w-64 text-sm rounded-md bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          
          {/* Sort Dropdown */}
          <Select 
            value={filter.sortBy || 'popularity'} 
            onValueChange={(value) => onFilterChange({ sortBy: value as 'popularity' | 'newest' | 'rating' | 'name' })}
          >
            <SelectTrigger className="w-24 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">最热</SelectItem>
              <SelectItem value="newest">最新</SelectItem>
              <SelectItem value="rating">评分</SelectItem>
              <SelectItem value="name">名称</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
      </div>

      {/* Second Row: Category Filter Tabs */}
      {onCategoryChange && (
        <div className="flex items-center space-x-1">
          <Button
            variant={selectedCategory === null ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(null)}
            className="h-8 px-3 text-sm rounded-full"
          >
            全部类型
          </Button>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            const isSelected = selectedCategory === key;
            return (
              <Button
                key={key}
                variant={isSelected ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onCategoryChange(key as ServiceCategory)}
                className="h-8 px-3 text-sm rounded-full flex items-center space-x-1"
              >
                <Icon className="h-3 w-3" />
                <span>{config.label}</span>
              </Button>
            );
          })}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                排序方式
              </label>
              <Select 
                value={filter.sortBy || 'popularity'} 
                onValueChange={(value) => onFilterChange({ sortBy: value as 'popularity' | 'newest' | 'rating' | 'name' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">热度排序</SelectItem>
                  <SelectItem value="newest">最新发布</SelectItem>
                  <SelectItem value="rating">评分最高</SelectItem>
                  <SelectItem value="name">名称排序</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  onFilterChange({ sortBy: 'popularity' });
                  onSearchChange('');
                }}
                className="w-full"
              >
                重置筛选
              </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                共找到 {totalResults} 个服务
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(searchTerm || filter.type || filter.category) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">当前筛选:</span>
          
          {searchTerm && (
            <div className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md">
              搜索: &quot;{searchTerm}&quot;
              <button 
                onClick={() => onSearchChange('')}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}
          
          {filter.type && (
            <div className="flex items-center bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-md">
              类型: {filter.type}
              <button 
                onClick={() => onFilterChange({ type: undefined })}
                className="ml-1 hover:bg-purple-200 dark:hover:bg-purple-800 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}
          
          {filter.category && (
            <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-md">
              分类: {filter.category}
              <button 
                onClick={() => onFilterChange({ category: undefined })}
                className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded p-0.5"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}