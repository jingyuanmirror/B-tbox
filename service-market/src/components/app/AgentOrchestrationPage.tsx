'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface AgentOrchestrationPageProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
}

function AgentOrchestrationPage({ isOpen, onClose, appName }: AgentOrchestrationPageProps) {
  const [activeTab, setActiveTab] = useState('功能编排');
  const [mounted, setMounted] = useState(false);

  console.log('AgentOrchestrationPage 渲染，isOpen:', isOpen, 'appName:', appName);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) {
    console.log('AgentOrchestrationPage 不显示，因为 isOpen 为 false');
    return null;
  }

  if (!mounted) {
    return null;
  }

  console.log('AgentOrchestrationPage 开始渲染页面内容');

  const content = (
    <>
      {/* 全屏遮罩层 - 确保完全覆盖所有内容 */}
      <div 
        className="fixed inset-0 bg-white" 
        style={{ 
          zIndex: 999999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        {/* 顶部导航栏 */}
        <div 
          className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6" 
          style={{ zIndex: 999999 }}
        >
          {/* 左侧：返回按钮和应用信息 */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-medium">🤖</span>
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">333</h1>
                <p className="text-sm text-gray-500">对话配置</p>
              </div>
            </div>
          </div>

          {/* 中间：标签导航 - 居中显示 */}
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('功能编排')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === '功能编排'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              功能编排
            </button>
            <button
              onClick={() => setActiveTab('知识库')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === '知识库'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              知识库
            </button>
          </div>
          
          {/* 右侧：操作按钮 */}
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              运行
            </button>
            <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              发布
            </button>
          </div>
        </div>

        {/* 主要内容区域 - 全宽无左侧边栏 */}
        <div className="h-[calc(100vh-64px)] bg-gray-50">
          <div className="flex items-start justify-start pt-8 pl-16 pr-8">
            <div className="flex space-x-4 w-full max-w-5xl">
              {/* Step 1 - 前置判断 */}
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-48">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Step1
                  </div>
                  <span className="text-sm font-medium text-gray-900">前置判断</span>
                  <div className="w-3 h-3 bg-gray-100 rounded-full flex items-center justify-center ml-auto">
                    <svg className="w-2 h-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center space-y-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-xs">添加新功能</p>
                </div>
              </div>

              {/* Step 2 - 快速决策 */}
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-48">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Step2
                  </div>
                  <span className="text-sm font-medium text-gray-900">快速决策</span>
                  <div className="w-3 h-3 bg-gray-100 rounded-full flex items-center justify-center ml-auto">
                    <svg className="w-2 h-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center space-y-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-xs">添加新功能</p>
                </div>
              </div>

              {/* Step 3 - 意图识别 */}
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-48">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                    Step3
                  </div>
                  <span className="text-sm font-medium text-gray-900">意图识别</span>
                  <div className="w-3 h-3 bg-gray-100 rounded-full flex items-center justify-center ml-auto">
                    <svg className="w-2 h-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center space-y-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-xs">添加新功能</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右下角机器人助手 */}
          <div className="fixed bottom-8 right-8" style={{ zIndex: 999999 }}>
            <button className="w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-base">🤖</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // 使用 Portal 渲染到 document.body
  return createPortal(content, document.body);
}

export default AgentOrchestrationPage;
