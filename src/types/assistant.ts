import { Service, ServiceCategory } from './service';
import { BuildMethod } from './app';

// 对话阶段
export type AssistantPhase =
  | 'idle'
  | 'requirement_analysis'
  | 'build_recommendation'
  | 'configuration'
  | 'generation'
  | 'completed';

// 消息类型
export type AssistantMessageType =
  | 'text'
  | 'recommendation'
  | 'tool_selector'
  | 'config_form'
  | 'progress'
  | 'error'
  | 'system';

// 消息接口
export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  type: AssistantMessageType;
  content: string;
  timestamp: number;
  payload?: RecommendationPayload | ToolSelectorPayload | ConfigFormPayload | ProgressPayload | ErrorPayload;
  editable?: boolean;
  expired?: boolean;
}

// 推荐结果
export interface RecommendationPayload {
  method: BuildMethod;
  confidence: number;
  reasoning: string;
  matchedTools: MatchedTool[];
  alternatives: {
    method: BuildMethod;
    confidence: number;
    reasoning: string;
  }[];
}

// 匹配工具
export interface MatchedTool {
  service: Service;
  matchScore: number;
}

// 工具选择器
export interface ToolSelectorPayload {
  tools: MatchedTool[];
  selectedToolIds: string[];
  maxSelection: number;
  searchQuery?: string;
}

// 配置表单
export interface ConfigFormPayload {
  fields: ConfigField[];
}

export interface ConfigField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'tags';
  value: string | string[];
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

// 进度
export interface ProgressPayload {
  steps: ProgressStep[];
  currentStep: number;
}

export interface ProgressStep {
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

// 错误
export interface ErrorPayload {
  code: string;
  message: string;
  retryable: boolean;
}

// 需求分析结果
export interface RequirementAnalysis {
  rawInput: string;
  category: ServiceCategory | null;
  features: string[];
  complexity: 'low' | 'medium' | 'high';
  completeness: number;
  clarificationHistory: {
    question: string;
    answer: string;
    timestamp: number;
  }[];
}

// 构建推荐结果
export interface BuildRecommendation {
  method: BuildMethod;
  confidence: number;
  reasoning: string;
  matchedTools: MatchedTool[];
  alternatives: {
    method: BuildMethod;
    confidence: number;
    reasoning: string;
  }[];
}

// 智能体配置
export interface AgentConfig {
  name: string;
  description: string;
  icon: string | null;
  industry: string;
  selectedTools: Service[];
  prompt?: string;
  workflowNodes?: WorkflowNode[];
  codeTemplate?: string;
}

export interface WorkflowNode {
  id: string;
  type: 'start' | 'end' | 'condition' | 'action' | 'loop';
  label: string;
  config?: Record<string, unknown>;
}

// 配置快照（用于回退）
export interface ConfigSnapshot {
  phase: AssistantPhase;
  config: AgentConfig;
  timestamp: number;
}

// 对话状态
export interface AssistantConversationState {
  phase: AssistantPhase;
  requirement: RequirementAnalysis;
  recommendation: BuildRecommendation | null;
  selectedMethod: BuildMethod | null;
  config: AgentConfig;
  messages: AssistantMessage[];
  snapshots: ConfigSnapshot[];
  isProcessing: boolean;
  sidePanelOpen: boolean;
  sidePanelType: 'workflow' | 'code' | 'tools' | 'config' | null;
}

// 需求模板
export interface RequirementTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  prompt: string;
}

// 用户偏好（后续迭代）
export interface UserPreferences {
  preferredBuildMethod: BuildMethod | null;
  frequentlyUsedTools: string[];
  preferredIndustries: string[];
  requirementHistory: {
    summary: string;
    category: ServiceCategory;
    timestamp: number;
  }[];
  allowPersonalization: boolean;
}