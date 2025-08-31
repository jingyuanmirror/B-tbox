export interface Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  category: ServiceCategory;
  version: string;
  developer: string;
  price?: number;
  toolCount?: number;
  usageCount: number;
  rating?: number;
  tags: string[];
  icon?: string;
  createdAt: string;
  updatedAt: string;
  isSubscribed?: boolean;
  isPurchased?: boolean;
  isFree?: boolean;
}

export enum ServiceType {
  PLUGIN = 'plugin',
  MCP = 'mcp',
  SERVICE_FLOW = 'service_flow',
  CODE_SERVICE = 'code_service'
}

export enum ServiceCategory {
  SEARCH = 'search',
  VIDEO = 'video', 
  IMAGE = 'image',
  NEWS = 'news',
  DATA = 'data',
  COMMUNICATION = 'communication',
  TOOLS = 'tools'
}

export enum UsageType {
  SUBSCRIBE = 'subscribe', // For plugins and MCP
  PURCHASE = 'purchase'    // For service flows and code services
}

export interface ServiceFilter {
  type?: ServiceType;
  category?: ServiceCategory;
  search?: string;
  sortBy?: 'popularity' | 'newest' | 'rating' | 'name';
}

export interface ServiceStats {
  totalServices: number;
  totalUsers: number;
  totalUsage: number;
}