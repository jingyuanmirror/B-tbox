'use client';

import React from 'react';
import { ToolSelectorPayload } from '@/types/assistant';
import { ServiceType } from '@/types/service';
import { Plus, Check, Wrench, Server, GitBranch, Code } from 'lucide-react';

interface ToolSelectorProps {
  payload: ToolSelectorPayload;
  onToggle?: (toolId: string) => void;
  onConfirm?: () => void;
}

const SERVICE_TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  [ServiceType.PLUGIN]: { icon: <Wrench className="h-3.5 w-3.5" />, label: '插件', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' },
  [ServiceType.MCP]: { icon: <Server className="h-3.5 w-3.5" />, label: 'MCP', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400' },
  [ServiceType.SERVICE_FLOW]: { icon: <GitBranch className="h-3.5 w-3.5" />, label: '服务流', color: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' },
  [ServiceType.CODE_SERVICE]: { icon: <Code className="h-3.5 w-3.5" />, label: '代码服务', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400' },
};

export function ToolSelector({ payload, onToggle, onConfirm }: ToolSelectorProps) {
  const { tools, selectedToolIds, maxSelection = 5 } = payload;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden max-w-md">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">为您匹配到以下工具</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            已选 {selectedToolIds.length}/{maxSelection}
          </span>
        </div>

        {/* Tool list */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {tools.map((tool) => {
            const isSelected = selectedToolIds.includes(tool.service.id);
            const typeConfig = SERVICE_TYPE_CONFIG[tool.service.type];

            return (
              <div
                key={tool.service.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => onToggle?.(tool.service.id)}
              >
                {/* Type badge */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${typeConfig?.color || 'text-gray-600 bg-gray-100'}`}>
                  {typeConfig?.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {tool.service.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      {tool.matchScore}%匹配
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {tool.service.toolCount && (
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">
                        {tool.service.toolCount}个工具
                      </span>
                    )}
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {tool.service.usageCount}次使用
                    </span>
                  </div>
                </div>

                {/* Toggle button */}
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}>
                  {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirm button */}
        {onConfirm && (
          <button
            onClick={onConfirm}
            className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
          >
            确认选择
          </button>
        )}
      </div>
    </div>
  );
}