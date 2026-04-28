import { ServiceCategory } from '@/types/service';
import { BuildMethod } from '@/types/app';
import { RequirementAnalysis, BuildRecommendation, MatchedTool } from '@/types/assistant';

// 需求关键词到类别的映射
const CATEGORY_KEYWORDS: Record<ServiceCategory, string[]> = {
  [ServiceCategory.SEARCH]: ['搜索', '查询', '检索', '查找', '信息获取', '问答', '知识库'],
  [ServiceCategory.VIDEO]: ['视频', '直播', '录制', '转码', '剪辑', '短视频'],
  [ServiceCategory.IMAGE]: ['图片', '图像', '视觉', '识别', '生成图', '设计', 'OCR'],
  [ServiceCategory.NEWS]: ['新闻', '资讯', '内容', '文章', '写作', '编辑', '审核', '发布'],
  [ServiceCategory.DATA]: ['数据', '分析', '统计', '报表', '可视化', 'BI', '洞察'],
  [ServiceCategory.COMMUNICATION]: ['客服', '沟通', '通知', '消息', '邮件', '推送', '对话', '回复', '咨询'],
  [ServiceCategory.TOOLS]: ['工具', '处理', '转换', '计算', '自动化', '流程', '效率', '审批'],
};

// 复杂度判断关键词
const COMPLEXITY_HIGH_KEYWORDS = ['多步', '复杂', '流程', '审批', '条件', '分支', '编排', '多轮', '链式', '自动化流程', '工作流'];
const COMPLEXITY_MEDIUM_KEYWORDS = ['多个', '组合', '集成', '联动', '配合', '同时', '协调'];

// 分析用户需求
export function analyzeRequirement(input: string): Partial<RequirementAnalysis> {
  const features = extractFeatures(input);
  const category = detectCategory(input);
  const complexity = assessComplexity(input, features);
  const completeness = assessCompleteness(input, features, category);

  return {
    rawInput: input,
    category,
    features,
    complexity,
    completeness,
  };
}

// 基于累积需求重新计算完整度
export function reassessCompleteness(requirement: RequirementAnalysis): number {
  let score = 0;

  // 原始输入长度
  if (requirement.rawInput.length > 5) score += 15;
  if (requirement.rawInput.length > 15) score += 10;
  if (requirement.rawInput.length > 30) score += 5;

  // 功能点
  if (requirement.features.length > 0) score += 20;
  if (requirement.features.length > 1) score += 10;
  if (requirement.features.length > 3) score += 5;

  // 类别
  if (requirement.category) score += 15;

  // 澄清轮次（越多越完整）
  if (requirement.clarificationHistory.length > 0) score += 10;
  if (requirement.clarificationHistory.length > 1) score += 5;

  // 关键词
  const allInput = requirement.rawInput + ' ' + requirement.clarificationHistory.map(h => h.answer).join(' ');
  if (/用户|客户|场景|目标|面向/.test(allInput)) score += 5;
  if (/自动|智能|需要|功能|支持/.test(allInput)) score += 5;

  return Math.min(100, score);
}

// 提取功能点
function extractFeatures(input: string): string[] {
  const featurePatterns = [
    /(?:需要|能够|可以|支持|提供|实现|完成|处理|自动|智能)([^，。！？、\s]{2,10})/g,
    /(?:帮我|我想|我要|做一个|创建一个|构建一个)([^，。！？、\s]{2,15})/g,
  ];

  const features: string[] = [];
  for (const pattern of featurePatterns) {
    let match;
    while ((match = pattern.exec(input)) !== null) {
      const feature = match[1].trim();
      if (feature && !features.includes(feature)) {
        features.push(feature);
      }
    }
  }

  if (features.length === 0) {
    features.push(input.slice(0, 20));
  }

  return features;
}

// 检测需求类别
function detectCategory(input: string): ServiceCategory | null {
  const scores: Record<string, number> = {};

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    scores[category] = 0;
    for (const keyword of keywords) {
      if (input.includes(keyword)) {
        scores[category] += 1;
      }
    }
  }

  const maxCategory = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return maxCategory && maxCategory[1] > 0 ? (maxCategory[0] as ServiceCategory) : null;
}

