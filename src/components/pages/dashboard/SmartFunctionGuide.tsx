'use client';

import { useState } from 'react';
import { Zap, Target, Gift, Crown, ArrowRight, CheckCircle, Lock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type UserType = 'developer' | 'isv' | 'user';

interface SmartFeatureRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'quick-value' | 'advanced' | 'expert';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  potentialValue: string;
  successRate: number;
  steps: string[];
  userTypes: UserType[];
  isUnlocked: boolean;
  xiaozhi: {
    role: string;
    recommendation: string;
    benefits: string[];
  };
}

interface UserProgress {
  totalAgents: number;
  completedFeatures: string[];
  currentLevel: 'novice' | 'intermediate' | 'expert';
}

const MOCK_USER_PROGRESS: UserProgress = {
  totalAgents: 3,
  completedFeatures: ['basic-creation', 'knowledge-base'],
  currentLevel: 'novice'
};

const SMART_FEATURE_RECOMMENDATIONS: SmartFeatureRecommendation[] = [
  {
    id: 'quick-template',
    title: '5分钟模板创建',
    description: '使用热门模板快速创建第一个智能体',
    category: 'quick-value',
    difficulty: 'beginner',
    estimatedTime: '5分钟',
    potentialValue: '立即见效果',
    successRate: 95,
    steps: ['选择模板', '导入数据', '测试对话', '发布应用'],
    userTypes: ['developer'],
    isUnlocked: true,
    xiaozhi: {
      role: '🤖小智新手导师',
      recommendation: '基于您的新手身份，小智最推荐客服助手模板，成功率95%',
      benefits: ['快速上手', '立即见效', '建立信心']
    }
  },
  {
    id: 'plugin-integration',
    title: '插件生态集成',
    description: '集成多种插件提升智能体能力',
    category: 'advanced',
    difficulty: 'intermediate',
    estimatedTime: '30分钟',
    potentialValue: '效果提升50%',
    successRate: 78,
    steps: ['选择插件', '配置参数', '测试集成', '优化性能'],
    userTypes: ['developer', 'isv'],
    isUnlocked: true,
    xiaozhi: {
      role: '🤖小智进阶导师',
      recommendation: '小智分析您的智能体A，建议增加情感分析插件',
      benefits: ['功能增强', '用户体验提升', '竞争力增强']
    }
  },
  {
    id: 'multi-agent-orchestration',
    title: '多智能体协作',
    description: '设计智能体协作流程，处理复杂业务场景',
    category: 'expert',
    difficulty: 'advanced',
    estimatedTime: '2小时',
    potentialValue: '处理复杂场景',
    successRate: 65,
    steps: ['场景分析', '角色设计', '协作流程', '测试优化'],
    userTypes: ['isv', 'user'],
    isUnlocked: false,
    xiaozhi: {
      role: '🤖小智专家顾问',
      recommendation: '企业级部署架构咨询，小智定制化功能开发支持',
      benefits: ['企业级能力', '复杂场景处理', '商业价值最大化']
    }
  },
  {
    id: 'performance-optimization',
    title: '性能调优最佳实践',
    description: '优化响应速度和准确率',
    category: 'advanced',
    difficulty: 'intermediate',
    estimatedTime: '45分钟',
    potentialValue: '性能提升30%',
    successRate: 82,
    steps: ['性能诊断', '优化配置', '效果测试', '监控调整'],
    userTypes: ['developer', 'isv', 'user'],
    isUnlocked: true,
    xiaozhi: {
      role: '🤖小智性能专家',
      recommendation: '小智检测到您的智能体B对话流程可优化30%效率',
      benefits: ['响应更快', '准确率提升', '用户满意度提升']
    }
  },
  {
    id: 'roi-analysis',
    title: 'ROI价值量化',
    description: '计算和展示AI应用的商业价值',
    category: 'advanced',
    difficulty: 'intermediate',
    estimatedTime: '20分钟',
    potentialValue: '量化投资回报',
    successRate: 88,
    steps: ['数据收集', '价值计算', '报告生成', '持续监控'],
    userTypes: ['isv', 'user'],
    isUnlocked: true,
    xiaozhi: {
      role: '🤖小智商业分析师',
      recommendation: '小智为您计算ROI，与同行业成功案例对比分析',
      benefits: ['价值可视化', '决策支持', '投资回报清晰']
    }
  }
];

interface SmartFunctionGuideProps {
  userType?: UserType;
}

