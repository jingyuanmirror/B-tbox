'use client';

import React, { useState } from 'react';
import { SmartStatsOverview } from './dashboard/SmartStatsOverview';
import { PureNewUserGuide } from './dashboard/PureNewUserGuide';
import { MarketTrends } from './dashboard/MarketTrends';
import { RecentOperations } from './dashboard/RecentOperations';
import { SmartLearningGuidance } from './dashboard/SmartLearningGuidance';
// import { SmartMessageCenter } from './dashboard/SmartMessageCenter';

export type UserType = 'pure-new' | 'newbie' | 'advanced' | 'expert' | 'isv';

interface UserData {
  agentCount: number;
  registrationDate: Date;
  lastLoginDate: Date;
  usageLevel: 'low' | 'medium' | 'high';
  teamMemberCount?: number;
  multiIndustryProjects?: boolean;
  frequentCostChecking?: boolean;
  clientCount?: number;
}

// 用户类型判断函数
const getUserType = (userData: UserData): UserType => {
  const { agentCount, registrationDate, lastLoginDate, usageLevel, teamMemberCount, multiIndustryProjects, frequentCostChecking, clientCount } = userData;
  
  // 纯新用户：0个智能体
  if (agentCount === 0) {
    return 'pure-new';
  }
  
  // ISV服务商识别：多客户项目管理、批量部署需求、商业化变现导向
  // 识别特征：多个智能体跨不同行业、团队成员较多、频繁查看费用数据
  if (
    (teamMemberCount && teamMemberCount >= 3) ||
    multiIndustryProjects === true ||
    frequentCostChecking === true ||
    (clientCount && clientCount >= 2) ||
    (agentCount >= 5 && usageLevel === 'high')
  ) {
    return 'isv';
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

// Mock用户数据 - 为不同用户类型创建不同的数据配置
const mockUserConfigs = {
  'pure-new': {
    agentCount: 0,
    registrationDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前注册
    lastLoginDate: new Date(),
    usageLevel: 'low' as const,
    teamMemberCount: 1,
    multiIndustryProjects: false,
    frequentCostChecking: false,
    clientCount: 0
  },
  'newbie': {
    agentCount: 2,
    registrationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15天前注册
    lastLoginDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1小时前登录
    usageLevel: 'low' as const,
    teamMemberCount: 1,
    multiIndustryProjects: false,
    frequentCostChecking: false,
    clientCount: 0
  },
  'advanced': {
    agentCount: 6,
    registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60天前注册
    lastLoginDate: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前登录
    usageLevel: 'medium' as const,
    teamMemberCount: 2,
    multiIndustryProjects: false,
    frequentCostChecking: true,
    clientCount: 1
  },
  'expert': {
    agentCount: 15,
    registrationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120天前注册
    lastLoginDate: new Date(Date.now() - 10 * 60 * 1000), // 10分钟前登录
    usageLevel: 'high' as const,
    teamMemberCount: 3,
    multiIndustryProjects: false,
    frequentCostChecking: true,
    clientCount: 2
  },
  'isv': {
    agentCount: 8,
    registrationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90天前注册
    lastLoginDate: new Date(Date.now() - 5 * 60 * 1000), // 5分钟前登录
    usageLevel: 'high' as const,
    teamMemberCount: 5,
    multiIndustryProjects: true,
    frequentCostChecking: true,
    clientCount: 6
  }
};

export function DashboardPage() {
  const [currentUserType, setCurrentUserType] = useState<UserType>('isv');
  const userData = mockUserConfigs[currentUserType];
  const userType = getUserType(userData);
  
  // 用户类型标签配置
  const userTypeLabels = {
    'pure-new': '纯新用户',
    'newbie': '新手用户', 
    'advanced': '进阶用户',
    'expert': '专家用户',
    'isv': 'ISV服务商'
  };
  
  // 纯新用户显示特殊布局
  if (userType === 'pure-new') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* 用户类型切换器 */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
            <div className="text-xs text-gray-500 mb-2">用户类型预览</div>
            <div className="flex gap-1">
              {(Object.keys(userTypeLabels) as UserType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setCurrentUserType(type)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    currentUserType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {userTypeLabels[type]}
                </button>
              ))}
            </div>
          </div>
        </div>
        
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
      {/* 用户类型切换器 */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="text-xs text-gray-500 mb-2">用户类型预览</div>
          <div className="flex gap-1">
            {(Object.keys(userTypeLabels) as UserType[]).map((type) => (
              <button
                key={type}
                onClick={() => setCurrentUserType(type)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  currentUserType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {userTypeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      </div>
      
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
            {userType === 'isv' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">💼</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ISV服务商专业工具套件</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">商业变现加速，客户交付优化</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 客户交付加速 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🚀</span>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">客户交付加速</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>🤖 项目管理AI助手：自动进度跟踪和风险预警</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>标准化交付模板库：覆盖15+行业解决方案</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>客户演示工具箱：快速POC搭建，5分钟打动客户</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>质量检查自动化：确保交付标准一致性</span>
                      </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      立即体验
                    </button>
                  </div>
                  
                  {/* 成本控制优化 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">💡</span>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">成本控制优化</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span>🤖 成本智能分析：项目盈利能力实时监控</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span>批量管理工具：降低多项目运维成本60%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span>资源预测模型：精准报价，避免成本超支</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span>客户用量分析：优化定价策略和套餐设计</span>
                      </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors">
                      查看分析
                    </button>
                  </div>
                  
                  {/* 市场拓展支持 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">📊</span>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">市场拓展支持</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>竞品分析报告：洞察市场机会和定位差异</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>行业趋势预测：提前布局下一个风口</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>营销素材生成：AI自动生成案例包装内容</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>客户成功故事：量化效果展示和口碑传播</span>
                      </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                      获取报告
                    </button>
                  </div>
                  
                  {/* AI商业智能决策 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🤖</span>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">AI商业智能决策</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>客户生命周期价值分析</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>市场机会评估和优先级排序</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>团队效率优化建议</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>业务增长策略个性化推荐</span>
                      </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                      AI 分析
                    </button>
                  </div>
                </div>
                
                {/* ISV专属价值点 */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">🎯 ISV专属价值点</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-bold text-lg">20%+</div>
                      <div className="text-gray-600 dark:text-gray-300">利润率提升</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-600 font-bold text-lg">50%</div>
                      <div className="text-gray-600 dark:text-gray-300">交付时间缩短</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-600 font-bold text-lg">30%</div>
                      <div className="text-gray-600 dark:text-gray-300">客户流失率降低</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-600 font-bold text-lg">3倍</div>
                      <div className="text-gray-600 dark:text-gray-300">业务规模增长</div>
                    </div>
                  </div>
                </div>
              </div>
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
