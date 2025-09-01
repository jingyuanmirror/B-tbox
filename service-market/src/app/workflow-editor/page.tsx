'use client';

import React from 'react';

export default function WorkflowEditorPage() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* 顶部工具栏 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* 返回箭头 */}
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Logo和标题 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">🤖</span>
            </div>
            <span className="text-lg font-medium text-gray-900">44444</span>
          </div>
          
          {/* 编辑图标 */}
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* 全屏图标 */}
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          
          {/* 运行按钮 */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>运行</span>
          </button>
          
          {/* 发布按钮 */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>发布</span>
          </button>
          
          {/* 三点菜单 */}
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧节点面板 */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* 节点标题 */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900">节点</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* 节点列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* 文本大模型 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">文本大模型</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">利用先进的文本大模型，处理文本相关任务，如理解问题生成答案。</p>
            </div>

            {/* 插件 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">插件</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">插件节点提供了调用外部服务的能力，如查天气等。</p>
            </div>

            {/* 知识库 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">知识库</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">从知识库检索信息，为查询节点提供上下文输入。</p>
            </div>

            {/* 代码 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">代码</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">用于运行用户自定义代码逻辑，实现数据处理、计算等任务。</p>
            </div>

            {/* 结束 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">结束</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">作为工作流的终点，输出最终结果，完成流程。</p>
            </div>

            {/* 应用 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">应用</span>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">调用并整合其他应用，轻松实现多等能力。</p>
            </div>
          </div>
        </div>

        {/* 右侧工作流画布 */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden">
          <div className="h-full p-6">
            <div className="h-full bg-white rounded-lg border border-gray-200 relative">
              {/* 工作流节点 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-40">
                  {/* 开始节点 */}
                  <div className="relative">
                    <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 w-64">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-base font-medium text-gray-900">开始</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-2">输入</div>
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-50 border border-blue-200 rounded px-3 py-1">
                              <span className="text-sm text-blue-700">提问</span>
                            </div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500"># 提问</div>
                      </div>
                    </div>
                    
                    {/* 右侧连接点 */}
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  {/* 连接线 */}
                  <svg className="absolute left-1/2 transform -translate-x-1/2" width="160" height="4">
                    <path d="M0 2 Q80 2 160 2" stroke="#3B82F6" strokeWidth="2" fill="none"/>
                    <circle cx="160" cy="2" r="3" fill="#3B82F6"/>
                  </svg>

                  {/* 文本大模型节点 */}
                  <div className="relative">
                    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 w-80 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-base font-medium text-gray-900">文本大模型</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">模型选择</div>
                          <div className="text-sm text-purple-600 font-medium">通义千问-Max</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600 mb-2">提示词</div>
                          <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                            <span className="text-sm text-gray-700">请根据</span>
                            <span className="text-sm text-blue-600 bg-blue-50 px-1 rounded">开始/提问</span>
                            <span className="text-sm text-gray-700">，生成回答，回答需要简洁且富有</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-sm text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">
                            AI 优化
                          </button>
                          <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                            添加用户输入
                          </button>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600 mb-2">技能</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">技能未设置</span>
                            <button className="w-6 h-6 border border-gray-300 rounded text-gray-400 hover:text-gray-600 text-lg leading-none">
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="text-sm text-gray-600 mb-2">输出</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-900">回答</span>
                            <span className="text-sm text-gray-500">文本</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 左侧连接点 */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    {/* 右侧连接点 */}
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  {/* 连接线到结束节点 */}
                  <svg className="absolute right-80" width="160" height="4">
                    <path d="M0 2 Q80 2 160 2" stroke="#3B82F6" strokeWidth="2" fill="none"/>
                    <circle cx="160" cy="2" r="3" fill="#3B82F6"/>
                  </svg>

                  {/* 结束节点 */}
                  <div className="relative">
                    <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 w-64">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <span className="text-base font-medium text-gray-900">结束</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">输出</div>
                          <div className="text-sm text-gray-900">回答</div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <span className="text-sm text-blue-600">图文本大模型/回答</span>
                        </div>
                        
                        <div className="text-sm text-gray-500">备注</div>
                      </div>
                    </div>
                    
                    {/* 左侧连接点 */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
