"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Applications = () => {
  const applications = [
    {
      id: '1',
      role: 'Frontend Developer Intern',
      company: 'TechFlow Solutions',
      appliedDate: 'Oct 24, 2023',
      status: 'Interviewing',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: '2',
      role: 'Junior Full Stack Engineer',
      company: 'CloudScale AI',
      appliedDate: 'Oct 20, 2023',
      status: 'Pending',
      color: 'bg-amber-100 text-amber-700'
    },
    {
      id: '3',
      role: 'UI/UX Design Apprentice',
      company: 'Creative Pulse',
      appliedDate: 'Oct 15, 2023',
      status: 'Rejected',
      color: 'bg-red-100 text-red-700'
    }
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500">Track the status of your job and internship applications.</p>
        </div>

        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{app.role}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {app.company}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Applied {app.appliedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge className={cn("font-medium px-3 py-1 border-none", app.color)}>
                      {app.status}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
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

export default Applications;