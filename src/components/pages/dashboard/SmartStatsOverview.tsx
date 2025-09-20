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
      blue: 'from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40',
      green: 'from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40',
      purple: 'from-purple-50/80 to-violet-50/80 dark:from-purple-950/40 dark:to-violet-950/40',
      orange: 'from-orange-50/80 to-amber-50/80 dark:from-orange-950/40 dark:to-amber-950/40',
      red: 'from-red-50/80 to-pink-50/80 dark:from-red-950/40 dark:to-pink-950/40'
    };

    return (
      <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${bgColorMap[color]} backdrop-blur-sm`}>
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorMap[color]} rounded-full -translate-y-8 translate-x-8`}></div>
          <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${colorMap[color]} rounded-full translate-y-4 -translate-x-4`}></div>
        </div>
        
        <CardHeader className="relative flex flex-row items-center justify-between pb-3">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorMap[color]} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {anomaly && (
              <div className="p-1 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
            )}
            {onAIClick && (
              <button
                onClick={onAIClick}
                className="p-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-200 group/ai"
                title="AI智能分析"
              >
                <span className="text-lg group-hover/ai:scale-110 transition-transform duration-200">🤖</span>
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="relative pt-0 space-y-4">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {subtitle}
            </div>
          </div>
          {trend && trendValue && (
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg ${
                trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {trend === 'up' ? (
                  <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                )}
              </div>
              <span className={`text-sm font-semibold ${
                trend === 'up' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
              }`}>
                {trendValue}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const PackageUsageCard = () => (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-sm">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full translate-y-6 -translate-x-6"></div>
      </div>
      
      <CardHeader className="relative flex flex-row items-center justify-between pb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Package className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            套餐使用情况
          </CardTitle>
        </div>
        <button
          onClick={() => setShowAIAnalysis(showAIAnalysis === 'package' ? null : 'package')}
          className="p-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-200 group/ai"
          title="AI智能分析"
        >
          <span className="text-lg group-hover/ai:scale-110 transition-transform duration-200">🤖</span>
        </button>
      </CardHeader>
      
      <CardContent className="relative pt-0 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">整体使用率</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {mockStats.packageUsage.overallUsage}%
            </span>
          </div>
          <div className="w-full bg-gray-200/80 rounded-full h-3 dark:bg-gray-700/80 shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
              style={{ width: `${mockStats.packageUsage.overallUsage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Token使用情况 */}
          <div className="bg-white/60 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="text-sm">💬</span>
                Token使用量
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {mockStats.packageUsage.tokenUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200/80 rounded-full h-2 dark:bg-gray-700/80 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-700 shadow-sm relative overflow-hidden"
                style={{ width: `${mockStats.packageUsage.tokenUsage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
              <span>
                {(mockStats.packageUsage.tokenUsed / 1000000).toFixed(1)}M / {mockStats.packageUsage.tokenLimit / 1000000}M
              </span>
              <span className="font-medium">
                预计剩余: {mockStats.packageUsage.daysLeft.tokens}天
              </span>
            </div>
          </div>

          {/* 插件调用情况 */}
          <div className="bg-white/60 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="text-sm">🔌</span>
                插件调用
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {mockStats.packageUsage.pluginUsage}%
              </span>
            </div>
            <div className="w-full bg-gray-200/80 rounded-full h-2 dark:bg-gray-700/80 shadow-inner">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-700 shadow-sm relative overflow-hidden"
                style={{ width: `${mockStats.packageUsage.pluginUsage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
              <span>
                {mockStats.packageUsage.pluginUsed.toLocaleString()} / {mockStats.packageUsage.pluginLimit.toLocaleString()}
              </span>
              <span className="font-medium">
                预计剩余: {mockStats.packageUsage.daysLeft.plugins}天
              </span>
            </div>
          </div>
        </div>

        {/* AI分析建议 - 改进样式 */}
        {showAIAnalysis === 'package' && (
          <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  小智建议：Token使用率偏高，建议优化
                </h4>
                <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    优化对话长度，减少不必要的上下文
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    调整模型参数，降低Token消耗
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="h-8 text-xs font-medium border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300">
                    查看AI分析
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs font-medium border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300">
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
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              智能数据概览
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">实时监控，智能洞察</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            🤖 AI智能预测与异常检测
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-3 py-1.5">
            实时数据
          </Badge>
        </div>
      </div>

      {/* 统计卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
