"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Github, Linkedin, Globe, Mail, MapPin } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.j@university.edu',
    bio: 'Passionate Full Stack Developer and UI/UX enthusiast. Currently pursuing Computer Science at Tech University.',
    location: 'San Francisco, CA',
    github: 'github.com/alexj',
    linkedin: 'linkedin.com/in/alexj',
    website: 'alexj.dev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccess("Profile updated successfully!");
    }, 1000);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Personal Profile</h1>
          <p className="text-slate-500">Manage your public identity and contact information.</p>
        </div>

        <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={profile.fullName}
                      onChange={e => setProfile({...profile, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="location" 
                      className="pl-10"
                      value={profile.location}
                      onChange={e => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    value={profile.bio}
                    onChange={e => setProfile({...profile, bio: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input 
                        id="github" 
                        className="pl-10"
                        value={profile.github}
                        onChange={e => setProfile({...profile, github: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input 
                        id="linkedin" 
                        className="pl-10"
                        value={profile.linkedin}
                        onChange={e => setProfile({...profile, linkedin: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input 
                      id="website" 
                      className="pl-10"
                      value={profile.website}
                      onChange={e => setProfile({...profile, website: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-8">
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">AJ</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-4 text-sm text-slate-500 text-center">
                  JPG, GIF or PNG. Max size of 2MB.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Portfolio Visibility</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Your portfolio is currently public and can be viewed by verified recruiters.
                </p>
                <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  View Public Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;