import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/Dashboard";
import Skills from "./pages/student/Skills";
import Projects from "./pages/student/Projects";
import Certifications from "./pages/student/Certifications";
import Profile from "./pages/student/Profile";
import PortfolioPreview from "./pages/PortfolioPreview";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import SavedProfiles from "./pages/recruiter/SavedProfiles";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageStudents from "./pages/admin/ManageStudents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Student Routes */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/profile" element={<Profile />} />
          <Route path="/dashboard/student/skills" element={<Skills />} />
          <Route path="/dashboard/student/projects" element={<Projects />} />
          <Route path="/dashboard/student/certs" element={<Certifications />} />
          
          {/* Recruiter Routes */}
          <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
          <Route path="/dashboard/recruiter/saved" element={<SavedProfiles />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/students" element={<ManageStudents />} />
          
          {/* Public/Preview Routes */}
          <Route path="/portfolio/preview" element={<PortfolioPreview />} />
          
          {/* Redirect generic dashboard to student for now */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;