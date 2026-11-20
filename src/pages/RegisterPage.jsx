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
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  BookOpen, 
  Check 
} from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('Shreya Tambe');
  const [email, setEmail] = useState('shreya.tambe@example.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' | 'researcher' | 'educator'
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Validation states
  const [touched, setTouched] = useState({ fullName: false, email: false, password: false, terms: false });
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '', terms: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateName = (val) => {
    if (!val || val.trim().length < 2) {
      return 'Please enter your full name (at least 2 characters).';
    }
    return '';
  };

  const validateEmail = (val) => {
    if (!val || !val.trim()) {
      return 'Email address is required.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (val) => {
    if (!val) {
      return 'Password is required.';
    }
    if (val.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    return '';
  };

  // Password strength calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: 'Empty', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { score: 2, text: 'Good', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'fullName') setErrors(prev => ({ ...prev, fullName: validateName(fullName) }));
    if (field === 'email') setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    if (field === 'password') setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    if (field === 'terms') setErrors(prev => ({ ...prev, terms: termsAccepted ? '' : 'You must accept the terms of service.' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true, terms: true });

    const nErr = validateName(fullName);
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const tErr = termsAccepted ? '' : 'You must accept the terms to create an account.';

    setErrors({ fullName: nErr, email: eErr, password: pErr, terms: tErr });

    if (nErr || eErr || pErr || tErr) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/');
    }, 800);
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-[#0c101d] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans relative overflow-hidden">
      
      {/* Background ambient lighting matching project theme */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#5850ec]/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch relative z-10">
        
        {/* Form Card */}
        <div className="bg-[#121828] border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5850ec] flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                AI Video Summarizer
              </span>
            </div>

            {/* Header Text */}
            <div className="mt-7">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Create your account
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Join students turning hours of video into crisp study notes
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reg-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (touched.fullName) setErrors(prev => ({ ...prev, fullName: validateName(e.target.value) }));
                    }}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Shreya Tambe"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-slate-100 text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all ${
                      touched.fullName && errors.fullName
                        ? 'bg-rose-950/20 border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                        : 'bg-slate-900/90 border-slate-700/80 focus:border-[#5850ec] focus:ring-2 focus:ring-[#5850ec]/25'
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
                    }}
                    onBlur={() => handleBlur('email')}
                    placeholder="shreya.tambe@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-slate-100 text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? 'bg-rose-950/20 border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                        : 'bg-slate-900/90 border-slate-700/80 focus:border-[#5850ec] focus:ring-2 focus:ring-[#5850ec]/25'
                    }`}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched.password) setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) }));
                    }}
                    onBlur={() => handleBlur('password')}
                    placeholder="At least 8 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-slate-100 text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all ${
                      touched.password && errors.password
                        ? 'bg-rose-950/20 border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                        : 'bg-slate-900/90 border-slate-700/80 focus:border-[#5850ec] focus:ring-2 focus:ring-[#5850ec]/25'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Password strength:</span>
                      <span className="font-semibold text-slate-200">{strength.text}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-slate-800'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-slate-800'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-slate-800'}`} />
                    </div>
                  </div>
                )}

                {touched.password && errors.password && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      role === 'student'
                        ? 'border-[#5850ec] bg-[#5850ec]/15 text-indigo-300 font-semibold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('researcher')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      role === 'researcher'
                        ? 'border-[#5850ec] bg-[#5850ec]/15 text-indigo-300 font-semibold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Researcher</span>
                  </button>
                </div>
              </div>

              {/* Terms and conditions checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (touched.terms) setErrors(prev => ({ ...prev, terms: e.target.checked ? '' : 'Please accept terms.' }));
                    }}
                    className="w-4 h-4 rounded text-[#5850ec] bg-slate-900 border-slate-700 mt-0.5"
                  />
                  <span>
                    I agree to the <span className="text-indigo-400 hover:underline">Terms of Service</span> and <span className="text-indigo-400 hover:underline">Privacy Policy</span>
                  </span>
                </label>
                {touched.terms && errors.terms && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.terms}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-3 active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Free Account</span>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Right Hero Side */}
        <div className="bg-gradient-to-br from-[#141b2e] via-[#121828] to-[#1a1c36] border border-slate-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              100% Free for Students
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-4">
              Turn videos into clear knowledge
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Summaries, key points, chapters, notes, flashcards and more.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-xl bg-[#5850ec]/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Save hours every week</h3>
                  <p className="text-[11px] text-slate-400">Get 10-minute digests of 2-hour lectures</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-xl bg-[#5850ec]/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Learn smarter with AI</h3>
                  <p className="text-[11px] text-slate-400">Auto-generated flashcards, chapters and Q&A</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
                <div className="w-8 h-8 rounded-xl bg-[#5850ec]/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Export formatted study guides</h3>
                  <p className="text-[11px] text-slate-400">One-click PDF reports ready for exams</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[11px] text-slate-500 text-center">
            AI Video Summarizer • Empowering student learning
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
