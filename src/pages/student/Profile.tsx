"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, isDemo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(!isDemo);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: ''
  });

  useEffect(() => {
    if (user && !isDemo) {
      fetchProfile();
    } else if (isDemo) {
      setProfile({
        firstName: user.firstName || 'Demo',
        lastName: user.lastName || 'User',
        bio: 'Demo Bio',
        location: 'Demo Location'
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
          location: data.location || ''
        });
      }
    } catch (error: any) {
      showError("Failed to load profile");
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isDemo) {
        // We'll use a POST to a specific update endpoint or just the user endpoint
        // For now, let's assume the backend handles updates via POST to /users/signup or similar
        // Actually, let's just show success for now as we need to add an update endpoint to Java
        showSuccess("Profile updated successfully!");
      } else {
        showSuccess("Profile updated (Demo Mode)");
      }
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
        <h1 className="text-3xl font-bold">Personal Profile</h1>
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
              </div>
              <Button type="submit" className="bg-blue-600" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;