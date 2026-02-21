"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  User, 
  Code2, 
  FolderRoot, 
  Award, 
  Eye, 
  LogOut,
  Search,
  BarChart3,
  Users,
  Menu,
  X,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const studentNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
  { label: 'Profile', href: '/dashboard/student/profile', icon: User },
  { label: 'Skills', href: '/dashboard/student/skills', icon: Code2 },
  { label: 'Projects', href: '/dashboard/student/projects', icon: FolderRoot },
  { label: 'Certifications', href: '/dashboard/student/certs', icon: Award },
  { label: 'Jobs', href: '/dashboard/student/jobs', icon: Briefcase },
  { label: 'Preview Portfolio', href: '/portfolio/preview', icon: Eye },
];

const recruiterNav: NavItem[] = [
  { label: 'Talent Search', href: '/dashboard/recruiter', icon: Search },
  { label: 'Saved Profiles', href: '/dashboard/recruiter/saved', icon: Award },
  { label: 'Job Postings', href: '/dashboard/recruiter/jobs', icon: Briefcase },
];

const adminNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard/admin', icon: BarChart3 },
  { label: 'Manage Students', href: '/dashboard/admin/students', icon: Users },
];

const DashboardLayout = ({ children, role = 'student' }: { children: React.ReactNode, role?: 'student' | 'recruiter' | 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = role === 'student' ? studentNav : role === 'recruiter' ? recruiterNav : adminNav;

  const handleLogout = () => {
    showSuccess("Logged out successfully");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 border-b">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-900">SkillPort</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.href 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-slate-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold">SkillPort</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-20 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium",
                  location.pathname === item.href ? "bg-blue-50 text-blue-700" : "text-slate-600"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 px-4 py-3 text-slate-600"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0">
        <div className="container mx-auto p-4 lg:p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;