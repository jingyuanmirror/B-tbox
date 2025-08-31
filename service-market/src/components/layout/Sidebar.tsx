'use client';

import { useState } from 'react';
import { 
  Home, 
  Store, 
  Bot, 
  Settings, 
  Users, 
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Search,
  Layout,
  Package,
  CreditCard,
  Shield,
  TrendingUp,
  Database,
  Activity
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import CreateAppModal from '../app/CreateAppModalSimple';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const NAVIGATION_ITEMS = [
  {
    key: 'search',
    label: '搜索',
    icon: Search,
    description: ''
  },
  {
    key: 'home',
    label: '首页',
    icon: Home,
    description: ''
  },
  {
    key: 'templates',
    label: '行业应用模板',
    icon: Layout,
    description: ''
  },
  {
    key: 'service-market',
    label: '服务市场',
    icon: Store,
    description: ''
  },
  {
    key: 'cards',
    label: '卡片模版',
    icon: CreditCard,
    description: ''
  }
];

const WORKSPACE_ITEMS = [
  {
    key: 'workspace',
    label: '工作空间',
    icon: null,
    description: '',
    isHeader: true
  },
  {
    key: 'default-workspace',
    label: '默认空间',
    icon: Users,
    description: ''
  }
];

const APP_ITEMS = [
  {
    key: 'applications',
    label: '应用',
    icon: Package,
    description: ''
  },
  {
    key: 'knowledge',
    label: '知识库',
    icon: FileText,
    description: ''
  },
  {
    key: 'plugins',
    label: '插件',
    icon: Bot,
    description: ''
  },
  {
    key: 'cards-section',
    label: '卡片',
    icon: CreditCard,
    description: ''
  },
  {
    key: 'permissions',
    label: '权限管理',
    icon: Shield,
    description: ''
  }
];

const OPERATION_ITEMS = [
  {
    key: 'operation',
    label: '运营管理',
    icon: null,
    description: '',
    isHeader: true
  },
  {
    key: 'evaluation',
    label: '评测中心',
    icon: Activity,
    description: '',
    beta: true
  },
  {
    key: 'data-center',
    label: '数据中心',
    icon: Database,
    description: '',
    beta: true
  },
  {
    key: 'user-management',
    label: '用户管理',
    icon: Users,
    description: ''
  },
  {
    key: 'activity-center',
    label: '活动中心',
    icon: TrendingUp,
    description: ''
  }
];

const renderNavigationSection = (items: any[], collapsed: boolean, currentPage: string, onPageChange: (page: string) => void) => {
  return items.map((item) => {
    if (item.isHeader) {
      return !collapsed ? (
        <div key={item.key} className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {item.label}
        </div>
      ) : null;
    }

    const Icon = item.icon;
    const isActive = currentPage === item.key;
    
    return (
      <Button
        key={item.key}
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start h-10 px-3',
          isActive && 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
        )}
        onClick={() => onPageChange(item.key)}
        title={collapsed ? item.label : undefined}
      >
        <Icon className={cn('h-4 w-4 flex-shrink-0', collapsed ? 'mr-0' : 'mr-3')} />
        {!collapsed && (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm">{item.label}</span>
            {item.beta && (
              <span className="text-xs text-gray-400 italic">Beta</span>
            )}
          </div>
        )}
      </Button>
    );
  });
};

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);

  return (
    <div className={cn(
      'flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 h-screen sticky top-0',
      collapsed ? 'w-16' : 'w-52'
    )}>
      {/* Header - Logo and New App Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 space-y-3">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">百</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">百宝箱</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">企业版</p>
            </div>
          </div>
        )}
        {!collapsed ? (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setShowCreateAppModal(true)}
          >
            <span className="mr-2">+</span>
            新建应用
          </Button>
        ) : (
          <Button 
            className="w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setShowCreateAppModal(true)}
          >
            +
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Main Navigation */}
        {renderNavigationSection(NAVIGATION_ITEMS, collapsed, currentPage, onPageChange)}
        
        {/* Workspace Section */}
        <div className="pt-4">
          {renderNavigationSection(WORKSPACE_ITEMS, collapsed, currentPage, onPageChange)}
        </div>
        
        {/* Apps Section */}
        <div className="pt-4">
          {renderNavigationSection(APP_ITEMS, collapsed, currentPage, onPageChange)}
        </div>
        
        {/* Operation Section */}
        <div className="pt-4">
          {renderNavigationSection(OPERATION_ITEMS, collapsed, currentPage, onPageChange)}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Create App Modal */}
      <CreateAppModal
        isOpen={showCreateAppModal}
        onClose={() => setShowCreateAppModal(false)}
      />
    </div>
  );
}