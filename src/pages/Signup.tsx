"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2, User, Briefcase, ShieldCheck, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showError, showSuccess } from '@/utils/toast';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { setDemoMode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      showError("Please select a role");
      return;
    }

    setIsLoading(true);
    
    try {
      await api.post('/users/signup', {
        email,
        password,
        firstName,
        lastName,
        role
      });

      showSuccess("Registration successful! You can now log in.");
      navigate('/login');
    } catch (error: any) {
      showError(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'student' | 'recruiter' | 'admin') => {
    setDemoMode(role);
    showSuccess(`Entering as Demo ${role}...`);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Join SkillPort to manage your professional journey</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select onValueChange={setRole} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Student
                      </div>
                    </SelectItem>
                    <SelectItem value="recruiter">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> Recruiter
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> College Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading || !role}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
              <p className="text-sm text-center text-slate-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 px-2 text-blue-600 font-bold">Presentation Mode</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" size="sm" onClick={() => handleDemoLogin('student')} className="text-[10px] h-auto py-3 flex-col gap-2 border-blue-200 hover:bg-blue-50">
            <Play className="w-4 h-4 text-blue-600" /> Student
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDemoLogin('recruiter')} className="text-[10px] h-auto py-3 flex-col gap-2 border-indigo-200 hover:bg-indigo-50">
            <Play className="w-4 h-4 text-indigo-600" /> Recruiter
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')} className="text-[10px] h-auto py-3 flex-col gap-2 border-emerald-200 hover:bg-emerald-50">
            <Play className="w-4 h-4 text-emerald-600" /> Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;