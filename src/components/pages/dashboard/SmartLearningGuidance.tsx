'use client';

import { useState } from 'react';
import { GraduationCap, Star, Clock, Users, Rocket, Crown, Lightbulb, ArrowRight, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type UserLevel = 'beginner' | 'intermediate' | 'expert';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number;
  icon: string;
  reward?: string;
}

interface UserGuidanceConfig {
  level: UserLevel;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  modules: LearningModule[];
  benefits: string[];
  nextAction: {
    label: string;
    description: string;
  };
}

const USER_GUIDANCE_CONFIGS: Record<UserLevel, UserGuidanceConfig> = {
  beginner: {
    level: 'beginner',
    title: '🌟 新手专享指导 - 🤖小智新手导师',
    subtitle: '5分钟快速上手，立即见效果',
    icon: Star,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    modules: [
      {
        id: '1',
        title: '小智交互式教程',
        description: '边学边做，小智全程指导',
        duration: '5分钟',
        difficulty: 'easy',
        completed: false,
        progress: 0,
        icon: '🎯',
        reward: '完成获得免费Token奖励'
      },
      {
        id: '2',
        title: '小智精选模板推荐',
        description: '客服助手模板（小智推荐：最受欢迎）',
        duration: '3分钟',
        difficulty: 'easy',
        completed: true,
        progress: 100,
        icon: '🏨'
      },
      {
        id: '3',
        title: '小智实时帮助',
        description: '创建过程智能提示',
        duration: '10分钟',
        difficulty: 'easy',
        completed: false,
        progress: 60,
        icon: '💡'
      }
    ],
    benefits: [
      '免费Token额度',
      '小智1对1专家指导',
      '小智新手交流群'
    ],
    nextAction: {
      label: '开始小智新手训练',
      description: '跟着小智，5分钟创建你的第一个智能体'
    }
  },
  intermediate: {
    level: 'intermediate',
    title: '🚀 进阶功能解锁 - 🤖小智高级导师',
    subtitle: '深化功能使用，提升商业价值',
    icon: Rocket,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    modules: [
      {
        id: '1',
        title: '小智插件生态集成',
        description: '掌握高级插件使用技巧',
        duration: '15分钟',
        difficulty: 'medium',
        completed: true,
        progress: 100,
        icon: '🔌'
      },
      {
        id: '2',
        title: '小智多智能体协作',
        description: '设计复杂业务流程',
        duration: '20分钟',
        difficulty: 'medium',
        completed: false,
        progress: 40,
        icon: '🤖'
      },
      {
        id: '3',
        title: '小智性能调优',
        description: '优化响应速度和准确率',
        duration: '25分钟',
        difficulty: 'medium',
        completed: false,
        progress: 0,
        icon: '⚡'
      }
    ],
    benefits: [
      '小智同行业成功案例对比',
      '小智ROI计算工具',
      '小智客户案例包装模板'
    ],
    nextAction: {
      label: '解锁小智高级功能',
      description: '学习插件集成和多智能体协作'
    }
  },
  expert: {
    level: 'expert',
    title: '🏆 专家级服务 - 🤖小智专家顾问',
    subtitle: '生态影响力扩展，成为行业标杆',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    modules: [
      {
        id: '1',
        title: '小智前沿功能内测',
        description: 'Beta功能抢先体验',
        duration: '30分钟',
        difficulty: 'hard',
        completed: true,
        progress: 100,
        icon: '🔬'
      },
      {
        id: '2',
        title: '小智架构设计咨询',
        description: '企业级解决方案设计',
        duration: '45分钟',
        difficulty: 'hard',
        completed: false,
        progress: 70,
        icon: '🏗️'
      },
      {
        id: '3',
        title: '小智生态合作伙伴',
        description: '平台合作机会对接',
        duration: '60分钟',
        difficulty: 'hard',
        completed: false,
        progress: 20,
        icon: '🤝'
      }
    ],
    benefits: [
      '成为小智官方案例分享伙伴',
      '小智技术专家认证',
      '小智生态合作伙伴商务对接'
    ],
    nextAction: {
      label: '申请小智专家认证',
      description: '展示您的专业能力，获得平台官方认证'
    }
  }
};

interface SmartLearningGuidanceProps {
  className?: string;
  userLevel?: UserLevel;
}

export function SmartLearningGuidance({ className, userLevel = 'beginner' }: SmartLearningGuidanceProps) {
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>(userLevel);
  const config = USER_GUIDANCE_CONFIGS[selectedLevel];
  
  const getDifficultyBadge = (difficulty: 'easy' | 'medium' | 'hard') => {
    const configs = {
      easy: { label: '入门', variant: 'secondary' as const, color: 'text-green-600' },
      medium: { label: '进阶', variant: 'default' as const, color: 'text-blue-600' },
      hard: { label: '专家', variant: 'destructive' as const, color: 'text-purple-600' }
    };
    
    return (
      <Badge variant={configs[difficulty].variant} className="text-xs">
        {configs[difficulty].label}
      </Badge>
    );
  };

  const completedModules = config.modules.filter(m => m.completed).length;
  const overallProgress = (completedModules / config.modules.length) * 100;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className={`h-5 w-5 ${config.color}`} />
            <div>
              <CardTitle className="text-lg">{config.title}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {config.subtitle}
              </p>
            </div>
          </div>
          
          {/* 用户等级切换 */}
          <div className="flex space-x-1">
            {Object.keys(USER_GUIDANCE_CONFIGS).map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel(level as UserLevel)}
                className="text-xs"
              >
                {level === 'beginner' && '新手'}
                {level === 'intermediate' && '进阶'}
                {level === 'expert' && '专家'}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 整体进度 */}
        <div className={`p-4 rounded-lg ${config.bgColor}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <config.icon className={`h-5 w-5 ${config.color}`} />
              <span className="font-medium">学习进度</span>
            </div>
            <span className={`font-bold ${config.color}`}>
              {completedModules}/{config.modules.length} 完成
            </span>
          </div>
          <Progress value={overallProgress} className="h-2 mb-2" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            整体完成度 {Math.round(overallProgress)}%
          </p>
        </div>

        {/* 学习模块 */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span>学习路径</span>
          </h4>
          
          {config.modules.map((module, index) => (
            <div key={module.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
                  <span className="text-sm">{module.icon}</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-sm">{module.title}</h5>
                  <div className="flex items-center space-x-2">
                    {getDifficultyBadge(module.difficulty)}
                    {module.completed && (
                      <Badge className="bg-green-500 text-white text-xs">✓ 已完成</Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  {module.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{module.duration}</span>
                    </div>
                    {module.progress > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-16">
                          <Progress value={module.progress} className="h-1" />
                        </div>
                        <span className="text-xs text-gray-500">{module.progress}%</span>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                    {module.completed ? '复习' : module.progress > 0 ? '继续' : '开始'}
                    <Play className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                {module.reward && (
                  <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                    🎁 {module.reward}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 专属福利 */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>专属福利</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {config.benefits.map((benefit, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  🎁 {benefit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 下一步行动 */}
        <div className={`p-4 rounded-lg ${config.bgColor} border`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className={`font-medium ${config.color} mb-1`}>
                {config.nextAction.label}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {config.nextAction.description}
              </p>
            </div>
            
            <Button className={`ml-4 ${config.color}`} size="sm">
              立即开始
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
