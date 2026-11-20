import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterHeader } from '../components/pages/register/RegisterHeader';
import { RoleSelector } from '../components/pages/register/RoleSelector';
import { RegisterForm } from '../components/pages/register/RegisterForm';

export const RegisterPage = () => {
  const [activeRole, setActiveRole] = useState('student');

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col justify-between p-6 sm:p-10">
      <RegisterHeader />

      <div className="max-w-lg w-full mx-auto my-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 text-xs font-mono text-cyan-400 font-semibold">
            <span>JOIN 45,000+ STUDENTS</span>
            <span>•</span>
            <span className="text-emerald-400">100% Free for College</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-1">
            Start Studying Smarter
          </h1>
          <p className="text-xs text-slate-400">
            Instant verbatim transcription, slide diagrams, and exam prep summaries.
          </p>
        </div>

        <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4">
          <RoleSelector activeRole={activeRole} setActiveRole={setActiveRole} />
          <RegisterForm />
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </div>

      <div className="text-center text-[11px] font-mono text-slate-600 pt-6">
        OmniStudy Platform • AES-256 Encrypted Lecture Storage
      </div>
    </div>
  );
};

export default RegisterPage;
