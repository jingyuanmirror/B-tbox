'use client';

import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Smartphone } from 'lucide-react';

interface CreateAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

const APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'chat-assistant',
    name: 'Chat Assistant',
    description: 'AI-powered chat assistant for customer support',
    category: 'AI & Chat',
    icon: '💬'
  },
  {
    id: 'data-analyzer',
    name: 'Data Analyzer',
    description: 'Analyze and visualize data insights',
    category: 'Analytics',
    icon: '📊'
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    description: 'Generate high-quality content',
    category: 'Content',
    icon: '✍️'
  },
  {
    id: 'image-processor',
    name: 'Image Processor',
    description: 'Process and edit images automatically',
    category: 'Media',
    icon: '🖼️'
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Automate business workflows',
    category: 'Automation',
    icon: '⚙️'
  },
  {
    id: 'custom',
    name: 'Custom App',
    description: 'Build from scratch',
    category: 'Custom',
    icon: '🔧'
  }
];

const CATEGORIES = ['All', 'AI & Chat', 'Analytics', 'Content', 'Media', 'Automation', 'Custom'];

export default function CreateAppModal({ open, onOpenChange }: CreateAppModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates = selectedCategory === 'All' 
    ? APP_TEMPLATES 
    : APP_TEMPLATES.filter(template => template.category === selectedCategory);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoUrl(''); // Clear URL when file is selected
    }
  };

  const handleRemoveFile = () => {
    setLogoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedTemplate) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleCreate = () => {
    // Handle app creation logic here
    console.log({
      template: selectedTemplate,
      name: appName,
      description: appDescription,
      logo: logoFile || logoUrl
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedTemplate('');
    setAppName('');
    setAppDescription('');
    setLogoFile(null);
    setLogoUrl('');
    setUploadType('file');
    onOpenChange(false);
  };

  const selectedTemplateData = APP_TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel - Form Content */}
          <div className="flex-1 flex flex-col">
            <DialogHeader className="px-8 py-6 border-b">
              <DialogTitle className="text-2xl font-semibold">
                {currentStep === 1 ? 'Choose a Template' : 'Configure Your App'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8">
              {currentStep === 1 ? (
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="rounded-full"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Templates Grid */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredTemplates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedTemplate === template.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="text-4xl">{template.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">{template.name}</h4>
                              <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {template.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* App Basic Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">App Name</label>
                        <Input
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          placeholder="Enter your app name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          value={appDescription}
                          onChange={(e) => setAppDescription(e.target.value)}
                          placeholder="Describe what your app does"
                          rows={4}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Logo Upload Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">App Logo</h3>
                    
                    {/* Upload Type Selector */}
                    <div className="flex space-x-4">
                      <Button
                        variant={uploadType === 'file' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setUploadType('file')}
                      >
                        Upload File
                      </Button>
                      <Button
                        variant={uploadType === 'url' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setUploadType('url')}
                      >
                        Use URL
                      </Button>
                    </div>

                    {uploadType === 'file' ? (
                      <div className="space-y-4">
                        {/* File Upload Area */}
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Choose a logo file
                          </p>
                          <p className="text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        {/* Selected File Display */}
                        {logoFile && (
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Upload className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{logoFile.name}</p>
                                <p className="text-xs text-gray-500">
                                  {(logoFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleRemoveFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium mb-2">Logo URL</label>
                        <Input
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          placeholder="https://example.com/logo.png"
                          className="w-full"
                        />
                        {logoUrl && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
                            <img
                              src={logoUrl}
                              alt="Logo preview"
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="12" fill="%236b7280">Error</text></svg>';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 border-t bg-gray-50 flex justify-between">
              <div>
                {currentStep === 2 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                {currentStep === 1 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedTemplate}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleCreate}
                    disabled={!appName.trim()}
                  >
                    Create App
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Mobile Preview */}
          <div className="w-80 bg-gray-50 border-l p-6">
            <div className="sticky top-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Mobile Preview
              </h3>
              
              {/* Phone Frame */}
              <div className="bg-black rounded-[2.5rem] p-2 mx-auto" style={{ width: '280px', height: '560px' }}>
                <div className="bg-white rounded-[2rem] h-full flex flex-col overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-10 bg-black rounded-t-[2rem] flex items-center justify-center">
                    <div className="w-20 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  {/* App Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    {/* App Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                        {logoFile ? (
                          <img
                            src={URL.createObjectURL(logoFile)}
                            alt="App logo"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : logoUrl ? (
                          <img
                            src={logoUrl}
                            alt="App logo"
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : selectedTemplateData ? (
                          <span className="text-2xl">{selectedTemplateData.icon}</span>
                        ) : (
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {appName || selectedTemplateData?.name || 'App Name'}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {selectedTemplateData?.category || 'Category'}
                        </p>
                      </div>
                    </div>

                    {/* App Description */}
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-xl p-4 h-full">
                        <p className="text-sm text-gray-600">
                          {appDescription || selectedTemplateData?.description || 'Your app description will appear here...'}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4">
                      <div className="bg-blue-500 text-white text-center py-3 rounded-xl text-sm font-medium">
                        Open App
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
