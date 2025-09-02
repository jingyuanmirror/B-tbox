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
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* 项目进度概览 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-blue-600" />
              <CardTitle>项目进度概览</CardTitle>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'projects' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('projects')}
                className="text-xs"
              >
                项目
              </Button>
              <Button
                variant={activeTab === 'team' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('team')}
                className="text-xs"
              >
                团队
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'projects' ? (
            <div className="space-y-4">
              {MOCK_PROJECTS.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {getStatusIcon(project.status)}
                        <h4 className="font-medium text-sm">{project.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>负责人：{project.owner}</span>
                        <span>预计完成：{project.dueDate}</span>
                      </div>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>进度</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Target className="h-3 w-3" />
                      <span>任务：{project.tasks.completed}/{project.tasks.total}</span>
                    </div>
                    {project.risksCount > 0 && (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{project.risksCount} 个风险</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {MOCK_TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="relative">
                    <div className="text-lg">{member.avatar}</div>
                    {member.isOnline && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{member.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {member.recentActivity}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>工作负载</span>
                          <span>{member.workload}%</span>
                        </div>
                        <Progress value={member.workload} className="h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 最近团队活动 */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <CardTitle>团队动态</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">张三</span> 更新了酒店客服项目进度至80%
                </p>
                <p className="text-xs text-muted-foreground">2小时前</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">李四</span> 完成了景区导览UI设计稿
                </p>
                <p className="text-xs text-muted-foreground">4小时前</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">王五</span> 部署了企业内训机器人测试环境
                </p>
                <p className="text-xs text-muted-foreground">6小时前</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">
                  系统检测到 <span className="font-medium">酒店客服项目</span> 存在延期风险
                </p>
                <p className="text-xs text-muted-foreground">8小时前</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full text-xs">
                查看更多团队活动
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}