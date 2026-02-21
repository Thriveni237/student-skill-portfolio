"use client";

import React from 'react';
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
  FolderRoot 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PortfolioPreview = () => {
  // Mock data - in a real app, this would be fetched based on a URL slug
  const student = {
    name: 'Alex Johnson',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate Full Stack Developer and UI/UX enthusiast. Currently pursuing Computer Science at Tech University. I love building scalable web applications and exploring new technologies.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    skills: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Beginner' }
    ],
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce solution built with React and Node.js. Features include real-time inventory tracking and secure payment integration.',
        tags: ['React', 'Node.js', 'MongoDB'],
        link: '#',
        github: '#'
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management tool with drag-and-drop functionality and team workspace features.',
        tags: ['TypeScript', 'React', 'Firebase'],
        link: '#',
        github: '#'
      }
    ],
    certs: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: 'Oct 2023' },
      { name: 'Meta Front-End Developer', issuer: 'Coursera', date: 'Aug 2023' }
    ]
  };

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
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">AJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{student.name}</h1>
              <p className="text-xl text-blue-600 font-medium mb-4">{student.role}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 mb-6">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {student.location}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> alex.j@university.edu</span>
              </div>
              <div className="flex justify-center md:justify-start gap-3">
                <Button variant="outline" size="sm" className="rounded-full"><Github className="w-4 h-4 mr-2" /> GitHub</Button>
                <Button variant="outline" size="sm" className="rounded-full"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</Button>
                <Button variant="outline" size="sm" className="rounded-full"><Globe className="w-4 h-4 mr-2" /> Website</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Bio & Skills */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {student.bio}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <FolderRoot className="text-blue-600 w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">Featured Projects</h2>
              </div>
              <div className="grid gap-6">
                {student.projects.map((project, i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Github className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                {student.skills.map(skill => (
                  <Badge key={skill.name} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 px-3 py-1">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <Award className="text-blue-600 w-6 h-6" />
                <h2 className="text-xl font-bold text-slate-900">Certifications</h2>
              </div>
              <div className="space-y-4">
                {student.certs.map((cert, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{cert.name}</p>
                      <p className="text-xs text-slate-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Card className="bg-slate-900 text-white border-none">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Interested in Alex?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Download their full resume or send a direct message.
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Alex</Button>
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