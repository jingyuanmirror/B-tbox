'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  TrendingDown,
  Flame,
  Star,
  Eye,
  Clock,
  DollarSign,
  Users,
  Zap,
  Target,
  ArrowUpRight,
  Heart,
  BookOpen,
  Bot,
  Sparkles
} from 'lucide-react';

// 用户类型定义
export type UserType = 'pure-new' | 'newbie' | 'advanced' | 'expert' | 'isv';

interface UserData {
  agentCount: number;
  registrationDate: Date;
  lastLoginDate: Date;
  usageLevel: 'low' | 'medium' | 'high';
}

interface MarketTrendsProps {
  userType: UserType;
  userData: UserData;
}

// 行业热门数据
const INDUSTRY_TRENDS = [
  {
    industry: '酒店行业',
    icon: '🏨',
    trending: 'up',
    growth: 340,
    services: [
      {
        name: '智能客房助手模板',
        description: '3分钟创建，支持多语言，客户满意度95%+',
        suitableFor: '中高端酒店、民宿、度假村',
        growth: 340,
        users: 2850
      },
      {
        name: 'AI点餐推荐插件',
        description: '个性化菜品推荐，提升客单价30%',
        suitableFor: '餐厅、酒店餐饮部门',
        growth: 260,
        users: 1650
      },
      {
        name: '多渠道预订整合',
        description: '统一管理OTA平台，自动同步房态',
        suitableFor: '连锁酒店、独立酒店',
        growth: 180,
        users: 980
      }
    ]
  },
  {
    industry: '教育行业',
    icon: '📚',
    trending: 'up',
    growth: 280,
    services: [
      {
        name: '个性化学习助手',
        description: '根据学习进度智能推荐，提升学习效率40%',
        suitableFor: '在线教育、培训机构',
        growth: 280,
        users: 1920
      },
      {
        name: '智能作业批改',
        description: '自动批改作业并生成个性化反馈',
        suitableFor: '中小学、培训机构',
        growth: 220,
        users: 1340
      }
    ]
  },
  {
    industry: '零售电商',
    icon: '🛍️',
    trending: 'up',
    growth: 200,
    services: [
      {
        name: '智能销售顾问',
        description: '商品推荐+客户服务一体化，转化率提升25%',
        suitableFor: '电商平台、零售门店',
        growth: 200,
        users: 1560
      }
    ]
  }
];

// 成功案例
const SUCCESS_CASES = [
  {
    company: '海景酒店集团',
    industry: '酒店',
    solution: '智能客服+预订整合',
    results: {
      efficiency: '客服效率提升60%',
      complaints: '投诉减少40%',
      roi: '3个月回本',
      savings: '年度节省成本50万'
    },
    recommendation: '该方案特别适合您当前的业务场景',
    icon: '🏨',
    verified: true
  },
  {
    company: '智慧教育科技',
    industry: '教育',
    solution: '个性化学习助手',
    results: {
      engagement: '学习参与度提升75%',
      completion: '课程完成率提升50%',
      roi: '2个月回本',
      satisfaction: '用户满意度98%'
    },
    recommendation: '适合希望提升用户体验的在线教育场景',
    icon: '📚',
    verified: true
  }
];

// 爆款应用推荐
const HOT_APPLICATIONS = [
  {
    id: 'ai-customer-service',
    name: 'AI智能客服',
    category: '客户服务',
    icon: '🤖',
    price: '免费试用',
    rating: 4.9,
    reviews: 1250,
    description: '24/7智能客服，支持多语言，平均响应时间<2秒',
    features: ['情感分析', '多轮对话', '知识库集成', '数据统计'],
    usageCount: 15600,
    trending: true,
    aiRecommended: true
  },
  {
    id: 'smart-document-analyzer',
    name: '智能文档分析',
    category: '办公效率',
    icon: '📄',
    price: '￥99/月',
    rating: 4.8,
    reviews: 890,
    description: '快速分析各类文档，自动生成摘要和关键信息提取',
    features: ['智能摘要', '关键词提取', '多格式支持', '批量处理'],
    usageCount: 8900,
    trending: true,
    aiRecommended: false
  },
  {
    id: 'voice-assistant',
    name: '语音助手',
    category: '交互体验',
    icon: '🎤',
    price: '￥199/月',
    rating: 4.7,
    reviews: 650,
    description: '高精度语音识别与合成，支持自然语言交互',
    features: ['语音转文字', '文字转语音', '方言识别', '情绪识别'],
    usageCount: 5200,
    trending: false,
    aiRecommended: true
  }
];

