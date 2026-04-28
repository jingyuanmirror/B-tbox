import { Service } from '@/types/service';
import { RequirementAnalysis, AssistantMessage, BuildRecommendation, AgentConfig } from '@/types/assistant';
import { analyzeRequirement, reassessCompleteness, generateClarificationQuestions, recommendBuildMethod } from './decisionEngine';
import { matchTools } from './toolMatcher';
import { generatePromptSuggestion, generateNameSuggestions, generateDescription, BUILD_METHOD_INFO } from './promptTemplates';
import { BuildMethod } from '@/types/app';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ProcessResult {
  messages: Omit<AssistantMessage, 'id' | 'timestamp'>[];
  phaseUpdate?: string;
  requirementUpdate?: Partial<RequirementAnalysis>;
  recommendation?: BuildRecommendation;
  configUpdate?: Partial<AgentConfig>;
}

const CATEGORY_LABELS: Record<string, string> = {
  search: '搜索查询',
  video: '视频处理',
  image: '图像处理',
  news: '内容创作',
  communication: '客户服务',
  tools: '工具效率',
};

function getCategoryDisplayName(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

export async function processUserMessage(
  userMessage: string,
  currentPhase: string,
  requirement: RequirementAnalysis,
  config: AgentConfig,
  services: Service[]
): Promise<ProcessResult> {
  await delay(600 + Math.random() * 400);

  switch (currentPhase) {
    case 'idle':
    case 'requirement_analysis':
      return handleRequirementPhase(userMessage, requirement, services);
    case 'build_recommendation':
      return handleRecommendationPhase(userMessage, requirement);
    case 'configuration':
      return handleConfigurationPhase(userMessage, requirement, config);
    case 'generation':
      return handleGenerationPhase(userMessage, config);
    default:
      return {
        messages: [{ role: 'assistant', type: 'text', content: '您好！我是您的智能助理，可以帮您构建智能体。请描述您想要创建的智能体需求。' }],
      };
  }
}

function handleRequirementPhase(
  userMessage: string,
  requirement: RequirementAnalysis,
  services: Service[]
): ProcessResult {
  if (/确认|就这样|够了|可以了|继续|直接|没问题/.test(userMessage) && requirement.features.length > 0) {
    return buildRecommendationResponse(requirement, services);
  }

  const analysis = analyzeRequirement(userMessage);
  const mergedRequirement: RequirementAnalysis = {
    ...requirement,
    ...analysis,
    rawInput: userMessage,
    features: [...new Set([...requirement.features, ...(analysis.features || [])])],
    clarificationHistory: [
      ...requirement.clarificationHistory,
      { question: '', answer: userMessage, timestamp: Date.now() },
    ],
  };

  const completeness = reassessCompleteness(mergedRequirement);
  mergedRequirement.completeness = completeness;

  if (completeness >= 50) {
    return buildRecommendationResponse(mergedRequirement, services);
  }

  const questions = generateClarificationQuestions(mergedRequirement);
  const questionText = questions.length > 0
    ? `我来帮您分析需求。为了更准确地推荐，还需要了解：\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n您也可以直接说"确认"跳过，进入构建方式推荐。`
    : '请继续描述您的需求，或者直接说"确认"进入下一步。';

  return {
    messages: [{ role: 'assistant', type: 'text', content: questionText }],
    phaseUpdate: 'requirement_analysis',
    requirementUpdate: mergedRequirement,
  };
}

function buildRecommendationResponse(
  requirement: RequirementAnalysis,
  services: Service[]
): ProcessResult {
  const matchedTools = matchTools(services, requirement.category, requirement.features, requirement.rawInput);
  const recommendation = recommendBuildMethod(requirement, matchedTools);

  const featureList = requirement.features.length > 0
    ? `\n- 核心功能：${requirement.features.join('、')}`
    : '';
  const complexityLabel = { low: '简单', medium: '中等', high: '复杂' }[requirement.complexity];
  const categoryLabel = requirement.category
    ? `\n- 业务类别：${getCategoryDisplayName(requirement.category)}`
    : '';

  const analysisText = `需求分析完成！以下是我对您需求的理解：\n${categoryLabel}${featureList}\n- 复杂度评估：${complexityLabel}\n- 服务市场匹配：找到 ${matchedTools.length} 个相关工具\n\n请选择构建方式：`;

  return {
    messages: [
      { role: 'assistant', type: 'text', content: analysisText },
      {
        role: 'assistant',
        type: 'recommendation',
        content: '请选择一种构建方式',
        payload: {
          method: recommendation.method,
          confidence: recommendation.confidence,
          reasoning: recommendation.reasoning,
          matchedTools: recommendation.matchedTools,
          alternatives: recommendation.alternatives,
        },
      },
    ],
    phaseUpdate: 'build_recommendation',
    requirementUpdate: requirement,
    recommendation,
  };
}

function handleRecommendationPhase(
  userMessage: string,
  requirement: RequirementAnalysis
): ProcessResult {
  const isConfirm = /确认|同意|好的|可以|没问题|就这个|推荐|继续/.test(userMessage);
  const isChange = /换|改|其他|工作流|代码|简单/.test(userMessage);

  let selectedMethod: BuildMethod = 'prompt';
  if (isChange) {
    if (/工作流|function/.test(userMessage)) selectedMethod = 'function';
    else if (/代码|workflow|code/.test(userMessage)) selectedMethod = 'workflow';
  }

  const method = selectedMethod;
  const info = BUILD_METHOD_INFO[method];
  const nameSuggestions = generateNameSuggestions(requirement);
  const descSuggestion = generateDescription(requirement);

  return {
    messages: [
      {
        role: 'assistant',
        type: 'text',
        content: `好的！让我们使用 **${info.label}** 方式来创建您的智能体。\n\n**1. 智能体名称**\n\n我为您生成了几个建议名称：\n${nameSuggestions.map((n, i) => `  ${i + 1}. ${n}`).join('\n')}\n\n您可以选择一个（输入数字或名称），或者输入自定义名称。`,
      },
    ],
    phaseUpdate: 'configuration',
    configUpdate: { description: descSuggestion },
  };
}

function handleConfigurationPhase(
  userMessage: string,
  requirement: RequirementAnalysis,
  config: AgentConfig
): ProcessResult {
  if (!config.name) {
    const name = resolveName(userMessage, generateNameSuggestions(requirement));
    const descSuggestion = config.description || generateDescription(requirement);

    return {
      messages: [
        {
          role: 'assistant',
          type: 'text',
          content: `名称设为 **"${name}"**。\n\n**2. 智能体描述**\n\n我为您生成了描述建议：\n\n> ${descSuggestion}\n\n您可以直接确认，或输入修改后的描述。`,
        },
      ],
      configUpdate: { name },
    };
  }

  if (!config.description || config.description === generateDescription(requirement)) {
    const description = /确认|好的|可以|没问题|就这样/.test(userMessage)
      ? config.description || generateDescription(requirement)
      : userMessage;

    const promptSuggestion = generatePromptSuggestion(requirement, config.selectedTools.map(t => t.id));

    return {
      messages: [
        {
          role: 'assistant',
          type: 'text',
          content: `描述已确认。\n\n**3. 系统Prompt**\n\n我为您生成了初始Prompt：\n\n> ${promptSuggestion}\n\n您可以直接确认，或输入修改内容。确认后将展示配置摘要。`,
        },
      ],
      configUpdate: { description },
    };
  }

  if (!config.prompt) {
    const prompt = /确认|好的|可以|没问题|就这样|直接/.test(userMessage)
      ? generatePromptSuggestion(requirement, config.selectedTools.map(t => t.id))
      : userMessage;

    return {
      messages: [
        {
          role: 'assistant',
          type: 'config_form',
          content: '配置摘要',
          payload: {
            fields: [
              { key: 'name', label: '智能体名称', type: 'text' as const, value: config.name },
              { key: 'description', label: '描述', type: 'text' as const, value: config.description },
              { key: 'method', label: '构建方式', type: 'text' as const, value: BUILD_METHOD_INFO['prompt']?.label || '简单构建' },
              { key: 'tools', label: '已选工具', type: 'tags' as const, value: config.selectedTools.map(t => t.name) },
              { key: 'prompt', label: '系统Prompt', type: 'text' as const, value: prompt.slice(0, 80) + '...' },
            ],
          },
        },
      ],
      configUpdate: { prompt },
      phaseUpdate: 'generation',
    };
  }

  return {
    messages: [
      {
        role: 'assistant',
        type: 'text',
        content: '配置已完成！请点击下方按钮创建智能体，或输入"创建"开始生成。',
      },
    ],
    phaseUpdate: 'generation',
  };
}

function handleGenerationPhase(
  userMessage: string,
  config: AgentConfig
): ProcessResult {
  if (/创建|生成|开始|确认/.test(userMessage)) {
    return {
      messages: [
        {
          role: 'assistant',
          type: 'progress',
          content: '正在创建智能体...',
          payload: {
            steps: [
              { label: '基础配置', status: 'completed' },
              { label: '工具加载', status: 'active' },
              { label: '初始化完成', status: 'pending' },
            ],
            currentStep: 1,
          },
        },
      ],
    };
  }

  return {
    messages: [
      {
        role: 'assistant',
        type: 'text',
        content: '请确认创建智能体，输入"创建"或点击确认按钮。',
      },
    ],
  };
}

function resolveName(input: string, suggestions: string[]): string {
  const trimmed = input.trim();
  const num = parseInt(trimmed, 10);
  if (num >= 1 && num <= suggestions.length) {
    return suggestions[num - 1];
  }
  if (trimmed.length > 0 && trimmed.length <= 15) {
    return trimmed;
  }
  return suggestions[0];
}

export { analyzeRequirement, generateClarificationQuestions, recommendBuildMethod, matchTools, generatePromptSuggestion, generateNameSuggestions, generateDescription };