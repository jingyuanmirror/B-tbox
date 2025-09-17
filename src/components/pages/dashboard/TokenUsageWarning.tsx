'use client';

import { AlertTriangle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
    <div className={`p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 ${className}`}>
      <div className="flex items-start space-x-3">
        {/* AI Assistant indicator */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
          <Image 
            src="/ai-assistant.svg" 
            alt="AI Assistant" 
            width={16} 
            height={16}
            className="filter brightness-0 invert"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              智能助手提醒：Token使用率偏高，建议优化
            </span>
          </div>
          <p className="text-xs text-orange-600 dark:text-orange-400 mb-3">
            我注意到您的Token使用率已达85%，为了避免影响使用体验，建议您优化对话长度或考虑升级套餐。
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs h-7 px-3 border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800">
              查看详情
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-7 px-3 border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-800">
              获取优化建议
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
