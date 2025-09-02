'use client';

import { ServiceCategory, ServiceType } from @/types/service';
import { CATEGORY_CONFIG } from '@/constants/categories';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Layers, Package, Workflow, Code, TrendingUp } from 'lucide-react';

interface NavigationProps {
  selectedCategory: ServiceCategory | null;
  selectedType: ServiceType | null;
  onCategoryChange: (category: ServiceCategory | null) => void;
  onTypeChange: (type: ServiceType | null) => void;
}

const SERVICE_TYPE_CONFIG = {
  [ServiceType.PLUGIN]: {
    icon: Package,
    label: '插件',
    description: '即插即用的功能组件',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  [ServiceType.MCP]: {
    icon: Layers,
    label: 'MCP',
    description: '模型上下文协议服务',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  [ServiceType.SERVICE_FLOW]: {
    icon: Workflow,
    label: '服务流',
    description: '工作流程模板',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  [ServiceType.CODE_SERVICE]: {
    icon: Code,
    label: '代码服务',
    description: '自定义代码模板',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  }
} as const;

export function Navigation({ selectedCategory, selectedType, onCategoryChange, onTypeChange }: NavigationProps) {
  return (
    <div className="w-64 border-r bg-white dark:bg-gray-950 p-6 space-y-8">
      {/* Service Types */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">服务类型</h2>
        </div>
        <div className="space-y-2">
          <Button
            variant={selectedType === null ? 'secondary' : 'ghost'}
            className="w-full justify-start h-auto p-3"
            onClick={() => onTypeChange(null)}
          >
            <div className="text-left">
              <div className="font-medium">全部类型</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">查看所有服务</div>
            </div>
          </Button>
          {Object.entries(SERVICE_TYPE_CONFIG).map(([type, config]) => {
            const Icon = config.icon;
            const isSelected = selectedType === type;
            return (
              <Button
                key={type}
                variant={isSelected ? 'secondary' : 'ghost'}
                className="w-full justify-start h-auto p-3"
                onClick={() => onTypeChange(type as ServiceType)}
              >
                <div className="flex items-start space-x-3 text-left">
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium flex items-center space-x-2">
                      <span>{config.label}</span>
                      {isSelected && <Badge variant="outline" className="text-xs">已选</Badge>}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{config.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Layers className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">功能分类</h2>
        </div>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? 'secondary' : 'ghost'}
            className="w-full justify-start h-auto p-3"
            onClick={() => onCategoryChange(null)}
          >
            <div className="text-left">
              <div className="font-medium">全部分类</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">查看所有功能</div>
            </div>
          </Button>
          {Object.entries(CATEGORY_CONFIG).map(([category, config]) => {
            const Icon = config.icon;
            const isSelected = selectedCategory === category;
            return (
              <Button
                key={category}
                variant={isSelected ? 'secondary' : 'ghost'}
                className="w-full justify-start h-auto p-3"
                onClick={() => onCategoryChange(category as ServiceCategory)}
              >
                <div className="flex items-start space-x-3 text-left">
                  <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', config.color)} />
                  <div>
                    <div className="font-medium flex items-center space-x-2">
                      <span>{config.label}</span>
                      {isSelected && <Badge variant="outline" className="text-xs">已选</Badge>}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{config.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}