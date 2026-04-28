'use client';

import React from 'react';
import { AssistantPhase } from '@/types/assistant';
import { Check } from 'lucide-react';

interface PhaseBreadcrumbProps {
  currentPhase: AssistantPhase;
  onPhaseClick?: (phase: AssistantPhase) => void;
}

const PHASES: { key: AssistantPhase; label: string; order: number }[] = [
  { key: 'requirement_analysis', label: '需求分析', order: 1 },
  { key: 'build_recommendation', label: '构建推荐', order: 2 },
  { key: 'configuration', label: '配置引导', order: 3 },
  { key: 'generation', label: '生成', order: 4 },
  { key: 'completed', label: '完成', order: 5 },
];

export function PhaseBreadcrumb({ currentPhase, onPhaseClick }: PhaseBreadcrumbProps) {
  if (currentPhase === 'idle') return null;

  const currentOrder = PHASES.find((p) => p.key === currentPhase)?.order || 0;

  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 overflow-x-auto">
      {PHASES.map((phase, index) => {
        const isCompleted = currentOrder > phase.order;
        const isCurrent = currentPhase === phase.key;
        const isClickable = isCompleted && onPhaseClick;

        return (
          <React.Fragment key={phase.key}>
            {index > 0 && (
              <div className={`w-6 h-px flex-shrink-0 ${isCompleted ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            )}
            <button
              onClick={() => isClickable && onPhaseClick(phase.key)}
              disabled={!isClickable}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                  : isCompleted
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 cursor-pointer'
                  : 'text-gray-400 dark:text-gray-500 cursor-default'
              }`}
            >
              {isCompleted ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="w-4 h-4 rounded-full border current:border-blue-500 text-center leading-4 text-[10px]">
                  {phase.order}
                </span>
              )}
              {phase.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}