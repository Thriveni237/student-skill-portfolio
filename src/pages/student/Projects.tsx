"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ExternalLink, Github, FolderRoot } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  tags: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with React and Node.js.',
      link: 'https://example.com',
      github: 'https://github.com',
      tags: ['React', 'Node.js', 'MongoDB']
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    github: '',
    tags: ''
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      link: formData.link,
      github: formData.github,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };
    setProjects([...projects, newProject]);
    setFormData({ title: '', description: '', link: '', github: '', tags: '' });
    setIsAdding(false);
    showSuccess("Project added successfully!");
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-500">Showcase your best work to potential recruiters.</p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 hover:bg-blue-700">
            {isAdding ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Project</>}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-none shadow-md animate-in fade-in slide-in-from-top-4">
            <CardHeader>
              <CardTitle>New Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input 
                      id="title" 
                      required 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags" 
                      placeholder="React, Tailwind, TypeScript" 
                      value={formData.tags}
                      onChange={e => setFormData({...formData, tags: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    required 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="link">Live Demo URL</Label>
                    <Input 
                      id="link" 
                      type="url" 
                      value={formData.link}
                      onChange={e => setFormData({...formData, link: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Repository</Label>
                    <Input 
                      id="github" 
                      type="url" 
                      value={formData.github}
                      onChange={e => setFormData({...formData, github: e.target.value})}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Save Project</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FolderRoot className="w-6 h-6 text-blue-600" />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="mt-4">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.link && (
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-2" /> Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-2" /> Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;