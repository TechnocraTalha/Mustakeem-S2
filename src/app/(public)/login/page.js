"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "firebase/auth";
import { Suspense } from "react";
import { MailIcon, LockIcon, ArrowForwardIcon } from "@/components/Icons";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(redirectPath);
      }
    });
    return () => unsubscribe();
  }, [router, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // onAuthStateChanged will handle the redirect
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center px-4 bg-surface-bright">
      <div className="w-full max-w-[420px] flex flex-col gap-10 py-16">
        
        {/* Branding & Intent */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-wide">
            {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {isLogin 
              ? "Sign in to book and manage your appointments." 
              : "Sign up to book appointments and track your visits."}
          </p>
        </div>
        
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div className="flex flex-col gap-2 relative group">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.15em] transition-colors group-focus-within:text-secondary-fixed-dim" htmlFor="email">
              Email Address
            </label>
            <div className="relative flex items-center">
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant font-body-lg text-body-lg text-on-surface py-2 pl-0 pr-8 focus:ring-0 focus:border-secondary-fixed transition-colors placeholder:text-outline-variant/50" 
                id="email" 
                placeholder="Enter your email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MailIcon className="w-5 h-5 absolute right-0 text-outline-variant group-focus-within:text-secondary-fixed-dim transition-colors pointer-events-none" />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="flex flex-col gap-2 relative group">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.15em] transition-colors group-focus-within:text-secondary-fixed-dim" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant font-body-lg text-body-lg text-on-surface py-2 pl-0 pr-8 focus:ring-0 focus:border-secondary-fixed transition-colors placeholder:text-outline-variant/50" 
                id="password" 
                placeholder="••••••••" 
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LockIcon className="w-5 h-5 absolute right-0 text-outline-variant group-focus-within:text-secondary-fixed-dim transition-colors pointer-events-none" />
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          {/* Actions */}
          <div className="pt-4 flex flex-col gap-6">
            <button 
              className="w-full py-4 bg-primary text-on-primary font-button text-button uppercase tracking-[0.1em] hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all duration-500 ease-out flex items-center justify-center gap-3 disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}</span>
              {!loading && <ArrowForwardIcon className="w-[18px] h-[18px]" />}
            </button>

            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-label-caps text-secondary-fixed-dim hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
