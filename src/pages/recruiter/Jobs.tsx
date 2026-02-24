"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, MoreVertical, Users, Eye, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const RecruiterJobs = () => {
  const { user, isDemo } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
    salary: '',
    tags: '',
    company: 'TechFlow Solutions' // Default for now
  });

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const data = await api.get(isDemo ? '/jobs' : `/jobs/recruiter/${user.id}`);
      setJobs(Array.isArray(data) ? data : []);
    } catch (error: any) {
      if (!isDemo) showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    
    const jobData = {
      ...formData,
      recruiterId: user.id
    };

    try {
      if (isDemo) {
        setJobs([{ ...jobData, id: Math.random().toString() }, ...jobs]);
        showSuccess("Job posted (Demo Mode)");
      } else {
        const newJob = await api.post('/jobs', jobData);
        setJobs([newJob, ...jobs]);
        showSuccess("Job posted successfully!");
      }
      setIsAdding(false);
      setFormData({ title: '', description: '', location: '', type: 'Full-time', salary: '', tags: '', company: 'TechFlow Solutions' });
    } catch (error: any) {
      showError(error.message);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!isDemo) await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter(j => j.id !== id));
      showSuccess("Job posting removed");
    } catch (error: any) {
      showError(error.message);
    }
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input 
                      id="salary" 
                      placeholder="e.g. $80k - $110k"
                      value={formData.salary}
                      onChange={e => setFormData({...formData, salary: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags" 
                      placeholder="React, Node.js, SQL"
                      value={formData.tags}
                      onChange={e => setFormData({...formData, tags: e.target.value})}
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
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={posting}>
                  {posting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Publish Job Posting
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-500">Posted on {new Date(job.createdAt).toLocaleDateString()} • <span className="text-emerald-600 font-medium">Active</span></p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900">0</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 justify-center">
                          <Users className="w-3 h-3" /> Applicants
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900">0</p>
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
                            <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleDelete(job.id)}>
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
            {jobs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                <p className="text-slate-500">You haven't posted any jobs yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RecruiterJobs;