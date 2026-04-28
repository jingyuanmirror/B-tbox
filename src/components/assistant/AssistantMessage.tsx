'use client';

import React from 'react';
import { AssistantMessage as AssistantMessageType, RecommendationPayload, ToolSelectorPayload, ConfigFormPayload, ProgressPayload } from '@/types/assistant';
import { RecommendationCard } from './cards/RecommendationCard';
import { ToolSelector } from './cards/ToolSelector';
import { ConfigSummary } from './cards/ConfigSummary';
import { ProgressCard } from './cards/ProgressCard';
import { User, AlertCircle } from 'lucide-react';

interface AssistantMessageProps {
  message: AssistantMessageType;
  onBuildMethodSelect?: (method: 'prompt' | 'function' | 'workflow') => void;
  onToolToggle?: (toolId: string) => void;
  onToolConfirm?: () => void;
  onConfigConfirm?: () => void;
}

export function AssistantMessage({
  message,
  onBuildMethodSelect,
  onToolToggle,
  onToolConfirm,
  onConfigConfirm,
}: AssistantMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-500 dark:text-gray-400">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${message.expired ? 'opacity-40' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ${
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center'
          : 'ring-1 ring-blue-200 dark:ring-blue-800'
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <img src="/ai-assistant.png" alt="AI助手" className="w-full h-full" />
        )}
      </div>

      {/* Content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-700/50 rounded-bl-md shadow-sm'
        }`}>
          {message.type === 'error' ? (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{message.content}</span>
            </div>
          ) : message.type === 'text' || message.type === 'system' ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : null}
        </div>

        {/* Structured payload cards */}
        {message.type === 'recommendation' && message.payload && onBuildMethodSelect && (
          <div className="mt-2">
            <RecommendationCard
              payload={message.payload as RecommendationPayload}
              onSelect={onBuildMethodSelect}
            />
          </div>
        )}

        {message.type === 'tool_selector' && message.payload && (
          <div className="mt-2">
            <ToolSelector
              payload={message.payload as ToolSelectorPayload}
              onToggle={onToolToggle}
              onConfirm={onToolConfirm}
            />
          </div>
        )}

        {message.type === 'config_form' && message.payload && (
          <div className="mt-2">
            <ConfigSummary
              payload={message.payload as ConfigFormPayload}
              onConfirm={onConfigConfirm}
            />
          </div>
        )}

        {message.type === 'progress' && message.payload && (
          <div className="mt-2">
            <ProgressCard payload={message.payload as ProgressPayload} />
          </div>
        )}
      </div>
    </div>
  );
}