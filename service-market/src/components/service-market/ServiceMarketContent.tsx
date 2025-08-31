'use client';

import { useState } from 'react';
import { ServiceType, ServiceCategory } from '../../types/service';
import { ServiceGrid } from '../services/ServiceGrid';
import { SearchAndFilters } from '../services/SearchAndFilters';
import { useServices } from '../../hooks/useServices';
import { useServiceStore } from '../../store/useServiceStore';

interface ServiceMarketContentProps {
  activeTab: ServiceType | 'all';
}

export function ServiceMarketContent({ activeTab }: ServiceMarketContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedScope, setSelectedScope] = useState<'all' | 'published' | 'favorited'>('all');
  
  const {
    searchTerm,
    filter,
    setSearchTerm,
    setFilter
  } = useServiceStore();

  // Create filter object for API call
  const apiFilter = {
    ...filter,
    search: searchTerm || undefined,
    category: selectedCategory || undefined,
    type: activeTab === 'all' ? undefined : activeTab
  };

  const { services, isLoading } = useServices(apiFilter);

  const handleSubscribe = (serviceId: string) => {
    console.log('Subscribe to service:', serviceId);
  };

  const handlePurchase = (serviceId: string) => {
    console.log('Purchase service:', serviceId);
  };

  const handleViewDetails = (serviceId: string) => {
    console.log('View service details:', serviceId);
  };


  return (
    <div className="space-y-3">
      {/* Search and Additional Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
        totalResults={services.length}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      {/* Service Grid */}
      <ServiceGrid
        services={services}
        loading={isLoading}
        onSubscribe={handleSubscribe}
        onPurchase={handlePurchase}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}