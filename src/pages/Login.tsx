"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showError, showSuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setDemoMode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8082/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const user = await response.json();

      // backend returns null if login fails
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // store logged-in user
      localStorage.setItem("user", JSON.stringify(user));

      showSuccess("Welcome back to SkillPort!");

      // redirect based on role
      navigate(`/dashboard/${user.role}`);
    } catch (error: any) {
      showError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: "student" | "recruiter" | "admin") => {
    setDemoMode(role);
    showSuccess(`Entering as Demo ${role}...`);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome back
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>

              <p className="text-sm text-center text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Demo buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("student")}
          >
            <Play className="w-4 h-4" /> Student
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("recruiter")}
          >
            <Play className="w-4 h-4" /> Recruiter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("admin")}
          >
            <Play className="w-4 h-4" /> Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;