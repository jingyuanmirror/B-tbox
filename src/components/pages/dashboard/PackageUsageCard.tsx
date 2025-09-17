'use client';

import { Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UsageItem {
  type: 'token' | 'plugin';
  icon: string;
  label: string;
  used: number;
  total: number;
  unit: string;
  estimatedDaysLeft: number;
  color: string;
}

const USAGE_ITEMS: UsageItem[] = [
  {
    type: 'token',
    icon: '💬',
    label: 'Token使用量',
    used: 8.5,
    total: 10,
    unit: 'M',
    estimatedDaysLeft: 6,
    color: 'bg-blue-600'
  },
  {
    type: 'plugin',
    icon: '🔌',
    label: '插件调用',
    used: 4.5,
    total: 10,
    unit: 'K',
    estimatedDaysLeft: 18,
    color: 'bg-green-600'
  }
];

export function PackageUsageCard() {
  const overallUsage = 78; // 整体使用率
  const isHighUsage = overallUsage > 70;
  
  return (
    <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          📦 套餐使用情况
        </CardTitle>
        <div className="flex items-center space-x-1">
          {isHighUsage && <AlertTriangle className="h-4 w-4 text-orange-500" />}
          <Package className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
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
      <CardContent className="space-y-4">
        {/* 整体使用率 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">整体使用率</span>
            <span className={`text-sm font-bold ${isHighUsage ? 'text-orange-600' : 'text-green-600'}`}>
              {overallUsage}%
            </span>
          </div>
          <Progress value={overallUsage} className="h-2" />
        </div>

        {/* 详细使用情况 */}
        <div className="space-y-3">
          {USAGE_ITEMS.map((item, index) => {
            const usagePercentage = (item.used / item.total) * 100;
            const isItemHighUsage = usagePercentage > 80;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <div className={`text-xs ${isItemHighUsage ? 'text-orange-500 font-medium' : 'text-muted-foreground'}`}>
                    {usagePercentage.toFixed(0)}%
                  </div>
                </div>
                <Progress 
                  value={usagePercentage} 
                  className="h-1.5" 
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {item.used}{item.unit}/{item.total}{item.unit}
                  </span>
                  <span className={`flex items-center space-x-1 ${
                    isItemHighUsage ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    <span>预计剩余: {item.estimatedDaysLeft}天</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 小智建议区域 */}
        <div className="pt-2 border-t bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 mt-3">
          <div className="flex items-start space-x-2">
            <span className="text-sm">🤖</span>
            <div className="flex-1">
              <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
                小智建议：Token使用率偏高，建议优化
              </div>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                  查看AI分析
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                  获取优化方案
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 趋势提示 */}
        <div className="flex items-center justify-between pt-1 border-t">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-blue-500" />
            <span className="text-xs text-muted-foreground">使用趋势</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            较上周 +15%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}