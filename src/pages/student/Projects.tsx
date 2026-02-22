"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ExternalLink, Github, FolderRoot, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

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
      showSuccess("Project added (Demo)");
      return;
    }

    try {
      const data = await api.post('/projects', formData);
      setProjects([data, ...projects]);
      setFormData({ title: '', description: '', link: '', github: '', tags: '' });
      setIsAdding(false);
      showSuccess("Project saved to database!");
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
      showSuccess("Project deleted");
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <Button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 hover:bg-blue-700">
            {isAdding ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Project</>}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <Input placeholder="React, Java, MySQL" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <Button type="submit" className="w-full bg-blue-600">Save Project</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-blue-600" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-none shadow-sm group">
                <CardHeader>
                  <div className="flex justify-between">
                    <FolderRoot className="w-6 h-6 text-blue-600" />
                    <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)} className="opacity-0 group-hover:opacity-100 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="mt-2">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    {project.github && <Button variant="outline" size="sm" asChild><a href={project.github}><Github className="w-3 h-3 mr-2" /> Code</a></Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Projects;