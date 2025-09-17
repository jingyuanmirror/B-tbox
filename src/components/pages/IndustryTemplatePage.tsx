"use client";

import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TEMPLATE_CATEGORIES } from "@/constants/templates";
import { useTemplates } from "@/hooks/useTemplates";

export function IndustryTemplatePage() {
  const {
    selectedCategory,
    searchQuery,
    viewMode,
    filteredTemplates,
    handleCategoryChange,
    handleSearchChange,
    handleViewModeChange,
  } = useTemplates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          应用模版
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Template
        </p>
      </div>

      {/* Category Navigation */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 overflow-x-auto">
            {TEMPLATE_CATEGORIES.map(category => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`px-0 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  selectedCategory === category.key
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索应用模版..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-64 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "space-y-4"
      }>
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700"
          >
            {/* Template Image */}
            <div className="relative overflow-hidden">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {template.isWorkTemplate && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-50 text-orange-600 border border-orange-200 text-xs px-2 py-1 rounded-md hover:bg-orange-50">
                    工作模版
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Template Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm mb-1 line-clamp-1">
                  {template.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>已复用有序数</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{template.usageCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="text-gray-400 text-4xl mb-3">🔍</div>
          <p className="text-gray-500 dark:text-gray-400">
            没有找到匹配的模版，请尝试其他关键词
          </p>
        </div>
      )}
    </div>
  );
}
