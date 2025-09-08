'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TokenUsageWarningProps {
  className?: string;
}

export function TokenUsageWarning({ className }: TokenUsageWarningProps) {
  // 这里的逻辑应该从PackageUsageCard中移过来
  const tokenUsagePercentage = 85; // 这个值应该从实际的使用情况计算
  const hasHighUsageWarning = tokenUsagePercentage > 80;
  
  if (!hasHighUsageWarning) {
    return null;
  }

  return (
    <div className={`p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
            Token使用率偏高，建议优化
          </span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-7 px-3 border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800">
            查看详情
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-3 border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800">
            优化建议
          </Button>
        </div>
      </div>
    </div>
  );
}
