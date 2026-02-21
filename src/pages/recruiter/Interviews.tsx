"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Video, MoreVertical, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Interviews = () => {
  const interviews = [
    {
      id: '1',
      candidate: 'Alex Johnson',
      role: 'Frontend Developer Intern',
      date: 'Oct 28, 2023',
      time: '10:00 AM - 11:00 AM',
      type: 'Video Call',
      status: 'Upcoming',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: '2',
      candidate: 'Sarah Chen',
      role: 'UI/UX Designer',
      date: 'Oct 29, 2023',
      time: '2:30 PM - 3:30 PM',
      type: 'Technical Round',
      status: 'Upcoming',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    }
  ];

  const handleComplete = (name: string) => {
    showSuccess(`Interview with ${name} marked as completed`);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Interview Schedule</h1>
            <p className="text-slate-500">Manage and track your upcoming candidate interviews.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Schedule New</Button>
        </div>

        <div className="grid gap-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="border-none shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border">
                      <AvatarImage src={interview.avatar} />
                      <AvatarFallback>{interview.candidate[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-slate-900">{interview.candidate}</h3>
                      <p className="text-sm text-blue-600 font-medium">{interview.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" /> {interview.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" /> {interview.time}
                    </div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none">
                      {interview.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Video className="w-4 h-4" /> Join
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleComplete(interview.candidate)}>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" /> Done
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
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

export default Interviews;