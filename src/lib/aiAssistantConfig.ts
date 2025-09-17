// AI助手相关的配置和工具函数

export const AI_ASSISTANT_CONFIG = {
  // 助手头像配置
  avatar: {
    src: "/ai-assistant.svg",
    alt: "AI Assistant",
    size: {
      small: 16,
      medium: 24,
      large: 32,
    }
  },
  
  // 助手状态
  status: {
    online: {
      color: "bg-green-500",
      label: "在线为您服务"
    },
    thinking: {
      color: "bg-orange-500",
      label: "正在思考..."
    },
    offline: {
      color: "bg-gray-500",
      label: "暂时离线"
    }
  },

  // 助手颜色主题
  theme: {
    gradient: "from-blue-600 to-blue-700",
    hoverGradient: "from-blue-700 to-blue-800",
    primary: "blue-600",
    secondary: "blue-700"
  },

  // 默认消息和建议
  defaultMessages: [
    {
      type: 'assistant' as const,
      content: '检测到您的Token使用率已达85%，建议优化智能体对话长度或考虑升级套餐。',
      timestamp: new Date(),
      category: 'warning' as const
    },
    {
      type: 'assistant' as const,
      content: '根据您的使用模式，推荐学习"多轮对话设计"技能，可提升智能体交互效果30%。',
      timestamp: new Date(),
      category: 'suggestion' as const
    },
    {
      type: 'assistant' as const,
      content: '您的客服智能体表现优秀！建议分享到服务市场，预计可获得额外收益。',
      timestamp: new Date(),
      category: 'analysis' as const
    }
  ],

  // 快捷操作
  quickActions: [
    {
      icon: "AlertCircle",
      label: "异常分析",
      description: "诊断账号异常状态"
    },
    {
      icon: "Lightbulb",
      label: "优化建议",
      description: "获取个性化优化方案"
    },
    {
      icon: "BookOpen",
      label: "学习指导", 
      description: "智能推荐学习路径"
    }
  ]
};

// 生成AI助手的问候语
export function getAIGreeting(timeOfDay?: 'morning' | 'afternoon' | 'evening') {
  const greetings = {
    morning: "早上好！我是您的智能助手，准备好为您提供帮助了",
    afternoon: "下午好！有什么我可以帮您的吗？",
    evening: "晚上好！让我帮您总结今天的工作成果",
    default: "您好！我是您的智能助手，随时为您提供帮助"
  };
  
  return greetings[timeOfDay || 'default'];
}

// 根据页面生成AI助手的上下文提示
export function getContextualHint(page: string) {
  const hints = {
    dashboard: "我会帮您分析数据趋势和优化建议",
    'service-market': "我可以推荐适合您的服务和功能",
    templates: "让我帮您选择最适合的模板",
    agents: "我来协助您管理和优化智能体",
    analytics: "我可以解读数据并提供分析见解",
    default: "有任何问题都可以问我"
  };
  
  return hints[page as keyof typeof hints] || hints.default;
}