export function SmartFunctionGuide({ userType = 'developer' }: SmartFunctionGuideProps) {
  const [progress] = useState(MOCK_USER_PROGRESS);
  const [selectedCategory, setSelectedCategory] = useState<'quick-value' | 'advanced' | 'expert'>('quick-value');

  // 根据用户类型和当前等级过滤推荐
  const filteredRecommendations = SMART_FEATURE_RECOMMENDATIONS.filter(
    rec => rec.userTypes.includes(userType) && 
           rec.category === selectedCategory &&
           (rec.isUnlocked || progress.currentLevel !== 'novice')
  );

  const getCategoryInfo = (category: 'quick-value' | 'advanced' | 'expert') => {
    const categoryMap = {
      'quick-value': {
        name: '快速创造价值',
        icon: Zap,
        description: '5分钟见效果',
        badge: '新手友好',
        color: 'text-green-600 dark:text-green-400'
      },
      'advanced': {
        name: '功能深化提升',
        icon: Target,
        description: '增强智能体能力',
        badge: '进阶功能',
        color: 'text-blue-600 dark:text-blue-400'
      },
      'expert': {
        name: '专家级应用',
        icon: Crown,
        description: '企业级解决方案',
        badge: '专家专享',
        color: 'text-purple-600 dark:text-purple-400'
      }
    };
    return categoryMap[category];
  };

  const getUserLevelInfo = () => {
    if (progress.totalAgents <= 2) {
      return {
        level: '新手用户',
        description: '快速上手阶段',
        nextStep: '创建更多智能体解锁高级功能',
        color: 'text-green-600'
      };
    } else if (progress.totalAgents <= 10) {
      return {
        level: '进阶用户',
        description: '功能探索阶段',
        nextStep: '掌握高级功能成为专家',
        color: 'text-blue-600'
      };
    } else {
      return {
        level: '专家用户',
        description: '深度应用阶段',
        nextStep: '参与生态建设获得影响力',
        color: 'text-purple-600'
      };
    }
  };

  const userLevelInfo = getUserLevelInfo();

  return (
    <Card className="h-full bg-gradient-to-br from-white to-emerald-50/50 dark:from-gray-900 dark:to-emerald-900/10 border-0 shadow-xl shadow-emerald-500/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent dark:from-white dark:to-emerald-200">
                智能功能引导
              </CardTitle>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                🤖小智个性化推荐 • {userLevelInfo.level}
              </p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`${userLevelInfo.color} bg-emerald-100 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300`}
          >
            {progress.totalAgents}个智能体
          </Badge>
        </div>

        {/* 用户等级信息 */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between mb-2">
            <span className={`font-medium ${userLevelInfo.color} dark:text-emerald-300`}>
              {userLevelInfo.level} - {userLevelInfo.description}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round((progress.totalAgents / 15) * 100)}% 完成
            </span>
          </div>
          <Progress 
            value={(progress.totalAgents / 15) * 100} 
            className="h-2 bg-emerald-100 dark:bg-emerald-900/30"
          />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            💡 {userLevelInfo.nextStep}
          </p>
        </div>

        {/* 分类选择 */}
        <div className="flex space-x-1 mt-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {(['quick-value', 'advanced', 'expert'] as const).map((category) => {
            const categoryInfo = getCategoryInfo(category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center space-x-1 ${
                  selectedCategory === category
                    ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <categoryInfo.icon className="h-3 w-3" />
                <span>{categoryInfo.name}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-all border border-emerald-100 dark:border-emerald-800/50 shadow-sm hover:shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        {recommendation.title}
                      </h4>
                      {!recommendation.isUnlocked && (
                        <Lock className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {recommendation.description}
                    </p>
                    
                    {/* 小智推荐信息 */}
                    <div className="mb-3 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          {recommendation.xiaozhi.role}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {recommendation.xiaozhi.recommendation}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>⏱️ {recommendation.estimatedTime}</span>
                      <span>📈 {recommendation.potentialValue}</span>
                      <span>✅ {recommendation.successRate}% 成功率</span>
                    </div>

                    {/* 预期收益标签 */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recommendation.xiaozhi.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Badge 
                    variant="outline" 
                    className={`ml-2 text-xs ${
                      recommendation.difficulty === 'beginner' 
                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700'
                        : recommendation.difficulty === 'intermediate'
                        ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700'
                        : 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-700'
                    }`}
                  >
                    {recommendation.difficulty === 'beginner' && '新手'}
                    {recommendation.difficulty === 'intermediate' && '进阶'}
                    {recommendation.difficulty === 'advanced' && '专家'}
                  </Badge>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs h-7 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-700 dark:hover:bg-emerald-900/20"
                    disabled={!recommendation.isUnlocked}
                  >
                    {recommendation.isUnlocked ? (
                      <>
                        开始使用
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        解锁条件
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 text-xs h-7"
                  >
                    详情
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Crown className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">暂无适合的功能推荐</p>
              <p className="text-xs">继续使用解锁更多功能</p>
            </div>
          )}
        </div>

        {/* 小智鼓励 */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <span className="text-sm">🤖</span>
            <p className="text-xs text-blue-600 dark:text-blue-400 flex-1">
              <strong>小智提醒：</strong>
              {progress.totalAgents <= 2 
                ? '完成首个智能体创建后，小智将为您解锁更多高级功能！'
                : progress.totalAgents <= 10
                ? '您已具备进阶能力，小智推荐尝试插件集成和性能优化！'
                : '作为专家用户，小智邀请您参与平台生态建设获得更多收益！'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
