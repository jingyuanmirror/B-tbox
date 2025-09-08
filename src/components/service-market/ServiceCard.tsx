'use client';

import { Service, ServiceType } from '@/types/service';
import { CATEGORY_CONFIG } from '@/constants/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Wrench, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onViewDetails?: (serviceId: string) => void;
  onSubscribe?: (serviceId: string) => void;
  onPurchase?: (serviceId: string) => void;
}

export function ServiceCard({ service, onViewDetails, onSubscribe, onPurchase }: ServiceCardProps) {
  const getServiceTypeLabel = (type: ServiceType) => {
    switch (type) {
      case ServiceType.PLUGIN:
        return '插件';
      case ServiceType.MCP:
        return 'MCP';
      case ServiceType.SERVICE_FLOW:
        return '服务流';
      case ServiceType.CODE_SERVICE:
        return '代码服务';
      default:
        return '未知';
    }
  };

  const getServiceTypeBadge = (type: ServiceType) => {
    // 统一使用灰色调，弱化视觉效果
    return 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600';
  };

  const handleCardClick = () => {
    onViewDetails?.(service.id);
  };

  return (
    <Card 
      className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="px-3 py-1.5">
        <div className="flex gap-3">
          {/* Logo - 全面填充、无白色背景、居中显示 */}
          <div className="flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-sm">
            {service.icon ? (
              service.icon.startsWith('http') ? (
                <img 
                  src={service.icon} 
                  alt={service.name}
                  className="w-full h-full object-cover object-center rounded-lg"
                  style={{ background: 'transparent' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class=\"w-full h-full flex items-center justify-center text-2xl\">📦</div>`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
            )}
          </div>
          
          {/* 主要内容区域 */}
          <div className="flex-1 min-w-0">
            {/* 标题行 - 将服务类型标签移到右上角 */}
            <div className="flex items-center justify-between mb-0">
              <h3 className="font-medium text-xs text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors flex-1 mr-2 leading-normal">
                {service.name}
              </h3>
              {/* 服务类型标签 - 右上角位置，默认隐藏，hover时显示 */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 -mt-0.5">
                <Badge className={cn('text-xs px-1.5 py-0.5 border', getServiceTypeBadge(service.type))}>
                  {getServiceTypeLabel(service.type)}
                </Badge>
              </div>
            </div>
            
            {/* 描述 */}
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-1.5 leading-relaxed">
              {service.description}
            </p>
            
            {/* 统计信息行 */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 leading-normal">
              <div className="flex items-center gap-3">
                {(service.type === ServiceType.PLUGIN || service.type === ServiceType.MCP) && service.toolCount && (
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3 h-3" />
                    {service.toolCount}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {service.usageCount.toLocaleString()}
                </span>
                {service.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {service.rating.toFixed(1)}
                  </span>
                )}
              </div>
              
              {/* 免费标识 */}
              {service.isFree && (
                <Badge className="bg-green-50 text-green-600 border-green-200 text-xs px-2 py-0.5">
                  免费
                </Badge>
              )}
            </div>
            
            {/* 更新时间 */}
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0 leading-normal">
              最近更新时间 {new Date(service.updatedAt).toLocaleDateString('zh-CN', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}