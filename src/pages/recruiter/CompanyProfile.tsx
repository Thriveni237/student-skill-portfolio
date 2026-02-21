"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Globe, MapPin, Users, Camera, Plus, Trash2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const CompanyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState({
    name: 'TechFlow Solutions',
    website: 'https://techflow.io',
    location: 'San Francisco, CA',
    size: '50-200 employees',
    industry: 'Software Development',
    description: 'TechFlow is a leading provider of cloud-native solutions, helping businesses scale their infrastructure with cutting-edge technology.',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccess("Company profile updated!");
    }, 1000);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Company Profile</h1>
          <p className="text-slate-500">Manage how your company appears to students and candidates.</p>
        </div>

        <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input 
                      id="name" 
                      value={company.name}
                      onChange={e => setCompany({...company, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      value={company.industry}
                      onChange={e => setCompany({...company, industry: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input 
                        id="website" 
                        className="pl-10"
                        value={company.website}
                        onChange={e => setCompany({...company, website: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Headquarters</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input 
                        id="location" 
                        className="pl-10"
                        value={company.location}
                        onChange={e => setCompany({...company, location: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">About the Company</Label>
                  <Textarea 
                    id="description" 
                    rows={5}
                    value={company.description}
                    onChange={e => setCompany({...company, description: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Company Culture & Benefits</CardTitle>
                <CardDescription>Add perks that make your company a great place to work.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Remote Friendly', 'Health Insurance', 'Flexible Hours', 'Learning Budget'].map(perk => (
                    <div key={perk} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {perk}
                      <button type="button" className="hover:text-blue-900"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-full border-dashed">
                    <Plus className="w-3 h-3 mr-1" /> Add Perk
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden">
                    {company.logo ? (
                      <img src={company.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-12 h-12 text-slate-300" />
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-4 text-sm text-slate-500 text-center">
                  Upload your company logo. Recommended size: 400x400px.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Public View</h3>
                <p className="text-slate-400 text-sm mb-4">
                  This is how students see your company when browsing jobs.
                </p>
                <Button variant="secondary" className="w-full bg-white text-slate-900 hover:bg-slate-100">
                  Preview Company Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfile;