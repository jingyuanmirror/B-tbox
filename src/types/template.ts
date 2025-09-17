export interface TemplateCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  usageCount: number;
  tags: string[];
  isWorkTemplate?: boolean;
}

export interface TemplateCategory {
  key: string;
  label: string;
  count: number | null;
}

export type ViewMode = "grid" | "list";
