import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Send, 
  MessageCircle, 
  Users, 
  ChevronLeft,
  Eye, 
  EyeOff, 
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  pendingActionName?: string; // Optional context
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  pendingActionName = 'proceed with your purchase'
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Registration Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telegramPhone, setTelegramPhone] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [parentsNumber, setParentsNumber] = useState('');

  // Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  if (!isOpen) return null;

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginUsername || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }

    // Load registered users
    const savedUsers = localStorage.getItem('knotify_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    // Find user by email or name
    const user = users.find(
      (u: any) => 
        (u.email.toLowerCase() === loginUsername.toLowerCase() || 
         u.name.toLowerCase() === loginUsername.toLowerCase()) && 
        u.password === loginPassword
    );

    if (user) {
      localStorage.setItem('knotify_current_user', JSON.stringify(user));
      onSuccess(user);
    } else {
      setError('Invalid username/email or password.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !telegramPhone || !parentsNumber) {
      setError('Please fill in all compulsory fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Load existing users
    const savedUsers = localStorage.getItem('knotify_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      email,
      password,
      telegramPhone,
      whatsApp: whatsApp || undefined,
      parentsNumber,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('knotify_users', JSON.stringify(users));
    localStorage.setItem('knotify_current_user', JSON.stringify(newUser));
    onSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#040906] overflow-hidden">
      {/* Blurred Model Background Image with smooth transition */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${isLogin ? '/models/model6.jpg' : '/models/model3.jpg'})`,
            filter: 'blur(16px) brightness(0.35) contrast(1.05)',
            transform: 'scale(1.08)'
          }}
        />
        {/* Dark brand gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-brand-bg/40" />
      </div>

      {/* Dynamic Ambient Blurred Gradients (Matching Knotify colors & reference image glow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {/* Soft emerald/teal top-right glow */}
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-accent/25 blur-[120px] mix-blend-screen" />
        
        {/* Soft olive/sage bottom-left glow */}
        <div className="absolute -bottom-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-brand-secondary/15 blur-[130px] mix-blend-screen" />
        
        {/* Center ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-brand-light-gray/20 blur-[100px]" />
      </div>

      {/* Elegant Mesh Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#14281E_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none z-[2]" />

      {/* Header Utilities (Back Button) */}
      <div className="absolute top-0 inset-x-0 p-6 sm:p-8 flex justify-between items-center z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-white/80 font-sans tracking-wide rounded-full border border-white/10 transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft size={14} />
          Back
        </button>
      </div>

      {/* Content Container (Symmetrical centered column like the reference image) */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center justify-center min-h-screen text-center">
        
        {/* Logo Text (Normal Knotify font styling from the main page) */}
        <div className="flex items-baseline justify-center gap-1.5 mb-6">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-primary tracking-tight leading-none select-none">
            Knotify
          </span>
          <span className="w-2 h-2 rounded-full bg-brand-secondary inline-block"></span>
        </div>

        {/* Dynamic Greeting Heading & Toggle */}
        <div className="space-y-2.5 mb-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
            {isLogin ? 'Yooo, welcome back!' : 'Join Knotify'}
          </h2>
          <p className="text-sm text-neutral-400 font-sans">
            {isLogin ? 'First time here? ' : 'Already have an account? '}
            <button
              onClick={handleToggleMode}
              className="text-white hover:underline font-medium transition-colors cursor-pointer"
            >
              {isLogin ? 'Sign up for free' : 'Sign in to your account'}
            </button>
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="w-full mb-6 bg-red-500/10 border border-red-500/25 text-red-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2.5 text-left animate-shake">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Elements */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            /* SIGN IN FORM */
            <motion.form
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleLogin}
              className="w-full space-y-4"
            >
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your email or username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-sm rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-4 pr-11 py-3.5 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-sm rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-white hover:bg-neutral-100 text-black font-sans text-sm font-semibold rounded-xl transition-all duration-300 shadow-xl cursor-pointer"
              >
                Sign in
              </button>

              {/* Elegant auxiliary links like the reference image */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Check your inbox! (Simulated magic link Sent)')}
                  className="text-xs text-neutral-400 hover:text-white transition-colors font-sans cursor-pointer"
                >
                  Sign in using magic link
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-brand-border/40"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-brand-border/40"></div>
              </div>

              <button
                type="button"
                onClick={() => alert('Covenant SSO login is simulated for developers')}
                className="w-full py-3 bg-transparent border border-brand-border hover:bg-white/5 text-white font-sans text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer"
              >
                Single sign-on (SSO)
              </button>
            </motion.form>
          ) : (
            /* CREATE ACCOUNT FORM (Scrollable to prevent cutoff on smaller screens) */
            <motion.form
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleRegister}
              className="w-full space-y-3 max-h-[420px] overflow-y-auto pr-1 text-left"
            >
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Full Name <span className="text-brand-secondary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daniel Adebayo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-xs rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Email Address <span className="text-brand-secondary">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. daniel@student.covenant.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-xs rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Password <span className="text-brand-secondary">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-xs rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 flex justify-between">
                  <span>Telegram Phone <span className="text-brand-secondary">*</span></span>
                  <span className="text-[8px] opacity-50 lowercase font-normal">for delivery coordination</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 08012345678"
                  value={telegramPhone}
                  onChange={(e) => setTelegramPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-xs rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 flex justify-between">
                  <span>WhatsApp <span className="opacity-50 lowercase font-normal">(Optional)</span></span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  value={whatsApp}
                  onChange={(e) => setWhatsApp(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-xs rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Parent's Phone Number <span className="text-brand-secondary">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 08023456789"
                  value={parentsNumber}
                  onChange={(e) => setParentsNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D1913]/35 border border-[#14281E] hover:border-brand-secondary/40 focus:border-brand-secondary text-white font-sans text-xs rounded-xl focus:outline-none transition-all placeholder:text-neutral-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-4 bg-white hover:bg-neutral-100 text-black font-sans text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                Create Account
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Legal Disclaimer Footer (Exactly matching the reference style) */}
        <p className="text-[10px] text-neutral-500 max-w-xs mx-auto leading-normal font-sans pt-8">
          You acknowledge that you read, and agree, to our{' '}
          <span className="underline hover:text-neutral-300 transition-colors cursor-pointer">Terms of Service</span> and our{' '}
          <span className="underline hover:text-neutral-300 transition-colors cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
