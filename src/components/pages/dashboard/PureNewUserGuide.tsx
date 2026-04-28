'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play,
  Users,
  Star,
  Zap,
  BookOpen,
  Gift,
  CheckCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  Bot,
  Sparkles,
  ArrowRight,
  PlayCircle,
  UserPlus
} from 'lucide-react';

interface PureNewUserGuideProps {
  onAgentCreated: () => void;
  onOpenAIAssistant: () => void;
}

// 热门模板数据
const POPULAR_TEMPLATES = [
  {
    id: 'customer-service',
    name: '客服助手',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: '最受欢迎，5分钟上手，客户满意度95%+',
    difficulty: '超简单',
    time: '3分钟',
    successRate: '95%',
    usageCount: 12850,
    tags: ['最推荐', '新手友好', '即时效果'],
    features: ['多语言支持', '情感分析', '自动回复'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'knowledge-qa',
    name: '知识问答',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    description: '最易配置，导入文档即可使用，立竿见影',
    difficulty: '简单',
    time: '5分钟',
    successRate: '92%',
    usageCount: 8650,
    tags: ['最易上手', '快速配置', '智能问答'],
    features: ['文档智能解析', '精准问答', '知识推荐'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'task-assistant',
    name: '任务助手',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    description: '功能全面，适合探索各种AI能力',
    difficulty: '中等',
    time: '10分钟',
    successRate: '88%',
    usageCount: 6420,
    tags: ['功能丰富', '高扩展性', '进阶学习'],
    features: ['任务管理', '智能提醒', '流程自动化'],
    color: 'from-purple-500 to-violet-500'
  }
];

// 新手专属福利
const NEWBIE_BENEFITS = [
  {
    icon: Gift,
    title: '免费Token福利包',
    description: '价值￥200的Token，足够测试使用30天',
    status: '立即领取'
  },
  {
    icon: Bot,
    title: 'AI助手全程指导',
    description: '专属AI创建助手，手把手教您创建智能体',
    status: '已激活'
  },
  {
    icon: PlayCircle,
    title: '成功案例演示',
    description: '观看真实用户的成功案例，快速理解价值',
    status: '观看视频'
  },
  {
    icon: UserPlus,
    title: '新手交流群',
    description: '加入专家指导群，获取1对1创建指导',
    status: '立即加入'
  }
];

// 成功案例展示
const SUCCESS_STORIES = [
  {
    industry: '酒店行业',
    company: '海景度假酒店',
    template: '客服助手',
    result: '客服效率提升60%，投诉减少40%',
    roi: '3个月回本',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    industry: '教育行业',
    company: '智慧教育机构',
    template: '知识问答',
    result: '学员问题解答效率提升80%',
    roi: '2个月回本',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    industry: '电商行业',
    company: '时尚购物平台',
    template: '任务助手',
    result: '订单处理效率提升50%',
    roi: '4个月回本',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
  }
];

export function PureNewUserGuide({ onAgentCreated, onOpenAIAssistant }: PureNewUserGuideProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showSuccessStories, setShowSuccessStories] = useState(false);

  const handleCreateAgent = (templateId: string) => {
    // 这里应该跳转到创建页面并应用模板
    console.log('Creating agent with template:', templateId);
    onAgentCreated();
    // 实际应该导航到创建页面
    // router.push(`/workflow-editor?template=${templateId}`);
  };

  const handleWatchDemo = () => {
    // 这里应该打开演示视频
    console.log('Opening demo video');
  };

  const TemplateCard = ({ template }: { template: typeof POPULAR_TEMPLATES[0] }) => (
    <Card 
      className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 bg-gradient-to-br ${template.color} text-white`}
      onClick={() => setSelectedTemplate(template.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/30">
              <img src={template.avatar} alt={template.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-white">
                {template.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  {template.difficulty}
                </Badge>
                <span className="text-xs text-white/80">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {template.time}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">
              成功率 {template.successRate}
            </div>
            <div className="text-xs text-white/80">
              {template.usageCount.toLocaleString()}人使用
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-white/90 text-sm mb-4 leading-relaxed">
          {template.description}
        </p>
        
        <div className="space-y-3">
          {/* 标签 */}
          <div className="flex flex-wrap gap-1">
            {template.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className="text-xs bg-white/20 text-white border-white/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* 核心功能 */}
          <div>
            <div className="text-xs text-white/80 mb-2">核心功能：</div>
            <div className="grid grid-cols-1 gap-1">
              {template.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-white/90">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          {/* 立即创建按钮 */}
          <Button 
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateAgent(template.id);
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            立即创建
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-10 pt-8">
      {/* 核心创建区域 */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              也可通过模块，快速创建您的第一个AI助手
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              一键复制，3分钟见效果
            </p>
          </div>

          {/* 热门模板选择 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {POPULAR_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          </CardContent>
      </Card>

      {/* 新手专属福利 */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-orange-500" />
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              新手专属福利
            </CardTitle>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              限时免费
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWBIE_BENEFITS.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
              >
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <benefit.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {benefit.description}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs border-orange-200 hover:bg-orange-50"
                >
                  {benefit.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 成功案例展示 */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              看看别人是如何成功的
            </CardTitle>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowSuccessStories(!showSuccessStories)}
          >
            {showSuccessStories ? '收起案例' : '查看更多案例'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUCCESS_STORIES.slice(0, showSuccessStories ? SUCCESS_STORIES.length : 3).map((story, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img src={story.avatar} alt={story.company} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {story.company}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {story.industry} · 使用{story.template}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    📈 {story.result}
                  </div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    💰 ROI：{story.roi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 其他快速入口 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 观看演示视频 */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={handleWatchDemo}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  观看演示视频
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3分钟了解AI助手如何工作，看看真实的使用效果
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
          </CardContent>
        </Card>

        {/* 加入交流群 */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  加入新手交流群
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  获取专家1对1指导，与其他新手用户交流经验
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
