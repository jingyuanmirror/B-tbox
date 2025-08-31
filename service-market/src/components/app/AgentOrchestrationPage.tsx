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
  const [showIntentSidebar, setShowIntentSidebar] = useState(false);
  const [showAddServiceMenu, setShowAddServiceMenu] = useState(false);
  const [showPluginModal, setShowPluginModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null); // 统一的服务状态，可以是插件或服务流

  console.log('AgentOrchestrationPage 渲染，isOpen:', isOpen, 'appName:', appName);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePluginSelect = (plugin: any) => {
    setSelectedService({ ...plugin, type: 'plugin' });
    setShowPluginModal(false);
  };

  const handleWorkflowSelect = (workflow: any) => {
    setSelectedService({ ...workflow, type: 'workflow' });
    setShowWorkflowModal(false);
  };

  const handleRemoveService = () => {
    setSelectedService(null);
  };

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
              <div 
                className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-48 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowIntentSidebar(true)}
              >
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

        {/* 意图识别侧边栏 */}
        {showIntentSidebar && (
          <div 
            className="fixed inset-0 z-[1000000] flex justify-end"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowIntentSidebar(false);
                setShowAddServiceMenu(false);
              }
            }}
          >
            <div className="w-[500px] h-full bg-white shadow-2xl border-l border-gray-200 flex flex-col">
              {/* 侧边栏顶部 */}
              <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
                <h2 className="text-lg font-medium text-gray-900">意图识别</h2>
                <div className="flex items-center space-x-3">
                  <button className="text-sm text-gray-500 hover:text-gray-700">取消</button>
                  <button 
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setShowIntentSidebar(false)}
                  >
                    确定
                  </button>
                </div>
              </div>

              {/* 侧边栏内容 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* 功能名称 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">功能名称</label>
                  <input
                    type="text"
                    value="意图识别"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                {/* 调用场景 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">调用场景</label>
                    <span className="text-xs text-gray-400">指定调用</span>
                  </div>
                  <textarea
                    placeholder="请针对该场景填写最贴近的描述，添加一些具体示例进行详明可以让智能体判断的更为准确"
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>

                {/* 标签 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">标签</label>
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>标签</span>
                  </button>
                </div>

                {/* 调用服务 */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">调用服务</label>
                  {!selectedService ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">请添加你所希望实现的服务功能</div>
                        </div>
                        <div className="relative">
                          <button 
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => setShowAddServiceMenu(!showAddServiceMenu)}
                          >
                            点击添加
                          </button>
                          
                          {/* 添加服务选择菜单 */}
                          {showAddServiceMenu && (
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              <div className="py-1">
                                <button 
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  onClick={() => {
                                    setShowAddServiceMenu(false);
                                    setShowPluginModal(true);
                                  }}
                                >
                                  添加插件
                                </button>
                                <button 
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  onClick={() => {
                                    setShowAddServiceMenu(false);
                                    setShowWorkflowModal(true);
                                  }}
                                >
                                  添加服务流
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        {selectedService.type === 'plugin' ? (
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">{selectedService.icon || '🆔'}</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">📦</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{selectedService.name}</div>
                        </div>
                        <div className="text-sm text-gray-500">已添加服务</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 核心功能示意图 */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">核心功能示意图</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center space-y-2 bg-gray-50">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">上传图片</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 添加插件弹窗 */}
        {showPluginModal && (
          <div 
            className="fixed inset-0 z-[1000001] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
          >
            <div className="w-[800px] h-[600px] bg-white rounded-lg shadow-2xl flex overflow-hidden">
              {/* 左侧分类栏 */}
              <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col">
                {/* 左侧顶部 - 添加插件标题 */}
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">添加插件</h2>
                  
                  {/* 新建插件/我的插件标签 */}
                  <div className="space-y-2 mb-4">
                    <button className="w-full text-left px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                      新建插件
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      我的插件
                    </button>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">插件商店</h3>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                        全部
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 分类列表 */}
                <div className="flex-1 p-4 space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>🔍</span>
                    <span>内容搜索</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>⚙️</span>
                    <span>实用工具</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>🏠</span>
                    <span>生活服务</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>📄</span>
                    <span>文旅景区</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>🚗</span>
                    <span>出行服务</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>🏫</span>
                    <span>高校服务</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>🤝</span>
                    <span>会展服务</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                    <span>💎</span>
                    <span>MCP专区</span>
                  </button>
                </div>
              </div>

              {/* 右侧内容区 */}
              <div className="flex-1 flex flex-col">
                {/* 顶部搜索栏 */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="输入关键词搜索插件/工具"
                      className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">没有找到想要的插件？</span>
                    <button className="text-sm text-blue-600 hover:text-blue-700">立即反馈</button>
                    <button 
                      onClick={() => setShowPluginModal(false)}
                      className="w-6 h-6 text-gray-400 hover:text-gray-600"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 插件列表 */}
                <div className="flex-1 overflow-y-auto">
                  {/* 提示语 */}
                  <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                    <p className="text-sm text-blue-700 font-medium">仅支持添加以下满足调用条件的插件服务</p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                  {/* 身份认证插件 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🆔</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">身份认证插件</h4>
                          <button 
                            className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                            onClick={() => handlePluginSelect({
                              id: 'identity-auth',
                              name: '身份认证',
                              description: '身份认证',
                              icon: '🆔'
                            })}
                          >
                            添加
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">身份认证插件</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            1个工具
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            408
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ~ms
                          </span>
                          <span>-%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 签到详情插件 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📋</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">签到详情插件</h4>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">签到详情插件</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            1个工具
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            82
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ~ms
                          </span>
                          <span>-%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 行业智能体客服问答插件 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">行业智能体客服问答插件</h4>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">行业智能体客服问答插件</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            1个工具
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            2.4K
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ~ms
                          </span>
                          <span>-%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 交通指南 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🚗</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">交通指南</h4>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">为用户提供便利设施服务导航</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            1个工具
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            1.3K
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ~ms
                          </span>
                          <span>-%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 签到插件 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✅</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">签到插件</h4>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">签到插件</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            1个工具
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            406
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ~ms
                          </span>
                          <span>-%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 添加服务流弹窗 */}
        {showWorkflowModal && (
          <div 
            className="fixed inset-0 z-[1000001] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
          >
            <div className="w-[600px] h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
              {/* 顶部标题栏 */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">添加服务流</h2>
                <button 
                  onClick={() => setShowWorkflowModal(false)}
                  className="w-6 h-6 text-gray-400 hover:text-gray-600"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 搜索框 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索服务流"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* 服务流列表 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {/* 旅游小助 服务流 1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">📦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">旅游小助</h4>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">服务流</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...</p>
                          <p className="text-xs text-gray-400">发布于 2024-06-17 16:25</p>
                        </div>
                        <button 
                          className="ml-3 px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors flex-shrink-0"
                          onClick={() => handleWorkflowSelect({
                            id: 'travel-assistant-1',
                            name: '旅游小助',
                            description: '✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...'
                          })}
                        >
                          添加
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 旅游小助 服务流 2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">📦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">旅游小助</h4>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">服务流</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...</p>
                          <p className="text-xs text-gray-400">发布于 2024-06-17 16:25</p>
                        </div>
                        <button 
                          className="ml-3 px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors flex-shrink-0"
                          onClick={() => handleWorkflowSelect({
                            id: 'travel-assistant-2',
                            name: '旅游小助',
                            description: '✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...'
                          })}
                        >
                          添加
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 旅游小助 服务流 3 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">📦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">旅游小助</h4>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">服务流</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...</p>
                          <p className="text-xs text-gray-400">发布于 2024-06-17 16:25</p>
                        </div>
                        <button 
                          className="ml-3 px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors flex-shrink-0"
                          onClick={() => handleWorkflowSelect({
                            id: 'travel-assistant-3',
                            name: '旅游小助',
                            description: '✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...'
                          })}
                        >
                          添加
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 旅游小助 服务流 4 */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">📦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">旅游小助</h4>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">服务流</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...</p>
                          <p className="text-xs text-gray-400">发布于 2024-06-17 16:25</p>
                        </div>
                        <button 
                          className="ml-3 px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors flex-shrink-0"
                          onClick={() => handleWorkflowSelect({
                            id: 'travel-assistant-4',
                            name: '旅游小助',
                            description: '✨ 你好，我是您的私人旅行设计师！🗺️ 告诉我您心中的梦想旅游您心中的梦...'
                          })}
                        >
                          添加
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // 使用 Portal 渲染到 document.body
  return createPortal(content, document.body);
}

export default AgentOrchestrationPage;
