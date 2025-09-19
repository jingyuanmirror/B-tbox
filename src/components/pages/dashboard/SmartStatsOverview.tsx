'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  CreditCard, 
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Package,
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

interface SmartStatsOverviewProps {
  userType: UserType;
  userData: UserData;
}

// Mock数据 - 实际应该从API获取
const mockStats = {
  agents: {
    total: 8,
    weeklyNew: 2,
    trend: [5, 6, 7, 6, 8, 7, 8], // 最近30天趋势
    growth: 14.3 // 环比增长率
  },
  dau: {
    yesterday: 156,
    avg7days: 142,
    growth: 9.8,
    anomalyDetected: false
  },

  cost: {
    currentMonth: 2856.80,
    dailyAvg: 95.23,
    lastMonthComparison: -5.6,
    breakdown: { tokens: 65, plugins: 35 }
  },
  packageUsage: {
    overallUsage: 78,
    tokenUsage: 85,
    tokenLimit: 10000000,
    tokenUsed: 8500000,
    pluginUsage: 45,
    pluginLimit: 10000,
    pluginUsed: 4500,
    daysLeft: { tokens: 6, plugins: 18 }
  }
};

export function SmartStatsOverview({ userType, userData }: SmartStatsOverviewProps) {
  const [showAIAnalysis, setShowAIAnalysis] = useState<string | null>(null);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    trend, 
    trendValue, 
    color = 'blue',
    anomaly = false,
    onAIClick 
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number;
    subtitle: string;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
    anomaly?: boolean;
    onAIClick?: () => void;
  }) => {
    const colorMap = {
      blue: 'from-blue-500 to-indigo-600',
      green: 'from-green-500 to-emerald-600',
      purple: 'from-purple-500 to-violet-600',
      orange: 'from-orange-500 to-amber-600',
      red: 'from-red-500 to-pink-600'
    };

    const bgColorMap = {
      blue: 'from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50',
      green: 'from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50',
      purple: 'from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50',
      orange: 'from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50',
      red: 'from-red-50 to-pink-50 dark:from-red-950/50 dark:to-pink-950/50'
    };

    return (
      <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${bgColorMap[color]}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorMap[color]} shadow-md`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {anomaly && (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
            {onAIClick && (
              <button
                onClick={onAIClick}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                title="AI智能分析"
              >
                🤖
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </div>
            {trend && trendValue && (
              <div className="flex items-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const PackageUsageCard = () => (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
            <Package className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
            套餐使用情况
          </CardTitle>
        </div>
        <button
          onClick={() => setShowAIAnalysis(showAIAnalysis === 'package' ? null : 'package')}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          title="AI智能分析"
        >
          🤖
        </button>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">整体使用率</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {mockStats.packageUsage.overallUsage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${mockStats.packageUsage.overallUsage}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {/* Token使用情况 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                💬 Token使用量
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {mockStats.packageUsage.tokenUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full"
                style={{ width: `${mockStats.packageUsage.tokenUsage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {(mockStats.packageUsage.tokenUsed / 1000000).toFixed(1)}M / {mockStats.packageUsage.tokenLimit / 1000000}M
              <span className="ml-2">预计剩余: {mockStats.packageUsage.daysLeft.tokens}天</span>
            </div>
          </div>

          {/* 插件调用情况 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                🔌 插件调用
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {mockStats.packageUsage.pluginUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                style={{ width: `${mockStats.packageUsage.pluginUsage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {mockStats.packageUsage.pluginUsed.toLocaleString()} / {mockStats.packageUsage.pluginLimit.toLocaleString()}
              <span className="ml-2">预计剩余: {mockStats.packageUsage.daysLeft.plugins}天</span>
            </div>
          </div>
        </div>

        {/* AI分析建议 */}
        {showAIAnalysis === 'package' && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-2">
              <span className="text-sm">🤖</span>
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">小智建议：Token使用率偏高，建议优化</p>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• 优化对话长度，减少不必要的上下文</li>
                  <li>• 调整模型参数，降低Token消耗</li>
                </ul>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    查看AI分析
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    获取优化方案
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            智能仪表盘
          </h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
            实时数据
          </Badge>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          🤖 AI智能预测与异常检测
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* 智能体总数 */}
        <StatCard
          icon={Bot}
          title="智能体总数"
          value={mockStats.agents.total}
          subtitle={`本周新增 ${mockStats.agents.weeklyNew} 个`}
          trend="up"
          trendValue={`+${mockStats.agents.growth}%`}
          color="blue"
          onAIClick={() => setShowAIAnalysis(showAIAnalysis === 'agents' ? null : 'agents')}
        />

        {/* 智能体DAU */}
        <StatCard
          icon={Eye}
          title="智能体 DAU"
          value={mockStats.dau.yesterday}
          subtitle={`7日平均 ${mockStats.dau.avg7days}`}
          trend="up"
          trendValue={`+${mockStats.dau.growth}%`}
          color="green"
          anomaly={mockStats.dau.anomalyDetected}
          onAIClick={() => setShowAIAnalysis(showAIAnalysis === 'dau' ? null : 'dau')}
        />

        {/* 费用消耗 */}
        <StatCard
          icon={CreditCard}
          title="费用消耗"
          value={`¥${mockStats.cost.currentMonth.toLocaleString()}`}
          subtitle={`日均 ¥${mockStats.cost.dailyAvg}`}
          trend={mockStats.cost.lastMonthComparison > 0 ? 'up' : 'down'}
          trendValue={`${mockStats.cost.lastMonthComparison > 0 ? '+' : ''}${mockStats.cost.lastMonthComparison}%`}
          color="orange"
          onAIClick={() => setShowAIAnalysis(showAIAnalysis === 'cost' ? null : 'cost')}
        />

        {/* 套餐使用情况 - 占用一个完整卡片位置 */}
        <PackageUsageCard />
      </div>

      {/* AI智能分析详情弹窗或面板 */}
      {showAIAnalysis && showAIAnalysis !== 'package' && (
        <Card className="border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <span>🤖</span>
              <span>AI智能分析 - {showAIAnalysis}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {showAIAnalysis === 'agents' && (
                <div>
                  <p className="mb-2">基于您的智能体创建趋势分析：</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 创建速度稳定，建议继续保持</li>
                    <li>• 客服类智能体使用率最高，建议重点优化</li>
                    <li>• 预测下月可能新增3-4个智能体</li>
                  </ul>
                </div>
              )}
              {showAIAnalysis === 'cost' && (
                <div>
                  <p className="mb-2">费用分析与预测：</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 本月费用控制良好，低于预算15%</li>
                    <li>• Token费用占比65%，建议优化对话效率</li>
                    <li>• 预测下月费用约¥3200，建议关注</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
