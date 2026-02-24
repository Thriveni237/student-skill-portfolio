"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Globe, MapPin, User, Save, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user, isDemo, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(!isDemo);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    github: '',
    linkedin: '',
    website: ''
  });

  useEffect(() => {
    if (user && !isDemo) {
      fetchProfile();
    } else if (isDemo) {
      setProfile({
        firstName: user.firstName || 'Demo',
        lastName: user.lastName || 'User',
        bio: 'This is a demo bio. In a real account, you can save your professional summary here.',
        location: 'San Francisco, CA',
        github: 'github.com/demo',
        linkedin: 'linkedin.com/in/demo',
        website: 'demo.com'
      });
    }
  }, [user, isDemo]);

  const fetchProfile = async () => {
    try {
      const data = await api.get(`/users/${user.id}`);
      if (data) {
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          bio: data.bio || '',
          location: data.location || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          website: data.website || ''
        });
      }
    } catch (error: any) {
      showError("Failed to load profile data");
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemo) {
      showSuccess("Profile updated (Demo Mode)");
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = await api.put(`/users/${user.id}`, profile);
      // Update local auth context so other pages reflect changes
      login(updatedUser);
      showSuccess("Profile saved successfully!");
    } catch (error: any) {
      showError(error.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}` || 'U';

  return (
    <DashboardLayout role="student">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-500">Manage your public presence and personal information.</p>
          </div>
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700 gap-2"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>

        <div className="grid gap-8">
          {/* Header Card */}
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <CardContent className="relative pt-0 pb-8">
              <div className="flex flex-col md:flex-row items-end gap-6 -mt-12 px-6">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-600 font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {profile.location || 'Location not set'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSave} className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Personal Info */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profile.firstName} 
                        onChange={e => setProfile({...profile, firstName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profile.lastName} 
                        onChange={e => setProfile({...profile, lastName: e.target.value})} 
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
                        placeholder="e.g. New York, NY"
                        value={profile.location} 
                        onChange={e => setProfile({...profile, location: e.target.value})} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Professional Bio</CardTitle>
                  <CardDescription>Write a short summary about yourself for recruiters.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    rows={6}
                    placeholder="Tell us about your background, interests, and career goals..."
                    value={profile.bio} 
                    onChange={e => setProfile({...profile, bio: e.target.value})} 
                  />
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <div className="space-y-8">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="w-4 h-4" /> GitHub
                    </Label>
                    <Input 
                      id="github" 
                      placeholder="github.com/username"
                      value={profile.github} 
                      onChange={e => setProfile({...profile, github: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </Label>
                    <Input 
                      id="linkedin" 
                      placeholder="linkedin.com/in/username"
                      value={profile.linkedin} 
                      onChange={e => setProfile({...profile, linkedin: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Portfolio Website
                    </Label>
                    <Input 
                      id="website" 
                      placeholder="yourwebsite.com"
                      value={profile.website} 
                      onChange={e => setProfile({...profile, website: e.target.value})} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-blue-50 border-blue-100">
                <CardContent className="p-6">
                  <h3 className="font-bold text-blue-900 mb-2">Profile Visibility</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Your profile is currently visible to verified recruiters from your institution.
                  </p>
                  <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                    View Public Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;