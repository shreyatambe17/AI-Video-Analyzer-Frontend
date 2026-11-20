import React from 'react';
import { Link } from 'react-router-dom';
import { LoginHeader } from '../components/pages/login/LoginHeader';
import { SsoOptions } from '../components/pages/login/SsoOptions';
import { LoginForm } from '../components/pages/login/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col justify-between p-6 sm:p-10">
      <LoginHeader />

      <div className="max-w-md w-full mx-auto my-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            ● Ready for Finals & Lecture Notes
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight pt-2">
            Welcome back, Scholar
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your recorded lectures, AI flashcards, and verbatim notes.
          </p>
        </div>

        <div className="bg-[#0b0e17] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-6">
          <SsoOptions />
          <LoginForm />
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
            Register Student Account &rarr;
          </Link>
        </div>
      </div>

      <div className="text-center text-[11px] font-mono text-slate-600 pt-6">
        OmniStudy Platform • AES-256 Encrypted Lecture Storage
      </div>
    </div>
  );
};

export default LoginPage;
