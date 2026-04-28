'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Wrench, Server, GitBranch, Code, Check, Plus } from 'lucide-react';
import { AgentConfig } from '@/types/assistant';
import { Service, ServiceType } from '@/types/service';
import { BUILD_METHOD_INFO } from '@/lib/assistant/promptTemplates';

interface AssistantSidePanelProps {
  type: 'workflow' | 'code' | 'tools' | 'config' | null;
  config: AgentConfig;
  selectedBuildMethod?: string;
  onClose: () => void;
  onToggleTool: (toolId: string) => void;
  services: Service[];
}

const SERVICE_TYPE_ICON: Record<string, React.ReactNode> = {
  [ServiceType.PLUGIN]: <Wrench className="h-4 w-4" />,
  [ServiceType.MCP]: <Server className="h-4 w-4" />,
  [ServiceType.SERVICE_FLOW]: <GitBranch className="h-4 w-4" />,
  [ServiceType.CODE_SERVICE]: <Code className="h-4 w-4" />,
};

export function AssistantSidePanel({ type, config, selectedBuildMethod, onClose, onToggleTool, services }: AssistantSidePanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!type) return null;

  const selectedToolIds = config.selectedTools.map((t) => t.id);

  const filteredServices = services.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.tags.some((t) => t.toLowerCase().includes(q));
  });

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 360, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="border-l border-gray-200/50 dark:border-gray-700/50 bg-gray-50/80 dark:bg-gray-800/80 overflow-hidden flex-shrink-0"
    >
      <div className="h-full flex flex-col">
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {type === 'tools' && '工具选择'}
            {type === 'config' && '配置详情'}
            {type === 'workflow' && '工作流编排'}
            {type === 'code' && '代码编辑'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tools panel */}
        {type === 'tools' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索工具..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Selected count */}
            {config.selectedTools.length > 0 && (
              <div className="px-3 pb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  已选择 {config.selectedTools.length} 个工具
                </span>
              </div>
            )}

            {/* Tool list */}
            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
              {filteredServices.map((service) => {
                const isSelected = selectedToolIds.includes(service.id);
                const typeIcon = SERVICE_TYPE_ICON[service.type] || <Wrench className="h-4 w-4" />;

                return (
                  <div
                    key={service.id}
                    onClick={() => onToggleTool(service.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {typeIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {service.name}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {service.toolCount && `${service.toolCount}个工具 · `}
                        {service.usageCount}次使用
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}>
                      {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Config panel */}
        {type === 'config' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ConfigField label="智能体名称" value={config.name || '未设置'} />
            <ConfigField label="描述" value={config.description || '未设置'} />
            <ConfigField label="构建方式" value={selectedBuildMethod ? BUILD_METHOD_INFO[selectedBuildMethod as keyof typeof BUILD_METHOD_INFO]?.label || '未选择' : '未选择'} />
            <ConfigField label="行业" value={config.industry || '未设置'} />

            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">已选工具</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {config.selectedTools.length > 0 ? (
                  config.selectedTools.map((tool) => (
                    <span key={tool.id} className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {tool.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">暂无</span>
                )}
              </div>
            </div>

            {config.prompt && (
              <ConfigField label="系统Prompt" value={config.prompt} />
            )}
          </div>
        )}

        {/* Workflow panel placeholder */}
        {type === 'workflow' && (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <GitBranch className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">工作流编排面板</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">将在增强版本中支持</p>
            </div>
          </div>
        )}

        {/* Code panel placeholder */}
        {type === 'code' && (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <Code className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">代码编辑面板</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">将在增强版本中支持</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ConfigField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <p className="text-sm text-gray-900 dark:text-white mt-0.5 break-all">{value}</p>
    </div>
  );
}