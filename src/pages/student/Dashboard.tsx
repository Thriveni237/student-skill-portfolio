"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code2, FolderRoot, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const StudentDashboard = () => {
  const stats = [
    { label: 'Skills Added', value: 12, icon: Code2, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Projects', value: 5, icon: FolderRoot, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Certifications', value: 3, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Profile Views', value: 142, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, Alex!</h1>
          <p className="text-slate-500">Here's what's happening with your portfolio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium">Overall Progress</span>
                  <span className="text-blue-600 font-bold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="grid gap-4">
                {[
                  { task: 'Add professional bio', done: true },
                  { task: 'Upload 3+ projects', done: true },
                  { task: 'Verify email address', done: true },
                  { task: 'Add social links', done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50/50">
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center",
                      item.done ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300"
                    )}>
                      {item.done && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className={cn("text-sm", item.done ? "text-slate-900" : "text-slate-500")}>
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { action: 'Added "React Native" skill', time: '2 hours ago' },
                  { action: 'Updated "E-commerce" project', time: 'Yesterday' },
                  { action: 'Earned AWS Certification', time: '3 days ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 bg-blue-100 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;