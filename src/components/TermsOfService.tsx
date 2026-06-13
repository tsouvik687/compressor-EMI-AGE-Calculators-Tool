import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface LegalViewProps {
  onBack: () => void;
}

export const TermsOfService: React.FC<LegalViewProps> = ({ onBack }) => {
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
          <FileText size={28} />
        </div>
        <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Terms of Service</h2>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-gray-400 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">1. Acceptance of Terms</h3>
          <p>
            By accessing or using OmniUtil, you agree to comply with and be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our application.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">2. Description of Service</h3>
          <p>
            OmniUtil provides various browser-based utility tools for image processing, mathematical calculations, 
            and data generation. These services are provided "as-is" and are intended for general usage.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">3. User Conduct</h3>
          <p>
            You agree to use OmniUtil only for lawful purposes. You are prohibited from attempting to interfere 
            with the proper functioning of the site or bypassing any security measures. 
            Since our tools process data locally, you are responsible for the content you process using our tools.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">4. Disclaimer of Warranties</h3>
          <p>
            OmniUtil provides these tools without any express or implied warranties. We do not guarantee that 
            tools like the BMI Calculator or Age Calculator are medically accurate or suitable for official health 
            diagnostics. Always consult a professional for medical or legal advice.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200">5. Limitation of Liability</h3>
          <p>
            In no event shall OmniUtil or its operators be liable for any direct, indirect, incidental, 
            consequential, or exemplary damages arising from your use of the application, including but not 
            limited to loss of data (even though we don't store it) or calculation errors.
          </p>
        </section>

        <section className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
          <p className="text-sm font-bold text-slate-500 text-center">
            Last Updated: June 13, 2026
          </p>
        </section>
      </div>
    </div>
  );
};
