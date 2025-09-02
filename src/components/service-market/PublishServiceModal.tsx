
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Service } from '@/types/service';

// 服务上架多步骤流程枚举
enum Step {
  SelectType = 0,
  SelectSource = 1,
  EditInfo = 2,
  PermissionCheck = 3,
  Confirm = 4,
}

interface PublishServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (data: any) => void;
}

export function PublishServiceModal({ isOpen, onClose, onPublish }: PublishServiceModalProps) {
  const [leftTab, setLeftTab] = useState<'market' | 'space'>('space');
  const [step, setStep] = useState<Step>(Step.SelectType);
  const [formData, setFormData] = useState<any>({});
  // 用于服务来源页面的搜索和服务数据
  const [search, setSearch] = useState('');
  const { services, isLoading } = require('@/hooks/useServices').useServices({ search });

  // 表单验证状态
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // 权限检查相关状态
  const [permissionCheckLoading, setPermissionCheckLoading] = useState(false);
  const [permissionCheckResult, setPermissionCheckResult] = useState<{
    canPublish: boolean;
    privateResources: Array<{
      resourceType: 'knowledge_base' | 'api' | 'database' | 'file' | 'workflow_node';
      resourceName: string;
      resourceId: string;
      permission: 'private' | 'team' | 'public';
      owner: string;
      description: string;
    }>;
    publicResources: Array<{
      resourceType: 'knowledge_base' | 'api' | 'database' | 'file' | 'workflow_node';
      resourceName: string;
      resourceId: string;
      permission: 'public' | 'team';
      description: string;
    }>;
  } | null>(null);
  
  // Logo上传模式状态
  const [logoMode, setLogoMode] = useState<'url' | 'upload'>('url');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // 权限检查函数
  const performPermissionCheck = async () => {
    setPermissionCheckLoading(true);
    
    try {
      // 模拟权限检查 - 实际实现需要调用后端API
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟网络请求
      
      // 根据服务类型进行不同的权限检查
      const serviceType = formData.serviceType || formData.type;
      
      if (serviceType === 'plugin' || serviceType === 'mcp') {
        // 插件和MCP通常权限检查较简单
        setPermissionCheckResult({
          canPublish: true,
          privateResources: [],
          publicResources: [
            {
              resourceType: 'api',
              resourceName: '公共API接口',
              resourceId: 'api_001',
              permission: 'public',
              description: '开放的API接口调用'
            },
            {
              resourceType: 'knowledge_base',
              resourceName: '公共知识库',
              resourceId: 'kb_public_001',
              permission: 'public',
              description: '开放的公共知识库资源'
            }
          ]
        });
      } else {
        // 服务流和代码服务需要更详细的权限检查
        // 模拟知识库权限检查结果
        const knowledgeBaseResources = [
          {
            resourceType: 'knowledge_base' as const,
            resourceName: '企业客户数据库',
            resourceId: 'kb_customer_001',
            permission: 'private' as const,
            owner: '当前用户',
            description: '包含客户联系信息、交易记录等敏感数据'
          },
          {
            resourceType: 'knowledge_base' as const,
            resourceName: '内部技术文档库',
            resourceId: 'kb_tech_002',
            permission: 'private' as const,
            owner: '技术团队',
            description: '包含内部技术规范、架构设计等机密信息'
          },
          {
            resourceType: 'knowledge_base' as const,
            resourceName: '产品知识库',
            resourceId: 'kb_product_003',
            permission: 'team' as const,
            owner: '产品团队',
            description: '产品相关的知识和文档，团队内部共享'
          }
        ];

        // API权限检查结果
        const apiResources = [
          {
            resourceType: 'api' as const,
            resourceName: '用户认证API',
            resourceId: 'api_auth_001', 
            permission: 'private' as const,
            owner: '当前用户',
            description: '用户身份验证和授权相关接口'
          },
          {
            resourceType: 'api' as const,
            resourceName: '数据分析API',
            resourceId: 'api_analytics_002',
            permission: 'team' as const,
            owner: '数据团队',
            description: '业务数据分析和报表生成接口'
          }
        ];

        // 其他资源检查结果
        const otherResources = [
          {
            resourceType: 'database' as const,
            resourceName: '业务数据库',
            resourceId: 'db_business_001',
            permission: 'private' as const,
            owner: '当前用户',
            description: '核心业务数据存储'
          },
          {
            resourceType: 'file' as const,
            resourceName: '配置文件',
            resourceId: 'file_config_001',
            permission: 'team' as const,
            owner: '运维团队',
            description: '系统配置和环境变量文件'
          }
        ];
        
        // 合并所有私有资源
        const mockPrivateResources = [
          ...knowledgeBaseResources.filter(kb => kb.permission === 'private'),
          ...apiResources.filter(api => api.permission === 'private'),
          ...otherResources.filter(res => res.permission === 'private')
        ];
        
        // 公开和团队共享资源
        const mockPublicResources = [
          {
            resourceType: 'knowledge_base' as const,
            resourceName: '公开技术博客',
            resourceId: 'kb_blog_001',
            permission: 'public' as const,
            description: '对外开放的技术分享知识库'
          },
          {
            resourceType: 'workflow_node' as const,
            resourceName: '标准数据处理节点',
            resourceId: 'node_001',
            permission: 'public' as const,
            description: '通用的数据处理工作流节点'
          },
          ...knowledgeBaseResources.filter(kb => kb.permission === 'team'),
          ...apiResources.filter(api => api.permission === 'team'),
          ...otherResources.filter(res => res.permission === 'team')
        ];

        setPermissionCheckResult({
          canPublish: mockPrivateResources.length === 0,
          privateResources: mockPrivateResources,
          publicResources: mockPublicResources
        });
      }
    } catch (error) {
      console.error('权限检查失败:', error);
      setPermissionCheckResult({
        canPublish: false,
        privateResources: [],
        publicResources: []
      });
    } finally {
      setPermissionCheckLoading(false);
    }
  };

  // 自动触发权限检查当进入权限检查步骤
  useEffect(() => {
    if (step === Step.PermissionCheck && !permissionCheckResult && !permissionCheckLoading) {
      performPermissionCheck();
    }
  }, [step]);

  // 实时验证单个字段
  const validateField = (fieldName: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'serviceName':
        delete newErrors.serviceName;
        if (!value?.trim()) {
          newErrors.serviceName = '服务名称不能为空';
        } else if (value.length < 2) {
          newErrors.serviceName = '服务名称至少需要2个字符';
        } else if (value.length > 50) {
          newErrors.serviceName = '服务名称不能超过50个字符';
        }
        break;
      case 'serviceDescription':
        delete newErrors.serviceDescription;
        if (!value?.trim()) {
          newErrors.serviceDescription = '服务描述不能为空';
        } else if (value.length < 10) {
          newErrors.serviceDescription = '服务描述至少需要10个字符';
        } else if (value.length > 500) {
          newErrors.serviceDescription = '服务描述不能超过500个字符';
        }
        break;
      case 'version':
        delete newErrors.version;
        if (!value?.trim()) {
          newErrors.version = '版本号不能为空';
        } else if (!/^\d+\.\d+\.\d+$/.test(value)) {
          newErrors.version = '版本号格式应为 x.y.z (如: 1.0.0)';
        }
        break;
    }
    
    setErrors(newErrors);
  };
  
  // 表单验证函数
  const validateEditInfoForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // 服务名称验证
    if (!formData.serviceName?.trim()) {
      newErrors.serviceName = '服务名称不能为空';
    } else if (formData.serviceName.length < 2) {
      newErrors.serviceName = '服务名称至少需要2个字符';
    } else if (formData.serviceName.length > 50) {
      newErrors.serviceName = '服务名称不能超过50个字符';
    }
    
    // 服务描述验证
    if (!formData.serviceDescription?.trim()) {
      newErrors.serviceDescription = '服务描述不能为空';
    } else if (formData.serviceDescription.length < 10) {
      newErrors.serviceDescription = '服务描述至少需要10个字符';
    } else if (formData.serviceDescription.length > 500) {
      newErrors.serviceDescription = '服务描述不能超过500个字符';
    }
    
    // 版本号验证
    if (!formData.version?.trim()) {
      newErrors.version = '版本号不能为空';
    } else if (!/^\d+\.\d+\.\d+$/.test(formData.version)) {
      newErrors.version = '版本号格式应为 x.y.z (如: 1.0.0)';
    }
    
    // 功能分类验证
    if (!formData.category?.trim()) {
      newErrors.category = '请选择功能分类';
    }
    
    // 标签验证
    if (!formData.tags || formData.tags.length === 0) {
      newErrors.tags = '至少添加一个标签';
    } else if (formData.tags.length > 10) {
      newErrors.tags = '最多只能添加10个标签';
    }
    
    // 价格验证
    if (formData.pricingModel === 'paid') {
      if (!formData.price || formData.price <= 0) {
        newErrors.price = '付费服务需要设置大于0的价格';
      } else if (formData.price > 9999) {
        newErrors.price = '价格不能超过9999元';
      }
    }
    
    // 使用说明验证
    if (formData.instructions && formData.instructions.length > 2000) {
      newErrors.instructions = '使用说明不能超过2000个字符';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 添加标签函数
  const addTag = (newTag: string) => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()]
      });
    }
  };

  // 移除标签函数
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((tag: string) => tag !== tagToRemove)
    });
  };

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 验证文件类型
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('请上传图片文件（JPG、PNG、GIF、WebP）');
        return;
      }
      
      // 验证文件大小（限制为2MB）
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('图片文件大小不能超过2MB');
        return;
      }
      
      setUploadedFile(file);
      
      // 创建本地预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, serviceLogo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 清除上传的文件
  const clearUploadedFile = () => {
    setUploadedFile(null);
    setFormData({ ...formData, serviceLogo: '' });
  };

  // 初始化表单数据函数
  const initializeFormData = (service: any) => {
    const currentVersion = service.version || '1.0.0';
    const versionParts = currentVersion.split('.');
    const newMinorVersion = parseInt(versionParts[2] || '0') + 1;
    const suggestedVersion = `${versionParts[0]}.${versionParts[1]}.${newMinorVersion}`;

    setFormData({
      ...formData,
      selectedService: service,
      serviceName: service.name || '',
      serviceDescription: service.description || '',
      serviceLogo: service.icon || '📦',
      version: suggestedVersion,
      category: service.category || '',
      tags: service.tags ? [...service.tags] : [],
      pricingModel: 'free',
      price: 0,
      instructions: ''
    });
  };

  // 步骤内容渲染
  const renderStep = () => {
    switch (step) {
      case Step.SelectType:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">选择要上架的服务类型</h2>
            <div className="flex gap-4 mb-6">
              <Button onClick={() => { setFormData({ ...formData, type: 'plugin' }); setStep(Step.SelectSource); }}>插件服务</Button>
              <Button onClick={() => { setFormData({ ...formData, type: 'mcp' }); setStep(Step.SelectSource); }}>MCP服务</Button>
              <Button onClick={() => { setFormData({ ...formData, type: 'workflow' }); setStep(Step.SelectSource); }}>服务流模板</Button>
              <Button onClick={() => { setFormData({ ...formData, type: 'code' }); setStep(Step.SelectSource); }}>代码服务模板</Button>
            </div>
          </div>
        );
      case Step.SelectSource:
        return (
          <div className="flex h-[70vh] bg-white rounded-lg overflow-hidden">
            {/* 左侧导航栏 */}
            <div className="w-48 bg-gray-50 border-r flex flex-col items-center py-6 relative">
              {/* 新建服务按钮始终在最上方 */}
              <Button className="w-36 mb-6 bg-blue-600 text-white font-bold" onClick={() => {/* TODO: 跳转新建服务 */}}>新建服务</Button>
              {/* tab 切换 */}
              <div className="w-full flex flex-col gap-2">
                <button
                  className={`w-full py-2 rounded text-base font-semibold ${leftTab === 'space' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border'} transition`}
                  onClick={() => setLeftTab('space')}
                >
                  我的空间
                </button>
                <button
                  className={`w-full py-2 rounded text-base font-semibold ${leftTab === 'market' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border'} transition`}
                  onClick={() => setLeftTab('market')}
                >
                  插件市场
                </button>
              </div>
            </div>
            {/* 右侧服务列表区 */}
            <div className="flex-1 flex flex-col">
              {/* 顶部搜索栏 */}
              <div className="flex items-center px-6 py-4 border-b">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`输入关键词搜索${leftTab === 'market' ? '插件市场' : '我的空间'}服务/工具`}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              {/* 服务列表 */}
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                {isLoading ? (
                  <div className="text-gray-400 text-center py-12">加载中...</div>
                ) : services.length === 0 ? (
                  <div className="text-gray-400 text-center py-12">暂无可上架服务</div>
                ) : (
                  <ul>
                    {services.map((service: Service) => (
                      <li
                        key={service.id}
                        className="flex items-center gap-4 py-4 border-b cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => {
                          initializeFormData(service);
                          setStep(Step.EditInfo);
                        }}
                      >
                        <img src={service.icon} alt={service.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-base text-gray-900 truncate">{service.name}</span>
                            <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">{service.type.toUpperCase()}</span>
                            <span className="ml-2 text-xs text-gray-400">v{service.version}</span>
                          </div>
                          <div className="text-xs text-gray-500 truncate">{service.description}</div>
                        </div>
                        <div className="flex flex-col items-end min-w-[80px]">
                          <span className="text-xs text-gray-500">{service.developer}</span>
                          <span className="text-xs text-gray-400 mt-1">{service.usageCount} 使用</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* 返回按钮 */}
            <div className="absolute left-4 bottom-4">
              <Button variant="ghost" onClick={() => setStep(Step.SelectType)}>上一步</Button>
            </div>
          </div>
        );
      case Step.EditInfo: {
        const selectedService = formData.selectedService;
        
        return (
          <div className="max-h-[75vh] overflow-y-auto">
            {/* 头部信息 */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                {formData.serviceLogo ? (
                  formData.serviceLogo.startsWith('data:') || formData.serviceLogo.startsWith('http') ? (
                    <img 
                      src={formData.serviceLogo} 
                      alt="服务Logo" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <span className="text-lg flex items-center justify-center">{formData.serviceLogo}</span>
                  )
                ) : (
                  <span className="text-lg flex items-center justify-center">{selectedService?.icon || '📦'}</span>
                )}
                <span className="text-lg hidden items-center justify-center">📦</span>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 leading-tight">编辑服务信息</h2>
                <p className="text-xs text-gray-600 leading-tight">
                  正在编辑: <span className="font-medium">{selectedService?.name}</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* 基础信息区域 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1">
                  📝 基础信息
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {/* 服务名称 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      服务名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.serviceName || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceName: e.target.value });
                        validateField('serviceName', e.target.value);
                      }}
                      placeholder="输入服务名称"
                      className={`w-full border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                        errors.serviceName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.serviceName && <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">⚠️ {errors.serviceName}</p>}
                    <p className="text-xs text-gray-500 mt-0.5">{formData.serviceName?.length || 0}/50 字符</p>
                  </div>
                  
                  {/* 版本号 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      版本号 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.version || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, version: e.target.value });
                          validateField('version', e.target.value);
                        }}
                        placeholder="1.0.0"
                        className={`w-full border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                          errors.version ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <span className="text-xs text-gray-400">🔄</span>
                      </div>
                    </div>
                    {errors.version && <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">⚠️ {errors.version}</p>}
                  </div>

                  {/* 功能分类 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      功能分类 <span className="text-red-500">*</span>
                    </label>
                    <select 
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={`w-full border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                        errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <option value="">选择功能分类</option>
                      <option value="search">🔍 搜索类</option>
                      <option value="video">🎥 视频类</option>
                      <option value="image">🖼️ 图片类</option>
                      <option value="news">📰 新闻类</option>
                      <option value="data">📊 数据类</option>
                      <option value="communication">💬 通信类</option>
                      <option value="tools">🔧 工具类</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">⚠️ {errors.category}</p>}
                  </div>
                </div>

                {/* 服务描述 */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    服务描述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.serviceDescription || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, serviceDescription: e.target.value });
                      validateField('serviceDescription', e.target.value);
                    }}
                    placeholder="详细描述服务的功能和用途，包括主要特性、适用场景等..."
                    rows={3}
                    className={`w-full border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none ${
                      errors.serviceDescription ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  {errors.serviceDescription && <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">⚠️ {errors.serviceDescription}</p>}
                  <p className="text-xs text-gray-500 mt-0.5">{formData.serviceDescription?.length || 0}/500 字符</p>
                </div>
              </div>

              {/* 外观和Logo */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1">
                  🎨 服务Logo
                </h3>
                
                {/* Logo模式切换 */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setLogoMode('url');
                      clearUploadedFile();
                    }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      logoMode === 'url' 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    🔗 URL链接
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLogoMode('upload');
                      setFormData({ ...formData, serviceLogo: '' });
                    }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      logoMode === 'upload' 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    📁 本地上传
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                      {formData.serviceLogo ? (
                        formData.serviceLogo.startsWith('data:') || formData.serviceLogo.startsWith('http') ? (
                          <img 
                            src={formData.serviceLogo} 
                            alt="Logo预览" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'block';
                            }}
                          />
                        ) : (
                          <span className="text-lg">{formData.serviceLogo}</span>
                        )
                      ) : (
                        <span className="text-lg">📦</span>
                      )}
                      <span className="text-lg hidden">📦</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {logoMode === 'url' ? (
                      // URL输入模式
                      <div>
                        <input
                          type="text"
                          value={formData.serviceLogo || ''}
                          onChange={(e) => setFormData({ ...formData, serviceLogo: e.target.value })}
                          placeholder="输入Logo URL或emoji"
                          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-gray-400 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-0.5">支持URL链接或emoji表情</p>
                      </div>
                    ) : (
                      // 文件上传模式
                      <div>
                        <div className="flex gap-2">
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <div className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                              📁 选择图片文件
                            </div>
                          </label>
                          {uploadedFile && (
                            <button
                              type="button"
                              onClick={clearUploadedFile}
                              className="px-2 py-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors text-sm"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                        {uploadedFile ? (
                          <p className="text-xs text-green-600 mt-0.5">✅ 已上传: {uploadedFile.name}</p>
                        ) : (
                          <p className="text-xs text-gray-500 mt-0.5">支持JPG、PNG、GIF、WebP，最大2MB</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 标签管理 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1">
                  🏷️ 服务标签 <span className="text-red-500">*</span>
                </h3>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="输入标签名称..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-gray-400 transition-colors"
                    />
                    <Button 
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addTag(input.value);
                        input.value = '';
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                    >
                      ➕
                    </Button>
                  </div>
                  
                  {/* 标签显示区域 */}
                  <div className="min-h-[40px] border border-gray-200 rounded-md p-2 bg-gray-50">
                    {(formData.tags && formData.tags.length > 0) ? (
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag: string, index: number) => (
                          <span key={index} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs rounded-full transition-colors">
                            {tag}
                            <button 
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:bg-blue-300 rounded-full p-0.5 transition-colors text-xs"
                            >
                              ❌
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs">暂无标签，请添加至少一个标签</p>
                    )}
                  </div>
                  
                  {errors.tags && <p className="text-red-500 text-xs flex items-center gap-1">⚠️ {errors.tags}</p>}
                  
                  {/* 推荐标签 */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">💡 推荐标签:</p>
                    <div className="flex flex-wrap gap-1">
                      {['API', '效率工具', '自动化', 'AI助手', '数据处理'].map((suggestedTag) => (
                        <button
                          key={suggestedTag}
                          type="button"
                          onClick={() => addTag(suggestedTag)}
                          className="text-xs px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border transition-colors"
                        >
                          + {suggestedTag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 定价和说明 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 定价模式 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1">
                    💰 定价模式
                  </h3>
                  
                  <div className="space-y-2">
                    {/* 免费选项 */}
                    <label className="flex items-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <input 
                        type="radio" 
                        name="pricing" 
                        value="free" 
                        checked={formData.pricingModel === 'free' || !formData.pricingModel}
                        onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value as 'free', price: 0 })}
                        className="mr-2" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">🆓 免费</span>
                          <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">推荐</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">适合开源项目和试用版本</p>
                      </div>
                    </label>
                    
                    {/* 付费选项 */}
                    <label className="flex items-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <input 
                        type="radio" 
                        name="pricing" 
                        value="paid" 
                        checked={formData.pricingModel === 'paid'}
                        onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value as 'paid' })}
                        className="mr-2" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">💎 付费</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">提供高级功能和专业支持</p>
                        
                        {formData.pricingModel === 'paid' && (
                          <div className="mt-2 flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-700">设置价格:</label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={formData.price || ''}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                placeholder="99"
                                min="1"
                                max="9999"
                                className={`w-16 border rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                                  errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                              />
                              <span className="text-xs text-gray-700 font-medium">元</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                    
                    {errors.price && <p className="text-red-500 text-xs flex items-center gap-1">⚠️ {errors.price}</p>}
                  </div>
                </div>

                {/* 使用说明 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-1">
                    📋 使用说明
                  </h3>
                  
                  <div className="space-y-2">
                    <textarea
                      value={formData.instructions || ''}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      placeholder="详细说明服务的使用方法和注意事项，例如：&#10;• 如何安装和配置&#10;• 主要功能介绍&#10;• 使用示例&#10;• 注意事项和限制&#10;• 故障排除指南"
                      rows={6}
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-gray-400 transition-colors resize-none"
                    />
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>💡 详细说明有助于用户理解服务</span>
                      <span>{formData.instructions?.length || 0}/2000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部操作区域 */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 bg-gray-50 -mx-6 px-6 -mb-6 pb-4">
              <Button 
                variant="ghost" 
                onClick={() => setStep(Step.SelectSource)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm"
              >
                ← 上一步
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-600">
                  完成度: <span className="font-medium">{Math.round(((formData.serviceName ? 1 : 0) + (formData.serviceDescription ? 1 : 0) + (formData.version ? 1 : 0) + (formData.category ? 1 : 0) + (formData.tags?.length > 0 ? 1 : 0)) / 5 * 100)}%</span>
                </div>
                <Button 
                  onClick={() => {
                    if (validateEditInfoForm()) {
                      setStep(Step.PermissionCheck);
                    }
                  }} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 flex items-center gap-1 text-sm"
                >
                  下一步 →
                </Button>
              </div>
            </div>
          </div>
        );
      }
      case Step.PermissionCheck:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">权限检查</h2>
              <p className="text-sm text-muted-foreground mb-4">
                正在检查您的服务所需资源的访问权限，请确保所有依赖资源都已正确配置...
              </p>
            </div>

            {permissionCheckLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-muted-foreground">正在检查权限...</span>
                </div>
              </div>
            ) : permissionCheckResult ? (
              <div className="space-y-6">
                {/* 检查结果概览 */}
                <div className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center gap-2 mb-2">
                    {permissionCheckResult.privateResources.length > 0 ? (
                      <>
                        <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                        <span className="text-sm font-medium text-amber-700">发现私有资源</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-green-700">权限检查通过</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {permissionCheckResult.privateResources.length > 0
                      ? "检测到私有资源，请确认是否继续发布或调整权限设置"
                      : "所有依赖资源均为公开资源，可以正常发布"
                    }
                  </p>
                </div>

                {/* 私有资源列表 */}
                {permissionCheckResult.privateResources.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-red-100 flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-500 rounded"></div>
                      </div>
                      私有资源 ({permissionCheckResult.privateResources.length})
                    </h3>
                    <div className="space-y-2">
                      {permissionCheckResult.privateResources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center">
                              <span className="text-xs font-medium text-red-600">
                                {resource.resourceType === 'knowledge_base' ? 'KB' : 
                                 resource.resourceType === 'api' ? 'API' : 
                                 resource.resourceType === 'database' ? 'DB' : 
                                 resource.resourceType === 'file' ? 'FILE' : 'WF'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{resource.resourceName}</div>
                              <div className="text-xs text-muted-foreground">{resource.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                              {resource.permission === 'private' ? '私有' : '受限'}
                            </span>
                            <Button variant="outline" size="sm" className="text-xs">
                              调整权限
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 公开资源列表 */}
                {permissionCheckResult.publicResources.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-100 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded"></div>
                      </div>
                      公开资源 ({permissionCheckResult.publicResources.length})
                    </h3>
                    <div className="space-y-2">
                      {permissionCheckResult.publicResources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-green-50/30">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center">
                              <span className="text-xs font-medium text-green-600">
                                {resource.resourceType === 'knowledge_base' ? 'KB' : 
                                 resource.resourceType === 'api' ? 'API' : 
                                 resource.resourceType === 'database' ? 'DB' : 
                                 resource.resourceType === 'file' ? 'FILE' : 'WF'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{resource.resourceName}</div>
                              <div className="text-xs text-muted-foreground">{resource.description}</div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                            {resource.permission === 'public' ? '公开' : '共享'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 权限建议 */}
                {permissionCheckResult.privateResources.length > 0 && (
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">权限建议</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• 私有资源将限制服务的使用范围，只有授权用户可以访问</li>
                      {permissionCheckResult.privateResources.some(r => r.resourceType === 'knowledge_base') && (
                        <li>• <strong>知识库权限:</strong> 私有知识库包含敏感信息，建议评估数据安全级别后决定是否公开</li>
                      )}
                      {permissionCheckResult.privateResources.some(r => r.resourceType === 'api') && (
                        <li>• <strong>API权限:</strong> 私有API接口可能涉及安全认证，请确认调用权限范围</li>
                      )}
                      {permissionCheckResult.privateResources.some(r => r.resourceType === 'database') && (
                        <li>• <strong>数据库权限:</strong> 私有数据库访问需要严格的权限控制</li>
                      )}
                      <li>• 建议将常用资源设置为公开或团队共享，以提高服务的可用性</li>
                      <li>• 您可以在发布后随时调整资源权限设置</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">点击下方按钮开始权限检查</p>
                  <Button onClick={performPermissionCheck}>
                    开始检查
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(Step.EditInfo)}>
                上一步
              </Button>
              <div className="flex gap-3">
                {permissionCheckResult && permissionCheckResult.privateResources.length > 0 && !permissionCheckLoading && (
                  <Button 
                    variant="outline" 
                    onClick={performPermissionCheck}
                  >
                    重新检查
                  </Button>
                )}
                <Button 
                  onClick={() => {
                    // 直接确认上架，将数据传递给父组件
                    const publishData = {
                      ...formData,
                      permissionCheckResult,
                      publishTime: new Date().toISOString(),
                      status: 'published'
                    };
                    onPublish(publishData);
                    onClose();
                  }}
                  disabled={permissionCheckLoading || !permissionCheckResult}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  确认上架
                </Button>
              </div>
            </div>
          </div>
        );
      case Step.Confirm:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">上架确认</h2>
            <div className="mb-6">[服务信息预览与协议勾选区域]</div>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(Step.PermissionCheck)}>上一步</Button>
              <Button onClick={() => { onPublish(formData); onClose(); }}>确认上架</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">服务上架</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 leading-relaxed">分步完成服务上架流程，提升信息准确性和体验</DialogDescription>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}