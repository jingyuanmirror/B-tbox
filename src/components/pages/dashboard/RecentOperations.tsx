'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  FileText, 
  Plug, 
  BarChart3, 
  Clock, 
  Zap
} from 'lucide-react';

// 用户类型定义
export type UserType = 'pure-new' | 'newbie' | 'advanced' | 'expert' | 'isv';

interface UserData {
  agentCount: number;
  registrationDate: Date;
  lastLoginDate: Date;
  usageLevel: 'low' | 'medium' | 'high';
}

interface RecentOperationsProps {
  userType: UserType;
  userData: UserData;
}

interface OperationRecord {
  id: string;
  type: 'agent' | 'template' | 'plugin' | 'analytics';
  action: string;
  target: string;
  timestamp: Date;
  operator: string; // 操作人
}

// 根据用户类型生成操作记录
const generateOperationsForUser = (userType: UserType, userData: UserData): OperationRecord[] => {
  switch (userType) {
    case 'pure-new':
      return [];

    case 'newbie':
      return [
        {
          id: '1',
          type: 'agent',
          action: '创建',
          target: '我的第一个智能体',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          operator: '当前用户'
        },
        {
          id: '2',
          type: 'template',
          action: '应用',
          target: '知识问答模板',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          operator: '当前用户'
        }
      ];

    case 'advanced':
      return [
        {
          id: '1',
          type: 'agent',
          action: '编辑',
          target: '酒店客服助手',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          operator: '当前用户'
        },
        {
          id: '2',
          type: 'template',
          action: '使用',
          target: '餐厅点餐模板',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          operator: '当前用户'
        },
        {
          id: '3',
          type: 'plugin',
          action: '安装',
          target: '支付处理插件',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          operator: '当前用户'
        }
      ];

    case 'expert':
      return [
        {
          id: '1',
          type: 'agent',
          action: '优化',
          target: '企业级智能客服集群',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          operator: '当前用户'
        },
        {
          id: '2',
          type: 'analytics',
          action: '导出',
          target: '季度ROI分析报告',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          operator: '当前用户'
        }
      ];

    case 'isv':
      return [
        {
          id: '1',
          type: 'agent',
          action: '部署',
          target: '客户A-酒店智能体集群',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          operator: '张工程师'
        },
        {
          id: '2',
          type: 'analytics',
          action: '生成',
          target: '客户B项目盈利分析报告',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          operator: '李经理'
        },
        {
          id: '3',
          type: 'template',
          action: '打包',
          target: '教育行业解决方案',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          operator: '王产品'
        },
        {
          id: '4',
          type: 'plugin',
          action: '集成',
          target: '客户用量预测模型',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          operator: '陈开发'
        }
      ];

    default:
      return [];
  }
};

const OPERATION_TYPES = {
  agent: {
    icon: Bot,
    label: '智能体',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  template: {
    icon: FileText,
    label: '模板',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  plugin: {
    icon: Plug,
    label: '插件',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  analytics: {
    icon: BarChart3,
    label: '分析',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50',
    borderColor: 'border-orange-200 dark:border-orange-800'
  }
};

export function RecentOperations({ userType, userData }: RecentOperationsProps) {
  const operations = generateOperationsForUser(userType, userData);

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes}分钟前`;
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}天前`;
    }
  };

  // 纯新用户显示引导内容
  if (userType === 'pure-new' || operations.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">操作记录</h3>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 flex items-center justify-center shadow-lg">
            <Zap className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            开始您的AI之旅
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto leading-relaxed">
            创建第一个智能体后，这里将显示您的操作历史和活动记录
          </p>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
            立即创建智能体
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">操作记录</h3>
        </div>
        <Button size="sm" variant="outline" className="text-xs font-medium border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 rounded-lg px-4 py-2">
          查看全部
        </Button>
      </div>
      
      <div className="space-y-4">
        {operations.slice(0, 5).map((operation) => {
          const typeConfig = OPERATION_TYPES[operation.type];
          const IconComponent = typeConfig.icon;
          
          return (
            <div 
              key={operation.id}
              className={`group flex items-center space-x-4 p-4 rounded-2xl border ${typeConfig.borderColor} ${typeConfig.bgColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className={`p-3 rounded-2xl ${typeConfig.bgColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-5 h-5 ${typeConfig.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  <span className="font-semibold">{operation.operator}</span>
                  <span className="mx-1 text-gray-600 dark:text-gray-400">{operation.action}了</span>
                  <span className={`font-medium ${typeConfig.color}`}>&quot;{operation.target}&quot;</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className={`inline-block w-2 h-2 rounded-full ${typeConfig.color.replace('text-', 'bg-')}`}></span>
                  {formatTimeAgo(operation.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
