import { create } from 'zustand';
import {
  AssistantConversationState,
  AssistantPhase,
  AssistantMessage,
  RequirementAnalysis,
  BuildRecommendation,
  AgentConfig,
  ConfigSnapshot,
} from '@/types/assistant';
import { Service } from '@/types/service';
import { BuildMethod } from '@/types/app';

const initialRequirement: RequirementAnalysis = {
  rawInput: '',
  category: null,
  features: [],
  complexity: 'low',
  completeness: 0,
  clarificationHistory: [],
};

const initialConfig: AgentConfig = {
  name: '',
  description: '',
  icon: null,
  industry: '',
  selectedTools: [],
};

const initialState: AssistantConversationState = {
  phase: 'idle',
  requirement: initialRequirement,
  recommendation: null,
  selectedMethod: null,
  config: initialConfig,
  messages: [],
  snapshots: [],
  isProcessing: false,
  sidePanelOpen: false,
  sidePanelType: null,
};

interface AssistantStore extends AssistantConversationState {
  // Phase management
  setPhase: (phase: AssistantPhase) => void;

  // Messages
  addMessage: (message: Omit<AssistantMessage, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<AssistantMessage>) => void;
  expireMessagesAfter: (timestamp: number) => void;

  // Requirement analysis
  updateRequirement: (partial: Partial<RequirementAnalysis>) => void;

  // Build recommendation
  setRecommendation: (recommendation: BuildRecommendation) => void;
  selectBuildMethod: (method: BuildMethod) => void;

  // Configuration
  updateConfig: (partial: Partial<AgentConfig>) => void;
  toggleTool: (tool: Service) => void;
  removeTool: (toolId: string) => void;

  // Side panel
  openSidePanel: (type: 'workflow' | 'code' | 'tools' | 'config') => void;
  closeSidePanel: () => void;

  // Snapshots
  pushSnapshot: () => void;
  restoreSnapshot: (timestamp: number) => void;

  // Processing
  setProcessing: (processing: boolean) => void;

  // Reset
  resetConversation: () => void;
}

export const useAssistantStore = create<AssistantStore>((set, get) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),

  addMessage: (message) => {
    const newMessage: AssistantMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  updateMessage: (id, updates) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    }));
  },

  expireMessagesAfter: (timestamp) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.timestamp > timestamp ? { ...msg, expired: true } : msg
      ),
    }));
  },

  updateRequirement: (data) => {
    set((state) => ({
      requirement: { ...state.requirement, ...data },
    }));
  },

  setRecommendation: (recommendation) => set({ recommendation }),

  selectBuildMethod: (method) => {
    const state = get();
    set({
      selectedMethod: method,
      config: { ...state.config },
    });
  },

  updateConfig: (data) => {
    set((state) => ({
      config: { ...state.config, ...data },
    }));
  },

  toggleTool: (tool) => {
    set((state) => {
      const isSelected = state.config.selectedTools.some((t) => t.id === tool.id);
      return {
        config: {
          ...state.config,
          selectedTools: isSelected
            ? state.config.selectedTools.filter((t) => t.id !== tool.id)
            : [...state.config.selectedTools, tool],
        },
      };
    });
  },

  removeTool: (toolId) => {
    set((state) => ({
      config: {
        ...state.config,
        selectedTools: state.config.selectedTools.filter((t) => t.id !== toolId),
      },
    }));
  },

  openSidePanel: (type) => set({ sidePanelOpen: true, sidePanelType: type }),
  closeSidePanel: () => set({ sidePanelOpen: false, sidePanelType: null }),

  pushSnapshot: () => {
    const state = get();
    const snapshot: ConfigSnapshot = {
      phase: state.phase,
      config: { ...state.config, selectedTools: [...state.config.selectedTools] },
      timestamp: Date.now(),
    };
    set((state) => ({
      snapshots: [...state.snapshots, snapshot],
    }));
  },

  restoreSnapshot: (timestamp) => {
    const snapshot = get().snapshots.find((s) => s.timestamp === timestamp);
    if (snapshot) {
      set({
        phase: snapshot.phase,
        config: { ...snapshot.config },
      });
    }
  },

  setProcessing: (processing) => set({ isProcessing: processing }),

  resetConversation: () => set(initialState),
}));