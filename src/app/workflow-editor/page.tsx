'use client';

import React, { useState } from 'react';
import AgentOrchestrationPage from '@/components/app-builder/AgentOrchestrationPage';

export default function WorkflowEditorPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // 如果模态框关闭，显示一个简单的页面
  if (!isModalOpen) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">功能编排</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            打开编排界面
          </button>
        </div>
      </div>
    );
  }

  return (
    <AgentOrchestrationPage
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      appName="333"
    />
  );
}
