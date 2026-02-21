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
import { supabase } from '@/integrations/supabase/client';

const PortfolioPreview = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    profile: null,
    skills: [],
    projects: [],
    certs: []
  });

  useEffect(() => {
    if (user) fetchPortfolioData();
  }, [user]);

  const fetchPortfolioData = async () => {
    try {
      const [profileRes, skillsRes, projectsRes, certsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user?.id).single(),
        supabase.from('skills').select('*').eq('user_id', user?.id),
        supabase.from('projects').select('*').eq('user_id', user?.id),
        supabase.from('certifications').select('*').eq('user_id', user?.id)
      ]);

      setData({
        profile: profileRes.data,
        skills: skillsRes.data || [],
        projects: projectsRes.data || [],
        certs: certsRes.data || []
      });
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
  const initials = profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase();

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
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {profile?.first_name} {profile?.last_name}
              </h1>
              <p className="text-xl text-blue-600 font-medium mb-4">Student Portfolio</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 mb-6">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profile?.location || 'Location not set'}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.email}</span>
              </div>
              <div className="flex justify-center md:justify-start gap-3">
                {profile?.github && (
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a href={profile.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" /> GitHub</a>
                  </Button>
                )}
                {profile?.linkedin && (
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</a>
                  </Button>
                )}
                {profile?.website && (
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a href={profile.website} target="_blank" rel="noreferrer"><Globe className="w-4 h-4 mr-2" /> Website</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Bio & Projects */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {profile?.bio || "No bio added yet. Update your profile to tell recruiters about yourself!"}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <FolderRoot className="text-blue-600 w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">Featured Projects</h2>
              </div>
              <div className="grid gap-6">
                {projects.length > 0 ? projects.map((project: any, i: number) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                        <div className="flex gap-2">
                          {project.github && <Button variant="ghost" size="icon" className="h-8 w-8" asChild><a href={project.github}><Github className="w-4 h-4" /></a></Button>}
                          {project.link && <Button variant="ghost" size="icon" className="h-8 w-8" asChild><a href={project.link}><ExternalLink className="w-4 h-4" /></a></Button>}
                        </div>
                      </div>
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
                )) : (
                  <p className="text-slate-500 italic">No projects added yet.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Skills & Certs */}
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
                )) : (
                  <p className="text-slate-500 italic">No skills added yet.</p>
                )}
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
                    <div className="mt-1">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{cert.name}</p>
                      <p className="text-xs text-slate-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 italic">No certifications added yet.</p>
                )}
              </div>
            </section>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Interested in {profile?.first_name}?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Download their full resume or send a direct message.
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact {profile?.first_name}</Button>
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">Download CV</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;