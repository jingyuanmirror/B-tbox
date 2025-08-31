'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
            <Icon className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            功能开发中
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            该功能正在积极开发中，敬请期待更多精彩内容。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}