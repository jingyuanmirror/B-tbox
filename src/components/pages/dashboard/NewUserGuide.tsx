'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Sparkles, 
  Star, 
  Zap, 
  Gift, 
  Users, 
  PlayCircle,
  ArrowRight,
  Trophy,
  Clock,
  ChevronRight
} from 'lucide-react';

// 推荐模板数据
const FEATURED_TEMPLATES = [
  {
    id: 'customer-service',
    name: '客服助手',
    icon: '🏆',
    description: '最受欢迎，5分钟上手，客户满意度95%+',
    features: ['多语言支持', '情感分析', '智能转人工'],
    difficulty: 'easy',
    estimatedTime: '3分钟',
    successRate: '95%',
    category: 'popular'
  },
  {
    id: 'knowledge-qa',
    name: '知识问答',
    icon: '⚡',
    description: '最易配置，即用即看效果，10分钟搭建',
    features: ['智能检索', '多轮对话', '知识库管理'],
    difficulty: 'easy',
    estimatedTime: '5分钟',
    successRate: '92%',
    category: 'beginner'
  },
  {
    id: 'task-assistant',
    name: '任务助手',
    icon: '🔧',
    description: '功能全面，适合探索，支持复杂业务流程',
    features: ['工作流程', '任务分配', '进度跟踪'],
    difficulty: 'medium',
    estimatedTime: '8分钟',
    successRate: '88%',
    category: 'comprehensive'
  }
];

// 成功案例数据
const SUCCESS_CASES = [
  {
    industry: '酒店服务',
    template: '客服助手',
    improvement: '客服效率提升60%',
    roi: '3个月回本',
    testimonial: '客人满意度显著提升，投诉减少40%'
  },
  {
    industry: '在线教育',
    template: '知识问答',
    improvement: '答疑效率提升80%',
    roi: '节省人力成本70%',
    testimonial: '学员问题响应时间从小时级降到秒级'
  }
];

interface NewUserGuideProps {
  onCreateAgent?: (templateId: string) => void;
  onWatchDemo?: () => void;
}

export function NewUserGuide({ onCreateAgent, onWatchDemo }: NewUserGuideProps) {
  const handleCreateAgent = (templateId: string) => {
    if (onCreateAgent) {
      onCreateAgent(templateId);
    } else {
      // 默认跳转到创建页面
      console.log('Creating agent with template:', templateId);
    }
  };

  const handleWatchDemo = () => {
    if (onWatchDemo) {
      onWatchDemo();
    } else {
      // 默认打开演示视频
      console.log('Opening demo video');
    }
  };

  return (
    <div className="space-y-6">
      {/* 欢迎横幅 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-xl"></div>
        <Card className="relative border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              欢迎来到百宝箱企业版！
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              您的AI原生应用开发中心，让我们一起创建您的第一个智能助手
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                🎁 新手专享福利
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300">
                🤖 AI全程指导
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 一键创建区域 */}
      <Card className="border-0 bg-gradient-to-r from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                🎯 立即创建您的第一个AI助手
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                选择热门模板，3分钟见效果，零门槛快速上手
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 推荐模板网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="group relative p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* 分类标签 */}
                <div className="absolute top-3 right-3">
                  {template.category === 'popular' && (
                    <Badge className="bg-red-500 text-white text-xs">
                      <Trophy className="h-3 w-3 mr-1" />
                      最受欢迎
                    </Badge>
                  )}
                  {template.category === 'beginner' && (
                    <Badge className="bg-green-500 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      最易上手
                    </Badge>
                  )}
                  {template.category === 'comprehensive' && (
                    <Badge variant="outline" className="text-xs">
                      功能全面
                    </Badge>
                  )}
                </div>

                {/* 模板图标和名称 */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {template.name}
                  </h3>
                </div>

                {/* 描述 */}
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* 指标 */}
                <div className="flex justify-center space-x-4 mb-4 text-xs">
                  <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                    <Clock className="h-3 w-3" />
                    <span>{template.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <Trophy className="h-3 w-3" />
                    <span>成功率{template.successRate}</span>
                  </div>
                </div>

                {/* 特性标签 */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {template.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* 创建按钮 */}
                <Button 
                  onClick={() => handleCreateAgent(template.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg group-hover:shadow-xl transition-all duration-200"
                >
                  立即创建
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {/* 新手专属福利 */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  🎁 新手专属福利包
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      免费Token福利包（充足测试额度）
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      🤖AI助手全程陪伴创建
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      专家1对1指导（预约制）
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 演示和学习资源 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 演示视频 */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <PlayCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  观看演示视频
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3分钟了解AI助手如何工作
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleWatchDemo}
              variant="outline" 
              className="w-full border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              开始观看
            </Button>
          </CardContent>
        </Card>

        {/* 成功案例 */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  成功案例展示
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  看看其他用户的使用效果
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {SUCCESS_CASES.slice(0, 1).map((case_, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {case_.industry}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {case_.template}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>📈 {case_.improvement}</div>
                  <div>💰 {case_.roi}</div>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-sm">
              查看更多案例
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