export function MarketTrends({ userType, userData }: MarketTrendsProps) {
  const [activeTab, setActiveTab] = useState<'trends' | 'cases' | 'apps'>('trends');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const TrendingServiceCard = ({ service, industryIcon }: { service: any; industryIcon: string }) => (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{industryIcon}</span>
          <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
        </div>
        <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          +{service.growth}%
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        💡 {service.description}
      </p>
      
      <div className="text-xs text-blue-600 dark:text-blue-400 mb-3">
        🎯 适合：{service.suitableFor}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{service.users}人使用</span>
        <Button size="sm" variant="outline" className="h-6 text-xs">
          立即试用
        </Button>
      </div>
    </div>
  );

  const SuccessCaseCard = ({ case: successCase }: { case: typeof SUCCESS_CASES[0] }) => (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
      <div className="flex items-start space-x-4 mb-4">
        <div className="text-2xl">{successCase.icon}</div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {successCase.company}
            </h3>
            {successCase.verified && (
              <Badge className="bg-green-500 text-white text-xs">
                ✓ 已验证
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {successCase.industry}行业 · {successCase.solution}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(successCase.results).map(([key, value]) => (
          <div key={key} className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">📊 </span>
            <span className="text-gray-900 dark:text-white">{value}</span>
          </div>
        ))}
      </div>
      
      {successCase.recommendation && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <span className="text-sm">🤖</span>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>AI建议：</strong>{successCase.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const HotAppCard = ({ app }: { app: typeof HOT_APPLICATIONS[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{app.icon}</div>
            <div>
              <div className="flex items-center space-x-2">
                <CardTitle className="text-base font-semibold">
                  {app.name}
                </CardTitle>
                {app.trending && (
                  <Badge className="bg-red-500 text-white text-xs">
                    🔥 热门
                  </Badge>
                )}
                {app.aiRecommended && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                    🤖 AI推荐
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {app.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-green-600">{app.price}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Star className="w-3 h-3 text-yellow-500 mr-1" />
              {app.rating} ({app.reviews})
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {app.description}
        </p>
        
        <div className="mb-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">核心功能：</div>
          <div className="flex flex-wrap gap-1">
            {app.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {app.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{app.features.length - 3}更多
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {app.usageCount.toLocaleString()}人使用
          </span>
          <div className="space-x-2">
            <Button size="sm" variant="outline" className="h-7 text-xs">
              查看详情
            </Button>
            <Button size="sm" className="h-7 text-xs bg-blue-500 hover:bg-blue-600">
              立即使用
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <CardTitle className="text-lg font-semibold">
              市场动态与热门推荐
            </CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
              实时更新
            </Badge>
          </div>
          <div className="text-xs text-gray-500">
            🤖 基于AI分析的个性化推荐
          </div>
        </div>
        
        {/* Tab切换 */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'trends'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            📈 行业趋势
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'cases'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            💎 成功案例
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'apps'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            🔥 爆款应用
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* 行业趋势标签页 */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            {INDUSTRY_TRENDS.map((industry) => (
              <div key={industry.industry} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{industry.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        【{industry.industry}】热门上升
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>增长 +{industry.growth}%</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    查看全部
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {industry.services.map((service, index) => (
                    <TrendingServiceCard 
                      key={index}
                      service={service} 
                      industryIcon={industry.icon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 成功案例标签页 */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            {SUCCESS_CASES.map((successCase, index) => (
              <SuccessCaseCard key={index} case={successCase} />
            ))}
          </div>
        )}

        {/* 爆款应用标签页 */}
        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {HOT_APPLICATIONS.map((app) => (
              <HotAppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
