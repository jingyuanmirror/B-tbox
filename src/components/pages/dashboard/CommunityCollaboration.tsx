'use client';

import { useState } from 'react';
import { Users, MessageSquare, Share2, Trophy, Clock, ThumbsUp, Star, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TeamActivity {
  id: string;
  type: 'create' | 'share' | 'collaborate' | 'achieve';
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

interface KnowledgeShare {
  id: string;
  title: string;
  author: string;
  category: string;
  views: number;
  likes: number;
  isBookmarked: boolean;
  snippet: string;
}

interface TeamStats {
  activeMembers: number;
  totalMembers: number;
  todayShares: number;
  weeklyContribution: number;
}

const MOCK_TEAM_STATS: TeamStats = {
  activeMembers: 8,
  totalMembers: 12,
  todayShares: 3,
  weeklyContribution: 127
};

const MOCK_TEAM_ACTIVITIES: TeamActivity[] = [
  {
    id: '1',
    type: 'create',
    user: { name: '张小智', avatar: '/avatars/zhang.jpg', role: '高级开发者' },
    content: '🎉 成功发布了【酒店客服助手Pro】智能体，已有15家酒店开始试用！',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 12,
    isLiked: true
  },
  {
    id: '2',
    type: 'share',
    user: { name: '李小助', avatar: '/avatars/li.jpg', role: 'ISV合作伙伴' },
    content: '📝 分享了【多轮对话设计最佳实践】，包含完整的对话流程设计模板',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 8,
    isLiked: false
  },
  {
    id: '3',
    type: 'achieve',
    user: { name: '王小能', avatar: '/avatars/wang.jpg', role: '业务专家' },
    content: '🏆 获得【月度最佳智能体】奖励！智能导购助手帮助客户转化率提升35%',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    likes: 25,
    isLiked: true
  },
  {
    id: '4',
    type: 'collaborate',
    user: { name: '陈小慧', avatar: '/avatars/chen.jpg', role: '产品经理' },
    content: '🤝 与【智慧零售团队】达成合作，共同开发新零售AI解决方案',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    likes: 15,
    isLiked: false
  }
];

const MOCK_KNOWLEDGE_SHARES: KnowledgeShare[] = [
  {
    id: '1',
    title: '🤖小智实战：5分钟创建专业客服智能体',
    author: '张小智',
    category: '实战教程',
    views: 234,
    likes: 45,
    isBookmarked: true,
    snippet: '小智手把手教您快速创建客服智能体，包含知识库搭建、对话流程设计、性能调优等完整流程...'
  },
  {
    id: '2',
    title: '💰ROI分析：AI智能体的商业价值量化方法',
    author: '李小助',
    category: '商业分析',
    views: 189,
    likes: 32,
    isBookmarked: false,
    snippet: '如何科学评估AI智能体的投资回报率，包含成本计算、效益评估、风险分析等关键指标...'
  },
  {
    id: '3',
    title: '🎯用户体验优化：让AI对话更自然的10个技巧',
    author: '王小能',
    category: '用户体验',
    views: 156,
    likes: 28,
    isBookmarked: true,
    snippet: '从用户角度出发，分享让AI对话更加自然流畅的实用技巧，提升用户满意度和留存率...'
  }
];

export function CommunityCollaboration() {
  const [activities, setActivities] = useState(MOCK_TEAM_ACTIVITIES);
  const [knowledgeShares] = useState(MOCK_KNOWLEDGE_SHARES);
  const [activeTab, setActiveTab] = useState<'activity' | 'knowledge'>('activity');

  const handleLike = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            isLiked: !activity.isLiked,
            likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1
          }
        : activity
    ));
  };

  const getActivityIcon = (type: TeamActivity['type']) => {
    switch (type) {
      case 'create': return '🎉';
      case 'share': return '📝';
      case 'achieve': return '🏆';
      case 'collaborate': return '🤝';
      default: return '💡';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}小时前`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}天前`;
  };

  return (
    <Card className="h-full bg-gradient-to-br from-white to-slate-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-xl shadow-blue-500/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent dark:from-white dark:to-purple-200">
                社区协作动态
              </CardTitle>
              <p className="text-xs text-gray-600 dark:text-gray-400">🤖小智社区互助平台</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300">
            活跃中
          </Badge>
        </div>

        {/* 团队统计 */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {MOCK_TEAM_STATS.activeMembers}/{MOCK_TEAM_STATS.totalMembers}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">活跃成员</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {MOCK_TEAM_STATS.todayShares}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">今日分享</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {MOCK_TEAM_STATS.weeklyContribution}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">周度贡献</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              95%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">满意度</div>
          </div>
        </div>

        {/* 标签切换 */}
        <div className="flex space-x-1 mt-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
              activeTab === 'activity'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            团队动态
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
              activeTab === 'knowledge'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            知识共享
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activeTab === 'activity' ? (
            // 团队活动动态
            activities.map((activity) => (
              <div key={activity.id} className="flex space-x-3 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all border border-gray-100 dark:border-gray-700">
                <div className="text-xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                      {activity.user.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {activity.user.role}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {activity.content}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleLike(activity.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                        activity.isLiked
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <ThumbsUp className={`h-3 w-3 ${activity.isLiked ? 'fill-current' : ''}`} />
                      <span>{activity.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <MessageSquare className="h-3 w-3" />
                      <span>回复</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 知识共享
            knowledgeShares.map((share) => (
              <div key={share.id} className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">
                    {share.title}
                  </h4>
                  <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                    {share.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {share.snippet}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">by {share.author}</span>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{share.views} 浏览</span>
                      <span>{share.likes} 点赞</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    查看
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 快速操作 */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
              <Share2 className="h-3 w-3 mr-1" />
              分享经验
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
              <Lightbulb className="h-3 w-3 mr-1" />
              求助社区
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
