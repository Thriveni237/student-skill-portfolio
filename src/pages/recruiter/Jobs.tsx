"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical, Users, Eye, Edit2, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { showSuccess } from '@/utils/toast';

const RecruiterJobs = () => {
  const [jobs] = useState([
    { id: '1', title: 'Frontend Developer Intern', applicants: 24, views: 142, status: 'Active', date: 'Oct 12, 2023' },
    { id: '2', title: 'Junior Full Stack Engineer', applicants: 12, views: 89, status: 'Active', date: 'Oct 15, 2023' },
  ]);

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Job Postings</h1>
            <p className="text-slate-500">Create and monitor your active job listings.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Post New Job
          </Button>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500">Posted on {job.date} • <span className="text-emerald-600 font-medium">{job.status}</span></p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{job.applicants}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 justify-center">
                        <Users className="w-3 h-3" /> Applicants
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{job.views}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 justify-center">
                        <Eye className="w-3 h-3" /> Views
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Applicants</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit2 className="w-4 h-4" /> Edit Posting
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default RecruiterJobs;