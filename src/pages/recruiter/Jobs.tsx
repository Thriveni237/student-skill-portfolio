"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, MoreVertical, Users, Eye, Edit2, Trash2, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { showSuccess } from '@/utils/toast';

const RecruiterJobs = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [jobs, setJobs] = useState([
    { id: '1', title: 'Frontend Developer Intern', applicants: 24, views: 142, status: 'Active', date: 'Oct 12, 2023' },
    { id: '2', title: 'Junior Full Stack Engineer', applicants: 12, views: 89, status: 'Active', date: 'Oct 15, 2023' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time'
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      applicants: 0,
      views: 0,
      status: 'Active',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setJobs([newJob, ...jobs]);
    setIsAdding(false);
    setFormData({ title: '', description: '', location: '', type: 'Full-time' });
    showSuccess("Job posted successfully!");
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Job Postings</h1>
            <p className="text-slate-500">Create and monitor your active job listings.</p>
          </div>
          <Button 
            onClick={() => setIsAdding(!isAdding)} 
            className={isAdding ? "bg-slate-200 text-slate-900 hover:bg-slate-300" : "bg-blue-600 hover:bg-blue-700"}
          >
            {isAdding ? <><X className="w-4 h-4 mr-2" /> Cancel</> : <><Plus className="w-4 h-4 mr-2" /> Post New Job</>}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-none shadow-md animate-in fade-in slide-in-from-top-4">
            <CardHeader>
              <CardTitle>Post a New Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostJob} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      required 
                      placeholder="e.g. Senior React Developer"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g. Remote, New York"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    rows={4}
                    placeholder="Describe the role and requirements..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Publish Job Posting</Button>
              </form>
            </CardContent>
          </Card>
        )}

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
                      <Link to={`/dashboard/recruiter/jobs/${job.id}/applicants`}>
                        <Button variant="outline" size="sm">View Applicants</Button>
                      </Link>
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