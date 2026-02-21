"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, ExternalLink, Trash2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const SavedProfiles = () => {
  const savedStudents = [
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
    }
  ];

  const handleRemove = (name: string) => {
    showSuccess(`Removed ${name} from saved profiles`);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Saved Profiles</h1>
          <p className="text-slate-500">Candidates you've bookmarked for future consideration.</p>
        </div>

        {savedStudents.length > 0 ? (
          <div className="grid gap-6">
            {savedStudents.map((student) => (
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
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => handleRemove(student.name)}>
                            <Trash2 className="w-5 h-5" />
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Mail className="w-4 h-4" /> Contact
                          </Button>
                          <Link to="/portfolio/preview">
                            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
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
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
            <p className="text-slate-500">You haven't saved any profiles yet.</p>
            <Link to="/dashboard/recruiter">
              <Button variant="link" className="text-blue-600">Start searching for talent</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedProfiles;