'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface AIWelcomeTooltipProps {
  className?: string;
}

export function AIWelcomeTooltip({ className }: AIWelcomeTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 检查是否是首次访问
    const hasSeenWelcome = localStorage.getItem('ai-assistant-welcome-seen');
    
    if (!hasSeenWelcome) {
      // 延迟2秒显示欢迎提示
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('ai-assistant-welcome-seen', 'true');
  };

  const handleStartChat = () => {
    handleClose();
    // 这里可以触发打开AI助手聊天
    console.log('Start AI chat');
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-60 flex items-center justify-center p-4 ${className}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Welcome Card */}
      <Card className="relative max-w-md w-full shadow-2xl border-2 border-blue-200 dark:border-blue-800 animate-in fade-in-50 zoom-in-95 duration-300">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {/* AI Avatar */}
            <div className="relative mx-auto">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Image 
                  src="/ai-assistant.svg" 
                  alt="AI Assistant" 
                  width={32} 
                  height={32}
                  className="filter brightness-0 invert"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                👋 您好！我是您的智能助手
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                我会在您使用平台时提供个性化建议和帮助，包括：
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3 text-left">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Zap className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  智能分析使用情况并提供优化建议
                </span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <MessageCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  回答问题并提供实时帮助
                </span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <Sparkles className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  推荐学习路径和最佳实践
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <Button 
                onClick={handleStartChat}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                开始对话
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="px-4"
              >
                稍后再说
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
