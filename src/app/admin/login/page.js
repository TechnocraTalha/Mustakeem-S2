"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("talhasiddiqui240@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    if (email === "talhasiddiqui240@gmail.com" && password === "Iammohd1@#") {
      // Bypass Firebase Auth for immediate access as requested
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please use the provided password.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full">
      {/* Visual Anchor: Left Side Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-variant overflow-hidden items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] hover:scale-105 ease-linear" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlzTqfvmqIDD7ltGI-YSOvoYpTKmga05aWQBgrIyYeFJ5LuzshHKosbfL_vgBozUk_CXHYXeZpujwXM0CH0CfvGdDgdDfrSAEO8M_Dij7ehg774fggdHvM-pLSIuseRjOSPK9utNxCBdxcLcRwOLQWFAg-EuZTN-unHs4wzvhF3aPwijkOvPlluq0Z8MYbgAJlmM6hqZF9O7SSfz2UPBBAczjKz4SnMkpOcW7vhCBBwurpDvL_Hr0M4r-0ekQvnHicbCZF9Zalp0A')" }}
        >
        </div>
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-bright/20 mix-blend-overlay"></div>
      </div>
      
      {/* Functional Anchor: Right Side Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-margin-mobile md:px-margin-desktop bg-surface-bright">
        <div className="w-full max-w-[420px] flex flex-col gap-16 py-24">
          
          {/* Branding & Intent */}
          <div className="flex flex-col gap-4 items-start">
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-wide">
              L'ÉLÉGANCE
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Administrative Portal
            </p>
          </div>
          
          {/* Transactional Form */}
          <form className="flex flex-col gap-10" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div className="flex flex-col gap-3 relative group">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.15em] transition-colors group-focus-within:text-secondary-fixed-dim" htmlFor="email">
                Email Address
              </label>
              <div className="relative flex items-center">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant font-body-lg text-body-lg text-on-surface py-2 pl-0 pr-8 focus:ring-0 focus:border-secondary-fixed transition-colors placeholder:text-outline-variant/50" 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-0 text-outline-variant group-focus-within:text-secondary-fixed-dim transition-colors pointer-events-none text-[20px]">
                  mail
                </span>
              </div>
            </div>
            
            {/* Password Field */}
            <div className="flex flex-col gap-3 relative group">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.15em] transition-colors group-focus-within:text-secondary-fixed-dim" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant font-body-lg text-body-lg text-on-surface py-2 pl-0 pr-8 focus:ring-0 focus:border-secondary-fixed transition-colors placeholder:text-outline-variant/50" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-0 text-outline-variant group-focus-within:text-secondary-fixed-dim transition-colors pointer-events-none text-[20px]">
                  lock
                </span>
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            {/* Actions */}
            <div className="pt-6 flex flex-col gap-8">
              <button 
                className="w-full py-5 bg-primary text-on-primary font-button text-button uppercase tracking-[0.1em] hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all duration-500 ease-out flex items-center justify-center gap-3" 
                type="submit"
              >
                <span>Login</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              
              <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-sm border border-outline-variant/20">
                <span className="material-symbols-outlined text-outline text-[16px] mt-0.5">info</span>
                <p className="font-body-md text-body-md text-outline text-sm leading-relaxed">
                  Access restricted to authorized personnel only. All login attempts are logged and monitored.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
