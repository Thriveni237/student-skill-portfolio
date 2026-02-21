"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Award, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

const Certifications = () => {
  const { user } = useAuth();
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    link: ''
  });

  useEffect(() => {
    if (user) fetchCerts();
  }, [user]);

  const fetchCerts = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCerts(data || []);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('certifications')
        .insert([{ ...formData, user_id: user.id }])
        .select();

      if (error) throw error;
      setCerts([data[0], ...certs]);
      setFormData({ name: '', issuer: '', date: '', link: '' });
      setIsAdding(false);
      showSuccess("Certification added successfully!");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const removeCert = async (id: string) => {
    try {
      const { error } = await supabase.from('certifications').delete().eq('id', id);
      if (error) throw error;
      setCerts(certs.filter(c => c.id !== id));
      showSuccess("Certification removed");
    } catch (error: any) {
      showError(error.message);
    }
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

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-blue-600" /></div>
        ) : (
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default Certifications;