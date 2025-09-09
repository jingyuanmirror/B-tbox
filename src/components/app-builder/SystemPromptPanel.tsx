'use client';

import React, { useState } from 'react';

interface SystemPromptPanelProps {
  onPromptChange: (prompt: string) => void;
}

export default function SystemPromptPanel({
  onPromptChange
}: SystemPromptPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [showTips, setShowTips] = useState(false);

  // 占位文案
  const placeholderText = `在此设置您的智能体角色定位和行为准则...

建议包含以下要素：
• 智能体的身份角色（如：专业客服助手、旅游规划师等）
• 服务领域和专业能力范围
• 与用户交互的语言风格和态度
• 处理问题的基本原则和注意事项
• 无法处理情况下的应对方式

示例：
您是一个专业的旅游规划助手，具备丰富的旅游知识和规划经验。您应当以友好、专业的态度为用户提供准确的旅游信息和建议。在无法确定答案时，请如实告知并建议用户咨询相关部门。`;

  // 示例模板
  const exampleTemplates = [
    {
      name: '旅游助手',
      content: `您是一个专业的旅游规划助手，具备丰富的旅游知识和规划经验。

您的主要职责：
• 为用户提供准确的旅游信息和建议
• 协助制定个性化的旅游计划
• 解答关于景点、交通、住宿等问题
• 推荐适合的旅游产品和服务

交互原则：
• 以友好、专业的态度与用户沟通
• 提供详细、实用的旅游建议
• 在无法确定答案时，如实告知并建议咨询相关部门
• 始终将用户的旅游安全和体验放在首位`
    },
    {
      name: '客服助手',
      content: `您是一个专业的客服助手，致力于为用户提供优质的服务体验。

您的核心能力：
• 快速理解用户问题并提供准确解答
• 协助处理订单、售后等各类业务咨询
• 引导用户使用产品功能和服务
• 收集用户反馈并提供解决方案

服务准则：
• 保持耐心、礼貌和专业的态度
• 使用清晰、易懂的语言进行沟通
• 积极主动地为用户解决问题
• 遇到复杂问题时及时转接人工客服`
    },
    {
      name: '教育助手',
      content: `您是一个专业的教育助手，专注于为学习者提供个性化的学习支持。

您的专业领域：
• 课程内容解答和学习指导
• 学习计划制定和进度跟踪
• 学习方法建议和资源推荐
• 学习问题诊断和解决方案

教学理念：
• 因材施教，根据学习者特点提供个性化指导
• 鼓励主动思考，培养独立学习能力
• 营造积极的学习氛围，激发学习兴趣
• 注重学习过程，关注学习者的全面发展`
    }
  ];

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    onPromptChange(value);
  };

  const handleClear = () => {
    setPrompt('');
    onPromptChange('');
  };

  const handleUseTemplate = (template: string) => {
    setPrompt(template);
    onPromptChange(template);
  };

  return (
    <div className="flex flex-col h-full overflow-visible">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200 overflow-visible">
        <div className="flex items-center justify-between mb-3 overflow-visible">
          <div className="flex items-center space-x-2 overflow-visible">
            <h2 className="text-lg font-medium text-gray-900">系统Prompt</h2>
            <div className="relative group">
              <svg 
                className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-help transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
              {/* 悬停提示框 - 使用CSS hover */}
              <div className="absolute right-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-full mt-2 w-80 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] pointer-events-none group-hover:pointer-events-auto">
                <div className="flex items-center mb-3">
                  <svg className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-blue-800">编写提示</h4>
                </div>
                <div className="text-sm text-blue-700 space-y-2 leading-relaxed">
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>明确定义智能体的身份角色和专业领域</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>描述智能体的核心能力和服务范围</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>设定与用户交互的语言风格和态度</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>规定处理问题的基本原则和注意事项</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>说明无法处理情况下的应对方式</span>
                  </div>
                </div>
                {/* 指向箭头 */}
                <div className="absolute -top-2 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 w-3 h-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-l border-t border-blue-200 rotate-45"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClear}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-300 hover:border-gray-400"
            >
              清空
            </button>
            <button
              onClick={() => setShowTips(!showTips)}
              className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded bg-blue-50 border border-blue-200"
            >
              示例模板
            </button>
          </div>
        </div>
        
        {/* 字符计数 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>设置智能体的角色定位和行为准则</span>
          <span className={`${prompt.length > 2000 ? 'text-red-500' : ''}`}>
            {prompt.length} / 2000 字符 {prompt.length > 2000 && '(建议控制在2000字符内)'}
          </span>
        </div>
      </div>

      {/* 示例模板面板 */}
      {showTips && (
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">选择模板快速开始</h3>
          <div className="grid grid-cols-1 gap-2">
            {exampleTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleUseTemplate(template.content)}
                className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-sm"
              >
                <div className="font-medium text-gray-900 mb-1">{template.name}</div>
                <div className="text-gray-500 text-xs line-clamp-2">{template.content.substring(0, 80)}...</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 编辑区域 */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 mb-4">
            <textarea
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              className="w-full h-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholderText}
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}