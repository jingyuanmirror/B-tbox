import { useState, useCallback } from 'react';
import { AppData, AppType, BuildMethod } from '../types/app';
import { validateAppData, createAppData } from '../utils/appUtils';

export interface UseAppBuilderState {
  currentStep: number;
  appType: AppType;
  buildMethod: BuildMethod;
  appName: string;
  appDescription: string;
  appIcon: File | null;
  industry: string;
  isLoading: boolean;
  errors: string[];
}

export interface UseAppBuilderActions {
  setCurrentStep: (step: number) => void;
  setAppType: (type: AppType) => void;
  setBuildMethod: (method: BuildMethod) => void;
  setAppName: (name: string) => void;
  setAppDescription: (description: string) => void;
  setAppIcon: (icon: File | null) => void;
  setIndustry: (industry: string) => void;
  handleNext: () => boolean;
  handleBack: () => void;
  handleCreate: () => Promise<AppData | null>;
  handleCancel: () => void;
  resetForm: () => void;
}

const initialState: UseAppBuilderState = {
  currentStep: 1,
  appType: 'dialog',
  buildMethod: 'prompt',
  appName: '',
  appDescription: '',
  appIcon: null,
  industry: '',
  isLoading: false,
  errors: []
};

export function useAppBuilder(): UseAppBuilderState & UseAppBuilderActions {
  const [state, setState] = useState<UseAppBuilderState>(initialState);

  const setCurrentStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const setAppType = useCallback((type: AppType) => {
    setState(prev => ({ ...prev, appType: type }));
  }, []);

  const setBuildMethod = useCallback((method: BuildMethod) => {
    setState(prev => ({ ...prev, buildMethod: method }));
  }, []);

  const setAppName = useCallback((name: string) => {
    setState(prev => ({ ...prev, appName: name.slice(0, 10) }));
  }, []);

  const setAppDescription = useCallback((description: string) => {
    setState(prev => ({ ...prev, appDescription: description.slice(0, 200) }));
  }, []);

  const setAppIcon = useCallback((icon: File | null) => {
    setState(prev => ({ ...prev, appIcon: icon }));
  }, []);

  const setIndustry = useCallback((industry: string) => {
    setState(prev => ({ ...prev, industry }));
  }, []);

  const handleNext = useCallback(() => {
    const validation = validateAppData({
      name: state.appName,
      type: state.appType,
      buildMethod: state.buildMethod
    });

    if (validation.valid && state.appName.trim()) {
      setState(prev => ({ ...prev, currentStep: 2, errors: [] }));
      return true;
    } else {
      setState(prev => ({ ...prev, errors: validation.errors }));
      return false;
    }
  }, [state.appName, state.appType, state.buildMethod]);

  const handleBack = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: 1, errors: [] }));
  }, []);

  const handleCreate = useCallback(async (): Promise<AppData | null> => {
    setState(prev => ({ ...prev, isLoading: true, errors: [] }));

    try {
      const appData = createAppData({
        name: state.appName,
        type: state.appType,
        buildMethod: state.buildMethod,
        description: state.appDescription,
        icon: state.appIcon || undefined,
        industry: state.industry
      });

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));

      setState(prev => ({ ...prev, isLoading: false }));
      return appData;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        errors: ['创建应用失败，请重试'] 
      }));
      return null;
    }
  }, [state]);

  const resetForm = useCallback(() => {
    setState(initialState);
  }, []);

  const handleCancel = useCallback(() => {
    resetForm();
  }, [resetForm]);

  return {
    ...state,
    setCurrentStep,
    setAppType,
    setBuildMethod,
    setAppName,
    setAppDescription,
    setAppIcon,
    setIndustry,
    handleNext,
    handleBack,
    handleCreate,
    handleCancel,
    resetForm
  };
}
