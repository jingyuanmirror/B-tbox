'use client';

import React from 'react';
import { RequirementTemplate as RequirementTemplateType } from '@/types/assistant';
import { REQUIREMENT_TEMPLATES } from '@/lib/assistant/promptTemplates';

interface RequirementTemplateProps {
  onSelect: (template: RequirementTemplateType) => void;
}

export function RequirementTemplate({ onSelect }: RequirementTemplateProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {REQUIREMENT_TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template)}
          className="flex-shrink-0 group relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 min-w-[100px]"
        >
          <span className="text-2xl">{template.icon}</span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 whitespace-nowrap">
            {template.label}
          </span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
            {template.description}
          </span>
        </button>
      ))}
    </div>
  );
}