'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { ServiceMarketPage } from '@/components/pages/ServiceMarketPage';
import { PlaceholderPage } from '@/components/pages/PlaceholderPage';
import { 
  Bot, 
  BarChart3, 
  FileText, 
  Users, 
  Settings 
} from 'lucide-react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'service-market':
        return <ServiceMarketPage />;
      case 'agents':
        return (
          <PlaceholderPage
            title="智能体"
            description="管理和配置您的AI智能体"
            icon={Bot}
          />
        );
      case 'analytics':
        return (
          <PlaceholderPage
            title="数据分析"
            description="查看使用情况和性能统计"
            icon={BarChart3}
          />
        );
      case 'documents':
        return (
          <PlaceholderPage
            title="文档管理"
            description="管理知识库和文档资源"
            icon={FileText}
          />
        );
      case 'team':
        return (
          <PlaceholderPage
            title="团队协作"
            description="管理团队成员和权限"
            icon={Users}
          />
        );
      case 'settings':
        return (
          <PlaceholderPage
            title="设置"
            description="配置系统和个人偏好"
            icon={Settings}
          />
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar - Hidden on mobile by default */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
