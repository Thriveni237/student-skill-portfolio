"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Github, 
  Linkedin, 
  Globe, 
  MapPin, 
  User, 
  Edit3, 
  Share2, 
  CheckCircle2, 
  Loader2,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Eye,
  FileDown,
  ExternalLink
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isDemo, login } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
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
        bio: 'Passionate software engineering student with a focus on full-stack development. I love building scalable applications and learning new technologies.',
        location: 'San Francisco, CA',
        github: 'github.com/demouser',
        linkedin: 'linkedin.com/in/demouser',
        website: 'demouser.dev'
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
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = await api.put(`/users/${user.id}`, profile);
      login(updatedUser);
      showSuccess("Profile saved successfully!");
      setIsEditing(false);
    } catch (error: any) {
      showError(error.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.origin + "/dashboard/student/profile";
    navigator.clipboard.writeText(url);
    showSuccess("Profile link copied to clipboard!");
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
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isEditing ? "Edit Profile" : isPreview ? "Portfolio Preview" : "My Professional Profile"}
            </h1>
            <p className="text-slate-500">
              {isEditing ? "Update your information below." : isPreview ? "This is how recruiters see your portfolio." : "Manage your professional identity and portfolio."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isPreview ? (
              <Button variant="outline" onClick={() => setIsPreview(false)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to View
              </Button>
            ) : !isEditing ? (
              <>
                <Button variant="outline" onClick={handleShare} className="gap-2 hidden sm:flex">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard/student/resume')} className="gap-2 hidden sm:flex">
                  <FileDown className="w-4 h-4" /> Resume
                </Button>
                <Button variant="secondary" onClick={() => setIsPreview(true)} className="gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-none">
                  <Eye className="w-4 h-4" /> Preview Portfolio
                </Button>
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 gap-2" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          /* EDIT MODE */
          <form onSubmit={handleSave} className="grid md:grid-cols-3 gap-8 animate-in fade-in duration-300">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
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

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Professional Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    rows={6}
                    placeholder="Tell us about your background..."
                    value={profile.bio} 
                    onChange={e => setProfile({...profile, bio: e.target.value})} 
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</Label>
                    <Input 
                      placeholder="github.com/username"
                      value={profile.github} 
                      onChange={e => setProfile({...profile, github: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</Label>
                    <Input 
                      placeholder="linkedin.com/in/username"
                      value={profile.linkedin} 
                      onChange={e => setProfile({...profile, linkedin: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> Website</Label>
                    <Input 
                      placeholder="yourwebsite.com"
                      value={profile.website} 
                      onChange={e => setProfile({...profile, website: e.target.value})} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        ) : (
          /* VIEW / PREVIEW MODE */
          <div className="grid md:grid-cols-3 gap-8 animate-in fade-in duration-300">
            <div className="md:col-span-2 space-y-8">
              {/* Profile Hero */}
              <Card className="border-none shadow-sm overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />
                <CardContent className="relative pt-0 pb-8 px-8">
                  <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarFallback className="text-3xl bg-blue-100 text-blue-600 font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold text-slate-900">
                          {profile.firstName} {profile.lastName}
                        </h2>
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profile.location || 'Location not set'}</span>
                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio Section */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {profile.bio || "No bio added yet. Click 'Edit Profile' to tell recruiters about yourself."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Social Links Card */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profile.github && (
                    <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                      <Github className="w-5 h-5 text-slate-700" />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">GitHub</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700 group-hover:text-blue-900">LinkedIn</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-blue-400" />
                    </a>
                  )}
                  {profile.website && (
                    <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors group">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-700 group-hover:text-indigo-900">Portfolio</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-indigo-400" />
                    </a>
                  )}
                  {!profile.github && !profile.linkedin && !profile.website && (
                    <p className="text-sm text-slate-500 italic text-center py-4">No social links added yet.</p>
                  )}
                </CardContent>
              </Card>

              {/* Profile Status */}
              <Card className="border-none shadow-sm bg-slate-900 text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Profile Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Visibility</span>
                      <span className="text-emerald-400 font-medium">Public</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Verification</span>
                      <span className="text-blue-400 font-medium">Verified Student</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Profile Strength</span>
                        <span className="text-white">85%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[85%]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;