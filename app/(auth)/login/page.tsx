"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm as useReactHookForm } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const form = useReactHookForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    setErrorStatus(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setErrorStatus(result.error);
        toast.error("Invalid credentials.");
      } else {
        toast.success("Login successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setErrorStatus("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemo = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password123");
  };

  return (
    <div className="flex w-full">
      {/* Left Panel - 60% */}
      <div className="hidden lg:flex flex-col w-[60%] bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] p-12 text-white justify-between relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl mix-blend-overlay" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-400/20 blur-3xl mix-blend-overlay" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl shadow-brand flex items-center justify-center">
            {/* Simple CSS logo rendering */}
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5"/>
                  <stop offset="55%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
              <rect width="40" height="40" rx="10" fill="url(#lg)"/>
              <path d="M12 10 L20 22 L28 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M20 22 L20 32" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">YUGAMCLOUD.ai</span>
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-display-xl font-bold leading-tight mb-4 tracking-tight drop-shadow-sm">
            Powering Careers with AI
          </h1>
          <p className="text-xl text-brand-50 mb-8 opacity-90 font-medium">
            Training · Placement · Consultancy
          </p>
          
          <div className="flex gap-2 flex-wrap mb-16">
            {["Next.js", "Express.js", "Snowflake ❄️", "React", "Node.js", "AWS"].map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-white/15 hover:bg-white/20 text-white border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
            <p className="text-brand-50 italic mb-4 leading-relaxed">
              "I went from ₹4.2 LPA to ₹10.5 LPA in 6 months thanks to YUGAMCLOUD.ai's Snowflake program. The hands-on labs and placement support are unmatched."
            </p>
            <div className="font-medium text-white">— Kiran Patel, Snowflake DBA</div>
          </div>
        </div>
        
        <div className="relative z-10 text-sm opacity-60">
          © 2026 Yugam Cloud Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>

      {/* Right Panel - 40% */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-8 lg:p-12 relative">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center lg:text-left">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <defs>
                  <linearGradient id="lg-mob" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5"/>
                    <stop offset="55%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="10" fill="url(#lg-mob)"/>
                <path d="M12 10 L20 22 L28 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M20 22 L20 32" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
              <span className="font-display font-bold text-xl">YUGAMCLOUD.ai</span>
            </div>
            
            <h2 className="text-display-lg font-bold text-text-1 tracking-tight">Welcome back</h2>
            <p className="text-text-2 mt-2">Sign in to access your dashboard</p>
          </div>

          {/* Quick role tabs - purely decorative for this demo but looks good */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button type="button" onClick={() => fillDemo('admin@yugamcloud.ai')} className="flex items-center gap-2 p-3 text-sm font-medium border rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors text-text-2 hover:text-brand-600">
              <span className="text-lg">⚙️</span> Admin
            </button>
            <button type="button" onClick={() => fillDemo('hr@yugamcloud.ai')} className="flex items-center gap-2 p-3 text-sm font-medium border rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors text-text-2 hover:text-brand-600">
              <span className="text-lg">🧑‍💼</span> HR Manager
            </button>
            <button type="button" onClick={() => fillDemo('priya@yugamcloud.ai')} className="flex items-center gap-2 p-3 text-sm font-medium border rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors text-text-2 hover:text-brand-600">
              <span className="text-lg">💼</span> Employee
            </button>
            <button type="button" className="flex items-center gap-2 p-3 text-sm font-medium border rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors text-text-2 hover:text-brand-600">
              <span className="text-lg">👤</span> Candidate
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {errorStatus && (
              <Alert variant="destructive" className="bg-error-bg border-error/20 text-error">
                <AlertDescription>{errorStatus}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@yugamcloud.ai"
                className="h-11 border-border focus-visible:ring-brand-500 rounded-lg px-4"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-error mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 border-border focus-visible:ring-brand-500 rounded-lg pl-4 pr-10"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-2 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-error mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium text-[15px] shadow-sm transition-all shadow-brand-600/20 hover:shadow-brand-600/30"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-2">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
