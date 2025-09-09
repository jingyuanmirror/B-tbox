'use client';

import React, { useState } from 'react';
import SystemPromptPanel from '@/components/app-builder/SystemPromptPanel';

export default function TestPromptPage() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-2xl font-bold">系统Prompt配置测试</h1>
            <p className="mt-2 text-blue-100">测试新的系统Prompt配置功能</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧 - SystemPromptPanel */}
              <div className="lg:col-span-2">
                <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
                  <SystemPromptPanel
                    onPromptChange={(newPrompt) => setPrompt(newPrompt)}
                  />
                </div>
              </div>
              
              {/* 右侧 - 预览 */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 h-[600px] flex flex-col">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">实时预览</h3>
                  
                  <div className="flex-1 bg-white rounded border p-3 overflow-y-auto">
                    {prompt ? (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">当前Prompt内容：</div>
                        <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {prompt}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm italic">
                        在左侧编辑器中输入Prompt内容，这里会实时显示...
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 bg-gray-100 rounded p-2">
                    <strong>字符统计：</strong> {prompt.length} 字符
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部说明 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">功能特性</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✅ 空白状态设计 - 给用户最大自由度</li>
                <li>✅ 智能占位文案 - 提供编写指导</li>
                <li>✅ 示例模板 - 快速开始</li>
                <li>✅ 字符计数 - 实时反馈</li>
                <li>✅ 编写提示 - 最佳实践指导</li>
                <li>✅ 清空功能 - 重新开始</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
