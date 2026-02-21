"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Mail,
  Download
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { showSuccess } from '@/utils/toast';

const ManageStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    { id: '1', name: 'Alex Johnson', email: 'alex.j@university.edu', department: 'Computer Science', year: '4th Year', status: 'Active' },
    { id: '2', name: 'Sarah Chen', email: 's.chen@university.edu', department: 'Design', year: '3rd Year', status: 'Active' },
    { id: '3', name: 'Michael Ross', email: 'm.ross@university.edu', department: 'Data Science', year: '2nd Year', status: 'Inactive' },
    { id: '4', name: 'Emily Davis', email: 'e.davis@university.edu', department: 'Information Tech', year: '4th Year', status: 'Active' },
    { id: '5', name: 'James Wilson', email: 'j.wilson@university.edu', department: 'Computer Science', year: '1st Year', status: 'Active' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusToggle = (name: string) => {
    showSuccess(`Updated status for ${name}`);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Students</h1>
            <p className="text-slate-500">View and manage student accounts across the institution.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Data
          </Button>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search students..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead>Student Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{student.name}</span>
                          <span className="text-xs text-slate-500">{student.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'Active' ? 'default' : 'secondary'} className={student.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Mail className="w-4 h-4" /> Email Student
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2"
                              onClick={() => handleStatusToggle(student.name)}
                            >
                              {student.status === 'Active' ? (
                                <><UserX className="w-4 h-4 text-red-500" /> Deactivate</>
                              ) : (
                                <><UserCheck className="w-4 h-4 text-emerald-500" /> Activate</>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageStudents;