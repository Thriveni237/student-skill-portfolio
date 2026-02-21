"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, Shield, User, Globe, Moon, Sun } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccess("Settings updated successfully!");
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your account preferences and security settings.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-1">
            {[
              { label: 'General', icon: User, active: true },
              { label: 'Security', icon: Lock, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Privacy', icon: Shield, active: false },
            ].map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>General Preferences</CardTitle>
                <CardDescription>Update your basic account information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="alex_johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Input id="language" defaultValue="English (US)" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Appearance</h4>
                    <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border shadow-sm">
                          <Moon className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dark Mode</p>
                          <p className="text-xs text-slate-500">Switch between light and dark themes.</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'New Messages', desc: 'Get notified when someone sends you a message.' },
                        { label: 'Application Updates', desc: 'Receive alerts about your job applications.' },
                        { label: 'Marketing', desc: 'Stay updated with our latest features and news.' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm border-red-100 bg-red-50/30">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Delete Account</p>
                    <p className="text-xs text-slate-500">Permanently remove your account and all data.</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;