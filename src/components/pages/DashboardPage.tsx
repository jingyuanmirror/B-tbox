'use client';

import { useEffect, useState } from 'react';
import { useServiceStore } from '@/store/useServiceStore';
import { usePageStore } from '@/store/usePageStore';
import { useScrollHeader } from '@/hooks/useScrollHeader';

// Import all dashboard components
import { StatsOverview } from './dashboard/StatsOverview';
import { CommunityCollaboration } from './dashboard/CommunityCollaboration';
import { SmartMessageCenter } from './dashboard/SmartMessageCenter';
import { SmartFunctionGuide } from './dashboard/SmartFunctionGuide';
import { DataInsights } from './dashboard/DataInsights';
import { TokenUsageWarning } from './dashboard/TokenUsageWarning';
import { MarketHotRecommendations } from './dashboard/MarketHotRecommendations';

// Import existing components for service sections
import { Package, User, Building2, Bot, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// 用户类型定义
type UserType = 'developer' | 'isv' | 'user';

interface UserTypeConfig {
  id: UserType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const USER_TYPES: UserTypeConfig[] = [
  {
    id: 'developer',
    name: '普通开发者',
    description: '个人或小团队开发者，关注技术实现和快速产出',
    icon: User,
    features: ['快速上手', '模板使用', '效果验证', '技术指导']
  },
  {
    id: 'isv',
    name: 'ISV 服务商', 
    description: '为企业提供 AI 解决方案的服务商',
    icon: Building2,
    features: ['成本控制', '客户交付', '商业化变现', '生态合作']
  },
  {
    id: 'user',
    name: '智能体使用方',
    description: '企业内部使用智能体的业务人员',
    icon: Bot,
    features: ['使用效果', '成本监控', '业务价值评估', '效果优化']
  }
];

export function DashboardPage() {
  const { publishedServices } = useServiceStore();
  const { setCurrentPageTitle } = usePageStore();
  const { titleRef } = useScrollHeader();
  const [currentUserType, setCurrentUserType] = useState<UserType>('developer');
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  
  // Set page title when component mounts
  useEffect(() => {
    setCurrentPageTitle('智能工作台');
  }, [setCurrentPageTitle]);

  // 获取当前用户类型配置
  const currentUserConfig = USER_TYPES.find(type => type.id === currentUserType) || USER_TYPES[0];

  // 根据用户类型决定显示的组件
  const shouldShowComponent = (component: string): boolean => {
    switch (component) {
      case 'CommunityCollaboration':
        // 社区协作主要针对ISV服务商和企业使用方
        return currentUserType === 'isv' || currentUserType === 'user';
      case 'SmartFunctionGuide':
        // 功能引导主要针对开发者和ISV
        return currentUserType === 'developer' || currentUserType === 'isv';
      case 'DataInsights':
        // 数据洞察对所有用户都有用，但重点不同
        return true;
      case 'MarketHotRecommendations':
        // 市场推荐对所有用户都重要
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-800/30">
      <div className="space-y-6">
        {/* Enhanced Page Header with Glass Effect and User Type Selector */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-xl"></div>
          <div className="relative p-6 backdrop-blur-sm border border-white/20 rounded-xl bg-white/60 dark:bg-gray-900/60 shadow-lg shadow-blue-500/5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 
                  ref={titleRef}
                  className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-white"
                  data-page-title
                >
                  智能工作台
                </h1>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                    <span className="text-base">欢迎回到百宝箱企业版，您的AI原生应用开发中心</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium shadow-sm">
                      🤖 小智智能助手
                    </span>
                  </p>
                </div>
              </div>
              
              {/* 用户类型切换器 */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowUserTypeSelector(!showUserTypeSelector)}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 dark:bg-gray-800/80 dark:border-gray-600 dark:hover:bg-gray-700/50 shadow-sm"
                >
                  <currentUserConfig.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium">{currentUserConfig.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showUserTypeSelector ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* 用户类型选择下拉框 */}
                {showUserTypeSelector && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 backdrop-blur-sm">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">选择用户类型</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">切换角色查看不同的个性化界面</p>
                    </div>
                    <div className="p-2 space-y-1">
                      {USER_TYPES.map((userType) => (
                        <button
                          key={userType.id}
                          onClick={() => {
                            setCurrentUserType(userType.id);
                            setShowUserTypeSelector(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            currentUserType === userType.id ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <userType.icon className={`h-5 w-5 mt-0.5 ${
                              currentUserType === userType.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                            }`} />
                            <div className="flex-1">
                              <h4 className={`font-medium ${
                                currentUserType === userType.id ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                              }`}>
                                {userType.name}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                {userType.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {userType.features.slice(0, 3).map((feature) => (
                                  <span
                                    key={feature}
                                    className={`px-2 py-0.5 rounded-full text-xs ${
                                      currentUserType === userType.id
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300'
                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                    }`}
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                      <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <Bot className="h-3 w-3" />
                        <span>🤖小智会根据您的选择提供个性化内容</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Token Usage Warning - Compact Design */}
        <div className="mb-4">
          <TokenUsageWarning />
        </div>

        {/* Smart Stats Overview - Enhanced with Better Spacing */}
        <div className="mb-6">
          <StatsOverview />
        </div>

        {/* Main Content Grid - Optimized Layout with User Type Awareness */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
          {/* Market Hot Recommendations - Takes 3 columns, shown to all users */}
          <div className="xl:col-span-3 order-1">
            <div className="h-full">
              <MarketHotRecommendations />
            </div>
          </div>
          
          {/* Smart Message Center - Takes 1 column, shown to all users */}
          <div className="xl:col-span-1 order-2">
            <div className="h-full">
              <SmartMessageCenter />
            </div>
          </div>
        </div>

        {/* User Type Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <currentUserConfig.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  当前视角：{currentUserConfig.name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {currentUserConfig.description}
              </p>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">核心功能：</span>
                {currentUserConfig.features.map((feature, index) => (
                  <span key={feature}>
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{feature}</span>
                    {index < currentUserConfig.features.length - 1 && 
                      <span className="text-xs text-gray-400 mx-1">•</span>
                    }
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Sections Based on User Type */}
        <div className="space-y-6 mb-6">
          {/* Community & Data Section - Context-aware display */}
          {(shouldShowComponent('CommunityCollaboration') || shouldShowComponent('DataInsights')) && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Community Collaboration - Only for ISV and Enterprise Users */}
              {shouldShowComponent('CommunityCollaboration') && (
                <div className="xl:col-span-2">
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                        {currentUserType === 'isv' ? 'ISV专享' : '社区协作'}
                      </Badge>
                    </div>
                    <CommunityCollaboration />
                  </div>
                </div>
              )}
              
              {/* Data Insights - Adaptive to user type */}
              {shouldShowComponent('DataInsights') && (
                <div className={shouldShowComponent('CommunityCollaboration') ? 'xl:col-span-1' : 'xl:col-span-3'}>
                  <DataInsights />
                </div>
              )}
            </div>
          )}

          {/* Smart Function Guide - For Developers and ISV */}
          {shouldShowComponent('SmartFunctionGuide') && (
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                  🤖小智{currentUserType === 'developer' ? '新手导师' : '进阶导师'}
                </Badge>
              </div>
              <SmartFunctionGuide userType={currentUserType} />
            </div>
          )}
        </div>

        {/* My Published Services - Enhanced Design */}
        {publishedServices.length > 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-xl dark:from-gray-800/30 dark:to-gray-700/20"></div>
            <div className="relative p-6 backdrop-blur-sm border border-white/40 rounded-xl bg-white/70 dark:bg-gray-900/70 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent dark:from-white dark:to-blue-200">
                      我的已发布服务
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">管理您的智能服务组合</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
                    {publishedServices.length} 个服务
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {publishedServices.map((service, index) => (
                  <Card 
                    key={service.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-md hover:shadow-blue-500/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 dark:from-blue-800 dark:via-blue-700 dark:to-indigo-700 flex items-center justify-center text-lg shadow-inner">
                              {service.icon || '📦'}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {service.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                                v{service.version}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">by {service.developer}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
                          已发布
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        <div className="flex items-center space-x-1 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {service.usageCount.toLocaleString()}次使用
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {service.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-xs h-8 border-blue-200 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                          编辑配置
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-xs h-8 border-green-200 hover:bg-green-50 hover:border-green-300 dark:border-green-700 dark:hover:bg-green-900/20 transition-all duration-200"
                        >
                          查看详情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRD对比说明 - 开发模式下显示 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-yellow-500 text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                PRD实现对比说明（开发模式）
              </h3>
              <div className="space-y-4 text-sm text-yellow-700 dark:text-yellow-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">✅ 已按PRD实现：</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• 智能仪表盘指标区域（5个核心指标）</li>
                      <li>• AI助手"小智"形象透出</li>
                      <li>• 智能消息中心（分类推送）</li>
                      <li>• 市场热门推荐（行业趋势）</li>
                      <li>• 用户类型切换（3种角色）</li>
                      <li>• 分层功能引导</li>
                      <li>• 社区协作动态</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">🔄 已修正问题：</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• 将"团队协作"改为"社区协作动态"</li>
                      <li>• 将"学习成长"改为"智能功能引导"</li>
                      <li>• 增加小智形象一致性透出</li>
                      <li>• 根据用户类型显示不同组件</li>
                      <li>• 强化个性化推荐和分析</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <p className="text-xs">
                    <strong>当前用户角色：{currentUserConfig.name}</strong> - 
                    页面会根据不同角色显示相应的功能模块，体现个性化体验。
                    切换右上角的用户类型可查看不同角色的专属界面。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}