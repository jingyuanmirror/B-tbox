'use client';

import React from 'react';
import { ProgressPayload } from '@/types/assistant';
import { Check, Loader2, Circle } from 'lucide-react';

interface ProgressCardProps {
  payload: ProgressPayload;
}

export function ProgressCard({ payload }: ProgressCardProps) {
  const { steps } = payload;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden max-w-sm">
      <div className="p-4">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : step.status === 'active'
                  ? 'bg-blue-500 text-white'
                  : step.status === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500'
              }`}>
                {step.status === 'completed' ? (
                  <Check className="h-3.5 w-3.5" />
                ) : step.status === 'active' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
              </div>
              <span className={`text-sm ${
                step.status === 'completed'
                  ? 'text-green-700 dark:text-green-400'
                  : step.status === 'active'
                  ? 'text-blue-700 dark:text-blue-400 font-medium'
                  : step.status === 'error'
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}