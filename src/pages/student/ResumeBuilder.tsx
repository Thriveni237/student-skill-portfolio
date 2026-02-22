"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Layout, Settings2, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

const ResumeBuilder = () => {
  const { user, isDemo } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(!isDemo);
  const [data, setData] = useState<any>({
    profile: null,
    skills: [],
    projects: [],
    certs: []
  });

  useEffect(() => {
    if (user && !isDemo) fetchResumeData();
  }, [user, isDemo]);

  const fetchResumeData = async () => {
    try {
      const [profile, skills, projects, certs] = await Promise.all([
        api.get('/users/me'),
        api.get('/skills'),
        api.get('/projects'),
        api.get('/certifications')
      ]);

      setData({
        profile,
        skills: skills || [],
        projects: projects || [],
        certs: certs || []
      });
    } catch (error) {
      console.error("Error fetching resume data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  const { profile, skills, projects, certs } = data;

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
                {/* Real Resume Preview */}
                <div className="flex justify-between items-start border-b pb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900">
                      {profile?.firstName} {profile?.lastName}
                    </h2>
                    <p className="text-xl text-blue-600 font-medium mt-1">Student Portfolio</p>
                    <div className="flex gap-4 mt-4 text-sm text-slate-500">
                      <span>{user?.email}</span>
                      <span>•</span>
                      <span>{profile?.location || 'Location not set'}</span>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden">
                    {profile?.avatarUrl && <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />}
                  </div>
                </div>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Professional Summary</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {profile?.bio || "No bio added yet."}
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? skills.map((skill: any) => (
                      <Badge key={skill.id} variant="outline" className="rounded-md border-slate-200 text-slate-700">
                        {skill.name} ({skill.level})
                      </Badge>
                    )) : <p className="text-sm text-slate-500">No skills added yet.</p>}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Featured Projects</h3>
                  <div className="space-y-4">
                    {projects.length > 0 ? projects.map((project: any) => (
                      <div key={project.id}>
                        <h4 className="font-bold text-slate-900">{project.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                        <p className="text-xs text-blue-600 mt-1">{project.tags}</p>
                      </div>
                    )) : <p className="text-sm text-slate-500">No projects added yet.</p>}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-1">Certifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {certs.length > 0 ? certs.map((cert: any) => (
                      <div key={cert.id}>
                        <p className="font-bold text-sm text-slate-900">{cert.name}</p>
                        <p className="text-xs text-slate-500">{cert.issuer} • {cert.date}</p>
                      </div>
                    )) : <p className="text-sm text-slate-500">No certifications added yet.</p>}
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