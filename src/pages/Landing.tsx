"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SkillPort</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Trusted by 50+ Universities
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Bridge the gap between <span className="text-blue-600">Skills</span> and <span className="text-blue-600">Careers</span>.
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                The ultimate portfolio management system for students to showcase their expertise and for recruiters to find top-tier talent.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg">
                    Create Your Portfolio <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                    Hire Talent
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border p-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                  alt="Dashboard Preview" 
                  className="rounded-xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full -z-0 blur-3xl opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full -z-0 blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tailored for Every User</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choose your path and start leveraging the power of SkillPort today.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="text-blue-600 w-6 h-6" />
                </div>
                <CardTitle>For Students</CardTitle>
                <CardDescription>Build a professional presence that stands out.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Showcase skills & projects', 'Manage certifications', 'Generate shareable portfolio', 'Track career progress'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="text-blue-500 w-4 h-4" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="text-indigo-600 w-6 h-6" />
                </div>
                <CardTitle>For Recruiters</CardTitle>
                <CardDescription>Find the perfect match for your team.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Advanced skill filtering', 'Verified student profiles', 'Direct contact options', 'Save favorite candidates'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="text-indigo-500 w-4 h-4" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="text-emerald-600 w-6 h-6" />
                </div>
                <CardTitle>For Admins</CardTitle>
                <CardDescription>Manage and monitor your institution.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Student performance stats', 'User management', 'System-wide analytics', 'Data export tools'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="text-emerald-500 w-4 h-4" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 SkillPort. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;