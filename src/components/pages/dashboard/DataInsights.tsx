'use client';

import { useState } from 'react';
import { BarChart3, Lightbulb, ArrowUp, ArrowDown, Minus, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UsagePattern {
  feature: string;
  usage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  optimization?: string;
}

interface PerformanceBenchmark {
  metric: string;
  yourValue: number;
  industryAverage: number;
  bestPractice: number;
  unit: string;
  status: 'excellent' | 'good' | 'needs-improvement';
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  category: 'performance' | 'cost' | 'user-experience';
  estimatedImprovement: string;
}

const USAGE_PATTERNS: UsagePattern[] = [
  {
    feature: '智能体对话',
    usage: 1235,
    trend: 'up',
    trendValue: 15,
    optimization: '对话长度可优化'
  },
  {
    feature: '知识库查询',
    usage: 867,
    trend: 'up',
    trendValue: 8,
  },
  {
    feature: '插件调用',
    usage: 456,
    trend: 'down',
    trendValue: -5,
    optimization: '部分插件使用率低'
  },
  {
    feature: '多轮对话',
    usage: 342,
    trend: 'up',
    trendValue: 22,
  },
  {
    feature: '模板使用',
    usage: 189,
    trend: 'stable',
    trendValue: 2,
  }
];

const PERFORMANCE_BENCHMARKS: PerformanceBenchmark[] = [
  {
    metric: '响应速度',
    yourValue: 850,
    industryAverage: 1200,
    bestPractice: 600,
    unit: 'ms',
    status: 'good'
  },
  {
    metric: '用户满意度',
    yourValue: 4.2,
    industryAverage: 3.8,
    bestPractice: 4.5,
    unit: '/5',
    status: 'good'
  },
  {
    metric: 'Token效率',
    yourValue: 75,
    industryAverage: 68,
    bestPractice: 85,
    unit: '%',
    status: 'good'
  },
  {
    metric: '问题解决率',
    yourValue: 82,
    industryAverage: 78,
    bestPractice: 92,
    unit: '%',
    status: 'good'
  },
  {
    metric: '成本效益',
    yourValue: 3.2,
    industryAverage: 2.8,
    bestPractice: 4.1,
    unit: '倍',
    status: 'good'
  }
];

const OPTIMIZATION_SUGGESTIONS: OptimizationSuggestion[] = [
  {
    id: '1',
    title: '优化智能体对话长度',
    description: '通过简化回答和使用更精准的提示词，可以减少平均Token消耗',
    impact: 'high',
    effort: 'low',
    category: 'cost',
    estimatedImprovement: '节省20%成本'
  },
  {
    id: '2',
    title: '启用对话缓存机制',
    description: '对常见问题启用缓存，提升响应速度并降低API调用成本',
    impact: 'medium',
    effort: 'medium',
    category: 'performance',
    estimatedImprovement: '提升30%响应速度'
  },
  {
    id: '3',
    title: '优化知识库结构',
    description: '重新组织知识库内容，提高检索准确率和用户满意度',
    impact: 'high',
    effort: 'high',
    category: 'user-experience',
    estimatedImprovement: '提升15%满意度'
  },
  {
    id: '4',
    title: '移除低效插件',
    description: '识别并移除使用率低于5%的插件，简化智能体架构',
    impact: 'medium',
    effort: 'low',
    category: 'performance',
    estimatedImprovement: '提升10%性能'
  }
];

interface DataInsightsProps {
  className?: string;
}

export function DataInsights({ className }: DataInsightsProps) {
  const [activeTab, setActiveTab] = useState<'patterns' | 'benchmarks' | 'suggestions'>('patterns');

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-3 w-3 text-red-500" />;
      case 'stable':
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-500 text-white text-xs">优秀</Badge>;
      case 'good':
        return <Badge className="bg-blue-500 text-white text-xs">良好</Badge>;
      case 'needs-improvement':
        return <Badge className="bg-orange-500 text-white text-xs">待改进</Badge>;
      default:
        return null;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 text-xs">高影响</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">中影响</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 text-xs">低影响</Badge>;
      default:
        return null;
    }
  };

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case 'high':
        return <Badge variant="outline" className="text-red-600 border-red-300 text-xs">高投入</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300 text-xs">中投入</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-green-600 border-green-300 text-xs">低投入</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <CardTitle>数据洞察与分析</CardTitle>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'patterns' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('patterns')}
              className="text-xs"
            >
              使用模式
            </Button>
            <Button
              variant={activeTab === 'benchmarks' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('benchmarks')}
              className="text-xs"
            >
              性能基准
            </Button>
            <Button
              variant={activeTab === 'suggestions' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('suggestions')}
              className="text-xs"
            >
              优化建议
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {activeTab === 'patterns' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              基于最近30天的使用数据分析
            </div>
            
            {USAGE_PATTERNS.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{pattern.feature}</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(pattern.trend)}
                      <span className={`text-xs ${
                        pattern.trend === 'up' ? 'text-green-600' : 
                        pattern.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {pattern.trend === 'stable' ? '±' : ''}{Math.abs(pattern.trendValue)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{pattern.usage.toLocaleString()}次</span>
                    {pattern.optimization && (
                      <span className="text-xs text-orange-600">{pattern.optimization}</span>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              与行业平均水平和最佳实践对比
            </div>
            
            {PERFORMANCE_BENCHMARKS.map((benchmark, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{benchmark.metric}</h4>
                  {getStatusBadge(benchmark.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">您的水平</span>
                    <span className="font-semibold">
                      {benchmark.yourValue}{benchmark.unit}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>行业平均</span>
                      <span>最佳实践</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ 
                            width: `${Math.min(
                              (benchmark.yourValue / benchmark.bestPractice) * 100,
                              100
                            )}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{benchmark.industryAverage}{benchmark.unit}</span>
                        <span>{benchmark.bestPractice}{benchmark.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              基于AI分析的个性化优化建议
            </div>
            
            {OPTIMIZATION_SUGGESTIONS.map((suggestion) => (
              <div key={suggestion.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <h4 className="font-medium">{suggestion.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {getImpactBadge(suggestion.impact)}
                      {getEffortBadge(suggestion.effort)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    应用建议
                  </Button>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t text-sm">
                  <span className="text-muted-foreground">预期效果：</span>
                  <span className="font-medium text-green-600">
                    {suggestion.estimatedImprovement}
                  </span>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full text-sm">
              查看更多优化建议
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}