import useSWR from 'swr';
import { Service, ServiceFilter, ServiceType, ServiceCategory } from '@/types/service';

// 包含所有4种服务类型的Mock数据
const mockServices: Service[] = [
  // MCP 服务
  {
    id: '1',
    name: '支付宝 MCP Server（体验版）',
    description: '支付宝开放平台提供的 MCP Server，让你可以轻松接支付宝开放平台提供的交易创建、查询、退款等功能',
  type: ServiceType.MCP,
  category: ServiceCategory.TOOLS,
    version: '1.0.0',
    developer: '支付宝',
    toolCount: 3,
    usageCount: 421,
    rating: 4.8,
    tags: ['支付', '开放平台', 'API'],
    icon: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*5-8MSrW7b6QAAAAAAAAAAAAAARQnAQ',
    createdAt: '2025-04-17T00:00:00Z',
    updatedAt: '2025-04-17T00:24:08Z'
  },
  {
    id: '2',
    name: '无影 AgentBay',
    description: '无影AgentBay是AI时代的Agent云基础设施，面向企业、开发者、AI厂商，提供了一健配置的Agent运行环境',
  type: ServiceType.MCP,
  category: ServiceCategory.TOOLS,
    version: '1.0.0',
    developer: '阿里云',
    toolCount: 50,
    usageCount: 177,
    rating: 4.7,
    tags: ['Agent', '云基础设施', '企业级'],
    icon: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kgyiRKi8kgwAAAAAAAAAAAAAARQnAQ',
    createdAt: '2025-04-14T00:00:00Z',
    updatedAt: '2025-04-14T18:10:39Z'
  },
  {
    id: '3',
    name: 'Amap Maps',
    description: '高德地图 MCP Server，提供位置搜索、路线规划、地理编码等地图相关功能',
  type: ServiceType.MCP,
  category: ServiceCategory.SEARCH,
    version: '1.0.0',
    developer: '高德地图',
    toolCount: 12,
    usageCount: 492,
    rating: 4.6,
    tags: ['地图', '导航', 'API'],
    icon: 'https://webapi.amap.com/images/autonavi.png',
    createdAt: '2025-07-15T00:00:00Z',
    updatedAt: '2025-07-15T18:29:55Z'
  },
  
  // Plugin 插件服务
  {
    id: '4',
    name: 'AI智能写作助手',
    description: '基于先进AI模型的智能写作插件，支持多种文体创作、语法检查、内容优化等功能，让写作更高效',
  type: ServiceType.PLUGIN,
  category: ServiceCategory.TOOLS,
    version: '2.1.0',
    developer: '智能写作团队',
    toolCount: 15,
    usageCount: 2834,
    rating: 4.9,
    tags: ['AI写作', '内容创作', '语法检查'],
    icon: 'https://cdn-icons-png.flaticon.com/512/2919/2919906.png',
    createdAt: '2025-03-20T00:00:00Z',
    updatedAt: '2025-07-10T10:30:15Z',
    isFree: true
  },
  {
    id: '5',
    name: '智能代码审查',
    description: '自动化代码质量检测插件，支持多种编程语言，提供代码风格检查、安全漏洞扫描等功能',
  type: ServiceType.PLUGIN,
  category: ServiceCategory.TOOLS,
    version: '3.0.2',
    developer: '代码质量团队',
    toolCount: 22,
    usageCount: 1567,
    rating: 4.7,
    tags: ['代码审查', '质量检测', '安全扫描'],
    icon: 'https://cdn-icons-png.flaticon.com/512/54/54481.png',
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2025-06-25T14:20:30Z',
    isFree: true
  },
  {
    id: '6',
    name: '数据可视化工具箱',
    description: '强大的数据可视化插件，支持多种图表类型，提供交互式仪表板创建和数据分析功能',
  type: ServiceType.PLUGIN,
  category: ServiceCategory.DATA,
    version: '1.5.3',
    developer: '数据团队',
    toolCount: 18,
    usageCount: 876,
    rating: 4.6,
    tags: ['数据可视化', '图表', '仪表板'],
    icon: 'https://cdn-icons-png.flaticon.com/512/2618/2618590.png',
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-07-05T16:45:20Z',
    isFree: true
  },

  // Service Flow 服务流
  {
    id: '7',
    name: '企业客户服务工作流',
    description: '完整的企业级客户服务解决方案，包含工单管理、自动回复、客户满意度调研等完整流程',
  type: ServiceType.SERVICE_FLOW,
  category: ServiceCategory.COMMUNICATION,
    version: '2.0.1',
    developer: '企业服务团队',
    price: 1299,
    usageCount: 234,
    rating: 4.8,
    tags: ['客户服务', '工单管理', '自动化'],
    icon: '💬',
    createdAt: '2025-03-05T00:00:00Z',
    updatedAt: '2025-07-20T09:15:45Z'
  },
  {
    id: '8',
    name: '智能营销推广流程',
    description: '一站式营销自动化工作流，包含用户画像分析、精准投放、效果追踪等营销全链路功能',
  type: ServiceType.SERVICE_FLOW,
  category: ServiceCategory.DATA,
    version: '1.8.0',
    developer: '营销科技团队',
    price: 2599,
    usageCount: 156,
    rating: 4.9,
    tags: ['营销自动化', '用户画像', '精准投放'],
    icon: '📈',
    createdAt: '2025-02-28T00:00:00Z',
    updatedAt: '2025-06-30T11:30:22Z'
  },
  {
    id: '9',
    name: '内容审核与发布流程',
    description: '智能化内容管理工作流，支持多平台内容审核、自动发布、数据统计等内容运营全流程',
  type: ServiceType.SERVICE_FLOW,
  category: ServiceCategory.NEWS,
    version: '1.6.2',
    developer: '内容管理团队',
    price: 899,
    usageCount: 378,
    rating: 4.5,
    tags: ['内容审核', '自动发布', '多平台'],
    icon: '📝',
    createdAt: '2025-04-10T00:00:00Z',
    updatedAt: '2025-07-15T15:20:10Z'
  },

  // Code Service 代码服务
  {
    id: '10',
    name: '云端图像处理服务',
    description: '高性能云端图像处理代码服务，支持批量处理、格式转换、智能压缩等功能，API调用简单便捷',
  type: ServiceType.CODE_SERVICE,
  category: ServiceCategory.IMAGE,
    version: '3.2.1',
    developer: '图像处理专家',
    price: 599,
    usageCount: 1234,
    rating: 4.7,
    tags: ['图像处理', 'API服务', '批量处理'],
    icon: '🖼️',
    createdAt: '2025-01-25T00:00:00Z',
    updatedAt: '2025-07-08T13:45:30Z'
  },
  {
    id: '11',
    name: '智能搜索引擎服务',
    description: '定制化搜索引擎代码服务，提供全文检索、语义搜索、搜索结果排序等高级搜索功能',
  type: ServiceType.CODE_SERVICE,
  category: ServiceCategory.SEARCH,
    version: '2.5.0',
    developer: '搜索技术团队',
    price: 1899,
    usageCount: 567,
    rating: 4.8,
    tags: ['搜索引擎', '全文检索', '语义搜索'],
    icon: '🔎',
    createdAt: '2025-03-12T00:00:00Z',
    updatedAt: '2025-06-18T10:20:45Z'
  },
  {
    id: '12',
    name: '视频转码处理服务',
    description: '专业的视频处理代码服务，支持多格式转码、视频压缩、截图提取等视频处理功能',
  type: ServiceType.CODE_SERVICE,
  category: ServiceCategory.VIDEO,
    version: '4.1.2',
    developer: '视频技术团队',
    price: 999,
    usageCount: 445,
    rating: 4.6,
    tags: ['视频转码', '格式转换', '视频处理'],
    icon: '🎬',
    createdAt: '2025-02-08T00:00:00Z',
    updatedAt: '2025-07-22T08:15:20Z'
  }
];

const fetcher = async (): Promise<Service[]> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockServices;
};

export function useServices(filter?: ServiceFilter) {
  const { data, error, isLoading, mutate } = useSWR<Service[]>(
    `/api/services${filter ? `?${new URLSearchParams(filter as Record<string, string>).toString()}` : ''}`,
    fetcher
  );

  // Filter data locally for demo purposes
  const filteredServices = data?.filter(service => {
    if (filter?.type && service.type !== filter.type) return false;
    if (filter?.category && service.category !== filter.category) return false;
    if (filter?.search) {
      const searchLower = filter.search.toLowerCase();
      return service.name.toLowerCase().includes(searchLower) ||
             service.description.toLowerCase().includes(searchLower) ||
             service.tags.some(tag => tag.toLowerCase().includes(searchLower));
    }
    return true;
  });

  // Sort filtered services
  const sortedServices = filteredServices?.sort((a, b) => {
    switch (filter?.sortBy) {
      case 'popularity':
        return b.usageCount - a.usageCount;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.usageCount - a.usageCount; // Default to popularity
    }
  });

  return {
    services: sortedServices || [],
    isLoading,
    error,
    mutate
  };
}