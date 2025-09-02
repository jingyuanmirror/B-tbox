'use client';

import { useState } from 'react';
import { Bell, Settings, Wrench, Bot, Briefcase, Sparkles, Clock, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    label: '系统通知',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  ai: {
    icon: Bot,
    label: '智能提醒',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  business: {
    icon: Briefcase,
    label: '业务消息',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  feature: {
    icon: Sparkles,
    label: '功能推荐',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  }
};

const MOCK_MESSAGES: SmartMessage[] = [
  {
    id: '1',
    category: 'ai',
    title: 'Token使用率预警',
    content: '您的Token使用率已达85%，预计6天后耗尽。建议优化智能体对话长度或升级套餐。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    priority: 'high',
    isRead: false,
    actionLabel: '查看优化建议',
    onAction: () => console.log('查看优化建议')
  },
  {
    id: '2',
    category: 'system',
    title: '系统维护通知',
    content: '系统将于今晚23:00-24:00进行例行维护，期间可能影响服务使用。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    priority: 'medium',
    isRead: false
  },
  {
    id: '3',
    category: 'business',
    title: '月度账单已生成',
    content: '您的1月份账单已生成，总费用¥2,847元。请及时查看费用明细。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4小时前
    priority: 'medium',
    isRead: true,
    actionLabel: '查看账单',
    onAction: () => console.log('查看账单')
  },
  {
    id: '4',
    category: 'feature',
    title: '推荐：多轮对话插件',
    content: '基于您的使用模式，推荐使用"多轮对话管理"插件，可提升用户交互体验30%。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6小时前
    priority: 'low',
    isRead: true,
    actionLabel: '了解更多',
    onAction: () => console.log('了解更多')
  },
  {
    id: '5',
    category: 'ai',
    title: '异常调用检测',
    content: '检测到您的"客服助手"智能体今日调用频率异常增高，请关注是否存在异常使用。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8小时前
    priority: 'medium',
    isRead: true
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
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <CardTitle>智能消息中心</CardTitle>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* 消息分类筛选 */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="text-xs whitespace-nowrap"
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

        {/* 消息列表 */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => {
            const categoryConfig = MESSAGE_CATEGORIES[message.category];
            const Icon = categoryConfig.icon;
            
            return (
              <div
                key={message.id}
                className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm cursor-pointer ${
                  message.isRead 
                    ? 'bg-gray-50 dark:bg-gray-900/50 opacity-75' 
                    : `${categoryConfig.bgColor} ${categoryConfig.borderColor}`
                }`}
                onClick={() => !message.isRead && markAsRead(message.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${categoryConfig.bgColor}`}>
                    <Icon className={`h-3 w-3 ${categoryConfig.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium text-sm ${!message.isRead ? 'font-semibold' : ''}`}>
                          {message.title}
                        </h4>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(message.priority)}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                      {message.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
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
                          className="text-xs h-6 px-2"
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
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">暂无消息</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}