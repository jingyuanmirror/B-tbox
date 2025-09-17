'use client';

import { useState } from 'react';
import { X, MessageCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { AI_ASSISTANT_CONFIG } from '@/lib/aiAssistantConfig';

interface Insight {
  id: string;
  type: 'optimization' | 'warning' | 'achievement' | 'tip';
  title: string;
  description: string;
  action?: string;
  actionCallback?: () => void;
}

const CURRENT_INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Token使用量提醒',
    description: 'Token使用率已达85%，建议优化对话长度',
    action: '查看详情',
    actionCallback: () => console.log('Token optimization')
  },
  {
    id: '2',
    type: 'optimization',
    title: '智能体优化建议',
    description: '根据使用模式，推荐学习多轮对话设计技能',
    action: '立即学习',
    actionCallback: () => console.log('Learn skills')
  },
  {
    id: '3',
    type: 'achievement',
    title: '表现优秀！',
    description: '客服智能体表现出色，建议分享到服务市场获得收益',
    action: '分享服务',
    actionCallback: () => console.log('Share service')
  }
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'optimization':
      return <TrendingUp className="h-5 w-5 text-blue-600" />;
    case 'warning':
      return <Shield className="h-5 w-5 text-orange-600" />;
    case 'achievement':
      return <Zap className="h-5 w-5 text-green-600" />;
    default:
      return <MessageCircle className="h-5 w-5 text-gray-600" />;
  }
};

const getInsightColor = (type: string) => {
  switch (type) {
    case 'optimization':
      return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
    case 'warning':
      return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
    case 'achievement':
      return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
    default:
      return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20';
  }
};

interface AIAssistantBannerProps {
  className?: string;
}

export function AIAssistantBanner({ className }: AIAssistantBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  if (!isVisible) return null;

  const currentInsight = CURRENT_INSIGHTS[currentInsightIndex];

  const handleGetMoreInsights = () => {
    setIsThinking(true);
    // 模拟AI思考过程
    setTimeout(() => {
      setIsThinking(false);
      // 可以在这里添加更多见解或刷新当前见解
      setCurrentInsightIndex((prev) => (prev + 1) % CURRENT_INSIGHTS.length);
    }, 2000);
  };

  return (
    <Card className={`relative border-l-4 border-l-blue-600 ${getInsightColor(currentInsight.type)} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* AI Assistant Avatar */}
          <div className="relative">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${AI_ASSISTANT_CONFIG.theme.gradient} flex items-center justify-center shadow-lg transition-all duration-300 ${isThinking ? 'animate-pulse' : ''}`}>
              <Image 
                src={AI_ASSISTANT_CONFIG.avatar.src}
                alt={AI_ASSISTANT_CONFIG.avatar.alt}
                width={AI_ASSISTANT_CONFIG.avatar.size.medium}
                height={AI_ASSISTANT_CONFIG.avatar.size.medium}
                className="filter brightness-0 invert"
              />
            </div>
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${isThinking ? 'bg-orange-500 animate-spin' : 'bg-green-500 animate-pulse'}`}>
              {isThinking && <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    智能助手为您推荐
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    个性化建议
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {getInsightIcon(currentInsight.type)}
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {currentInsight.title}
                  </h3>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {currentInsight.description}
            </p>

            <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {currentInsight.action && (
                <Button 
                  size="sm" 
                  onClick={currentInsight.actionCallback}
                  className="text-xs"
                  disabled={isThinking}
                >
                  {isThinking ? '分析中...' : currentInsight.action}
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Open AI chat')}
                className="text-xs"
                disabled={isThinking}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                与助手对话
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGetMoreInsights}
                className="text-xs"
                disabled={isThinking}
              >
                {isThinking ? '思考中...' : '更多建议'}
              </Button>
            </div>              {/* Insight Navigation */}
              {CURRENT_INSIGHTS.length > 1 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {currentInsightIndex + 1} / {CURRENT_INSIGHTS.length}
                  </span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentInsightIndex((prev) => 
                        prev > 0 ? prev - 1 : CURRENT_INSIGHTS.length - 1
                      )}
                      className="h-6 w-6 p-0 text-gray-400"
                    >
                      ←
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentInsightIndex((prev) => 
                        (prev + 1) % CURRENT_INSIGHTS.length
                      )}
                      className="h-6 w-6 p-0 text-gray-400"
                    >
                      →
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
