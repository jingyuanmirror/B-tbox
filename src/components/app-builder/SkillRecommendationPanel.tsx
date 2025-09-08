'use client';

import React, { useState, useMemo } from 'react';

// 技能模板定义
interface SkillTemplate {
  skillId: string;
  name: string;
  category: string;
  description: string;
  scenarios: string[];
  tags: string[];
  pluginId: string;
  usageFrequency: number;
  successRate: number;
  promptTemplate: string;
  parameterTemplate: Record<string, string>;
}

// 行业分类的技能数据
const skillDatabase: Record<string, SkillTemplate[]> = {
  '旅游': [
    {
      skillId: 'travel_attraction_query',
      name: '景点查询',
      category: '旅游',
      description: '查询旅游景点信息，包括门票价格、开放时间、交通路线等',
      scenarios: ['用户询问某个景点的详细信息', '用户需要了解景点门票价格', '用户咨询景点开放时间'],
      tags: ['景点', '查询', '旅游信息'],
      pluginId: 'attraction_info_plugin',
      usageFrequency: 85,
      successRate: 92,
      promptTemplate: '当用户询问景点信息时，调用此技能获取详细的景点数据...',
      parameterTemplate: {
        location: '{{用户输入的地点名称}}',
        infoType: '{{信息类型：基本信息|门票价格|开放时间}}'
      }
    },
    {
      skillId: 'travel_hotel_booking',
      name: '酒店预订',
      category: '旅游',
      description: '帮助用户查询和预订酒店，提供价格对比和推荐',
      scenarios: ['用户需要预订酒店', '用户询问酒店价格', '用户需要酒店推荐'],
      tags: ['酒店', '预订', '住宿'],
      pluginId: 'hotel_booking_plugin',
      usageFrequency: 78,
      successRate: 88,
      promptTemplate: '当用户需要酒店相关服务时，调用此技能...',
      parameterTemplate: {
        destination: '{{目的地}}',
        checkIn: '{{入住时间}}',
        checkOut: '{{退房时间}}'
      }
    },
    {
      skillId: 'travel_route_planning',
      name: '路线规划',
      category: '旅游',
      description: '智能规划旅游路线，优化行程安排',
      scenarios: ['用户需要规划旅游路线', '用户询问最佳行程安排', '用户需要交通指导'],
      tags: ['路线', '规划', '导航'],
      pluginId: 'route_planning_plugin',
      usageFrequency: 72,
      successRate: 85,
      promptTemplate: '当用户需要路线规划时，调用此技能...',
      parameterTemplate: {
        startPoint: '{{起点}}',
        endPoint: '{{终点}}',
        travelMode: '{{出行方式}}'
      }
    },
    {
      skillId: 'travel_weather_query',
      name: '天气查询',
      category: '旅游',
      description: '查询目的地天气情况，帮助用户做好出行准备',
      scenarios: ['用户询问目的地天气', '用户需要天气预报', '用户关心出行天气'],
      tags: ['天气', '预报', '出行'],
      pluginId: 'weather_query_plugin',
      usageFrequency: 90,
      successRate: 95,
      promptTemplate: '当用户询问天气时，调用此技能...',
      parameterTemplate: {
        location: '{{地点名称}}',
        dateRange: '{{查询日期范围}}'
      }
    }
  ],
  '电商': [
    {
      skillId: 'ecommerce_product_search',
      name: '商品搜索',
      category: '电商',
      description: '智能搜索商品，提供个性化推荐',
      scenarios: ['用户搜索特定商品', '用户需要商品推荐', '用户比较商品价格'],
      tags: ['商品', '搜索', '推荐'],
      pluginId: 'product_search_plugin',
      usageFrequency: 95,
      successRate: 91,
      promptTemplate: '当用户搜索商品时，调用此技能...',
      parameterTemplate: {
        keyword: '{{搜索关键词}}',
        category: '{{商品分类}}',
        priceRange: '{{价格范围}}'
      }
    },
    {
      skillId: 'ecommerce_order_tracking',
      name: '订单查询',
      category: '电商',
      description: '查询订单状态和物流信息',
      scenarios: ['用户查询订单状态', '用户需要物流信息', '用户关心配送进度'],
      tags: ['订单', '物流', '跟踪'],
      pluginId: 'order_tracking_plugin',
      usageFrequency: 82,
      successRate: 94,
      promptTemplate: '当用户查询订单时，调用此技能...',
      parameterTemplate: {
        orderId: '{{订单号}}',
        phone: '{{手机号}}'
      }
    },
    {
      skillId: 'ecommerce_after_sales',
      name: '售后服务',
      category: '电商',
      description: '处理售后问题，包括退换货、投诉建议等',
      scenarios: ['用户需要退换货', '用户有投诉建议', '用户询问售后政策'],
      tags: ['售后', '退换货', '投诉'],
      pluginId: 'after_sales_plugin',
      usageFrequency: 68,
      successRate: 87,
      promptTemplate: '当用户需要售后服务时，调用此技能...',
      parameterTemplate: {
        orderId: '{{订单号}}',
        issueType: '{{问题类型}}',
        description: '{{问题描述}}'
      }
    }
  ],
  '教育': [
    {
      skillId: 'education_course_query',
      name: '课程查询',
      category: '教育',
      description: '查询课程信息、时间安排和教师资料',
      scenarios: ['学生查询课程表', '学生了解课程内容', '学生询问教师信息'],
      tags: ['课程', '查询', '教育'],
      pluginId: 'course_query_plugin',
      usageFrequency: 88,
      successRate: 93,
      promptTemplate: '当学生查询课程时，调用此技能...',
      parameterTemplate: {
        courseId: '{{课程编号}}',
        semester: '{{学期}}',
        studentId: '{{学号}}'
      }
    },
    {
      skillId: 'education_grade_query',
      name: '成绩查询',
      category: '教育',
      description: '查询学生成绩和学业进度',
      scenarios: ['学生查询考试成绩', '学生了解GPA', '家长查询孩子成绩'],
      tags: ['成绩', '查询', '学业'],
      pluginId: 'grade_query_plugin',
      usageFrequency: 75,
      successRate: 96,
      promptTemplate: '当查询成绩时，调用此技能...',
      parameterTemplate: {
        studentId: '{{学号}}',
        courseId: '{{课程编号}}',
        examType: '{{考试类型}}'
      }
    }
  ],
  '客服': [
    {
      skillId: 'customer_service_ticket',
      name: '工单创建',
      category: '客服',
      description: '创建和管理客户服务工单',
      scenarios: ['用户提交问题工单', '用户跟进工单状态', '用户需要技术支持'],
      tags: ['工单', '客服', '支持'],
      pluginId: 'ticket_system_plugin',
      usageFrequency: 84,
      successRate: 89,
      promptTemplate: '当用户需要创建工单时，调用此技能...',
      parameterTemplate: {
        title: '{{问题标题}}',
        category: '{{问题分类}}',
        description: '{{详细描述}}'
      }
    },
    {
      skillId: 'customer_service_faq',
      name: '知识库检索',
      category: '客服',
      description: '智能检索知识库，提供准确答案',
      scenarios: ['用户询问常见问题', '用户需要产品说明', '用户寻求解决方案'],
      tags: ['知识库', '检索', 'FAQ'],
      pluginId: 'knowledge_base_plugin',
      usageFrequency: 92,
      successRate: 94,
      promptTemplate: '当用户询问问题时，先检索知识库...',
      parameterTemplate: {
        query: '{{用户问题}}',
        category: '{{问题分类}}'
      }
    }
  ]
};

