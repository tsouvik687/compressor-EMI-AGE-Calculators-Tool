import React, { useState, useEffect } from 'react';
import { Cookie, ArrowLeft, Check, Server, ShieldAlert } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LegalViewProps {
  onBack: () => void;
}

export const CookiePolicy: React.FC<LegalViewProps> = ({ onBack }) => {
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    preferences: true,
    analytics: false,
    marketing: false
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPrefs = localStorage.getItem('omniutil_cookie_prefs');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('omniutil_cookie_prefs', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline mb-4"
      >
        <ArrowLeft size={16} /> Back to Tools
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/10 rounded-xl flex items-center justify-center text-amber-600">
          <Cookie size={28} />
        </div>
        <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Cookie Settings</h2>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-gray-400">
        <section>
          <p className="text-lg">
            We use cookies to enhance your experience. While most of our tools process data locally, 
            some cookies are necessary for the site to function or to help us improve our services.
          </p>
        </section>

        <div className="space-y-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 shrink-0">
              <Server size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-800 dark:text-white">Strictly Necessary Cookies</h4>
                <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700 text-slate-500 rounded-full text-[10px] font-bold uppercase">Always On Active</span>
              </div>
              <p className="text-sm">These cookies are essential for the website to function. They include things like your theme preference and basic session management.</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 shrink-0">
              <Cookie size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-800 dark:text-white">Preference Cookies</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({...preferences, preferences: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm">Used to remember your settings and choices to provide a more personalized experience.</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-800 dark:text-white">Marketing & Ad Cookies</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm">Used by our advertising partners (Google AdSense) to deliver more relevant ads and limit the number of times you see the same ad.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={savePreferences}
            className="flex-1 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {saved ? <Check size={20} /> : null}
            {saved ? 'Settings Saved' : 'Save Preferences'}
          </button>
          <button 
            onClick={() => setPreferences({essential: true, preferences: true, analytics: true, marketing: true})}
            className="flex-1 py-4 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
          >
            Accept All
          </button>
        </div>

        <section className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">Why cookies?</h4>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            OmniUtil uses cookies for basic functionality and to support the free operation of the site through ads. 
            We never sell your personal information or use cookies to "fingerprint" your browser. 
            Most of your choice data is stored in your browser's local storage, not in tracking cookies.
          </p>
        </section>
      </div>
    </div>
  );
};
