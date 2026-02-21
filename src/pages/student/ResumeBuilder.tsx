"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Layout, Palette, Settings2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern Professional', color: 'bg-blue-600' },
    { id: 'minimal', name: 'Minimalist Clean', color: 'bg-slate-900' },
    { id: 'creative', name: 'Creative Portfolio', color: 'bg-indigo-600' },
  ];

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showSuccess("Resume downloaded successfully!");
    }, 1500);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Resume Builder</h1>
            <p className="text-slate-500">Generate a professional PDF resume from your SkillPort data.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={handleDownload} disabled={isGenerating}>
              <Download className={cn("w-4 h-4", isGenerating && "animate-bounce")} />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layout className="w-5 h-5 text-blue-600" /> Choose Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                      selectedTemplate === template.id 
                        ? "border-blue-600 bg-blue-50/50" 
                        : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg", template.color)} />
                      <span className="font-medium text-sm">{template.name}</span>
                    </div>
                    {selectedTemplate === template.id && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-blue-600" /> Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sections to Include</p>
                  {[
                    { label: 'Professional Bio', checked: true },
                    { label: 'Technical Skills', checked: true },
                    { label: 'Featured Projects', checked: true },
                    { label: 'Certifications', checked: true },
                    { label: 'Contact Info', checked: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl min-h-[800px] bg-white overflow-hidden">
              <div className="p-12 space-y-8">
                {/* Mock Resume Preview */}
                <div className="flex justify-between items-start border-b pb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900">Alex Johnson</h2>
                    <p className="text-xl text-blue-600 font-medium mt-1">Full Stack Developer</p>
                    <div className="flex gap-4 mt-4 text-sm text-slate-500">
                      <span>alex.j@university.edu</span>
                      <span>•</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-slate-100 rounded-xl" />
                </div>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Professional Summary</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Passionate Full Stack Developer and UI/UX enthusiast. Currently pursuing Computer Science at Tech University. I love building scalable web applications and exploring new technologies.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-md border-slate-200 text-slate-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Featured Projects</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900">E-commerce Platform</h4>
                      <p className="text-sm text-slate-600 mt-1">A full-stack e-commerce solution built with React and Node.js. Features include real-time inventory tracking and secure payment integration.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Task Management App</h4>
                      <p className="text-sm text-slate-600 mt-1">A collaborative task management tool with drag-and-drop functionality and team workspace features.</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Certifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold text-sm text-slate-900">AWS Certified Solutions Architect</p>
                      <p className="text-xs text-slate-500">Amazon Web Services • 2023</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">Meta Front-End Developer</p>
                      <p className="text-xs text-slate-500">Coursera • 2023</p>
                    </div>
                  </div>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder;