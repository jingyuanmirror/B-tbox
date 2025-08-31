
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';

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
  const { services, isLoading } = require('../../hooks/useServices').useServices({ search });

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
                    {services.map((service: import('../../types/service').Service) => (
                      <li
                        key={service.id}
                        className="flex items-center gap-4 py-4 border-b cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => {
                          setFormData({ ...formData, selectedService: service });
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
      case Step.EditInfo:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">服务信息编辑</h2>
            <div className="mb-6">[服务信息编辑表单区域]</div>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(Step.SelectSource)}>上一步</Button>
              <Button onClick={() => setStep(Step.PermissionCheck)}>下一步</Button>
            </div>
          </div>
        );
      case Step.PermissionCheck:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">权限检查</h2>
            <div className="mb-6">[权限检查结果区域]</div>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(Step.EditInfo)}>上一步</Button>
              <Button onClick={() => setStep(Step.Confirm)}>下一步</Button>
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>服务上架</DialogTitle>
          <DialogDescription>分步完成服务上架流程，提升信息准确性和体验</DialogDescription>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}