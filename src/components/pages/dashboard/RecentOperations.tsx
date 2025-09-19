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
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  template: {
    icon: FileText,
    label: '模板',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  plugin: {
    icon: Plug,
    label: '插件',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  analytics: {
    icon: BarChart3,
    label: '分析',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
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
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>操作记录</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              开始您的AI之旅
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              创建第一个智能体后，这里将显示您的操作历史
            </p>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              立即创建
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>操作记录</span>
          </CardTitle>
          <Button size="sm" variant="outline" className="text-xs">
            查看全部
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {operations.slice(0, 5).map((operation) => {
          const typeConfig = OPERATION_TYPES[operation.type];
          const IconComponent = typeConfig.icon;
          
          return (
            <div 
              key={operation.id}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${typeConfig.bgColor} dark:bg-gray-800`}>
                <IconComponent className={`w-4 h-4 ${typeConfig.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{operation.operator}</span>
                  <span className="mx-1">{operation.action}了</span>
                  <span className="text-blue-600 dark:text-blue-400">"{operation.target}"</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatTimeAgo(operation.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
