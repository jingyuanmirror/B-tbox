'use client';

import { Package, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          📦 套餐使用情况
        </CardTitle>
        <Package className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 详细使用情况 */}
        <div className="space-y-3">
          {USAGE_ITEMS.map((item, index) => {
            const usagePercentage = (item.used / item.total) * 100;
            const isHighUsage = usagePercentage > 80;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
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
                    isHighUsage ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    <span>预计剩余: {item.estimatedDaysLeft}天</span>
                  </span>
                </div>
              </div>
            );
          })}
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