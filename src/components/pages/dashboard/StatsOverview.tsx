'use client';

import { Bot, Users, TrendingUp, DollarSign, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackageUsageCard } from './PackageUsageCard';

interface StatItem {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  aiInsight?: string;
  hasAlert?: boolean;
  alertType?: 'warning' | 'info' | 'success';
}

const BASIC_STATS: StatItem[] = [
  {
    title: '智能体总数',
    value: '156',
    change: '+12',
    subtitle: '本周新增',
    icon: Bot,
    color: 'text-blue-600 dark:text-blue-400',
    trend: 'up',
    aiInsight: '🤖小智分析：新创建的智能体主要集中在客服和知识问答场景，建议关注模板复用率'
  },
  {
    title: '智能体 DAU',
    value: '1,234',
    change: '987',
    subtitle: '7日平均',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
    trend: 'up',
    aiInsight: '🤖小智分析：DAU稳步增长，用户粘性较好，建议优化高频使用场景的响应速度'
  },
  {
    title: '团队成员',
    value: '23',
    change: '18',
    subtitle: '活跃成员',
    icon: Users,
    color: 'text-purple-600 dark:text-purple-400',
    trend: 'stable',
    aiInsight: '🤖小智分析：团队协作活跃度良好，78%成员参与智能体创建和维护'
  },
  {
    title: '费用消耗',
    value: '¥2,847',
    change: '¥2,156',
    subtitle: '上月同期',
    icon: DollarSign,
    color: 'text-orange-600 dark:text-orange-400',
    trend: 'up',
    hasAlert: true,
    alertType: 'warning',
    aiInsight: '🤖小智预警：费用增长32%，主要因Token使用量增加，建议优化提示词长度'
  }
];

interface StatsOverviewProps {
  className?: string;
}

export function StatsOverview({ className }: StatsOverviewProps) {
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      case 'stable':
        return '➡️';
      default:
        return '';
    }
  };

  const getAlertIcon = (alertType?: 'warning' | 'info' | 'success') => {
    switch (alertType) {
      case 'warning':
        return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      case 'info':
        return <Info className="h-3 w-3 text-blue-500" />;
      case 'success':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}>
      {BASIC_STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="flex items-center space-x-1">
                {stat.hasAlert && getAlertIcon(stat.alertType)}
                <Icon className={`h-4 w-4 ${stat.color}`} />
                {/* AI助手入口 */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="🤖小智分析"
                >
                  <span className="text-xs">🤖</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                <span>{getTrendIcon(stat.trend)}</span>
                <span>{stat.change}</span>
                <span className="text-gray-400">•</span>
                <span>{stat.subtitle}</span>
              </div>
              
              {/* AI洞察提示 - hover显示 */}
              {stat.aiInsight && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-full group-hover:translate-y-0">
                  <div className="text-xs text-gray-600 dark:text-gray-300 p-2 bg-white dark:bg-gray-800 rounded border shadow-sm">
                    {stat.aiInsight}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      
      {/* 套餐使用情况 - 特殊组件 */}
      <PackageUsageCard />
    </div>
  );
}