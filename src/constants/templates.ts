import { TemplateCard, TemplateCategory } from "@/types/template";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { key: "all", label: "全部", count: null },
  { key: "conference", label: "会展", count: null },
  { key: "travel", label: "出行", count: null },
  { key: "museum", label: "博物馆", count: null },
  { key: "culture", label: "文旅景区", count: null },
  { key: "catering", label: "餐饮", count: null },
  { key: "education", label: "高校", count: null },
];

export const TEMPLATE_DATA: TemplateCard[] = [
  {
    id: "1",
    title: "文旅景区模版",
    description: "AI景区引导、智慧作伴、全程无忧",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
    category: "culture",
    usageCount: 1257,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "2", 
    title: "高校智能作行业模版",
    description: "支持宿舍预约高效解答、支持课表查询、上课打卡等常场景、学生宿舍智能客服、答疑解题等功能、高",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=240&fit=crop",
    category: "education",
    usageCount: 666,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "3",
    title: "会展活动模版",
    description: "AI展会引导、打造智能会场服务",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop",
    category: "conference", 
    usageCount: 524,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "4",
    title: "博物馆模版",
    description: "AI导览讲解、探索美景合一、慢游之旅",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=240&fit=crop", 
    category: "museum",
    usageCount: 241,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "5",
    title: "机场枢纽智能伴随模版",
    description: "适用于机场枢纽站台、候机候船航次大厅、旅客出发！",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=240&fit=crop",
    category: "travel",
    usageCount: 892,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "6",
    title: "动物园模版",
    description: "适用于动物园幼儿、儿童工作展、明星动物、游园知识",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=240&fit=crop",
    category: "culture", 
    usageCount: 445,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "7",
    title: "停车智能作模版",
    description: "适用于停车场区、修坎提供泊车推荐停车位、停车收费缴费引导、收费策略",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=240&fit=crop",
    category: "travel",
    usageCount: 327,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "8", 
    title: "高铁枢纽智能伴随模版",
    description: "适用于高速枢纽站台、候车候船航次大厅、旅客出发！",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=240&fit=crop",
    category: "travel",
    usageCount: 892,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "9",
    title: "餐饮连锁智能服务模版",
    description: "智能点餐、菜品推荐、会员服务一体化解决方案",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=240&fit=crop",
    category: "catering",
    usageCount: 523,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "10",
    title: "酒店智能客服模版",
    description: "24小时智能前台、房间服务、本地推荐服务",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=240&fit=crop",
    category: "travel",
    usageCount: 789,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "11",
    title: "展会智能导览模版",
    description: "展商信息查询、展馆导航、活动推荐一站式服务",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=240&fit=crop",
    category: "conference",
    usageCount: 412,
    tags: ["工作模版"],
    isWorkTemplate: true
  },
  {
    id: "12",
    title: "校园生活助手模版",
    description: "课程查询、食堂推荐、校园活动、学习辅助全覆盖",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=240&fit=crop",
    category: "education",
    usageCount: 634,
    tags: ["工作模版"],
    isWorkTemplate: true
  }
];
