import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, Eye, EyeOff, Clock, Sparkles, Zap, CheckCircle2, AlertCircle, 
  Loader2, User, Mail, Lock, GraduationCap, BookOpen
} from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState({ fullName: false, email: false, password: false, terms: false });
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '', terms: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (val) => (!val || val.trim().length < 2) ? 'Please enter your full name.' : '';
  const validateEmail = (val) => {
    if (!val || !val.trim()) return 'Email is required.';
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(val.trim()) ? '' : 'Enter a valid email address.';
  };
  const validatePassword = (val) => {
    if (!val) return 'Password is required.';
    if (val.length < 8) return 'Password must be at least 8 characters.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true, terms: true });

    const nErr = validateName(fullName);
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const tErr = termsAccepted ? '' : 'You must accept the terms.';
    setErrors({ fullName: nErr, email: eErr, password: pErr, terms: tErr });

    if (nErr || eErr || pErr || tErr) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem('isAuthenticated', 'true');
      
      const userData = {
        name: fullName,
        email: email,
        role: role.charAt(0).toUpperCase() + role.slice(1),
        avatar: `https://ui-avatars.com/api/?name=${fullName}&background=FF6B6B&color=fff`
      };
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="max-w-xl w-full glass-strong rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative z-10 animate-fade-in">
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white shadow-md glow-red mb-4">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--color-text)] tracking-tight">Create your account</h1>
          <p className="text-sm text-[var(--color-text-body)] mt-1">Join students turning hours of video into crisp study notes.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={`input-glass ${touched.fullName && errors.fullName ? 'border-[var(--color-primary)]' : ''}`} placeholder="John Doe" />
            </div>
            {touched.fullName && errors.fullName && <p className="text-[var(--color-primary)] text-xs mt-1 font-medium">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`input-glass ${touched.email && errors.email ? 'border-[var(--color-primary)]' : ''}`} placeholder="john@example.com" />
            </div>
            {touched.email && errors.email && <p className="text-[var(--color-primary)] text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={`input-glass pr-10 ${touched.password && errors.password ? 'border-[var(--color-primary)]' : ''}`} placeholder="At least 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {touched.password && errors.password && <p className="text-[var(--color-primary)] text-xs mt-1 font-medium">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setRole('student')} className={`py-2.5 px-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${role === 'student' ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'border-[var(--color-border)] bg-white/50 text-[var(--color-text-body)] hover:bg-white'}`}><GraduationCap className="w-4 h-4" /> Student</button>
              <button type="button" onClick={() => setRole('researcher')} className={`py-2.5 px-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${role === 'researcher' ? 'border-[var(--color-secondary)] bg-[var(--color-secondary-soft)] text-[var(--color-secondary)]' : 'border-[var(--color-border)] bg-white/50 text-[var(--color-text-body)] hover:bg-white'}`}><BookOpen className="w-4 h-4" /> Researcher</button>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[var(--color-text-body)]">
              <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="w-4 h-4 mt-0.5 rounded accent-[var(--color-primary)]" />
              <span>I agree to the <span className="text-[var(--color-primary)] font-semibold hover:underline">Terms of Service</span> and <span className="text-[var(--color-primary)] font-semibold hover:underline">Privacy Policy</span>.</span>
            </label>
            {touched.terms && errors.terms && <p className="text-[var(--color-primary)] text-xs mt-1 font-medium">{errors.terms}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 mt-4">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : 'Create Free Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--color-text-body)]">
          Already have an account? <Link to="/login" className="text-[var(--color-primary)] font-bold hover:underline">Sign in</Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;