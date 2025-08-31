'use client';

import { BarChart3, Users, Bot, Store, TrendingUp, Activity, Sparkles, ArrowRight, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useServices } from '../../hooks/useServices';
import { useServiceStore } from '../../store/useServiceStore';

const STATS_CARDS = [
  {
    title: '总服务数',
    value: '156',
    change: '+12%',
    icon: Store,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: '活跃智能体',
    value: '23',
    change: '+8%',
    icon: Bot,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: '团队成员',
    value: '8',
    change: '0%',
    icon: Users,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    title: '本月使用量',
    value: '2.3k',
    change: '+24%',
    icon: TrendingUp,
    color: 'text-orange-600 dark:text-orange-400'
  }
];

export function DashboardPage() {
  const { services } = useServices();
  const { publishedServices } = useServiceStore();
  
  // Get recommended services (top rated and recently updated)
  const recommendedServices = services
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);
  
  const newServices = services
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          仪表板
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          欢迎回到百宝箱企业版，这里是您的工作概览
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CARDS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  较上月 {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>最近活动</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">新增智能文档搜索插件</p>
                  <p className="text-xs text-gray-500">2小时前</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">客户服务工作流已部署</p>
                  <p className="text-xs text-gray-500">4小时前</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">团队成员张三加入项目</p>
                  <p className="text-xs text-gray-500">1天前</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>使用统计</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">插件使用</span>
                <span className="text-sm font-medium">1,235次</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">服务流执行</span>
                <span className="text-sm font-medium">456次</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">MCP调用</span>
                <span className="text-sm font-medium">789次</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
  );
}