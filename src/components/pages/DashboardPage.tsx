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
  // 需要满足多个条件组合，而不是单一条件
  const isvScore = [
    teamMemberCount && teamMemberCount >= 5, // 团队规模大
    multiIndustryProjects === true, // 跨行业项目
    clientCount && clientCount >= 3, // 多客户
    agentCount >= 5 && usageLevel === 'high' && frequentCostChecking // 高频使用+成本敏感
  ].filter(Boolean).length;
  
  if (isvScore >= 2) {
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
    frequentCostChecking: false, // 改为false，避免触发ISV判断
    clientCount: 1
  },
  'expert': {
    agentCount: 15,
    registrationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120天前注册
    lastLoginDate: new Date(Date.now() - 10 * 60 * 1000), // 10分钟前登录
    usageLevel: 'high' as const,
    teamMemberCount: 3,
    multiIndustryProjects: false,
    frequentCostChecking: true, // 专家用户关心成本但不是ISV
    clientCount: 1 // 减少客户数，避免触发ISV判断
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
        <div className="max-w-7xl mx-auto p-6">
          {/* 头部区域 - 包含切换器 */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">欢迎使用百宝箱</h1>
              <p className="text-gray-600 dark:text-gray-400">开始您的AI智能体之旅</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={currentUserType}
                onChange={(e) => setCurrentUserType(e.target.value as UserType)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              >
                {(Object.keys(userTypeLabels) as UserType[]).map((type) => (
                  <option key={type} value={type}>
                    {userTypeLabels[type]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 页面标题和欢迎信息 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">智能仪表盘</h1>
              <p className="text-gray-600 dark:text-gray-400">实时数据，助力决策</p>
            </div>
            <div className="flex items-center gap-3">
              {/* 用户类型切换器 - 集成到右上角 */}
              <div className="relative">
                <select
                  value={currentUserType}
                  onChange={(e) => setCurrentUserType(e.target.value as UserType)}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:bg-white dark:hover:bg-gray-800"
                >
                  {(Object.keys(userTypeLabels) as UserType[]).map((type) => (
                    <option key={type} value={type}>
                      {userTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  当前: {userTypeLabels[userType]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 智能数据概览 */}
        <div className="mb-10">
          <SmartStatsOverview userType={userType} userData={userData} />
        </div>

        {/* 主要内容区域 - 改进布局 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 主要内容区域 - 占据更多空间 */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* 分层功能引导 - 根据用户类型显示不同指导 */}
            {userType === 'newbie' && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <SmartLearningGuidance userLevel="beginner" />
              </div>
            )}
            {userType === 'advanced' && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <SmartLearningGuidance userLevel="intermediate" />
              </div>
            )}
            {userType === 'expert' && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <SmartLearningGuidance userLevel="expert" />
              </div>
            )}
            {userType === 'isv' && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">ISV服务商专业工具套件</h3>
                    <p className="text-gray-600 dark:text-gray-300">商业变现加速，客户交付优化</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 客户交付加速 */}
                  <div className="bg-white/80 dark:bg-gray-700/50 border border-gray-200/80 dark:border-gray-600/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">🚀</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">客户交付加速</h4>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>🤖 项目管理AI助手：自动进度跟踪和风险预警</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>标准化交付模板库：覆盖15+行业解决方案</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>客户演示工具箱：快速POC搭建，5分钟打动客户</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>质量检查自动化：确保交付标准一致性</span>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      立即体验
                    </button>
                  </div>
                  
                  {/* 成本控制优化 */}
                  <div className="bg-white/80 dark:bg-gray-700/50 border border-gray-200/80 dark:border-gray-600/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">💡</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">成本控制优化</h4>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>🤖 成本智能分析：项目盈利能力实时监控</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>批量管理工具：降低多项目运维成本60%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>资源预测模型：精准报价，避免成本超支</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>客户用量分析：优化定价策略和套餐设计</span>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-xl text-sm font-medium hover:from-orange-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      查看分析
                    </button>
                  </div>
                  
                  {/* 市场拓展支持 */}
                  <div className="bg-white/80 dark:bg-gray-700/50 border border-gray-200/80 dark:border-gray-600/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">📊</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">市场拓展支持</h4>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>竞品分析报告：洞察市场机会和定位差异</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>行业趋势预测：提前布局下一个风口</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>营销素材生成：AI自动生成案例包装内容</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>客户成功故事：量化效果展示和口碑传播</span>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl text-sm font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      获取报告
                    </button>
                  </div>
                  
                  {/* AI商业智能决策 */}
                  <div className="bg-white/80 dark:bg-gray-700/50 border border-gray-200/80 dark:border-gray-600/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">🤖</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI商业智能决策</h4>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>客户生命周期价值分析</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>市场机会评估和优先级排序</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>团队效率优化建议</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>业务增长策略个性化推荐</span>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      AI 分析
                    </button>
                  </div>
                </div>
                
                {/* ISV专属价值点 */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    ISV专属价值点
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/40 rounded-xl">
                      <div className="text-green-600 font-bold text-2xl mb-1">20%+</div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">利润率提升</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/40 rounded-xl">
                      <div className="text-blue-600 font-bold text-2xl mb-1">50%</div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">交付时间缩短</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/40 rounded-xl">
                      <div className="text-purple-600 font-bold text-2xl mb-1">30%</div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">客户流失率降低</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/40 rounded-xl">
                      <div className="text-orange-600 font-bold text-2xl mb-1">3倍</div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">业务规模增长</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 市场趋势 */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <MarketTrends userType={userType} userData={userData} />
            </div>
          </div>

          {/* 右侧边栏 - 改进设计 */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* 操作记录 */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <RecentOperations userType={userType} userData={userData} />
            </div>
            
            {/* 智能消息中心 - 改进样式 */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🔔</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">智能消息中心</h3>
                <div className="ml-auto">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                    3未读
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50/80 to-indigo-50/80 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl border-l-4 border-purple-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                      <span className="text-base">🤖</span>
                      AI智能分析：费用优化建议
                    </h4>
                    <span className="text-xs text-gray-500 bg-white/60 dark:bg-gray-700/60 px-2 py-1 rounded-lg">2小时前</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">基于您的使用模式分析，Token使用效率可提升20%，建议优化对话流程</p>
                  <button className="text-xs bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                    查看详情
                  </button>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl border-l-4 border-orange-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2">
                      <span className="text-base">✨</span>
                      新手推荐：智能模板助手
                    </h4>
                    <span className="text-xs text-gray-500 bg-white/60 dark:bg-gray-700/60 px-2 py-1 rounded-lg">1小时前</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">为您推荐客服助手模板，5分钟快速上手，满意度95%+</p>
                  <button className="text-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                    立即体验
                  </button>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border-l-4 border-blue-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      <span className="text-base">🔧</span>
                      系统更新通知
                    </h4>
                    <span className="text-xs text-gray-500 bg-white/60 dark:bg-gray-700/60 px-2 py-1 rounded-lg">4小时前</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">平台新增智能插件市场，支持更多AI能力集成</p>
                  <button className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                    了解详情
                  </button>
                </div>
              </div>
              
              <div className="text-center mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200">
                  查看全部消息
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
