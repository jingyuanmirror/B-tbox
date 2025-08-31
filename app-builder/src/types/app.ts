export type AppType = 'dialog' | 'interactive';

export type BuildMethod = 'prompt' | 'function' | 'workflow';

export interface AppData {
  id?: string;
  name: string;
  type: AppType;
  buildMethod: BuildMethod;
  description?: string;
  icon?: File | string;
  industry?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (app: AppData) => void;
}
