'use client';

import { useState } from 'react';
import { Bell, Settings, Wrench, Bot, Briefcase, Sparkles, Clock, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type MessageCategory = 'system' | 'ai' | 'business' | 'feature';

interface SmartMessage {
  id: string;
  category: MessageCategory;
  title: string;
  content: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

const MESSAGE_CATEGORIES = {
  system: {
    icon: Wrench,
    label: '🔧 小智系统播报',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  ai: {
    icon: Bot,
    label: '🤖 小智智能分析',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  business: {
    icon: Briefcase,
    label: '💼 小智财务助手',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  feature: {
    icon: Sparkles,
    label: '✨ 小智功能顾问',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  }
};

const MOCK_MESSAGES: SmartMessage[] = [
  {
    id: '1',
    category: 'ai',
    title: '🤖小智紧急预警：Token使用率过高',
    content: '小智检测到您的Token使用率已达85%，按当前使用速度预计6天后耗尽。小智建议：优化智能体对话长度，或考虑升级套餐。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    priority: 'high',
    isRead: false,
    actionLabel: '查看小智分析',
    onAction: () => console.log('查看小智分析')
  },
  {
    id: '2',
    category: 'system',
    title: '🔧小智系统播报：维护通知',
    content: '小智提醒您：系统将于今晚23:00-24:00进行例行维护升级，期间可能影响服务使用，请提前做好准备。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    priority: 'medium',
    isRead: false
  },
  {
    id: '3',
    category: 'business',
    title: '💼小智财务助手：月度账单已生成',
    content: '小智为您整理了1月份账单，总费用¥2,847元，比上月增长32%。主要增长原因：Token使用量增加48%。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4小时前
    priority: 'medium',
    isRead: true,
    actionLabel: '查看详细分析',
    onAction: () => console.log('查看详细分析')
  },
  {
    id: '4',
    category: 'feature',
    title: '✨小智功能顾问：推荐多轮对话插件',
    content: '小智基于您的使用模式分析，推荐使用"多轮对话管理"插件。预期效果：用户交互体验提升30%，对话完成率提升25%。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6小时前
    priority: 'low',
    isRead: true,
    actionLabel: '小智详细推荐',
    onAction: () => console.log('小智详细推荐')
  },
  {
    id: '5',
    category: 'ai',
    title: '🤖小智智能分析：异常调用检测',
    content: '小智检测到您的"客服助手"智能体今日调用频率异常增高(+340%)，小智建议检查是否存在异常使用或需要性能优化。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8小时前
    priority: 'medium',
    isRead: true,
    actionLabel: '查看小智建议',
    onAction: () => console.log('查看小智建议')
  },
  {
    id: '6',
    category: 'feature',
    title: '📈小智市场分析师：热门趋势推送',
    content: '小智发现酒店行业智能客服模板使用量激增+340%，基于您的客服场景，小智推荐关注"多语言客服"和"预订整合"功能。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12小时前
    priority: 'low',
    isRead: true,
    actionLabel: '查看市场分析',
    onAction: () => console.log('查看市场分析')
  }
];

interface SmartMessageCenterProps {
  className?: string;
}

export function SmartMessageCenter({ className }: SmartMessageCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | 'all'>('all');
  const [messages, setMessages] = useState<SmartMessage[]>(MOCK_MESSAGES);

  const filteredMessages = selectedCategory === 'all' 
    ? messages 
    : messages.filter(msg => msg.category === selectedCategory);

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500 text-white text-xs">紧急</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-orange-600 border-orange-300 text-xs">重要</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-gray-600 border-gray-300 text-xs">一般</Badge>;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}小时前`;
    } else if (minutes > 0) {
      return `${minutes}分钟前`;
    } else {
      return '刚刚';
    }
  };

  return (
    <Card className={`border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-gray-800 dark:via-gray-800/90 dark:to-indigo-900/20 shadow-lg backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <Bell className="h-4 w-4 text-white" />
              {/* AI助手小标识 */}
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center border border-white animate-pulse">
                <Image 
                  src="/ai-assistant.svg" 
                  alt="AI" 
                  width={6} 
                  height={6}
                  className="filter brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2 text-base">
                <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent dark:from-white dark:to-blue-200">
                  智能消息中心
                </span>
                {unreadCount > 0 && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-1.5 py-0.5 animate-bounce">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                🤖小智智能推送精选消息
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* 紧凑的消息分类筛选 */}
        <div className="flex space-x-1.5 mb-4 overflow-x-auto scrollbar-hide">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="text-xs whitespace-nowrap px-2.5 py-1 h-6"
          >
            全部
          </Button>
          {Object.entries(MESSAGE_CATEGORIES).map(([key, config]) => {
            const Icon = config.icon;
            const categoryMessages = messages.filter(msg => msg.category === key);
            const unreadInCategory = categoryMessages.filter(msg => !msg.isRead).length;
            
            return (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key as MessageCategory)}
                className="text-xs whitespace-nowrap flex items-center space-x-1"
              >
                <Icon className="h-3 w-3" />
                <span>{config.label}</span>
                {unreadInCategory > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {unreadInCategory}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* 紧凑的消息列表 */}
        <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
          {filteredMessages.slice(0, 4).map((message, index) => {
            const categoryConfig = MESSAGE_CATEGORIES[message.category];
            const Icon = categoryConfig.icon;
            
            return (
              <div
                key={message.id}
                className={`group p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm ${
                  message.isRead 
                    ? 'bg-gray-50/80 dark:bg-gray-800/50 opacity-75' 
                    : 'bg-white/80 dark:bg-gray-700/60 hover:bg-white/95 dark:hover:bg-gray-700/80'
                }`}
                onClick={() => !message.isRead && markAsRead(message.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${categoryConfig.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-3 w-3 ${categoryConfig.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-sm ${!message.isRead ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                          {message.title}
                        </h4>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {getPriorityBadge(message.priority)}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 leading-relaxed">
                      {message.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(message.timestamp)}</span>
                      </div>
                      
                      {message.actionLabel && message.onAction && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            message.onAction?.();
                          }}
                          className="text-xs h-6 px-2.5 border-blue-200 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          {message.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 w-fit mx-auto mb-2">
              <Bell className="h-6 w-6 opacity-50" />
            </div>
            <p className="text-sm">暂无消息</p>
            <p className="text-xs text-gray-500 mt-1">小智会为您推送重要信息</p>
          </div>
        )}
        
        {filteredMessages.length > 4 && (
          <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-600/30">
            <Button variant="ghost" size="sm" className="w-full text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              查看全部 {filteredMessages.length} 条消息 →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}