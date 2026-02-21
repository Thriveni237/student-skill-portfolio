"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, Building2, DollarSign, Clock } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const jobs = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechFlow Solutions',
      location: 'Remote',
      type: 'Internship',
      salary: '$25 - $35 / hr',
      posted: '2 days ago',
      tags: ['React', 'Tailwind', 'TypeScript']
    },
    {
      id: '2',
      title: 'Junior Full Stack Engineer',
      company: 'CloudScale AI',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$80k - $110k',
      posted: '5 hours ago',
      tags: ['Node.js', 'PostgreSQL', 'React']
    },
    {
      id: '3',
      title: 'UI/UX Design Apprentice',
      company: 'Creative Pulse',
      location: 'New York, NY',
      type: 'Apprenticeship',
      salary: '$3,000 / mo',
      posted: '1 week ago',
      tags: ['Figma', 'UI Design', 'Prototyping']
    }
  ];

  const handleApply = (title: string) => {
    showSuccess(`Application submitted for ${title}!`);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Job Board</h1>
            <p className="text-slate-500">Discover opportunities that match your skill set.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search jobs, companies..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                      <span className="flex items-center gap-1 text-emerald-600"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                      <span className="flex items-center gap-1 text-slate-400"><Clock className="w-4 h-4" /> {job.posted}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleApply(job.title)}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;