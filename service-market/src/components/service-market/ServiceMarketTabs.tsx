'use client';

import { ServiceType } from '../../types/service';
import { Button } from '../ui/button';
import { Package, Layers, Workflow, Code } from 'lucide-react';
import { cn } from '../../lib/utils';

const SERVICE_TYPE_TABS = [
  {
    type: ServiceType.PLUGIN,
    label: '插件',
    icon: Package,
    description: '即插即用的功能组件',
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
  },
  {
    type: ServiceType.MCP,
    label: 'MCP',
    icon: Layers,
    description: '模型上下文协议服务',
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
  },
  {
    type: ServiceType.SERVICE_FLOW,
    label: '服务流',
    icon: Workflow,
    description: '工作流程模板',
    color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
  },
  {
    type: ServiceType.CODE_SERVICE,
    label: '代码服务',
    icon: Code,
    description: '自定义代码模板',
    color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800'
  }
];

interface ServiceMarketTabsProps {
  activeTab: ServiceType | 'all';
  setActiveTab: (tab: ServiceType | 'all') => void;
  compact?: boolean;
}

export function ServiceMarketTabs({ activeTab, setActiveTab, compact = false }: ServiceMarketTabsProps) {

  if (compact) {
    return (
      <div className="flex gap-1">
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveTab('all')}
          size="sm"
        >
          全部
        </Button>
        
        {SERVICE_TYPE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.type;
          
          return (
            <Button
              key={tab.type}
              variant={isActive ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.type)}
              size="sm"
              className="flex items-center space-x-1"
            >
              <Icon className="h-3 w-3" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      <Button
        variant={activeTab === 'all' ? 'default' : 'outline'}
        onClick={() => setActiveTab('all')}
        className={cn(
          'h-auto p-3 lg:p-4 border-2 transition-all',
          activeTab === 'all' &&
            'border-blue-600 bg-blue-50 text-blue-900 shadow-lg dark:bg-blue-900 dark:text-white dark:border-blue-400 scale-[1.04]'
        )}
      >
        <div className="text-center">
          <div className="font-bold tracking-wide">全部服务</div>
          <div className="text-xs text-muted-foreground mt-1">查看所有类型</div>
        </div>
      </Button>
      {SERVICE_TYPE_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.type;
        return (
          <Button
            key={tab.type}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.type)}
            className={cn(
              'h-auto p-3 lg:p-4 border-2',
              isActive && tab.color
            )}
          >
            <div className="flex items-center space-x-2 lg:space-x-3">
              <Icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium flex items-center space-x-2">
                  <span>{tab.label}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{tab.description}</div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}