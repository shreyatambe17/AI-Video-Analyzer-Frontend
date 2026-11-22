import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Sliders, 
  Globe, 
  Bell, 
  Shield, 
  Camera, 
  Check, 
  AlertCircle, 
  Loader2, 
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_USER } from '../data/mockData';
import { api } from '../services/api';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile'); 
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(MOCK_USER.avatar);
  const [fullName, setFullName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [role, setRole] = useState(MOCK_USER.role);
  
  const [touched, setTouched] = useState({ fullName: false, email: false });
  const [errors, setErrors] = useState({ fullName: '', email: '' });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [autoSummary, setAutoSummary] = useState(true);
  const [highQualityAudio, setHighQualityAudio] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [emailNotify, setEmailNotify] = useState(true);
  const [processingDoneNotify, setProcessingDoneNotify] = useState(true);

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    api.getUserProfile().then(user => {
      if (user) {
        if (user.name) setFullName(user.name);
        if (user.email) setEmail(user.email);
        if (user.role) setRole(user.role);
        if (user.avatar) setAvatar(user.avatar);
      }
    });
  }, []);

  const subTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const validateName = (val) => (!val || val.trim().length < 2) ? 'Full name must be at least 2 characters.' : '';
  const validateEmail = (val) => {
    if (!val || !val.trim()) return 'Email address is required.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val.trim())) return 'Please enter a valid email address.';
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'fullName') setErrors(prev => ({ ...prev, fullName: validateName(fullName) }));
    if (field === 'email') setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { setAvatar(reader.result); MOCK_USER.avatar = reader.result; };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true });
    const nErr = validateName(fullName);
    const eErr = validateEmail(email);
    setErrors({ fullName: nErr, email: eErr });
    if (nErr || eErr) return;

    setIsSaving(true);
    try {
      await api.updateUserProfile({ name: fullName, email, role, avatar });
      setSavedSuccess(true);
      api.addHistory({ title: 'Updated user profile settings', type: 'upload', color: 'cyan' });
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) { console.error('Failed to update profile:', err); } 
    finally { setIsSaving(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPass) { setPassError('Please enter your current password.'); return; }
    if (newPass.length < 8) { setPassError('New password must be at least 8 characters long.'); return; }
    if (newPass !== confirmPass) { setPassError('New passwords do not match.'); return; }

    setPassError('');
    setIsChangingPass(true);
    try {
      await api.changePassword(currentPass, newPass);
      setPassSuccess(true); setCurrentPass(''); setNewPass(''); setConfirmPass('');
      setTimeout(() => setPassSuccess(false), 3000);
    } catch (err) { setPassError(err.message || 'Password update failed.'); } 
    finally { setIsChangingPass(false); }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">Settings</h1>
          <p className="text-sm text-[var(--color-text-body)] mt-1">Manage your account and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Sub-Menu Tabs */}
          <div className="md:col-span-4 glass-card p-2.5 space-y-1">
            {subTabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30'
                      : 'text-[var(--color-text-body)] hover:text-[var(--color-primary)] hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[var(--color-secondary)]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Settings Form */}
          <div className="md:col-span-8 glass-card p-5 sm:p-7 shadow-lg min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* SUB-TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <motion.form key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} onSubmit={handleSaveProfile} noValidate className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <h2 className="text-lg font-bold text-[var(--color-text)]">Profile Information</h2>
                    <span className="text-xs text-[var(--color-text-muted)]">Personalize your identity</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <img src={avatar} alt={fullName} className="w-20 h-20 rounded-full object-cover ring-4 ring-[var(--color-secondary)]/30 shadow-md" />
                    <div>
                      <input type="file" ref={fileInputRef} onChange={handleAvatarFile} accept="image/*" className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-secondary flex items-center gap-2 text-xs">
                        <Camera className="w-4 h-4" /> Change Photo
                      </button>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5">JPG, GIF or PNG. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value); if (touched.fullName) setErrors(prev => ({ ...prev, fullName: validateName(e.target.value) })); }}
                        onBlur={() => handleBlur('fullName')}
                        className={`input-glass ${touched.fullName && errors.fullName ? 'border-[var(--color-primary)] focus:ring-[var(--color-primary)]/30' : ''}`}
                      />
                      {touched.fullName && errors.fullName && <p className="text-[var(--color-primary)] text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) })); }}
                        onBlur={() => handleBlur('email')}
                        className={`input-glass ${touched.email && errors.email ? 'border-[var(--color-primary)] focus:ring-[var(--color-primary)]/30' : ''}`}
                      />
                      {touched.email && errors.email && <p className="text-[var(--color-primary)] text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Role</label>
                      <select value={role} onChange={(e) => setRole(e.target.value)} className="input-glass cursor-pointer appearance-none">
                        <option value="Student">Student</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Professor">Professor</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-[var(--color-border)]">
                    <button type="submit" disabled={isSaving} className="btn-primary flex items-center gap-2">
                      {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : savedSuccess ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* SUB-TAB 2: PREFERENCES */}
              {activeTab === 'preferences' && (
                <motion.div key="preferences" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
                  <h2 className="text-lg font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">Study Preferences</h2>
                  <div className="space-y-3.5">
                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors shadow-sm">
                      <div>
                        <p className="font-bold text-[var(--color-text)] text-sm">Auto-generate Flashcards</p>
                        <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Create flashcard decks automatically upon video ingest.</p>
                      </div>
                      <input type="checkbox" checked={autoSummary} onChange={(e) => setAutoSummary(e.target.checked)} className="w-5 h-5 rounded accent-[var(--color-primary)] cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors shadow-sm">
                      <div>
                        <p className="font-bold text-[var(--color-text)] text-sm">High Quality Neural Audio</p>
                        <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Use 48kHz sampling for complex multi-speaker diarization.</p>
                      </div>
                      <input type="checkbox" checked={highQualityAudio} onChange={(e) => setHighQualityAudio(e.target.checked)} className="w-5 h-5 rounded accent-[var(--color-primary)] cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors shadow-sm">
                      <div>
                        <p className="font-bold text-[var(--color-text)] text-sm">Dark Theme Interface</p>
                        <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Toggle dark mode for better night-time reading.</p>
                      </div>
                      <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="w-5 h-5 rounded accent-[var(--color-primary)] cursor-pointer" />
                    </label>
                  </div>
                </motion.div>
              )}

              {/* SUB-TAB 3: LANGUAGE */}
              {activeTab === 'language' && (
                <motion.div key="language" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
                  <h2 className="text-lg font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">Language & Translation</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Primary Transcription Language</label>
                      <select className="input-glass cursor-pointer appearance-none">
                        <option value="en">English (US)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <p className="text-xs text-[var(--color-text-body)] leading-relaxed bg-[var(--color-secondary-soft)]/50 p-3 rounded-xl border border-[var(--color-secondary)]/20">
                      The platform auto-detects multilingual switches within lecture audio and creates bilingual annotations.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* SUB-TAB 4: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <motion.div key="notifications" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
                  <h2 className="text-lg font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">Notification Settings</h2>
                  <div className="space-y-3.5">
                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors shadow-sm">
                      <div>
                        <p className="font-bold text-[var(--color-text)] text-sm">Email Digest</p>
                        <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Receive a summary digest when processing finishes.</p>
                      </div>
                      <input type="checkbox" checked={emailNotify} onChange={(e) => setEmailNotify(e.target.checked)} className="w-5 h-5 rounded accent-[var(--color-primary)] cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-colors shadow-sm">
                      <div>
                        <p className="font-bold text-[var(--color-text)] text-sm">Browser Push Alerts</p>
                        <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Instant popup notifications when flashcards are ready.</p>
                      </div>
                      <input type="checkbox" checked={processingDoneNotify} onChange={(e) => setProcessingDoneNotify(e.target.checked)} className="w-5 h-5 rounded accent-[var(--color-primary)] cursor-pointer" />
                    </label>
                  </div>
                </motion.div>
              )}

              {/* SUB-TAB 5: SECURITY */}
              {activeTab === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <h2 className="text-lg font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">Account Security</h2>
                  
                  {passSuccess && <div className="p-3.5 rounded-xl bg-[var(--color-secondary-soft)] border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] text-sm flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4" />Password updated successfully!</div>}
                  {passError && <div className="p-3.5 rounded-xl bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm flex items-center gap-2 font-medium"><AlertCircle className="w-4 h-4" />{passError}</div>}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1">Current Password</label>
                      <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="••••••••••" className="input-glass" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1">New Password</label>
                      <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="At least 8 characters" className="input-glass" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text)] mb-1">Confirm New Password</label>
                      <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Re-enter new password" className="input-glass" />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button type="submit" disabled={isChangingPass} className="btn-secondary flex items-center gap-2">
                        {isChangingPass ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Update Password
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;