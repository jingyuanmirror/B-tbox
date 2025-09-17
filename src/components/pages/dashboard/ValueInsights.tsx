'use client';

import { TrendingUp, DollarSign, Target, Trophy, Zap, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ValueMetric {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface BusinessOpportunity {
  id: string;
  title: string;
  description: string;
  marketTrend: string;
  expectedRoi: string;
  difficulty: 'low' | 'medium' | 'high';
  category: string;
  icon: string;
}

const VALUE_METRICS: ValueMetric[] = [
  {
    id: '1',
    name: '工作效率提升',
    value: '+35%',
    change: '较使用前',
    trend: 'up',
    description: '智能体帮助团队自动化处理日常任务',
    icon: Zap,
    color: 'text-green-600'
  },
  {
    id: '2',
    name: '成本节约',
    value: '¥12,850',
    change: '本月',
    trend: 'up',
    description: '相比传统解决方案节省人力成本',
    icon: DollarSign,
    color: 'text-blue-600'
  },
  {
    id: '3',
    name: '客户满意度',
    value: '94.5%',
    change: '+8.2%',
    trend: 'up',
    description: '智能客服提升服务质量',
    icon: Trophy,
    color: 'text-purple-600'
  }
];

const BUSINESS_OPPORTUNITIES: BusinessOpportunity[] = [
  {
    id: '1',
    title: '酒店行业智能客房控制',
    description: '传统酒店数字化转型需求激增',
    marketTrend: '+420%',
    expectedRoi: '客户愿付费3000-8000元/间',
    difficulty: 'medium',
    category: '酒店行业',
    icon: '🏨'
  },
  {
    id: '2',
    title: '教育行业个性化学习助手',
    description: '在线教育个性化需求爆发',
    marketTrend: '+380%',
    expectedRoi: '单客户年付费5000-20000元',
    difficulty: 'high',
    category: '教育行业',
    icon: '📚'
  }
];

export function ValueInsights() {
  const getDifficultyBadge = (difficulty: 'low' | 'medium' | 'high') => {
    const configs = {
      low: { label: '容易', variant: 'secondary' as const },
      medium: { label: '中等', variant: 'default' as const },
      high: { label: '困难', variant: 'destructive' as const }
    };
    
    return <Badge variant={configs[difficulty].variant} className="text-xs">{configs[difficulty].label}</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 个人价值分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>💎 价值洞察分析 - 🤖小智为您量化</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {VALUE_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{metric.name}</h4>
                    <div className="flex items-center space-x-1">
                      <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                    {metric.description}
                  </p>
                  
                  <div className="text-xs text-gray-500">
                    {metric.change}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-3 border-t">
            <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">
              🤖小智综合分析：您的AI应用使用效果优于75%的同行用户
            </div>
            <Button variant="outline" size="sm" className="w-full">
              查看小智详细价值报告
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 商业机会发现 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span>💡 发现新机会 - 🤖小智商机分析师</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                🔥 行业热门趋势
              </span>
            </div>
          </div>
          
          {BUSINESS_OPPORTUNITIES.map((opportunity) => (
            <div key={opportunity.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-800 dark:to-red-700 flex items-center justify-center text-lg">
                    {opportunity.icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{opportunity.title}</h4>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">{opportunity.marketTrend}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start space-x-2">
                      <span>💰</span>
                      <div>
                        <div className="font-medium">小智市场分析：{opportunity.description}</div>
                        <div className="text-gray-600 dark:text-gray-400">📊小智预期收益：{opportunity.expectedRoi}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{opportunity.category}</Badge>
                      {getDifficultyBadge(opportunity.difficulty)}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                      小智详细分析
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-3 border-t bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-sm">🎯</span>
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                  您的专属机会
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  小智基于您的【酒店客服智能体】，推荐升级方向：增加预订管理功能
                </div>
                <Button variant="outline" size="sm" className="text-xs h-6">
                  查看小智专属建议
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
