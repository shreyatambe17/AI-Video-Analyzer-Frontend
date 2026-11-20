import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Sliders, 
  Globe, 
  Bell, 
  Shield, 
  Camera, 
  Check, 
  Save, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  X,
  CheckCircle2
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { MOCK_USER } from '../data/mockData';
import { api } from '../services/api';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'preferences' | 'language' | 'notifications' | 'security'
  const fileInputRef = useRef(null);

  // Profile form state
  const [avatar, setAvatar] = useState(MOCK_USER.avatar);
  const [fullName, setFullName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [role, setRole] = useState(MOCK_USER.role);
  
  // Validation state
  const [touched, setTouched] = useState({ fullName: false, email: false });
  const [errors, setErrors] = useState({ fullName: '', email: '' });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Preference state
  const [autoSummary, setAutoSummary] = useState(true);
  const [highQualityAudio, setHighQualityAudio] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Notifications state
  const [emailNotify, setEmailNotify] = useState(true);
  const [processingDoneNotify, setProcessingDoneNotify] = useState(true);

  // Password Change state (Security tab)
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

  const validateName = (val) => {
    if (!val || val.trim().length < 2) return 'Full name must be at least 2 characters.';
    return '';
  };

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
      reader.onload = () => {
        setAvatar(reader.result);
        MOCK_USER.avatar = reader.result;
      };
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
      await api.updateUserProfile({
        name: fullName,
        email: email,
        role: role,
        avatar: avatar
      });
      setSavedSuccess(true);
      api.addHistory({
        title: 'Updated user profile settings',
        type: 'upload',
        color: 'cyan'
      });
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPass) {
      setPassError('Please enter your current password.');
      return;
    }
    if (newPass.length < 8) {
      setPassError('New password must be at least 8 characters long.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New passwords do not match.');
      return;
    }

    setPassError('');
    setIsChangingPass(true);
    try {
      await api.changePassword(currentPass, newPass);
      setPassSuccess(true);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setPassSuccess(false), 3000);
    } catch (err) {
      setPassError(err.message || 'Password update failed.');
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header (Matching Screen 8) */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Manage your account and preferences
          </p>
        </div>

        {/* Content Layout: Left Sub-Menu & Right Settings Card (Matching Screen 8) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Sub-Menu Column (4 Cols on md) */}
          <div className="md:col-span-4 bg-[#121828] border border-slate-800/80 rounded-2xl p-2.5 space-y-1">
            {subTabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#5850ec] text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Settings Form Card (8 Cols on md) */}
          <div className="md:col-span-8 bg-[#121828] border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-lg">
            
            {/* SUB-TAB 1: PROFILE (Matching Screen 8) */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} noValidate className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white">
                    Profile Information
                  </h2>
                  <span className="text-[11px] text-slate-400">Personalize your student identity</span>
                </div>

                {/* Avatar Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative">
                    <img
                      src={avatar}
                      alt={fullName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-md"
                    />
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarFile}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Change Photo</span>
                    </button>
                    <p className="text-[11px] text-slate-500 mt-1">JPG, GIF or PNG. Max 2MB.</p>
                  </div>
                </div>

                {/* Form Fields with Validation */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label htmlFor="settings-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="settings-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (touched.fullName) setErrors(prev => ({ ...prev, fullName: validateName(e.target.value) }));
                      }}
                      onBlur={() => handleBlur('fullName')}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-slate-100 text-xs sm:text-sm focus:outline-none transition-all ${
                        touched.fullName && errors.fullName
                          ? 'border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-700/80 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="settings-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email
                    </label>
                    <input
                      id="settings-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) setErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
                      }}
                      onBlur={() => handleBlur('email')}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-slate-100 text-xs sm:text-sm focus:outline-none transition-all ${
                        touched.email && errors.email
                          ? 'border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-700/80 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="settings-role" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Role
                    </label>
                    <select
                      id="settings-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="Student">Student</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Professor">Professor</option>
                    </select>
                  </div>
                </div>

                {/* Save Changes Button (Bottom Right) */}
                <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : savedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Changes Saved</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* SUB-TAB 2: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                  Study Preferences
                </h2>
                
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 cursor-pointer">
                    <div>
                      <p className="font-semibold text-white">Auto-generate Flashcards</p>
                      <p className="text-slate-400 text-xs mt-0.5">Automatically create flashcard decks upon video ingest</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSummary}
                      onChange={(e) => setAutoSummary(e.target.checked)}
                      className="w-4 h-4 rounded text-[#5850ec] bg-slate-900 border-slate-700 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 cursor-pointer">
                    <div>
                      <p className="font-semibold text-white">High Quality Neural Audio</p>
                      <p className="text-slate-400 text-xs mt-0.5">Use 48kHz acoustic sampling for complex multi-speaker diarization</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={highQualityAudio}
                      onChange={(e) => setHighQualityAudio(e.target.checked)}
                      className="w-4 h-4 rounded text-[#5850ec] bg-slate-900 border-slate-700 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 cursor-pointer">
                    <div>
                      <p className="font-semibold text-white">Dark Theme Interface</p>
                      <p className="text-slate-400 text-xs mt-0.5">Use high-contrast OLED-friendly slate palette</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      className="w-4 h-4 rounded text-[#5850ec] bg-slate-900 border-slate-700 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: LANGUAGE */}
            {activeTab === 'language' && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                  Language & Translation
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Primary Transcription Language
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 text-xs sm:text-sm">
                      <option value="en">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The platform auto-detects multilingual switches within lecture audio and creates bilingual annotations.
                  </p>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                  Notification Settings
                </h2>
                <div className="space-y-3.5">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer">
                    <div>
                      <p className="font-semibold text-white">Email Digest</p>
                      <p className="text-slate-400 text-xs mt-0.5">Receive summary digest whenever lecture processing finishes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotify}
                      onChange={(e) => setEmailNotify(e.target.checked)}
                      className="w-4 h-4 rounded text-[#5850ec] cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer">
                    <div>
                      <p className="font-semibold text-white">Browser Push Alerts</p>
                      <p className="text-slate-400 text-xs mt-0.5">Instant popup notifications when your video flashcards are ready</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={processingDoneNotify}
                      onChange={(e) => setProcessingDoneNotify(e.target.checked)}
                      className="w-4 h-4 rounded text-[#5850ec] cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: SECURITY */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                  Account Security
                </h2>

                {passSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Password updated successfully!</span>
                  </div>
                )}

                {passError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{passError}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Change Password
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#5850ec] hover:bg-[#4f46e5] text-white text-xs font-semibold shadow-md cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default SettingsPage;
