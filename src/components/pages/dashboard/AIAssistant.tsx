'use client';

import { useState } from 'react';
import { Bot, X, Send, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AIMessage {
  type: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'analysis' | 'suggestion' | 'tutorial' | 'warning';
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  action: () => void;
}

const INITIAL_SUGGESTIONS: AIMessage[] = [
  {
    type: 'assistant',
    content: '检测到您的Token使用率已达85%，建议优化智能体对话长度或考虑升级套餐。',
    timestamp: new Date(),
    category: 'warning'
  },
  {
    type: 'assistant',
    content: '根据您的使用模式，推荐学习"多轮对话设计"技能，可提升智能体交互效果30%。',
    timestamp: new Date(),
    category: 'suggestion'
  },
  {
    type: 'assistant',
    content: '您的客服智能体表现优秀！建议分享到服务市场，预计可获得额外收益。',
    timestamp: new Date(),
    category: 'analysis'
  }
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: AlertCircle,
    label: '异常分析',
    description: '诊断账号异常状态',
    action: () => console.log('异常分析')
  },
  {
    icon: Lightbulb,
    label: '优化建议',
    description: '获取个性化优化方案',
    action: () => console.log('优化建议')
  },
  {
    icon: BookOpen,
    label: '学习指导',
    description: '智能推荐学习路径',
    action: () => console.log('学习指导')
  }
];

interface AIAssistantProps {
  className?: string;
}

export function AIAssistant({ className }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>(INITIAL_SUGGESTIONS);
  const [inputValue, setInputValue] = useState('');

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'warning':
        return '⚠️';
      case 'suggestion':
        return '💡';
      case 'analysis':
        return '📊';
      case 'tutorial':
        return '📚';
      default:
        return '🤖';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'warning':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'suggestion':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'analysis':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'tutorial':
        return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: AIMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // 模拟AI回复
    setTimeout(() => {
      const response: AIMessage = {
        type: 'assistant',
        content: '我正在分析您的问题，请稍等...',
        timestamp: new Date(),
        category: 'analysis'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 h-96 shadow-xl border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-sm font-medium">AI 智能助手</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-blue-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs opacity-90">在线为您服务</span>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* 快捷操作 */}
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-900">
              <div className="grid grid-cols-3 gap-2">
                {QUICK_ACTIONS.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      className="h-8 text-xs flex flex-col p-1 hover:bg-blue-50"
                    >
                      <Icon className="h-3 w-3 mb-0.5" />
                      <span className="text-xs leading-none">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-48">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.type === 'user' ? 'ml-8' : 'mr-8'
                  }`}
                >
                  {message.type === 'assistant' ? (
                    <div className={`p-2 rounded-lg border-l-4 text-xs ${getCategoryColor(message.category)}`}>
                      <div className="flex items-start space-x-2">
                        <span className="text-sm">{getCategoryIcon(message.category)}</span>
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className="text-xs text-muted-foreground mt-1 block">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-600 text-white p-2 rounded-lg text-xs">
                      <p>{message.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 输入框 */}
            <div className="p-3 border-t bg-white dark:bg-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="有什么问题尽管问我..."
                  className="flex-1 px-2 py-1 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="h-7 w-7 p-0"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}