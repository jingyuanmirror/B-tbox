'use client';

import React, { useRef, useEffect } from 'react';
import { AssistantMessage as AssistantMessageType } from '@/types/assistant';
import { AssistantMessage } from './AssistantMessage';

interface AssistantChatProps {
  messages: AssistantMessageType[];
  isProcessing: boolean;
  onBuildMethodSelect?: (method: 'prompt' | 'function' | 'workflow') => void;
  onToolToggle?: (toolId: string) => void;
  onToolConfirm?: () => void;
  onConfigConfirm?: () => void;
}

export function AssistantChat({
  messages,
  isProcessing,
  onBuildMethodSelect,
  onToolToggle,
  onToolConfirm,
  onConfigConfirm,
}: AssistantChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isProcessing]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
      {messages.map((msg) => (
        <AssistantMessage
          key={msg.id}
          message={msg}
          onBuildMethodSelect={onBuildMethodSelect}
          onToolToggle={onToolToggle}
          onToolConfirm={onToolConfirm}
          onConfigConfirm={onConfigConfirm}
        />
      ))}

      {isProcessing && (
        <div className="flex gap-3 my-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ring-1 ring-blue-200 dark:ring-blue-800">
            <img src="/ai-assistant.png" alt="AI助手" className="w-full h-full" />
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}