"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Globe, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  ExternalLink, 
  Award, 
  Code2, 
  FolderRoot,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

const PortfolioPreview = () => {
  const { user, isDemo } = useAuth();
  const [loading, setLoading] = useState(!isDemo);
  const [data, setData] = useState<any>({
    profile: null,
    skills: [],
    projects: [],
    certs: []
  });

  useEffect(() => {
    if (user && !isDemo) fetchPortfolioData();
  }, [user, isDemo]);

  const fetchPortfolioData = async () => {
    try {
      const [profile, skills, projects, certs] = await Promise.all([
        api.get('/users/me'),
        api.get('/skills'),
        api.get('/projects'),
        api.get('/certifications')
      ]);

      setData({ profile, skills, projects, certs });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { profile, skills, projects, certs } = data;
  const initials = profile?.firstName?.[0] || user?.email?.[0]?.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Preview Banner */}
      <div className="bg-blue-600 text-white py-3 px-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="bg-white/20 px-2 py-0.5 rounded">Preview Mode</span>
          <span>This is how recruiters see your profile.</span>
        </div>
        <Link to="/dashboard/student">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={profile?.avatarUrl} />
              <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {profile?.firstName} {profile?.lastName}
              </h1>
              <p className="text-xl text-blue-600 font-medium mb-4">Student Portfolio</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 mb-6">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profile?.location || 'Location not set'}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {profile?.bio || "No bio added yet."}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <FolderRoot className="text-blue-600 w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">Featured Projects</h2>
              </div>
              <div className="grid gap-6">
                {projects.length > 0 ? projects.map((project: any, i: number) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                      <p className="text-slate-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.split(',').map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 font-normal">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )) : <p className="text-slate-500 italic">No projects added yet.</p>}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="text-blue-600 w-6 h-6" />
                <h2 className="text-xl font-bold text-slate-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? skills.map((skill: any) => (
                  <Badge key={skill.id} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 px-3 py-1">
                    {skill.name}
                  </Badge>
                )) : <p className="text-slate-500 italic">No skills added yet.</p>}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <Award className="text-blue-600 w-6 h-6" />
                <h2 className="text-xl font-bold text-slate-900">Certifications</h2>
              </div>
              <div className="space-y-4">
                {certs.length > 0 ? certs.map((cert: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{cert.name}</p>
                      <p className="text-xs text-slate-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                )) : <p className="text-slate-500 italic">No certifications added yet.</p>}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;