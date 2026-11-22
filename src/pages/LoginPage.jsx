import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, Eye, EyeOff, Clock, Sparkles, Zap, CheckCircle2, AlertCircle, 
  Loader2, X, Mail, Lock, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('shreya.tambe@example.com');
  const [password, setPassword] = useState('student@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('idle');
  const [forgotError, setForgotError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validateEmail = (val) => {
    if (!val || !val.trim()) return 'Email address is required.';
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(val.trim())) return 'Please enter a valid email address.';
    return '';
  };

  const validatePassword = (val) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    if (field === 'password') setErrors(prev => ({ ...prev, password: validatePassword(password) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setErrors({ email: emailErr, password: passErr });

    if (emailErr || passErr) return;

    setIsSubmitting(true);
    setAuthError('');

    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem('isAuthenticated', 'true');
      
      // ✅ Save User Data
      const name = email.includes('shreya') ? 'Shreya Tambe' : email.split('@')[0];
      const userData = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        role: 'Student',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=FF6B6B&color=fff`
      };
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/');
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: 'Google User',
        email: 'user@gmail.com',
        role: 'Student',
        avatar: `https://ui-avatars.com/api/?name=Google+User&background=4FACFE&color=fff`
      }));
      navigate('/');
    }, 800);
  };

  const handleQuickFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setTouched({ email: true, password: true });
    setErrors({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch relative z-10 animate-fade-in">
        
        <div className="glass-strong rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-white shadow-md glow-red">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight gradient-text">AI Video Summarizer</span>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">Welcome back</h1>
              <p className="text-sm text-[var(--color-text-body)] mt-2">Sign in to continue to your workspace.</p>
            </div>

            <div className="mt-5 p-3 bg-white/60 border border-[var(--color-border)] rounded-xl flex items-center justify-between text-xs shadow-sm">
              <span className="text-[var(--color-text-muted)] font-medium">Demo account available</span>
              <button type="button" onClick={() => handleQuickFill('shreya.tambe@example.com', 'student@2026')} className="text-xs font-bold text-[var(--color-primary)] hover:underline cursor-pointer">Auto-fill</button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) })); }} onBlur={() => handleBlur('email')} className={`input-glass pl-10 ${touched.email && errors.email ? 'border-[var(--color-primary)]' : ''}`} />
                </div>
                {touched.email && errors.email && <p className="text-[var(--color-primary)] text-xs mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (touched.password) setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) })); }} onBlur={() => handleBlur('password')} className={`input-glass pl-10 pr-10 ${touched.password && errors.password ? 'border-[var(--color-primary)]' : ''}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.password && errors.password && <p className="text-[var(--color-primary)] text-xs mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[var(--color-text-body)]">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded accent-[var(--color-primary)]" /> Remember me
                </label>
                <button type="button" onClick={() => setIsForgotModalOpen(true)} className="text-[var(--color-primary)] font-semibold hover:underline">Forgot password?</button>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-4">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-border)]" /></div>
                <span className="relative bg-white/80 px-3 text-[11px] text-[var(--color-text-muted)] font-medium uppercase rounded-full">or continue with</span>
              </div>

              <button type="button" disabled={isGoogleLoading} onClick={handleGoogleSignIn} className="btn-ghost w-full py-2.5 text-sm flex items-center justify-center gap-2.5">
                {isGoogleLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connecting...</> : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" /></svg>
                    Sign in with Google
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-sm text-[var(--color-text-body)]">
            Don't have an account? <Link to="/register" className="text-[var(--color-primary)] font-bold hover:underline">Create account</Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-between glass-card p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-[var(--color-text)] leading-tight">Turn videos into <span className="gradient-text">clear knowledge</span></h2>
            <p className="text-sm text-[var(--color-text-body)] mt-3 leading-relaxed">Summaries, key points, chapters, notes, flashcards and more.</p>
          </div>
          <div className="mt-8 space-y-4 relative z-10">
            <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0"><Clock className="w-5 h-5" /></div>
              <div><h3 className="text-sm font-bold text-[var(--color-text)]">Save time</h3><p className="text-xs text-[var(--color-text-muted)]">Summarize 2-hour lectures in seconds</p></div>
            </div>
            <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary-soft)] text-[var(--color-secondary)] flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5" /></div>
              <div><h3 className="text-sm font-bold text-[var(--color-text)]">Learn smarter</h3><p className="text-xs text-[var(--color-text-muted)]">Auto-generated flashcards & quiz</p></div>
            </div>
          </div>
          <div className="mt-8 text-xs font-medium text-[var(--color-text-muted)] flex items-center justify-center gap-2 relative z-10">
            <ShieldCheck className="w-4 h-4 text-[var(--color-secondary)]" /> Secure AES-256 Encrypted Vault
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;