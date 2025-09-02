'use client';

import { Bot, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageUsageCard } from './PackageUsageCard';

interface StatItem {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
}

const BASIC_STATS: StatItem[] = [
  {
    title: '智能体总数',
    value: '156',
    change: '+12',
    subtitle: '本周新增',
    icon: Bot,
    color: 'text-blue-600 dark:text-blue-400',
    trend: 'up'
  },
  {
    title: '智能体 DAU',
    value: '1,234',
    change: '987',
    subtitle: '7日平均',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
    trend: 'up'
  },
  {
    title: '团队成员',
    value: '23',
    change: '18',
    subtitle: '活跃成员',
    icon: Users,
    color: 'text-purple-600 dark:text-purple-400',
    trend: 'stable'
  },
  {
    title: '费用消耗',
    value: '¥2,847',
    change: '¥2,156',
    subtitle: '上月同期',
    icon: DollarSign,
    color: 'text-orange-600 dark:text-orange-400',
    trend: 'up'
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

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}>
      {BASIC_STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                <span>{getTrendIcon(stat.trend)}</span>
                <span>{stat.change}</span>
                <span className="text-gray-400">•</span>
                <span>{stat.subtitle}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* 套餐使用情况 - 特殊组件 */}
      <PackageUsageCard />
    </div>
  );
}