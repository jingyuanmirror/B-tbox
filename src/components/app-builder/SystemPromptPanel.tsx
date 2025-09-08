'use client';

import React, { useState, useEffect } from 'react';

interface SystemPromptPanelProps {
  appName: string;
  appDescription: string;
  industry: string;
  hasPreCheck: boolean;
  hasFastDecision: boolean;
  skills: Array<{id: string; name: string; description: string}>;
  onPromptChange: (prompt: string, isManual: boolean) => void;
}

export default function SystemPromptPanel({
  appName,
  appDescription, 
  industry,
  hasPreCheck,
  hasFastDecision,
  skills,
  onPromptChange
}: SystemPromptPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [lastAutoGenTime, setLastAutoGenTime] = useState('');

  // 生成默认Prompt模板
  const generateDefaultPrompt = () => {
    const basePrompt = `您是${appName}，一个专业的${industry}助手。

${appDescription ? `应用简介：${appDescription}` : ''}

您的主要职责包括：`;

    const capabilities = [];
    
    if (hasPreCheck) {
      capabilities.push('• 执行必要的前置业务判断和权限验证');
    }
    
    if (hasFastDecision) {
      capabilities.push('• 快速响应常见问题，提供准确的FAQ答案');
    }
    
    if (skills.length > 0) {
      capabilities.push('• 根据用户意图智能调用以下技能：');
      skills.forEach(skill => {
        capabilities.push(`  - ${skill.name}：${skill.description}`);
      });
    }

    const processSteps = [];
    if (hasPreCheck) {
      processSteps.push('1. 前置判断：验证用户身份和业务权限');
    }
    if (hasFastDecision) {
      processSteps.push('2. 快速决策：优先检查是否为常见问题，提供快速准确的答案');
    }
    processSteps.push('3. 意图识别：分析用户真实需求，调用最合适的技能');

    return `${basePrompt}
${capabilities.join('\n')}

在处理用户请求时，您需要：
${processSteps.join('\n')}

请始终保持专业、友好的服务态度，确保为用户提供准确有效的帮助。`;
  };

  // 自动生成和更新Prompt
  useEffect(() => {
    if (!isManualMode) {
      const newPrompt = generateDefaultPrompt();
      setPrompt(newPrompt);
      setLastAutoGenTime(new Date().toLocaleString());
      onPromptChange(newPrompt, false);
    }
  }, [appName, appDescription, industry, hasPreCheck, hasFastDecision, skills, isManualMode]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    onPromptChange(value, isManualMode);
  };

  const handleManualEdit = () => {
    setIsManualMode(true);
  };

  const handleRestoreAuto = () => {
    setIsManualMode(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">系统Prompt</h2>
          <div className="flex items-center space-x-2">
            {isManualMode ? (
              <button
                onClick={handleRestoreAuto}
                className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded bg-blue-50"
              >
                恢复自动生成
              </button>
            ) : (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                自动生成
              </span>
            )}
          </div>
        </div>
        
        {/* 状态信息 */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>模式：</span>
            <span>{isManualMode ? '手动编辑' : '自动生成'}</span>
          </div>
          {!isManualMode && lastAutoGenTime && (
            <div className="flex items-center justify-between">
              <span>更新：</span>
              <span>{lastAutoGenTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* 编辑区域 */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Prompt内容
              </label>
              <span className="text-xs text-gray-400">
                {prompt.length} 字符
              </span>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              onFocus={handleManualEdit}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="系统会根据应用信息自动生成Prompt，您也可以手动修改..."
            />
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-2">
                <h4 className="text-xs font-medium text-blue-800 mb-1">提示</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• 系统会根据配置的功能模块自动生成Prompt</p>
                  <p>• 手动修改后将不再自动更新</p>
                  <p>• 点击"恢复自动生成"重新启用自动更新</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}