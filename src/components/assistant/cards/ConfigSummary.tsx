'use client';

import React from 'react';
import { ConfigFormPayload } from '@/types/assistant';
import { Check } from 'lucide-react';

interface ConfigSummaryProps {
  payload: ConfigFormPayload;
  onConfirm?: () => void;
}

export function ConfigSummary({ payload, onConfirm }: ConfigSummaryProps) {
  const { fields } = payload;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden max-w-md">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">配置摘要</span>
        </div>

        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.key} className="flex items-start gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[80px] pt-0.5">
                {field.label}
              </span>
              <div className="flex-1 text-sm text-gray-900 dark:text-white">
                {Array.isArray(field.value) ? (
                  <div className="flex flex-wrap gap-1">
                    {field.value.map((v, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {v}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="break-all">{field.value || '-'}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {onConfirm && (
          <button
            onClick={onConfirm}
            className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium transition-all shadow-md hover:shadow-lg"
          >
            确认并创建智能体
          </button>
        )}
      </div>
    </div>
  );
}