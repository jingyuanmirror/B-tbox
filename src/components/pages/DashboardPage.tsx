'use client';

import React from 'react';
import { SmartStatsOverview } from './dashboard/SmartStatsOverview';
import { PureNewUserGuide } from './dashboard/PureNewUserGuide';
import { MarketTrends } from './dashboard/MarketTrends';
import { RecentOperations } from './dashboard/RecentOperations';

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
  
  // 专家用户：15+个智能体或高使用率
  if (agentCount >= 15 || usageLevel === 'high') {
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
            
            {/* 市场趋势 */}
            <MarketTrends userType={userType} userData={userData} />
          </div>

          {/* 右侧列 */}
          <div className="space-y-8">
            {/* 智能消息中心 */}
            <div className="text-center p-8 text-gray-500">
              消息中心正在维护中...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
