'use client';

import { useState } from 'react';
import { BookOpen, Target, Trophy, Star, ArrowRight, Play, Check, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  status: 'mastered' | 'learning' | 'locked';
  category: 'technical' | 'business' | 'operation';
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  isActive: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

const MOCK_SKILLS: Skill[] = [
  { id: '1', name: '基础智能体创建', level: 100, status: 'mastered', category: 'technical' },
  { id: '2', name: '知识库管理', level: 100, status: 'mastered', category: 'technical' },
  { id: '3', name: '多轮对话设计', level: 80, status: 'learning', category: 'technical' },
  { id: '4', name: '插件集成', level: 60, status: 'learning', category: 'technical' },
  { id: '5', name: '性能优化', level: 30, status: 'learning', category: 'technical' },
  { id: '6', name: '企业级部署', level: 0, status: 'locked', category: 'technical' },
  { id: '7', name: '需求分析', level: 70, status: 'learning', category: 'business' },
  { id: '8', name: '用户体验设计', level: 40, status: 'learning', category: 'business' },
  { id: '9', name: '数据分析', level: 50, status: 'learning', category: 'operation' },
];

const MOCK_LEARNING_PATHS: LearningPath[] = [
  {
    id: '1',
    title: '多轮对话设计进阶',
    description: '掌握复杂对话流程设计，提升智能体交互体验',
    progress: 80,
    estimatedHours: 2,
    difficulty: 'intermediate',
    skills: ['多轮对话设计', '用户意图识别'],
    isActive: true
  },
  {
    id: '2',
    title: '用户意图识别优化',
    description: '学习高级意图识别技术，提升对话准确率',
    progress: 0,
    estimatedHours: 3,
    difficulty: 'intermediate',
    skills: ['自然语言处理', '机器学习'],
    isActive: false
  },
  {
    id: '3',
    title: '对话流程可视化设计',
    description: '使用可视化工具设计复杂对话流程',
    progress: 0,
    estimatedHours: 4,
    difficulty: 'advanced',
    skills: ['流程设计', '可视化工具'],
    isActive: false
  }
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    name: '新手上路',
    description: '成功创建第一个智能体',
    icon: '🚀',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: '模板专家',
    description: '使用3个以上智能体模板',
    icon: '📄',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: '对话设计师',
    description: '掌握多轮对话设计技能',
    icon: '💬',
    isUnlocked: false
  },
  {
    id: '4',
    name: '性能优化师',
    description: '完成性能优化相关学习',
    icon: '⚡',
    isUnlocked: false
  }
];

interface LearningGrowthProps {
  className?: string;
}

export function LearningGrowth({ className }: LearningGrowthProps) {
  const [activeTab, setActiveTab] = useState<'skills' | 'learning' | 'achievements'>('skills');

  const getSkillStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered':
        return <Check className="h-3 w-3 text-green-500" />;
      case 'learning':
        return <Play className="h-3 w-3 text-blue-500" />;
      case 'locked':
        return <Lock className="h-3 w-3 text-gray-400" />;
      default:
        return null;
    }
  };

  const getSkillStatusBadge = (status: string) => {
    switch (status) {
      case 'mastered':
        return <Badge variant="secondary" className="text-green-700 bg-green-100 text-xs">已掌握</Badge>;
      case 'learning':
        return <Badge variant="secondary" className="text-blue-700 bg-blue-100 text-xs">学习中</Badge>;
      case 'locked':
        return <Badge variant="secondary" className="text-gray-600 bg-gray-100 text-xs">待解锁</Badge>;
      default:
        return null;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge variant="outline" className="text-green-600 border-green-300 text-xs">初级</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="text-blue-600 border-blue-300 text-xs">中级</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="text-purple-600 border-purple-300 text-xs">高级</Badge>;
      default:
        return null;
    }
  };

  const currentGoal = MOCK_LEARNING_PATHS.find(path => path.isActive);
  const overallProgress = Math.round(
    MOCK_SKILLS.reduce((sum, skill) => sum + skill.level, 0) / MOCK_SKILLS.length
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      {/* 学习目标和进度 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <CardTitle>个性化学习路径</CardTitle>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'skills' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('skills')}
                className="text-xs"
              >
                技能树
              </Button>
              <Button
                variant={activeTab === 'learning' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('learning')}
                className="text-xs"
              >
                学习路径
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'skills' && (
            <div className="space-y-4">
              {/* 整体进度 */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">整体技能水平</span>
                  <span className="text-lg font-bold text-purple-600">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  已掌握 {MOCK_SKILLS.filter(s => s.status === 'mastered').length} 项技能，
                  正在学习 {MOCK_SKILLS.filter(s => s.status === 'learning').length} 项技能
                </p>
              </div>

              {/* 技能列表 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_SKILLS.map((skill) => (
                  <div key={skill.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSkillStatusIcon(skill.status)}
                        <span className="font-medium text-sm">{skill.name}</span>
                      </div>
                      {getSkillStatusBadge(skill.status)}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>掌握程度</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-4">
              {currentGoal && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900 dark:text-blue-300">当前目标</span>
                  </div>
                  <h3 className="font-semibold mb-1">{currentGoal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{currentGoal.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">进度</span>
                    <span className="text-sm font-medium">{currentGoal.progress}%</span>
                  </div>
                  <Progress value={currentGoal.progress} className="h-2 mb-3" />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>还需 {currentGoal.estimatedHours - Math.floor(currentGoal.progress / 50)} 小时</span>
                    <Button size="sm" className="text-xs">
                      继续学习
                    </Button>
                  </div>
                </div>
              )}

              {/* 推荐学习内容 */}
              <div>
                <h4 className="font-medium mb-3">推荐学习内容</h4>
                <div className="space-y-3">
                  {MOCK_LEARNING_PATHS.map((path) => (
                    <div key={path.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-sm">{path.title}</h5>
                            {getDifficultyBadge(path.difficulty)}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{path.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>预计 {path.estimatedHours} 小时</span>
                            <span>{path.skills.join(', ')}</span>
                          </div>
                        </div>
                        <Button
                          variant={path.isActive ? 'secondary' : 'outline'}
                          size="sm"
                          className="text-xs"
                        >
                          {path.isActive ? '学习中' : '开始学习'}
                        </Button>
                      </div>
                      
                      {path.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={path.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 学习徽章和成就 */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <CardTitle>学习成就</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {MOCK_ACHIEVEMENTS.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-3 rounded-lg border ${
                  achievement.isUnlocked 
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' 
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`text-xl ${!achievement.isUnlocked && 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${
                      achievement.isUnlocked ? 'text-yellow-800 dark:text-yellow-300' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {achievement.unlockedAt && (
                      <p className="text-xs text-yellow-600 mt-1">
                        解锁于 {achievement.unlockedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {achievement.isUnlocked && (
                    <Badge className="bg-yellow-500 text-white text-xs">
                      已解锁
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full text-xs mt-4">
              查看更多成就
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}