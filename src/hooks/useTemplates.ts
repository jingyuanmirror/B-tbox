import { useState, useMemo } from "react";
import { TemplateCard, ViewMode } from "@/types/template";
import { TEMPLATE_DATA } from "@/constants/templates";

export function useTemplates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_DATA.filter(template => {
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return {
    selectedCategory,
    searchQuery,
    viewMode,
    filteredTemplates,
    handleCategoryChange,
    handleSearchChange,
    handleViewModeChange,
  };
}
