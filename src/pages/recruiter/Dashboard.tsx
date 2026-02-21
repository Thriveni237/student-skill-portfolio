"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, MapPin, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const students = [
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Full Stack Developer',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js'],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      location: 'New York, NY',
      skills: ['Figma', 'Adobe XD', 'React'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: '3',
      name: 'Michael Ross',
      role: 'Data Scientist',
      location: 'Austin, TX',
      skills: ['Python', 'SQL', 'TensorFlow'],
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100'
    }
  ];

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Talent Search</h1>
            <p className="text-slate-500">Find the perfect candidates for your open positions.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by skill, role, or name..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {students.map((student) => (
            <Card key={student.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="w-16 h-16 border">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleSave(student.id)}
                          className={savedIds.includes(student.id) ? "text-blue-600" : "text-slate-400"}
                        >
                          {savedIds.includes(student.id) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                        </Button>
                        <Link to="/portfolio/preview">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" /> View Portfolio
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <p className="text-blue-600 font-medium">{student.role}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {student.location}</span>
                      <div className="flex gap-2">
                        {student.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="font-normal bg-slate-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;