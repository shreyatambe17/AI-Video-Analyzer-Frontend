import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Lock, ArrowRight } from 'lucide-react';
import { VerificationBenefits } from './VerificationBenefits';

export const RegisterForm = () => {
  const [name, setName] = useState('Elena Rostova');
  const [email, setEmail] = useState('elena@mit.edu');
  const [major, setMajor] = useState('Computer Science');
  const [password, setPassword] = useState('••••••••••••');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      
      {/* Full Name */}
      <div>
        <label className="text-[11px] font-mono text-slate-400 font-bold uppercase block mb-1.5">
          FULL NAME
        </label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Campus Email */}
      <div>
        <label className="text-[11px] font-mono text-slate-400 font-bold uppercase block mb-1.5">
          CAMPUS / UNIVERSITY EMAIL (.EDU RECOMMENDED)
        </label>
        <div className="relative">
          <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elena@mit.edu (unlimited storage)"
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Major & Password Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-mono text-slate-400 font-bold uppercase block mb-1.5">
            PRIMARY MAJOR
          </label>
          <select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Physics & Mathematics">Physics & Mathematics</option>
            <option value="Business & Finance">Business & Finance</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-400 font-bold uppercase block mb-1.5">
            CREATE PASSWORD
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8+ characters"
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </div>
      </div>

      <VerificationBenefits />

      {/* Primary Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
      >
        <span>Create Student Account</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};