// 评估复杂度
function assessComplexity(input: string, features: string[]): 'low' | 'medium' | 'high' {
  let score = 0;

  if (features.length > 5) score += 2;
  else if (features.length > 2) score += 1;

  for (const keyword of COMPLEXITY_HIGH_KEYWORDS) {
    if (input.includes(keyword)) score += 2;
  }
  for (const keyword of COMPLEXITY_MEDIUM_KEYWORDS) {
    if (input.includes(keyword)) score += 1;
  }

  if (score >= 4) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

// 评估完整度 — 更宽松，确保短输入也能推进
function assessCompleteness(input: string, features: string[], category: ServiceCategory | null): number {
  let score = 0;

  if (input.length > 5) score += 15;
  if (input.length > 15) score += 10;
  if (input.length > 30) score += 5;

  if (features.length > 0) score += 20;
  if (features.length > 1) score += 10;
  if (features.length > 3) score += 5;

  if (category) score += 15;

  if (/用户|客户|场景|目标|面向/.test(input)) score += 5;
  if (/自动|智能|需要|功能|支持/.test(input)) score += 5;
  if (/回复|处理|生成|分析|推荐|搜索|查询/.test(input)) score += 10;

  return Math.min(100, score);
}

// 生成澄清问题
export function generateClarificationQuestions(analysis: Partial<RequirementAnalysis>): string[] {
  const questions: string[] = [];
  const input = analysis.rawInput || '';

  if (!analysis.category) {
    questions.push('请问这个智能体主要用在什么业务场景？比如客服、营销、数据分析、内容创作等');
  }

  if (analysis.features && analysis.features.length < 2) {
    questions.push('能具体描述一下需要支持哪些核心功能吗？比如自动回复、数据分析、内容生成等');
  }

  if (analysis.completeness !== undefined && analysis.completeness < 60) {
    questions.push('希望这个智能体的交互方式是什么样的？是对话式还是自动化执行？');
  }

  if (analysis.complexity === 'high') {
    questions.push('这些功能之间有先后顺序或条件分支吗？需要走特定流程吗？');
  }

  return questions.slice(0, 2);
}

// 推荐构建方式
export function recommendBuildMethod(
  analysis: RequirementAnalysis,
  matchedTools: MatchedTool[]
): BuildRecommendation {
  const { complexity, features } = analysis;
  const highMatchTools = matchedTools.filter((t) => t.matchScore >= 70);
  const hasCodeKeyword = /代码|编程|自定义算法|Python|API集成|复杂集成/.test(analysis.rawInput);

  let primaryMethod: BuildMethod;
  let primaryConfidence: number;
  let primaryReasoning: string;

  if (hasCodeKeyword) {
    primaryMethod = 'workflow';
    primaryConfidence = 85;
    primaryReasoning = '您的需求涉及自定义代码逻辑，代码构建方式可以最大程度满足定制化需求';
  } else if (complexity === 'high' || features.length > 5) {
    primaryMethod = 'function';
    primaryConfidence = 80;
    primaryReasoning = '您的需求功能点较多且包含复杂逻辑，工作流构建可以清晰地编排各功能节点';
  } else if (highMatchTools.length >= 2) {
    primaryMethod = 'prompt';
    primaryConfidence = 90;
    primaryReasoning = `您的需求功能点较少，且服务市场中有${highMatchTools.length}个高匹配度工具可直接使用，简单构建即可满足`;
  } else if (complexity === 'medium') {
    primaryMethod = 'function';
    primaryConfidence = 75;
    primaryReasoning = '您的需求包含多个功能组合，工作流构建可以更好地协调各功能模块';
  } else {
    primaryMethod = 'prompt';
    primaryConfidence = 82;
    primaryReasoning = '您的需求较为简单，通过简单构建配置Prompt和工具即可快速实现';
  }

  const alternatives: BuildRecommendation['alternatives'] = [];
  const allMethods: BuildMethod[] = ['prompt', 'function', 'workflow'];
  const methods = allMethods.filter((m) => m !== primaryMethod);

  for (const method of methods) {
    let confidence: number;
    let reasoning: string;

    if (method === 'prompt') {
      confidence = primaryMethod === 'prompt' ? 0 : highMatchTools.length >= 1 ? 65 : 50;
      reasoning = '简单构建更快速，适合快速验证想法';
    } else if (method === 'function') {
      confidence = primaryMethod === 'function' ? 0 : complexity !== 'low' ? 60 : 45;
      reasoning = '工作流构建提供更灵活的编排能力，适合后续扩展';
    } else {
      confidence = primaryMethod === 'workflow' ? 0 : hasCodeKeyword ? 70 : 40;
      reasoning = '代码构建完全自定义，适合有开发能力的用户';
    }

    if (confidence > 0) {
      alternatives.push({ method, confidence, reasoning });
    }
  }

  return {
    method: primaryMethod,
    confidence: primaryConfidence,
    reasoning: primaryReasoning,
    matchedTools,
    alternatives,
  };
}