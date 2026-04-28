'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, X, PanelRightOpen } from 'lucide-react';
import { AssistantChat } from './AssistantChat';
import { AssistantInput } from './AssistantInput';
import { PhaseBreadcrumb } from './PhaseBreadcrumb';
import { RequirementTemplate } from './RequirementTemplate';
import { AssistantSidePanel } from './panels/AssistantSidePanel';
import { useAssistantStore } from '@/store/useAssistantStore';
import { useServices } from '@/hooks/useServices';
import { processUserMessage } from '@/lib/assistant/aiClient';
import { BUILD_METHOD_INFO, generateNameSuggestions } from '@/lib/assistant/promptTemplates';
import { RequirementTemplate as RequirementTemplateType, AssistantPhase } from '@/types/assistant';
import { BuildMethod } from '@/types/app';
import { getAIGreeting } from '@/lib/aiAssistantConfig';
import { createAppData } from '@/lib/appUtils';

export function AssistantDialog() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return getAIGreeting('morning');
    if (hour < 18) return getAIGreeting('afternoon');
    return getAIGreeting('evening');
  });

  const {
    phase,
    messages,
    isProcessing,
    requirement,
    selectedMethod,
    config,
    sidePanelOpen,
    addMessage,
    setPhase,
    updateRequirement,
    setRecommendation,
    selectBuildMethod,
    updateConfig,
    toggleTool,
    setProcessing,
    resetConversation,
    openSidePanel,
    closeSidePanel,
    pushSnapshot,
  } = useAssistantStore();

  const { services } = useServices();

  const handleSendMessage = useCallback(async (content: string) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }

    // Add user message
    addMessage({
      role: 'user',
      type: 'text',
      content,
    });

    setProcessing(true);

    try {
      const result = await processUserMessage(content, phase, requirement, config, services);

      // Update requirement
      if (result.requirementUpdate) {
        updateRequirement(result.requirementUpdate);
      }

      // Update config
      if (result.configUpdate) {
        updateConfig(result.configUpdate);
      }

      // Update phase
      if (result.phaseUpdate) {
        if (result.phaseUpdate === 'configuration' || result.phaseUpdate === 'generation') {
          pushSnapshot();
        }
        setPhase(result.phaseUpdate as AssistantPhase);
      }

      // Update recommendation
      if (result.recommendation) {
        setRecommendation(result.recommendation);
        selectBuildMethod(result.recommendation.method);
      }

      // Add assistant messages
      for (const msg of result.messages) {
        addMessage(msg);
      }
    } catch {
      addMessage({
        role: 'assistant',
        type: 'error',
        content: '抱歉，处理您的请求时出现了问题，请重试。',
      });
    } finally {
      setProcessing(false);
    }
  }, [phase, requirement, config, services, isExpanded, addMessage, setProcessing, updateRequirement, updateConfig, setPhase, setRecommendation, selectBuildMethod, pushSnapshot]);

  const handleTemplateSelect = useCallback((template: RequirementTemplateType) => {
    handleSendMessage(template.prompt);
  }, [handleSendMessage]);

  const handleBuildMethodSelect = useCallback((method: BuildMethod) => {
    selectBuildMethod(method);
    const info = BUILD_METHOD_INFO[method];
    addMessage({
      role: 'user',
      type: 'text',
      content: `我选择${info.label}`,
    });

    const nameSuggestions = generateNameSuggestions(requirement);
    const descSuggestion = requirement.rawInput || '';

    pushSnapshot();
    setPhase('configuration');
    updateConfig({ description: descSuggestion });

    setTimeout(() => {
      addMessage({
        role: 'assistant',
        type: 'text',
        content: `好的！让我们使用 **${info.label}** 方式来创建您的智能体。\n\n**1. 智能体名称**\n\n我为您生成了几个建议名称：\n${nameSuggestions.map((n: string, i: number) => `  ${i + 1}. ${n}`).join('\n')}\n\n您可以选择一个（输入数字或名称），或者输入自定义名称。`,
      });
    }, 400);
  }, [selectBuildMethod, addMessage, pushSnapshot, setPhase, updateConfig, requirement]);

  const handleToolToggle = useCallback((toolId: string) => {
    const service = services.find((s) => s.id === toolId);
    if (service) {
      toggleTool(service);
    }
  }, [services, toggleTool]);

  const handleToolConfirm = useCallback(() => {
    addMessage({
      role: 'assistant',
      type: 'text',
      content: `已选择 ${config.selectedTools.length} 个工具。接下来配置系统 Prompt。`,
    });
  }, [config.selectedTools.length, addMessage]);

  const handleConfigConfirm = useCallback(() => {
    if (!config.name) return;

    setProcessing(true);
    pushSnapshot();
    setPhase('generation');

    // Show progress
    addMessage({
      role: 'assistant',
      type: 'progress',
      content: '正在创建智能体...',
      payload: {
        steps: [
          { label: '基础配置', status: 'completed' },
          { label: '工具加载', status: 'active' },
          { label: '初始化完成', status: 'pending' },
        ],
        currentStep: 1,
      },
    });

    setTimeout(() => {
      addMessage({
        role: 'assistant',
        type: 'progress',
        content: '正在创建智能体...',
        payload: {
          steps: [
            { label: '基础配置', status: 'completed' },
            { label: '工具加载', status: 'completed' },
            { label: '初始化完成', status: 'active' },
          ],
          currentStep: 2,
        },
      });

      setTimeout(() => {
        const appData = createAppData({
          name: config.name,
          type: 'dialog',
          buildMethod: selectedMethod || 'prompt',
          description: config.description,
          industry: config.industry,
        });

        addMessage({
          role: 'assistant',
          type: 'progress',
          content: '智能体创建完成！',
          payload: {
            steps: [
              { label: '基础配置', status: 'completed' },
              { label: '工具加载', status: 'completed' },
              { label: '初始化完成', status: 'completed' },
            ],
            currentStep: 3,
          },
        });

        addMessage({
          role: 'assistant',
          type: 'text',
          content: `智能体 **"${config.name}"** 创建成功！\n\n- 构建方式：${BUILD_METHOD_INFO[selectedMethod || 'prompt']?.label}\n- 已选工具：${config.selectedTools.length > 0 ? config.selectedTools.map(t => t.name).join('、') : '无'}\n\n您可以在左侧"应用管理"中查看和编辑该智能体。如需继续创建，点击重置按钮开始新的对话。`,
        });

        setPhase('completed');
        setProcessing(false);
      }, 800);
    }, 800);
  }, [config, selectedMethod, addMessage, setProcessing, pushSnapshot, setPhase]);

  const handleReset = useCallback(() => {
    resetConversation();
    setIsExpanded(false);
  }, [resetConversation]);

  const handlePhaseClick = useCallback((targetPhase: string) => {
    setPhase(targetPhase as AssistantPhase);
  }, [setPhase]);

  // Collapsed state: hero input area
  if (!isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img
              src="/ai-assistant.png"
              alt="AI助手"
              className="w-12 h-12 rounded-full shadow-lg ring-2 ring-blue-200 dark:ring-blue-800"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{greeting}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">描述你的业务需求，我来帮你分析及构建智能体</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="描述你想要的智能体..."
              className="w-full h-14 px-5 pr-14 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  if (target.value.trim()) {
                    handleSendMessage(target.value.trim());
                    target.value = '';
                  }
                }
              }}
              onFocus={() => {
                // Auto-expand on focus
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[placeholder="描述你想要的智能体..."]') as HTMLInputElement;
                if (input?.value.trim()) {
                  handleSendMessage(input.value.trim());
                  input.value = '';
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
            >
              <span className="text-sm font-bold">→</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Expanded state: full conversation view
  return (
    <div className="w-full h-[520px] flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-center gap-2">
          <img
            src="/ai-assistant.png"
            alt="AI助手"
            className="w-8 h-8 rounded-full ring-1 ring-blue-200 dark:ring-blue-800"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">智能助理</h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">需求分析 · 智能构建</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {selectedMethod && (
            <button
              onClick={() => openSidePanel('tools')}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="工具面板"
            >
              <PanelRightOpen className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="重新开始"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="收起"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Phase breadcrumb */}
      <PhaseBreadcrumb currentPhase={phase} onPhaseClick={handlePhaseClick} />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AssistantChat
            messages={messages}
            isProcessing={isProcessing}
            onBuildMethodSelect={handleBuildMethodSelect}
            onToolToggle={handleToolToggle}
            onToolConfirm={handleToolConfirm}
            onConfigConfirm={handleConfigConfirm}
          />
          <AssistantInput
            onSend={handleSendMessage}
            isProcessing={isProcessing}
          />
        </div>

        {/* Side panel */}
        <AnimatePresence>
          {sidePanelOpen && (
            <AssistantSidePanel
              type={useAssistantStore.getState().sidePanelType}
              config={config}
              selectedBuildMethod={selectedMethod || undefined}
              onClose={closeSidePanel}
              onToggleTool={handleToolToggle}
              services={services}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}