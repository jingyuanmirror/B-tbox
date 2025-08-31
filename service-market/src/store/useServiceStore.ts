import { create } from 'zustand';
import { Service, ServiceFilter, ServiceCategory, ServiceType } from '../types/service';

interface ServiceStore {
  services: Service[];
  filter: ServiceFilter;
  loading: boolean;
  searchTerm: string;
  selectedCategory: ServiceCategory | null;
  selectedType: ServiceType | null;
  
  // Actions
  setServices: (services: Service[]) => void;
  setFilter: (filter: Partial<ServiceFilter>) => void;
  setLoading: (loading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: ServiceCategory | null) => void;
  setSelectedType: (type: ServiceType | null) => void;
  clearFilters: () => void;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  filter: {},
  loading: false,
  searchTerm: '',
  selectedCategory: null,
  selectedType: null,

  setServices: (services) => set({ services }),
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