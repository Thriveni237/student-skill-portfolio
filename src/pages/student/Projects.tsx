"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Github, 
  FolderRoot, 
  Loader2, 
  Code2, 
  Globe,
  Layers,
  X
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  tags: string;
}

const Projects = () => {
  const { isDemo } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(!isDemo);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    github: '',
    tags: ''
  });

  useEffect(() => {
    if (!isDemo) fetchProjects();
    else {
      setProjects([
        {
          id: '1',
          title: 'E-Commerce Platform',
          description: 'A full-featured online store with payment integration and real-time inventory tracking.',
          tags: 'React, Node.js, Stripe, MongoDB',
          github: 'github.com/demo/shop',
          link: 'shop-demo.com'
        },
        {
          id: '2',
          title: 'AI Image Generator',
          description: 'Leveraging OpenAI API to generate unique artistic images from text prompts.',
          tags: 'Python, Next.js, Tailwind, OpenAI',
          github: 'github.com/demo/ai-art'
        }
      ]);
      setLoading(false);
    }
  }, [isDemo]);

  const fetchProjects = async () => {
    try {
      const data = await api.get('/projects');
      setProjects(data || []);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemo) {
      setProjects([{ ...formData, id: Math.random().toString() }, ...projects]);
      setIsAdding(false);
      setFormData({ title: '', description: '', link: '', github: '', tags: '' });
      showSuccess("Project added (Demo)");
      return;
    }

    try {
      const data = await api.post('/projects', formData);
      setProjects([data, ...projects]);
      setFormData({ title: '', description: '', link: '', github: '', tags: '' });
      setIsAdding(false);
      showSuccess("Project published to your portfolio!");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const removeProject = async (id: string) => {
    if (isDemo) {
      setProjects(projects.filter(p => p.id !== id));
      return;
    }
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p.id !== id));
      showSuccess("Project removed");
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Featured Projects</h1>
            <p className="text-slate-500">Showcase your best work to potential recruiters.</p>
          </div>
          <Button 
            onClick={() => setIsAdding(!isAdding)} 
            className={cn(
              "transition-all",
              isAdding ? "bg-slate-200 text-slate-900 hover:bg-slate-300" : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {isAdding ? <><X className="w-4 h-4 mr-2" /> Cancel</> : <><Plus className="w-4 h-4 mr-2" /> Add New Project</>}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-none shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Provide information about what you built and the tech you used.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input 
                      required 
                      placeholder="e.g. Portfolio Website"
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tech Stack (comma separated)</Label>
                    <Input 
                      placeholder="React, TypeScript, Tailwind" 
                      value={formData.tags} 
                      onChange={e => setFormData({...formData, tags: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    required 
                    rows={4}
                    placeholder="What problem did this project solve? What was your role?"
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Repository URL</Label>
                    <Input 
                      placeholder="github.com/username/repo"
                      value={formData.github} 
                      onChange={e => setFormData({...formData, github: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> Live Demo URL</Label>
                    <Input 
                      placeholder="project-demo.com"
                      value={formData.link} 
                      onChange={e => setFormData({...formData, link: e.target.value})} 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                  Publish Project
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.length > 0 ? projects.map((project) => (
              <Card key={project.id} className="border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                <div className="h-2 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                      <FolderRoot className="w-6 h-6 text-blue-600" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeProject(project.id)} 
                      className="text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mt-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-6">
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.split(',').map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 font-medium border-none">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 mt-auto flex gap-3">
                    {project.github && (
                      <Button variant="outline" className="flex-1 gap-2 border-slate-200 hover:bg-slate-900 hover:text-white transition-all" asChild>
                        <a href={`https://${project.github}`} target="_blank" rel="noreferrer">
                          <Github className="w-4 h-4" /> Code
                        </a>
                      </Button>
                    )}
                    {project.link && (
                      <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700" asChild>
                        <a href={`https://${project.link}`} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4" /> Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="md:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Layers className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No projects yet</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                  Start by adding your first project to showcase your skills to recruiters.
                </p>
                <Button 
                  variant="link" 
                  className="mt-4 text-blue-600 font-bold"
                  onClick={() => setIsAdding(true)}
                >
                  Add your first project
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Projects;