'use client';

import React, { useState, useRef } from 'react';
import AgentOrchestrationPage from './AgentOrchestrationPage';

interface CreateAppModalSimpleProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateAppModalSimple({ isOpen, onClose }: CreateAppModalSimpleProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showOrchestration, setShowOrchestration] = useState(false);
  const [appType, setAppType] = useState<'dialog' | 'interactive'>('dialog');
  const [buildMethod, setBuildMethod] = useState<'prompt' | 'function' | 'workflow'>('prompt');
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [appIcon, setAppIcon] = useState<File | null>(null);
  const [industry, setIndustry] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const industries = [
    '科技互联网', '电商零售', '教育培训', '医疗健康', '金融投资', 
    '旅游出行', '餐饮服务', '房产建筑', '制造业', '其他'
  ];

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAppIcon(file);
    }
  };

  const handleCancel = () => {
    // 重置所有状态
    setCurrentStep(1);
    setShowOrchestration(false);
    setAppType('dialog');
    setBuildMethod('prompt');
    setAppName('');
    setAppDescription('');
    setAppIcon(null);
    setIndustry('');
    onClose();
  };

  const handleOrchestrationClose = () => {
    setShowOrchestration(false);
    handleCancel();
  };

    const handleNext = () => {
    console.log('=== handleNext 被调用 ===');
    console.log('点击下一步，当前步骤:', currentStep);
    console.log('构建方法:', buildMethod);
    console.log('构建方法类型:', typeof buildMethod);
    console.log('buildMethod === "function":', buildMethod === 'function');
    console.log('当前 showOrchestration 状态:', showOrchestration);
    
    if (currentStep === 1) {
      if (buildMethod === 'function') {
        console.log('✅ 条件匹配：进入智能体编排页面');
        console.log('即将设置 showOrchestration 为 true');
        setShowOrchestration(true);
        console.log('setShowOrchestration(true) 已调用');
        return;
      } else {
        console.log('❌ 条件不匹配，buildMethod 不是 function，值为:', buildMethod);
      }
      
      console.log('进入第二步配置');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // 第二步，创建应用
      console.log('第二步：调用 handleCreate');
      handleCreate();
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleCreate = () => {
    const appData = {
      name: appName,
      type: appType,
      buildMethod,
      description: appDescription,
      icon: appIcon,
      industry,
      createdAt: new Date().toISOString()
    };

    console.log('创建应用:', appData);
    alert(`应用 "${appName}" 创建成功！`);
    handleCancel();
  };

  // 如果模态框没有打开，不渲染任何内容
  if (!isOpen) return null;

  return (
    <>
      {/* 创建应用模态框 - 只在不显示编排页面时显示 */}
      {!showOrchestration && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full h-[80vh] flex">
        {/* 左侧内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 标题 */}
          <div className="px-5 py-3 border-b border-gray-100">
            <h1 className="text-lg font-medium text-gray-900">
              {currentStep === 1 ? '新建应用' : '配置应用'}
            </h1>
          </div>

          {/* 内容区域 - 可滚动，确保按钮区域可见 */}
          <div className="flex-1 px-5 py-4 overflow-y-auto min-h-0">
            {currentStep === 1 ? (
              // 第一步：基础配置
              <div className="space-y-4">
                {/* 第一部分：应用类型选择 */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-2">想创建怎样的应用</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => setAppType('dialog')}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        appType === 'dialog'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-blue-500 rounded"></div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1 text-sm">界面对话式应用</h3>
                          <p className="text-sm text-gray-600 leading-tight">
                            能和你聊天、理解意图帮你办事的应用
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setAppType('interactive')}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        appType === 'interactive'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-gray-400 rounded"></div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1 text-sm">界面交互式应用</h3>
                          <p className="text-sm text-gray-600 leading-tight">
                            能在界面里用按钮、表单等方式互动
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 第二部分：构建方式选择 */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-2">想创建怎样的应用</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      onClick={() => setBuildMethod('prompt')}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        buildMethod === 'prompt'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-cyan-100 rounded-md flex items-center justify-center">
                          <span className="text-cyan-600 text-sm">✏️</span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">写prompt创建</h3>
                      </div>
                      <p className="text-sm text-gray-600">通过prompt快速构建应用</p>
                    </div>

                    <div
                      onClick={() => setBuildMethod('function')}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        buildMethod === 'function'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🔧</span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">功能编排创建</h3>
                      </div>
                      <p className="text-sm text-gray-600">使用模版，定制化程度低</p>
                    </div>

                    <div
                      onClick={() => setBuildMethod('workflow')}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        buildMethod === 'workflow'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                          <span className="text-purple-600 text-sm">⚡</span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">工作流创建</h3>
                      </div>
                      <p className="text-sm text-gray-600">工作流+界面，灵活定制</p>
                    </div>
                  </div>
                </div>

                {/* 第三部分：应用信息填写 */}
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-gray-900 mb-3">填写应用信息</h2>
                  <div className="space-y-4">
                    {/* 应用名称和应用图标在同一行 */}
                    <div className="flex items-end space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-900">应用名称</label>
                          <span className="text-sm text-gray-500">{appName.length}/10</span>
                        </div>
                        <input
                          type="text"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value.slice(0, 10))}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          placeholder="请输入应用名称"
                        />
                      </div>
                      {/* 应用图标 */}
                      <div className="flex-shrink-0">
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                        >
                          {appIcon ? (
                            <img 
                              src={URL.createObjectURL(appIcon)} 
                              alt="App icon" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <div className="w-8 h-8 bg-cyan-400 rounded-lg mx-auto flex items-center justify-center">
                                <span className="text-white text-lg">🤖</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleIconUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* 所属行业 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">所属行业</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">请选择所属行业</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    {/* 应用功能介绍 */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-900">应用功能介绍（选填）</label>
                        <span className="text-sm text-gray-500">{appDescription.length}/200</span>
                      </div>
                      <textarea
                        value={appDescription}
                        onChange={(e) => setAppDescription(e.target.value.slice(0, 200))}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="请输入应用功能介绍"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // 第二步：详细配置
              <div className="space-y-2 flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">🚀</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">应用创建中...</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    正在为您配置 "{appName}" 应用
                  </p>
                  
                  <div className="max-w-sm mx-auto space-y-2 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-xs text-gray-700">基础信息配置完成</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-700">正在生成应用模板...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="text-xs text-gray-500">配置应用功能</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 底部按钮 */}
          <div className="px-5 py-3 border-t border-gray-100 flex justify-between">
            <div>
              {currentStep === 2 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              
              {currentStep === 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!appName.trim()}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  新建
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <span>完成创建</span>
                  <span className="text-sm">🎉</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 右侧预览区域 */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
          <div className="h-full flex flex-col">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center text-sm">
              <span className="mr-2">📱</span>
              预览效果
            </h3>
            
            {/* 手机框架容器 - 居中显示 */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-black rounded-[1.2rem] p-1" style={{ width: '224px', height: '400px' }}>
              <div className="bg-white rounded-[1rem] h-full flex flex-col overflow-hidden">
                {/* 状态栏 */}
                <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-2 text-white text-xs">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-1 bg-white rounded-sm"></div>
                    <div className="w-3 h-1.5 border border-white rounded-sm">
                      <div className="w-1.5 h-0.5 bg-white rounded-sm m-0.5"></div>
                    </div>
                  </div>
                </div>
                
                {/* 应用界面 */}
                <div className="flex-1 p-3">
                  {/* 应用头部 */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center">
                      {appIcon ? (
                        <img 
                          src={URL.createObjectURL(appIcon)} 
                          alt="App icon" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-sm">🤖</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-xs">
                        {appName || '应用名称'}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>{appType === 'dialog' ? '对话式应用' : '交互式应用'}</span>
                        {industry && (
                          <>
                            <span>•</span>
                            <span>{industry}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 应用描述卡片 */}
                  <div className="bg-gray-50 rounded-lg p-2 mb-2">
                    <h5 className="font-medium text-xs text-gray-900 mb-1">应用介绍</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {appDescription || '这里会显示您的应用功能介绍...'}
                    </p>
                  </div>

                  {/* 功能预览 */}
                  <div className="space-y-1.5">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-xs font-medium text-blue-900">
                          {buildMethod === 'prompt' && 'Prompt驱动'}
                          {buildMethod === 'function' && '功能编排'}
                          {buildMethod === 'workflow' && '工作流引擎'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 底部操作按钮 */}
                  <div className="mt-3">
                    <button className="w-full bg-blue-500 text-white text-xs font-medium py-2 rounded-lg">
                      开始使用
                    </button>
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

      {/* 智能体编排页面 */}
      <AgentOrchestrationPage
        isOpen={showOrchestration}
        onClose={handleOrchestrationClose}
        appName={appName}
      />
    </>
  );
}

export default CreateAppModalSimple;
