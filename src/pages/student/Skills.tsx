"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Code2, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Skill {
  id: string;
  name: string;
  level: string;
}

const Skills = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState('Beginner');

  useEffect(() => {
    if (user) fetchSkills();
  }, [user]);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSkills(data || []);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill || !user) return;
    setAdding(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ 
          name: newSkill, 
          level: newLevel,
          user_id: user.id 
        }])
        .select();

      if (error) throw error;
      
      setSkills([data[0], ...skills]);
      setNewSkill('');
      showSuccess(`Added ${newSkill} to your skills!`);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setAdding(false);
    }
  };

  const removeSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSkills(skills.filter(s => s.id !== id));
      showSuccess("Skill removed");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-slate-100 text-slate-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-indigo-100 text-indigo-700';
      case 'Expert': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Skills & Expertise</h1>
          <p className="text-slate-500">Manage your technical stack and proficiency levels.</p>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Add New Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2 w-full">
                <Label>Skill Name</Label>
                <Input 
                  placeholder="e.g. Java, Python, Figma" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48 space-y-2">
                <Label>Proficiency</Label>
                <Select value={newLevel} onValueChange={setNewLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddSkill} 
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                disabled={adding || !newSkill}
              >
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Skill
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Code2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{skill.name}</p>
                      <Badge variant="secondary" className={cn("mt-1 font-normal", getLevelColor(skill.level))}>
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {skills.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed">
                <p className="text-slate-500">No skills added yet. Start by adding your first skill above!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Skills;