'use client';

import { useState, useEffect } from 'react';
import { ServiceType } from '../../types/service';
import { ServiceMarketTabs } from '../service-market/ServiceMarketTabs';
import { ServiceMarketContent } from '../service-market/ServiceMarketContent';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { PublishServiceModal } from '../service-market/PublishServiceModal';

export function ServiceMarketPage() {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [activeTab, setActiveTab] = useState<ServiceType | 'all'>('all');
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsCompact(scrollY > 100); // 滚动超过100px时切换到紧凑模式
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePublishService = (data: any) => {
    console.log('Publishing service:', data);
    // TODO: 实现服务发布逻辑
  };

  return (
    <div>
      {/* Normal Header - Shows when not scrolled */}
      <div className="px-6 py-4 pb-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              服务市场
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              发现和使用优质的AI服务，提升您的应用开发效率
            </p>
          </div>
          <Button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center space-x-2 font-bold bg-blue-600 text-white border-2 border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700 hover:scale-[1.04] transition-all px-6 py-3 rounded-xl text-base"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>发布服务</span>
          </Button>
        </div>
        <ServiceMarketTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Sticky Compact Header - Shows when scrolled */}
      <div 
        className={`sticky top-16 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isCompact 
            ? 'transform translate-y-0 opacity-100' 
            : 'transform -translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">服务市场</h2>
              <div className="flex items-center space-x-2">
                <ServiceMarketTabs activeTab={activeTab} setActiveTab={setActiveTab} compact />
              </div>
            </div>
            <Button onClick={() => setShowPublishModal(true)} className="flex items-center space-x-2" size="sm">
              <Plus className="h-4 w-4" />
              <span>发布服务</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 -mt-6 pb-6">
        <ServiceMarketContent activeTab={activeTab} />
      </div>

      {/* Publish Service Modal */}
      <PublishServiceModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onPublish={handlePublishService}
      />
    </div>
  );
}