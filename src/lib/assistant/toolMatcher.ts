import { Service, ServiceCategory, ServiceType } from '@/types/service';
import { MatchedTool } from '@/types/assistant';

// 工具匹配引擎：基于需求分析结果匹配服务市场工具
export function matchTools(
  services: Service[],
  category: ServiceCategory | null,
  features: string[],
  rawInput: string
): MatchedTool[] {
  return services
    .map((service) => ({
      service,
      matchScore: calculateMatchScore(service, category, features, rawInput),
    }))
    .filter((item) => item.matchScore > 30)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}

function calculateMatchScore(
  service: Service,
  category: ServiceCategory | null,
  features: string[],
  rawInput: string
): number {
  let score = 0;

  // 类别匹配 (0-30)
  if (category && service.category === category) {
    score += 30;
  }

  // 标签匹配 (0-25)
  const inputLower = rawInput.toLowerCase();
  for (const tag of service.tags) {
    if (inputLower.includes(tag.toLowerCase()) || features.some((f) => f.includes(tag))) {
      score += 8;
    }
  }
  score = Math.min(score, 25 + (category && service.category === category ? 30 : 0) > 30 ? 55 : score);

  // 名称和描述匹配 (0-25)
  const serviceNameLower = service.name.toLowerCase();
  const serviceDescLower = service.description.toLowerCase();
  for (const feature of features) {
    if (serviceNameLower.includes(feature.toLowerCase()) || serviceDescLower.includes(feature.toLowerCase())) {
      score += 12;
    }
  }
  score = Math.min(score - (category && service.category === category ? 30 : 0), 25) + (category && service.category === category ? 30 : 0);

  // 直接关键词匹配 (0-20)
  const keywords = extractKeywords(rawInput);
  for (const keyword of keywords) {
    if (serviceNameLower.includes(keyword) || serviceDescLower.includes(keyword)) {
      score += 5;
    }
    for (const tag of service.tags) {
      if (tag.toLowerCase().includes(keyword)) {
        score += 4;
      }
    }
  }

  // 使用量和评分加成 (0-10)
  if (service.usageCount > 500) score += 5;
  else if (service.usageCount > 100) score += 3;

  if (service.rating && service.rating >= 4.5) score += 5;
  else if (service.rating && service.rating >= 4.0) score += 2;

  return Math.min(100, Math.max(0, score));
}

function extractKeywords(input: string): string[] {
  const stopWords = new Set(['的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这', '他', '她', '它', '吗', '吧', '啊', '呢', '把', '被', '让', '给', '对', '那', '些', '什么', '如何', '怎么', '可以', '需要', '能够', '支持']);
  return input
    .split(/[\s，。！？、；：""''（）【】《》]+/)
    .filter((word) => word.length >= 2 && !stopWords.has(word));
}

// 根据构建方式过滤推荐工具类型
export function filterToolsByBuildMethod(
  tools: MatchedTool[],
  buildMethod: string
): MatchedTool[] {
  switch (buildMethod) {
    case 'prompt':
      return tools.filter(
        (t) => t.service.type === ServiceType.PLUGIN || t.service.type === ServiceType.MCP
      );
    case 'function':
      return tools;
    case 'workflow':
      return tools;
    default:
      return tools;
  }
}