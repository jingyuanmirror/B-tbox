'use client';

import React from 'react';
import { RecommendationPayload } from '@/types/assistant';
import { BUILD_METHOD_INFO } from '@/lib/assistant/promptTemplates';
import { BuildMethod } from '@/types/app';
import { Star } from 'lucide-react';

interface RecommendationCardProps {
  payload: RecommendationPayload;
  onSelect: (method: BuildMethod) => void;
}

export function RecommendationCard({ payload, onSelect }: RecommendationCardProps) {
  const { method, confidence, reasoning, matchedTools, alternatives } = payload;

  const allMethods: { method: BuildMethod; confidence: number; reasoning: string; isPrimary: boolean }[] = [
    { method, confidence, reasoning, isPrimary: true },
    ...alternatives.map((a) => ({ ...a, isPrimary: false })),
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden max-w-md">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">构建方式推荐</span>
        </div>

        {/* All methods */}
        <div className="space-y-2">
          {allMethods.map((item) => {
            const info = BUILD_METHOD_INFO[item.method];
            const stars = Math.round(item.confidence / 33);

            return (
              <button
                key={item.method}
                onClick={() => onSelect(item.method)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  item.isPrimary
                    ? 'border-blue-300 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{info.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {info.label}
                      {item.isPrimary && (
                        <span className="ml-2 text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 rounded-full">
                          推荐
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                    <span className="text-[10px] text-gray-500 ml-1">{item.confidence}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.reasoning}</p>
              </button>
            );
          })}
        </div>

        {/* Matched tools */}
        {matchedTools.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">匹配工具</p>
            <div className="flex flex-wrap gap-1.5">
              {matchedTools.slice(0, 4).map((tool) => (
                <span
                  key={tool.service.id}
                  className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {tool.service.name.slice(0, 8)}
                  <span className="text-green-600 dark:text-green-400">{tool.matchScore}%</span>
                </span>
              ))}
              {matchedTools.length > 4 && (
                <span className="text-[10px] text-gray-400 px-1 py-1">
                  +{matchedTools.length - 4}个
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}