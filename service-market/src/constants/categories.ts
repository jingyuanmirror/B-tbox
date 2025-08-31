import { ServiceCategory } from '../types/service';
import { Search, Video, Image, Newspaper, Database, MessageSquare, Wrench } from 'lucide-react';

export const CATEGORY_CONFIG = {
  [ServiceCategory.SEARCH]: {
    icon: Search,
    label: '搜索类',
    description: '文档搜索、网络搜索、数据查询等',
    color: 'text-blue-600 dark:text-blue-400'
  },
  [ServiceCategory.VIDEO]: {
    icon: Video,
    label: '视频类',
    description: '视频生成、视频分析、视频编辑等',
    color: 'text-purple-600 dark:text-purple-400'
  },
  [ServiceCategory.IMAGE]: {
    icon: Image,
    label: '图片类',
    description: '图像生成、图像识别、图像处理等',
    color: 'text-green-600 dark:text-green-400'
  },
  [ServiceCategory.NEWS]: {
    icon: Newspaper,
    label: '新闻类',
    description: '新闻获取、内容分析、信息聚合等',
    color: 'text-orange-600 dark:text-orange-400'
  },
  [ServiceCategory.DATA]: {
    icon: Database,
    label: '数据类',
    description: '数据分析、数据可视化、数据处理等',
    color: 'text-indigo-600 dark:text-indigo-400'
  },
  [ServiceCategory.COMMUNICATION]: {
    icon: MessageSquare,
    label: '通信类',
    description: '邮件发送、消息推送、API调用等',
    color: 'text-teal-600 dark:text-teal-400'
  },
  [ServiceCategory.TOOLS]: {
    icon: Wrench,
    label: '工具类',
    description: '文件处理、格式转换、计算服务等',
    color: 'text-gray-600 dark:text-gray-400'
  }
} as const;