"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Github, Linkedin, Globe, MapPin, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      if (data) setProfile(data);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          bio: profile.bio,
          location: profile.location,
          github: profile.github,
          linkedin: profile.linkedin,
          website: profile.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      showSuccess("Profile updated successfully!");
    } catch (error: any) {
      showError(error.message);
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
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={profile.first_name}
                      onChange={e => setProfile({...profile, first_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={profile.last_name}
                      onChange={e => setProfile({...profile, last_name: e.target.value})}
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
                      placeholder="City, Country"
                      value={profile.location || ''}
                      onChange={e => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    placeholder="Tell us about yourself..."
                    value={profile.bio || ''}
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
                        placeholder="github.com/username"
                        value={profile.github || ''}
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
                        placeholder="linkedin.com/in/username"
                        value={profile.linkedin || ''}
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
                      placeholder="yourwebsite.com"
                      value={profile.website || ''}
                      onChange={e => setProfile({...profile, website: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Changes
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
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                      {profile.first_name?.[0]}{profile.last_name?.[0]}
                    </AvatarFallback>
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
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;