interface SkillRecommendationPanelProps {
  currentIndustry: string;
  existingSkills: string[];
  onSkillDragStart: (skill: SkillTemplate) => void;
  onSkillSelect: (skill: SkillTemplate) => void;
}

export default function SkillRecommendationPanel({
  currentIndustry,
  existingSkills,
  onSkillDragStart,
  onSkillSelect: _onSkillSelect
}: SkillRecommendationPanelProps) {
  const [selectedIndustry, setSelectedIndustry] = useState(currentIndustry || '旅游');
  const [searchTerm, setSearchTerm] = useState('');

  // 获取推荐的技能列表
  const recommendedSkills = useMemo(() => {
    let skills = skillDatabase[selectedIndustry] || [];
    
    // 搜索过滤
    if (searchTerm) {
      skills = skills.filter(skill => 
        skill.name.includes(searchTerm) ||
        skill.description.includes(searchTerm) ||
        skill.tags.some(tag => tag.includes(searchTerm))
      );
    }
    
    // 按使用频率排序
    return skills.sort((a, b) => b.usageFrequency - a.usageFrequency);
  }, [selectedIndustry, searchTerm]);

  const industries = Object.keys(skillDatabase);

  const handleDragStart = (e: React.DragEvent, skill: SkillTemplate) => {
    e.dataTransfer.setData('application/json', JSON.stringify(skill));
    onSkillDragStart(skill);
  };

  const isSkillAdded = (skillId: string) => {
    return existingSkills.includes(skillId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">技能推荐</h2>
        
        {/* 搜索框 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="搜索技能..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* 行业选择标签 */}
        <div className="flex flex-wrap gap-2">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedIndustry === industry
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* 技能列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {recommendedSkills.map(skill => (
            <div
              key={skill.skillId}
              draggable={!isSkillAdded(skill.skillId)}
              onDragStart={(e) => !isSkillAdded(skill.skillId) && handleDragStart(e, skill)}
              className={`bg-white border-2 rounded-lg p-3 transition-all cursor-grab active:cursor-grabbing ${
                isSkillAdded(skill.skillId)
                  ? 'border-gray-200 opacity-50'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{skill.name}</h4>
                    {isSkillAdded(skill.skillId) && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded">
                        已添加
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{skill.description}</p>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {skill.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* 统计信息 */}
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      使用率 {skill.usageFrequency}%
                    </span>
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      成功率 {skill.successRate}%
                    </span>
                  </div>
                </div>
                
                {/* 拖拽手柄 */}
                {!isSkillAdded(skill.skillId) && (
                  <div className="flex flex-col space-y-0.5 opacity-40 group-hover:opacity-60">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* 使用场景 */}
              <div className="border-t border-gray-100 pt-2">
                <p className="text-xs text-gray-600 mb-1">使用场景：</p>
                <ul className="text-xs text-gray-500 space-y-0.5">
                  {skill.scenarios.slice(0, 2).map((scenario, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-1">•</span>
                      <span>{scenario}</span>
                    </li>
                  ))}
                  {skill.scenarios.length > 2 && (
                    <li className="text-gray-400">...</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {recommendedSkills.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">暂无匹配的技能</p>
            <p className="text-xs text-gray-400 mt-1">试试调整搜索条件或选择其他行业</p>
          </div>
        )}
      </div>
    </div>
  );
}

export type { SkillTemplate };