"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Applicants = () => {
  const { jobId } = useParams();
  
  const applicants = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.j@university.edu',
      match: '95%',
      status: 'New',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 's.chen@university.edu',
      match: '88%',
      status: 'Reviewed',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    }
  ];

  const handleAction = (name: string, action: string) => {
    showSuccess(`${action} ${name}`);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/recruiter/jobs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Applicants</h1>
            <p className="text-slate-500">Reviewing candidates for Frontend Developer Intern</p>
          </div>
        </div>

        <div className="grid gap-4">
          {applicants.map((applicant) => (
            <Card key={applicant.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border">
                      <AvatarImage src={applicant.avatar} />
                      <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-slate-900">{applicant.name}</h3>
                      <p className="text-sm text-slate-500">{applicant.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 font-medium">
                          {applicant.match} Match
                        </Badge>
                        <Badge variant="outline" className="text-slate-500 font-normal">
                          {applicant.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to="/portfolio/preview">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="w-4 h-4" /> Portfolio
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => handleAction(applicant.name, "Shortlisted")}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Shortlist
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => handleAction(applicant.name, "Rejected")}>
                      <XCircle className="w-4 h-4 text-red-600" /> Reject
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Mail className="w-4 h-4 mr-2" /> Message
                    </Button>
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

export default Applicants;