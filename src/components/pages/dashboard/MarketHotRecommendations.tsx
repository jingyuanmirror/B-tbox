'use client';

import { TrendingUp, Star, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HotService {
  id: string;
  name: string;
  icon: string;
  category: string;
  growthRate: string;
  description: string;
  suitableFor: string;
  usage: number;
  rating: number;
  trend: 'up' | 'hot' | 'new';
}

interface SuccessCase {
  id: string;
  company: string;
  solution: string;
  metrics: {
    efficiency: string;
    cost: string;
    roi: string;
  };
  aiComment: string;
}

const HOT_SERVICES: HotService[] = [
  {
    id: '1',
    name: '智能客房助手模板',
    icon: '🏨',
    category: '酒店行业',
    growthRate: '+340%',
    description: '3分钟创建，支持多语言，客户满意度95%+',
    suitableFor: '中高端酒店、民宿、度假村',
    usage: 2480,
    rating: 4.8,
    trend: 'hot'
  },
  {
    id: '2',
    name: 'AI点餐推荐插件',
    icon: '🍽️',
    category: '餐饮行业',
    growthRate: '+260%',
    description: '个性化菜品推荐，提升客单价30%',
    suitableFor: '餐厅、酒店餐饮部门',
    usage: 1850,
    rating: 4.6,
    trend: 'up'
  },
  {
    id: '3',
    name: '多渠道预订整合',
    icon: '📱',
    category: '酒店行业',
    growthRate: '+180%',
    description: '统一管理OTA平台，自动同步房态',
    suitableFor: '连锁酒店、独立酒店',
    usage: 1320,
    rating: 4.7,
    trend: 'up'
  }
];

const SUCCESS_CASE: SuccessCase = {
  id: '1',
  company: '海景酒店集团',
  solution: '智能客服+预订整合',
  metrics: {
    efficiency: '客服效率提升60%',
    cost: '投诉减少40%',
    roi: '3个月回本，年度节省成本50万'
  },
  aiComment: '🤖小智点评：该方案特别适合您当前的业务场景'
};

export function MarketHotRecommendations() {
  const getTrendBadge = (trend: 'up' | 'hot' | 'new') => {
    const config = {
      hot: { label: '🔥热门', variant: 'destructive' as const },
      up: { label: '📈上升', variant: 'default' as const },
      new: { label: '✨新品', variant: 'secondary' as const }
    };
    
    const { label, variant } = config[trend];
    return <Badge variant={variant} className="text-xs">{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* 本周热门推荐 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <CardTitle>🔥 本周热门推荐 - 🤖小智为您精选</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              查看更多
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 行业分类热门 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-700 dark:text-blue-300">【酒店行业】热门上升</span>
            </div>
            
            <div className="space-y-3">
              {HOT_SERVICES.map((service) => (
                <div key={service.id} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 flex items-center justify-center text-lg">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{service.name}</h4>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{service.growthRate}</span>
                      </div>
                      {getTrendBadge(service.trend)}
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 flex items-center space-x-1">
                      <span>💡</span>
                      <span>{service.description}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>🎯</span>
                        <span>适合：{service.suitableFor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs">{service.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{service.usage.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 成功案例分享 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">💎</span>
              <span className="font-semibold text-green-700 dark:text-green-300">成功案例分享 - 🤖小智案例库</span>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">【{SUCCESS_CASE.company}】使用{SUCCESS_CASE.solution}</h4>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  成功案例
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span>📊</span>
                  <span className="font-medium">效果：</span>
                  <span>{SUCCESS_CASE.metrics.efficiency}，{SUCCESS_CASE.metrics.cost}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💰</span>
                  <span className="font-medium">ROI：</span>
                  <span>{SUCCESS_CASE.metrics.roi}</span>
                </div>
                <div className="flex items-start space-x-2 mt-3 pt-2 border-t">
                  <span>🤖</span>
                  <span className="text-blue-600 dark:text-blue-400 text-xs">{SUCCESS_CASE.aiComment}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs h-7">
                  查看详情
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7">
                  立即试用
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
