import { create } from 'zustand';
import { Service, ServiceFilter, ServiceCategory, ServiceType } from '../types/service';

interface ServiceStore {
  services: Service[];
  publishedServices: Service[]; // 我的已发布服务
  filter: ServiceFilter;
  loading: boolean;
  searchTerm: string;
  selectedCategory: ServiceCategory | null;
  selectedType: ServiceType | null;
  
  // Actions
  setServices: (services: Service[]) => void;
  setPublishedServices: (services: Service[]) => void;
  addPublishedService: (service: Service) => void;
  setFilter: (filter: Partial<ServiceFilter>) => void;
  setLoading: (loading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: ServiceCategory | null) => void;
  setSelectedType: (type: ServiceType | null) => void;
  clearFilters: () => void;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  publishedServices: [],
  filter: {},
  loading: false,
  searchTerm: '',
  selectedCategory: null,
  selectedType: null,

  setServices: (services) => set({ services }),
  setPublishedServices: (publishedServices) => set({ publishedServices }),
  addPublishedService: (service) => set((state) => ({ 
    publishedServices: [...state.publishedServices, service] 
  })),
  setFilter: (newFilter) => set((state) => ({ 
    filter: { ...state.filter, ...newFilter } 
  })),
  setLoading: (loading) => set({ loading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedType: (selectedType) => set({ selectedType }),
  clearFilters: () => set({
    filter: {},
    searchTerm: '',
    selectedCategory: null,
    selectedType: null
  })
}));