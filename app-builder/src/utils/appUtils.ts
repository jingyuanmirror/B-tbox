import { AppData } from '../types/app';

export const industries = [
  '科技互联网', '电商零售', '教育培训', '医疗健康', '金融投资', 
  '旅游出行', '餐饮服务', '房产建筑', '制造业', '其他'
];

export const generateAppId = (): string => {
  return `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const validateAppData = (data: Partial<AppData>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('应用名称不能为空');
  }
  
  if (data.name && data.name.length > 10) {
    errors.push('应用名称不能超过10个字符');
  }
  
  if (!data.type) {
    errors.push('请选择应用类型');
  }
  
  if (!data.buildMethod) {
    errors.push('请选择构建方式');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const createAppData = (formData: Partial<AppData>): AppData => {
  return {
    id: generateAppId(),
    name: formData.name || '',
    type: formData.type || 'dialog',
    buildMethod: formData.buildMethod || 'prompt',
    description: formData.description || '',
    icon: formData.icon,
    industry: formData.industry || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
