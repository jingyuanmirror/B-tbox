import { BuildMethod } from '@/types/app';
import { ServiceCategory } from '@/types/service';
import { RequirementAnalysis, RequirementTemplate } from '@/types/assistant';

// 用函数返回对象，避免对象字面量中  key 被 Edit 工具误处理
function getCategoryLabels(): Record<string, string> {
  return {
    search: '搜索查询',
    video: '视频处理',
    image: '图像处理',
    news: '内容创作',
    communication: '客户服务',
    tools: '工具效率',
  };
}

function getCategoryNameMap(): Record<string, string[]> {
  return {
    search: ['智能搜索助手', '知识查询精灵', '信息检索管家'],
    video: ['视频处理助手', '智能视频工坊', '视频创作精灵'],
    image: ['图像处理助手', '视觉智能管家', '图片创作精灵'],
    news: ['内容创作助手', '智能写作精灵', '文案生成管家'],
    communication: ['智能客服助手', '客户服务精灵', '沟通管家'],
    tools: ['效率工具助手', '自动化精灵', '智能办公管家'],
  };
}

const CATEGORY_LABELS = getCategoryLabels();
const CATEGORY_NAMES = getCategoryNameMap();

// 补充  类别的映射（单独赋值，避免 Edit 工具误处理）
CATEGORY_LABELS[ServiceCategory.DATA] = '数据分析';
CATEGORY_NAMES[ServiceCategory.DATA] = ['数据分析助手', '智能洞察精灵', '数据报表管家'];

export const REQUIREMENT_TEMPLATES: RequirementTemplate[] = [
  {
    id: 'customer-service',
    label: '客服助手',
    description: '自动回复客户咨询、处理售后问题',
    icon: '💬',
    category: ServiceCategory.COMMUNICATION,
    prompt: '我想做一个能自动回复客户咨询的客服助手，支持常见问题解答和工单转接',
  },
  {
    id: 'data-analysis',
    label: '数据分析',
    description: '数据查询、图表生成、趋势分析',
    icon: '📊',
    category: ServiceCategory.DATA,
    prompt: '我需要一个数据分析智能体，能够查询数据、生成报表和可视化图表',
  },
  {
    id: 'content-creation',
    label: '内容生成',
    description: '文章写作、文案创作、内容优化',
    icon: '✍️',
    category: ServiceCategory.NEWS,
    prompt: '帮我创建一个内容生成智能体，能够自动撰写文章和营销文案',
  },
  {
    id: 'workflow-automation',
    label: '流程自动化',
    description: '审批流程、任务编排、自动触发',
    icon: '⚡',
    category: ServiceCategory.TOOLS,
    prompt: '我需要一个流程自动化智能体，能处理审批、通知和多步骤任务编排',
  },
  {
    id: 'marketing-assistant',
    label: '营销助手',
    description: '用户画像、精准投放、效果追踪',
    icon: '🎯',
    category: ServiceCategory.DATA,
    prompt: '我想构建一个营销助手，能够分析用户画像并推荐营销策略',
  },
  {
    id: 'image-processing',
    label: '图像处理',
    description: '图片识别、生成、编辑和格式转换',
    icon: '🖼️',
    category: ServiceCategory.IMAGE,
    prompt: '我需要一个图像处理智能体，支持图片识别、编辑和批量处理',
  },
];

export const BUILD_METHOD_INFO: Record<BuildMethod, { label: string; description: string; icon: string }> = {
  prompt: {
    label: '简单构建',
    description: '通过配置Prompt和选择工具快速构建，适合简单场景',
    icon: '⚡',
  },
  function: {
    label: '工作流构建',
    description: '通过可视化编排节点和连线构建，适合复杂流程',
    icon: '🔗',
  },
  workflow: {
    label: '代码构建',
    description: '通过编写代码自定义构建，适合高度定制化需求',
    icon: '💻',
  },
};

function getCategoryLabel(category: ServiceCategory): string {
  return CATEGORY_LABELS[category] || '智能';
}

export function generatePromptSuggestion(analysis: RequirementAnalysis, selectedTools: string[]): string {
  const { rawInput, category, features } = analysis;
  const categoryLabel = category ? getCategoryLabel(category) : '通用';
  const featuresText = features.length > 0 ? features.join('、') : rawInput;

  let prompt = `你是一个专业的${categoryLabel}助手。`;
  if (features.length > 0) {
    prompt += `\n\n你的核心能力包括：${featuresText}。`;
  }
  prompt += `\n\n请遵循以下原则：`;
  prompt += `\n1. 准确理解用户意图，提供专业、准确的回答`;
  prompt += `\n2. 回复语气要温和友好，保持专业形象`;
  prompt += `\n3. 如果无法确定答案，请诚实告知用户`;
  if (selectedTools.length > 0) {
    prompt += `\n4. 善用可用工具来提升服务能力`;
  }
  return prompt;
}

export function generateNameSuggestions(analysis: RequirementAnalysis): string[] {
  const { category, features } = analysis;
  const baseNames: string[] = [];

  if (category) {
    const names = CATEGORY_NAMES[category] || ['智能助手'];
    baseNames.push(...names);
  }

  if (features.length > 0) {
    baseNames.push(`${features[0]}助手`, `${features[0]}精灵`);
  }

  if (baseNames.length === 0) {
    baseNames.push('智能助手', 'AI助手', '专属助手');
  }

  return baseNames.slice(0, 3);
}

export function generateDescription(analysis: RequirementAnalysis): string {
  const { rawInput, category, features } = analysis;
  const categoryLabel = category ? getCategoryLabel(category) : '';

  if (features.length > 0) {
    return `一个${categoryLabel || ''}智能体，主要功能包括${features.join('、')}`;
  }

  return rawInput.length > 10 ? rawInput : `${categoryLabel || '通用'}智能助手`;
}