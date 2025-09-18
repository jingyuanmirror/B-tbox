'use client';

import { useState } from 'react';
import { Rocket, Calendar, AlertTriangle, CheckCircle, Users, Activity, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  name: string;
  progress: number;
  owner: string;
  dueDate: string;
  status: 'normal' | 'warning' | 'delayed';
  description: string;
  risksCount: number;
  tasks: {
    completed: number;
    total: number;
  };
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  workload: number;
  recentActivity: string;
  skills: string[];
  isOnline: boolean;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: '酒店智能客服项目',
    progress: 80,
    owner: '张三',
    dueDate: '2024-02-15',
    status: 'warning',
    description: '为五星酒店开发智能客服系统',
    risksCount: 1,
    tasks: { completed: 8, total: 10 }
  },
  {
    id: '2',
    name: '景区导览助手',
    progress: 60,
    owner: '李四',
    dueDate: '2024-02-20',
    status: 'normal',
    description: '智能景区导览和推荐服务',
    risksCount: 0,
    tasks: { completed: 6, total: 10 }
  },
  {
    id: '3',
    name: '企业内训机器人',
    progress: 30,
    owner: '王五',
    dueDate: '2024-03-01',
    status: 'delayed',
    description: '企业培训知识库智能问答',
    risksCount: 2,
    tasks: { completed: 3, total: 10 }
  }
];

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: '张三',
    avatar: '👨‍💼',
    role: '项目经理',
    workload: 85,
    recentActivity: '2小时前更新了项目进度',
    skills: ['项目管理', 'AI应用'],
    isOnline: true
  },
  {
    id: '2',
    name: '李四',
    avatar: '👩‍💻',
    role: '前端工程师',
    workload: 70,
    recentActivity: '1小时前提交了代码',
    skills: ['React', 'UI设计'],
    isOnline: true
  },
  {
    id: '3',
    name: '王五',
    avatar: '👨‍🔧',
    role: '后端工程师',
    workload: 45,
    recentActivity: '30分钟前部署了服务',
    skills: ['Node.js', 'API开发'],
    isOnline: false
  }
];

interface TeamCollaborationProps {
  className?: string;
}

export function TeamCollaboration({ className }: TeamCollaborationProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'team'>('projects');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'delayed':
        return <Clock className="h-4 w-4 text-red-500" />;
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'warning':
        return <Badge variant="outline" className="text-orange-600 border-orange-300">有风险</Badge>;
      case 'delayed':
        return <Badge variant="outline" className="text-red-600 border-red-300">已延期</Badge>;
      case 'normal':
        return <Badge variant="outline" className="text-green-600 border-green-300">正常</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={`${className}`}>
      {/* Single Enhanced Card with Compact Layout */}
      <Card className="border-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-700/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent dark:from-white dark:to-blue-200">
                    团队协作中心
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">🤖小智智能团队分析</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'projects' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('projects')}
                className="text-xs px-3 py-1 h-7"
              >
                项目
              </Button>
              <Button
                variant={activeTab === 'team' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('team')}
                className="text-xs px-3 py-1 h-7"
              >
                团队
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {activeTab === 'projects' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {MOCK_PROJECTS.slice(0, 4).map((project, index) => (
                <div 
                  key={project.id} 
                  className="group p-4 rounded-xl bg-white/60 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/30 hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2 flex-1">
                      {getStatusIcon(project.status)}
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h4>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">进度</span>
                      <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 bg-gray-200 dark:bg-gray-600" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-600/30">
                    <div className="flex items-center space-x-2">
                      <Target className="h-3 w-3" />
                      <span>{project.tasks.completed}/{project.tasks.total}</span>
                    </div>
                    <span>{project.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_TEAM_MEMBERS.slice(0, 6).map((member, index) => (
                <div 
                  key={member.id} 
                  className="group p-3 rounded-lg bg-white/60 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/30 hover:shadow-md transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="relative">
                      <div className="text-lg">{member.avatar}</div>
                      {member.isOnline && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {member.name}
                      </h4>
                      <Badge variant="outline" className="text-xs mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                      {member.recentActivity}
                    </p>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">负载</span>
                        <span className="font-medium text-gray-900 dark:text-white">{member.workload}%</span>
                      </div>
                      <Progress value={member.workload} className="h-1.5 bg-gray-200 dark:bg-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Quick Stats Bar */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-600/30">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">3个项目正常</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-gray-600 dark:text-gray-400">1个项目有风险</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">18名活跃成员</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              查看详情 →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}