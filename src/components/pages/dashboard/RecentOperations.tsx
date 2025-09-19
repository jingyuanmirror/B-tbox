'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  FileText, 
  Plug, 
  BarChart3, 
  Clock, 
  ArrowRight,
  Zap,
  AlertTriangle,
  Edit,
  Play,
  Download,
  Settings,
  TrendingUp,
  Eye
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
  description?: string;
  suggestion?: string;
  aiSuggestion?: string;
  status?: 'success' | 'warning' | 'info';
  metrics?: {
    usage?: number;
    satisfaction?: number;
    improvement?: string;
    cost?: string;
    clientCount?: number;
    profitMargin?: string;
    templatesCount?: number;
    industryDemand?: string;
    accuracy?: string;
  };
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
          description: '使用客服助手模板创建',
          aiSuggestion: '建议添加情感分析功能，可提升30%用户满意度',
          status: 'success',
          metrics: {
            usage: 45,
            satisfaction: 4.2
          }
        },
        {
          id: '2',
          type: 'template',
          action: '应用',
          target: '知识问答模板',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          description: '导入文档并配置问答规则',
          status: 'info',
          metrics: {
            usage: 28
          }
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
          description: '添加了情感分析功能',
          aiSuggestion: 'AI建议：可继续优化对话流程，预计提升20%效果',
          status: 'info',
          metrics: {
            usage: 156,
            satisfaction: 4.8,
            improvement: '效果提升15%'
          }
        },
        {
          id: '2',
          type: 'template',
          action: '使用',
          target: '餐厅点餐模板',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          description: '创建"智能点餐助手"',
          status: 'success',
          metrics: {
            usage: 156,
            satisfaction: 4.8
          }
        },
        {
          id: '3',
          type: 'plugin',
          action: '安装',
          target: '支付处理插件',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          description: '集成到客服助手',
          suggestion: '插件调用费用较高，建议优化调用策略',
          status: 'warning',
          metrics: {
            cost: '￥45/天'
          }
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
          description: '架构升级，支持1000+并发',
          aiSuggestion: '🤖 AI建议：可考虑申请专家级性能优化咨询',
          status: 'success',
          metrics: {
            usage: 2500,
            satisfaction: 4.9,
            improvement: '性能提升40%'
          }
        },
        {
          id: '2',
          type: 'analytics',
          action: '导出',
          target: '季度ROI分析报告',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          description: 'AI应用价值量化分析',
          status: 'success',
          metrics: {
            improvement: 'ROI提升235%'
          }
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
          description: '为5家连锁酒店批量部署客服智能体',
          aiSuggestion: '🤖 AI建议：可推荐预订管理插件，预计客户付费意愿85%',
          status: 'success',
          metrics: {
            clientCount: 5,
            satisfaction: 4.7,
            improvement: '交付时间缩短60%'
          }
        },
        {
          id: '2',
          type: 'analytics',
          action: '生成',
          target: '客户B项目盈利分析报告',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: '🤖 AI成本智能分析：利润率达32%',
          aiSuggestion: '建议调整定价策略，可提升15%利润空间',
          status: 'success',
          metrics: {
            profitMargin: '32%',
            improvement: '成本优化15%'
          }
        },
        {
          id: '3',
          type: 'template',
          action: '打包',
          target: '教育行业解决方案',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          description: '标准化交付模板，覆盖K12和高等教育',
          aiSuggestion: '🤖 市场分析：教育行业需求增长40%，建议重点推广',
          status: 'success',
          metrics: {
            templatesCount: 8,
            industryDemand: '+40%'
          }
        },
        {
          id: '4',
          type: 'plugin',
          action: '集成',
          target: '客户用量预测模型',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          description: '为精准报价开发预测工具',
          status: 'success',
          metrics: {
            accuracy: '92%',
            improvement: '报价准确率提升25%'
          }
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
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>最近操作记录</span>
          </CardTitle>
          <Button size="sm" variant="outline" className="text-xs">
            查看全部
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {operations.slice(0, 4).map((operation) => {
          const typeConfig = OPERATION_TYPES[operation.type];
          const IconComponent = typeConfig.icon;
          
          return (
            <div 
              key={operation.id}
              className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${typeConfig.bgColor} dark:bg-gray-800`}>
                  <IconComponent className={`w-4 h-4 ${typeConfig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {operation.action}了"{operation.target}"
                      </h4>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(operation.timestamp)}</span>
                        <span className={`px-1.5 py-0.5 rounded text-xs ${typeConfig.bgColor} ${typeConfig.color}`}>
                          {typeConfig.label}
                        </span>
                      </div>
                    </div>
                    {operation.status && (
                      <Badge 
                        variant={operation.status === 'success' ? 'default' : operation.status === 'warning' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {operation.status === 'success' ? '成功' : operation.status === 'warning' ? '注意' : '信息'}
                      </Badge>
                    )}
                  </div>
                  
                  {operation.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {operation.description}
                    </p>
                  )}

                  {/* 指标展示 */}
                  {operation.metrics && (
                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {operation.metrics.usage && (
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{operation.metrics.usage}次使用</span>
                        </span>
                      )}
                      {operation.metrics.satisfaction && (
                        <span className="flex items-center space-x-1">
                          <span>⭐</span>
                          <span>{operation.metrics.satisfaction}/5</span>
                        </span>
                      )}
                      {operation.metrics.improvement && (
                        <span className="flex items-center space-x-1 text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          <span>{operation.metrics.improvement}</span>
                        </span>
                      )}
                      {operation.metrics.cost && (
                        <span className="flex items-center space-x-1 text-orange-600">
                          <span>💰</span>
                          <span>{operation.metrics.cost}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* AI建议 */}
                  {operation.aiSuggestion && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        {operation.aiSuggestion}
                      </p>
                    </div>
                  )}

                  {/* 普通建议 */}
                  {operation.suggestion && (
                    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start space-x-1">
                        <AlertTriangle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                          {operation.suggestion}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      继续编辑
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      查看效果
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
