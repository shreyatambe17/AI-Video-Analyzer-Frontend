import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Eye, 
  EyeOff, 
  Clock, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('shreya.tambe@example.com');
  const [password, setPassword] = useState('student@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Validation & Interaction State
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [forgotError, setForgotError] = useState('');

  // Google Login State
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Email validation regex
  const validateEmail = (val) => {
    if (!val || !val.trim()) {
      return 'Email address is required.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email address (e.g. name@domain.com).';
    }
    return '';
  };

  // Password validation
  const validatePassword = (val) => {
    if (!val) {
      return 'Password is required.';
    }
    if (val.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    }
    if (field === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(val) }));
    }
    if (authError) setAuthError('');
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(val) }));
    }
    if (authError) setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setErrors({ email: emailErr, password: passErr });

    if (emailErr || passErr) {
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    // Simulate authentication
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/');
    }, 700);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      navigate('/');
    }, 800);
  };

  const handleQuickFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setTouched({ email: true, password: true });
    setErrors({ email: '', password: '' });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const err = validateEmail(forgotEmail);
    if (err) {
      setForgotError(err);
      return;
    }

    setForgotError('');
    setForgotStatus('sending');
    setTimeout(() => {
      setForgotStatus('sent');
    }, 800);
  };

  const isEmailValid = touched.email && !errors.email && email.trim().length > 0;
  const isEmailInvalid = touched.email && !!errors.email;
  const isPassValid = touched.password && !errors.password && password.length >= 6;
  const isPassInvalid = touched.password && !!errors.password;

  return (
    <div className="min-h-screen bg-[#0c101d] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans relative overflow-hidden">
      
      {/* Background ambient lighting matching project theme */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#5850ec]/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch relative z-10">
        
        {/* Left Side: Modern Clean Login Form Card */}
        <div className="bg-[#121828] border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Brand Logo matching reference */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5850ec] flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                AI Video Summarizer
              </span>
            </div>

            {/* Header Text */}
            <div className="mt-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Sign in to continue to your workspace
              </p>
            </div>

            {/* Quick Demo Pill */}
            <div className="mt-4 p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Demo account available</span>
              <button
                type="button"
                onClick={() => handleQuickFill('shreya.tambe@example.com', 'student@2026')}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Auto-fill Shreya
              </button>
            </div>

            {/* Global Error Banner */}
            {authError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
              
              {/* Email Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300">
                    Email
                  </label>
                  {isEmailValid && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Valid email
                    </span>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="shreya.tambe@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-slate-100 text-xs sm:text-sm placeholder-slate-500 transition-all focus:outline-none ${
                      isEmailInvalid
                        ? 'bg-rose-950/20 border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                        : isEmailValid
                        ? 'bg-slate-900/90 border-slate-700/80 focus:border-[#5850ec] focus:ring-2 focus:ring-[#5850ec]/25'
                        : 'bg-slate-900/90 border-slate-700/80 focus:border-[#5850ec] focus:ring-2 focus:ring-[#5850ec]/25'
                    }`}
                    aria-invalid={isEmailInvalid}
                    aria-describedby={isEmailInvalid ? "email-error" : undefined}
                  />
                </div>
                {isEmailInvalid && (
                  <p id="email-error" className="text-rose-400 text-[11px] mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  {isPassValid && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur('password')}
                    placeholder="••••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-slate-100 text-xs sm:text-sm placeholder-slate-500 transition-all focus:outline-none ${
                      isPassInvalid
                        ? 'bg-rose-950/20 border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                        : 'bg-slate-900/90 border-slate-700/80 focus:border-[#5850ec] focus:ring-2 focus:ring-[#5850ec]/25'
                    }`}
                    aria-invalid={isPassInvalid}
                    aria-describedby={isPassInvalid ? "pass-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {isPassInvalid && (
                  <p id="pass-error" className="text-rose-400 text-[11px] mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Remember me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#5850ec] bg-slate-900 border-slate-700 focus:ring-[#5850ec] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotStatus('idle');
                    setForgotError('');
                    setIsForgotModalOpen(true);
                  }}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign in Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <span className="relative bg-[#121828] px-3 text-[11px] text-slate-500 uppercase tracking-wider">
                  or continue with
                </span>
              </div>

              {/* Google Button */}
              <button
                type="button"
                disabled={isGoogleLoading}
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900/60 hover:bg-slate-900 text-slate-200 font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Connecting with Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Card Footer */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline">
              Create account
            </Link>
          </div>
        </div>

        {/* Right Side: Feature Showcase Hero Card matching Screen 1 */}
        <div className="bg-gradient-to-br from-[#141b2e] via-[#121828] to-[#1a1c36] border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          
          {/* Subtle purple radial glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#5850ec]/15 rounded-full blur-3xl pointer-events-none" />

          {/* 3D-styled Illustration Mockup */}
          <div className="relative mx-auto w-full max-w-xs mt-4">
            <div className="bg-[#182138]/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-700/80 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-slate-700/60">
                <div className="w-6 h-6 rounded-lg bg-[#5850ec] flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span className="text-xs font-bold text-white tracking-tight">AI Summary Engine</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-indigo-500/40 rounded-full w-3/4" />
                <div className="h-2 bg-slate-700/60 rounded-full w-full" />
                <div className="h-2 bg-slate-700/60 rounded-full w-5/6" />
                <div className="flex gap-2 pt-2">
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium px-2.5 py-0.5 rounded-md">
                    Chapters
                  </span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium px-2.5 py-0.5 rounded-md">
                    Flashcards
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Feature bullets */}
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              Turn videos into clear knowledge
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Summaries, key points, chapters, notes, flashcards and more.
            </p>

            {/* Feature Pills */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3.5 bg-slate-900/60 backdrop-blur-xs p-3 rounded-2xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-xl bg-[#5850ec]/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Save time</h3>
                  <p className="text-[11px] text-slate-400">Summarize 2-hour lectures in seconds</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-900/60 backdrop-blur-xs p-3 rounded-2xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-xl bg-[#5850ec]/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Learn smarter</h3>
                  <p className="text-[11px] text-slate-400">Auto-generated interactive flashcards & quiz</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-900/60 backdrop-blur-xs p-3 rounded-2xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-xl bg-[#5850ec]/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Boost productivity</h3>
                  <p className="text-[11px] text-slate-400">Export clean formatted study PDFs for exams</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[11px] text-slate-500 text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Video Summarizer • AES-256 Encrypted Lecture Vault</span>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs" 
            onClick={() => setIsForgotModalOpen(false)} 
          />
          <div className="relative w-full max-w-md bg-[#141b2d] border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 z-10 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Reset Password</h2>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotStatus === 'sent' ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Reset Link Dispatched</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We've sent password reset instructions to <span className="font-semibold text-indigo-300">{forgotEmail}</span>. Check your inbox and spam folder.
                </p>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs font-semibold"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your registered email address and we'll send you a secure verification link to reset your account password.
                </p>

                <div>
                  <label htmlFor="forgot-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="shreya.tambe@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                  {forgotError && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{forgotError}</span>
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotStatus === 'sending'}
                    className="px-5 py-2 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
                  >
                    {forgotStatus === 'sending' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
