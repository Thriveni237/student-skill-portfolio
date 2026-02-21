"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Award, Calendar, ExternalLink } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

const Certifications = () => {
  const [certs, setCerts] = useState<Certification[]>([
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-10-15',
      link: 'https://aws.amazon.com'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    link: ''
  });

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert: Certification = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData
    };
    setCerts([...certs, newCert]);
    setFormData({ name: '', issuer: '', date: '', link: '' });
    setIsAdding(false);
    showSuccess("Certification added successfully!");
  };

  const removeCert = (id: string) => {
    setCerts(certs.filter(c => c.id !== id));
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Certifications</h1>
            <p className="text-slate-500">Verify your expertise with official credentials.</p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 hover:bg-blue-700">
            {isAdding ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Certification</>}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-none shadow-md animate-in fade-in slide-in-from-top-4">
            <CardHeader>
              <CardTitle>New Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCert} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Certification Name</Label>
                    <Input 
                      id="name" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issuer">Issuing Organization</Label>
                    <Input 
                      id="issuer" 
                      required 
                      value={formData.issuer}
                      onChange={e => setFormData({...formData, issuer: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Issue Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link">Credential URL</Label>
                    <Input 
                      id="link" 
                      type="url" 
                      value={formData.link}
                      onChange={e => setFormData({...formData, link: e.target.value})}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Save Certification</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {certs.map((cert) => (
            <Card key={cert.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{cert.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" /> {cert.issuer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {cert.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cert.link && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeCert(cert.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certifications;