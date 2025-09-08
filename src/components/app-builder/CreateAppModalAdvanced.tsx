'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CreateAppModalProps } from '@/types/app';
import { useAppBuilder } from '@/hooks/useAppBuilder';
import { industries } from '@/lib/appUtils';

function CreateAppModalAdvanced({ isOpen, onClose, onSuccess }: CreateAppModalProps) {
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const {
    currentStep,
    appType,
    buildMethod,
    appName,
    appDescription,
    appIcon,
    industry,
    isLoading,
    errors,
    setAppType,
    setBuildMethod,
    setAppName,
    setAppDescription,
    setAppIcon,
    setIndustry,
    handleNext,
    handleBack,
    handleCreate,
    handleCancel
  } = useAppBuilder();

  if (!isOpen || !mounted) return null;

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAppIcon(file);
    }
  };

  const onCancel = () => {
    handleCancel();
    onClose();
  };

  const onCreate = async () => {
    const appData = await handleCreate();
    if (appData) {
      onSuccess?.(appData);
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <div className="bg-white rounded-lg max-w-5xl w-full h-[80vh] flex">
        {/* 左侧内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 标题 */}
          <div className="px-5 py-3 border-b border-gray-100">
            <h1 className="text-lg font-medium text-gray-900">
              {currentStep === 1 ? '新建应用' : '配置应用'}
            </h1>
          </div>

          {/* 错误提示 */}
          {errors.length > 0 && (
            <div className="px-5 py-2 bg-red-50 border-b border-red-100">
              <div className="text-sm text-red-600">
                {errors.map((error, index) => (
                  <div key={index}>• {error}</div>
                ))}
              </div>
            </div>
          )}

          {/* 内容区域 */}
          <div className="flex-1 px-5 py-4 overflow-y-auto min-h-0">
            {currentStep === 1 ? (
              // 第一步：基础配置
              <div className="space-y-4">
                {/* 应用类型选择 */}
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

                {/* 构建方式选择 */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-2">选择构建方式</h2>
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

                {/* 应用信息填写 */}
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
                          onChange={(e) => setAppName(e.target.value)}
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
                        onChange={(e) => setAppDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="请输入应用功能介绍"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // 第二步：创建进度
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
                      <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-blue-500 animate-pulse' : 'bg-green-500'} flex items-center justify-center`}>
                        {!isLoading && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-xs text-gray-700">
                        {isLoading ? '正在生成应用模板...' : '应用模板生成完成'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-gray-300' : 'bg-green-500'} flex items-center justify-center`}>
                        {!isLoading && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className={`text-xs ${isLoading ? 'text-gray-500' : 'text-gray-700'}`}>
                        {isLoading ? '配置应用功能' : '应用功能配置完成'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 底部按钮 */}
          <div className="px-5 py-3 border-t border-gray-100 flex justify-between">
            <div>
              {currentStep === 2 && !isLoading && (
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
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                取消
              </button>
              
              {currentStep === 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!appName.trim() || isLoading}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  新建
                </button>
              ) : (
                <button
                  onClick={onCreate}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                >
                  <span>{isLoading ? '创建中...' : '完成创建'}</span>
                  {!isLoading && <span className="text-sm">🎉</span>}
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
  );
  
  return createPortal(modalContent, document.body);
}

export default CreateAppModalAdvanced;
