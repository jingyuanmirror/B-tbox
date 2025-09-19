'use client';

import React from 'react';
import { SmartStatsOverview } from './dashboard/SmartStatsOverview';
import { PureNewUserGuide } from './dashboard/PureNewUserGuide';
import { MarketTrends } from './dashboard/MarketTrends';
import { RecentOperations } from './dashboard/RecentOperations';
import { SmartLearningGuidance } from './dashboard/SmartLearningGuidance';
// import { SmartMessageCenter } from './dashboard/SmartMessageCenter';

export type UserType = 'pure-new' | 'newbie' | 'advanced' | 'expert';

interface UserData {
  agentCount: number;
  registrationDate: Date;
  lastLoginDate: Date;
  usageLevel: 'low' | 'medium' | 'high';
}

// 用户类型判断函数
const getUserType = (userData: UserData): UserType => {
  const { agentCount, registrationDate, lastLoginDate, usageLevel } = userData;
  
  // 纯新用户：0个智能体
  if (agentCount === 0) {
    return 'pure-new';
  }
  
  // 新手用户：1-3个智能体，注册不超过30天
  const daysSinceRegistration = Math.floor(
    (Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (agentCount <= 3 && daysSinceRegistration <= 30) {
    return 'newbie';
  }
  
  // 专家用户：10+个智能体或高使用率
  if (agentCount >= 10 || usageLevel === 'high') {
    return 'expert';
  }
  
  // 进阶用户：其他情况
  return 'advanced';
};

// Mock用户数据
const mockUserData: UserData = {
  agentCount: 5,
  registrationDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45天前注册
  lastLoginDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前登录
  usageLevel: 'medium'
};

export function DashboardPage() {
  const userData = mockUserData;
  const userType = getUserType(userData);
  
  // 纯新用户显示特殊布局
  if (userType === 'pure-new') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6">
          {/* 纯新用户引导页面 */}
          <PureNewUserGuide 
            onAgentCreated={() => {
              // 智能体创建后的回调
              console.log('Agent created');
            }} 
            onOpenAIAssistant={() => {
              // 打开AI助手的回调
              console.log('Open AI Assistant');
            }} 
          />
          
          {/* 市场趋势 - 帮助新用户了解行业 */}
          <div className="mt-8">
            <MarketTrends userType={userType} userData={userData} />
          </div>
        </div>
      </div>
    );
  }

  // 其他用户类型显示完整仪表盘
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* 智能数据概览 */}
        <div className="mb-8">
          <SmartStatsOverview userType={userType} userData={userData} />
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧列 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 最近操作记录 */}
            <RecentOperations userType={userType} userData={userData} />
            
            {/* 分层功能引导 - 根据用户类型显示不同指导 */}
            {userType === 'newbie' && (
              <SmartLearningGuidance 
                userLevel="beginner" 
              />
            )}
            {userType === 'advanced' && (
              <SmartLearningGuidance 
                userLevel="intermediate" 
              />
            )}
            {userType === 'expert' && (
              <SmartLearningGuidance 
                userLevel="expert" 
              />
            )}
            
            {/* 市场趋势 */}
            <MarketTrends userType={userType} userData={userData} />
          </div>

          {/* 右侧列 */}
          <div className="space-y-8">
            {/* 智能消息中心 - 功能正常，SmartMessageCenter组件待修复 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 text-blue-600">🔔</div>
                <h3 className="text-lg font-semibold">智能消息中心</h3>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3未读</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-purple-600">🤖 AI智能分析：费用优化建议</h4>
                    <span className="text-xs text-gray-500">2小时前</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">基于您的使用模式分析，Token使用效率可提升20%，建议优化对话流程</p>
                  <button className="text-xs bg-purple-100 hover:bg-purple-200 px-2 py-1 rounded mt-2">查看详情</button>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-orange-600">✨ 新手推荐：智能模板助手</h4>
                    <span className="text-xs text-gray-500">1小时前</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">为您推荐客服助手模板，5分钟快速上手，满意度95%+</p>
                  <button className="text-xs bg-orange-100 hover:bg-orange-200 px-2 py-1 rounded mt-2">立即体验</button>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-blue-600">🔧 系统更新通知</h4>
                    <span className="text-xs text-gray-500">4小时前</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">平台新增智能插件市场，支持更多AI能力集成</p>
                  <button className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded mt-2">了解详情</button>
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="text-xs text-gray-500 hover:text-gray-700">查看全部消息</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
