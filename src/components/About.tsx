import React from 'react';
import { Info, ArrowLeft, Target, Shield, Heart } from 'lucide-react';

interface LegalViewProps {
  onBack: () => void;
}

export const About: React.FC<LegalViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline mb-4"
      >
        <ArrowLeft size={16} /> Back to Tools
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-600">
          <Info size={28} />
        </div>
        <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">About OmniUtil</h2>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-10 text-slate-600 dark:text-gray-400">
        <section className="space-y-4">
          <p className="text-lg leading-relaxed">
            OmniUtil was born out of a simple necessity: <strong>The need for privacy-first, lightning-fast utility tools.</strong> 
            We grew tired of websites that required a login just to compress a JPG or sites that were so bloated with trackers that they 
            slowed down even the most powerful browsers.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700">
            <Target className="text-blue-600 mb-4" size={24} />
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Our Mission</h4>
            <p className="text-sm">To provide a comprehensive suite of tools that respect user data and deliver instant results without friction.</p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700">
            <Shield className="text-green-600 mb-4" size={24} />
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Privacy First</h4>
            <p className="text-sm">We believe your data belongs to you. That's why 100% of our processing happens right in your browser.</p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700">
            <Heart className="text-red-500 mb-4" size={24} />
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">Community Driven</h4>
            <p className="text-sm">OmniUtil is and will always be free. We build for the community, supported by minimal, non-intrusive ads.</p>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">The Technology</h3>
          <p>
            Built on modern React and TypeScript, OmniUtil leverages the power of client-side computing. 
            By using browser-native APIs and Web Workers, we can perform complex tasks like image compression 
            without ever needing to send your file to a remote server. This isn't just faster—it's inherently more secure.
          </p>
        </section>

        <section className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl text-white">
          <h3 className="text-2xl font-black mb-4 tracking-tight">Version 2.0 "Pro"</h3>
          <p className="opacity-90 max-w-xl">
            Our latest update introduces a streamlined professional interface, enhanced dark mode capabilities, 
            and new local-first features like the Task & Budget Manager. 
          </p>
        </section>
      </div>
    </div>
  );
};
