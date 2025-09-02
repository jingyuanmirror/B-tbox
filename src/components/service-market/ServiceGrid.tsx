'use client';

import { Service } from '@/types/service';
import { ServiceCard } from './ServiceCard';
import { Loader2 } from 'lucide-react';

interface ServiceGridProps {
  services: Service[];
  loading?: boolean;
  onSubscribe?: (serviceId: string) => void;
  onPurchase?: (serviceId: string) => void;
  onViewDetails?: (serviceId: string) => void;
}

export function ServiceGrid({ 
  services, 
  loading = false, 
  onSubscribe, 
  onPurchase, 
  onViewDetails 
}: ServiceGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">加载服务中...</p>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <div className="h-24 w-24 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              没有找到匹配的服务
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              尝试调整搜索条件或浏览其他分类
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onSubscribe={onSubscribe}
          onPurchase={onPurchase}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}