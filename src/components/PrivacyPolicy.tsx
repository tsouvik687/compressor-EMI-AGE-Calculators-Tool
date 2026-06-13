import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface LegalViewProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<LegalViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline mb-4"
      >
        <ArrowLeft size={16} /> Back to Tools
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-green-50 dark:bg-green-900/10 rounded-xl flex items-center justify-center text-green-600">
          <ShieldCheck size={28} />
        </div>
        <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Privacy Policy</h2>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-gray-400 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">1. Data Sovereignty & Local Processing</h3>
          <p>
            At OmniUtil, your privacy is our core architectural principle. We operate under a <strong>"Zero-Knowledge"</strong> framework. 
            All core utility processing—including image compression, BMI calculations, age determinations, and QR code generation—occurs 
            <strong> exclusively within your web browser</strong>. No files, personal data, or calculation inputs are ever uploaded to 
            or stored on our servers.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">2. Information Collection</h3>
          <p>
            We do not require user registration or account creation. We do not collect cookies that track your identity across the web. 
            However, we utilize standard <strong>Local Storage</strong> and <strong>Session Storage</strong> to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Save your interface theme preference (Light/Dark mode).</li>
            <li>Temporarily store your recent activity history for your convenience during your current session.</li>
            <li>Maintain non-identifiable tool configurations.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">3. Third-Party Advertising</h3>
          <p>
            To keep OmniUtil free, we serve advertisements through Google AdSense. Third-party vendors, including Google, use cookies to serve ads 
            based on a user's prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve 
            ads based on your visit to this site and/or other sites on the Internet.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">4. External Links</h3>
          <p>
            Our website may contain links to other sites. If you click on a third-party link, you will be directed to that site. 
            Note that these external sites are not operated by us, and we advise you to review their Privacy Policies.
          </p>
        </section>

        <section className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            <strong>Summary:</strong> Your data never leaves your device. We provide the tools; you provide the privacy.
          </p>
        </section>
      </div>
    </div>
  );
};
