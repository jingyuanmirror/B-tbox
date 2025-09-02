'use client';

import { useServices } from '@/hooks/useServices';
import { useServiceStore } from '@/store/useServiceStore';

// Import all dashboard components
import { StatsOverview } from './dashboard/StatsOverview';
import { AIAssistant } from './dashboard/AIAssistant';
import { TeamCollaboration } from './dashboard/TeamCollaboration';
import { SmartMessageCenter } from './dashboard/SmartMessageCenter';
import { LearningGrowth } from './dashboard/LearningGrowth';
import { DataInsights } from './dashboard/DataInsights';

// Import existing components for service sections
import { Sparkles, ArrowRight, TrendingUp, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DashboardPage() {
  const { services } = useServices();
  const { publishedServices } = useServiceStore();
  
  const recommendedServices = services
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);
  
  const newServices = services
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="relative">
      {/* AI Assistant - Fixed position */}
      <AIAssistant />
      
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            智能工作台
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            欢迎回到百宝箱企业版，您的AI原生应用开发中心
          </p>
        </div>

        {/* Smart Stats Overview - 5个核心指标 */}
        <StatsOverview />

        {/* Team Collaboration and Smart Message Center */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TeamCollaboration />
          </div>
          <SmartMessageCenter />
        </div>

        {/* Learning Growth */}
        <LearningGrowth />

        {/* Data Insights */}
        <DataInsights />

        {/* My Published Services */}
        {publishedServices.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">我的已发布服务</h2>
              </div>
              <Badge variant="secondary" className="text-sm">
                {publishedServices.length} 个服务
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 flex items-center justify-center text-lg">
                          {service.icon || '📦'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                            {service.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            v{service.version} • {service.developer}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        已发布
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-4">
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span>{service.usageCount.toLocaleString()}次使用</span>
                      <span className="capitalize">{service.type}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                        查看
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Service Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">推荐服务</h2>
            </div>
            <Button variant="outline" size="sm">
              查看更多
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-lg">
                        {service.icon || '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                          {service.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          v{service.version} • {service.developer}
                        </p>
                      </div>
                    </div>
                    {service.rating && (
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {service.rating.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 pb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{service.usageCount.toLocaleString()}次使用</span>
                    <span className="capitalize">{service.type}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* New Services */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">最新服务</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {newServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-sm">
                      {service.icon || '📦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {service.name}
                        </h3>
                        <Badge variant="outline" className="text-xs ml-2">
                          新
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {service.developer}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}