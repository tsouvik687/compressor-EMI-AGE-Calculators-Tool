import React, { useState } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import { Calendar, History } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageDetails, setAgeDetails] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) return;

    const years = differenceInYears(today, birth);
    const months = differenceInMonths(today, birth) % 12;
    const days = differenceInDays(today, birth) % 30; // Approximation
    const totalDays = differenceInDays(today, birth);

    setAgeDetails({ years, months, days, totalDays });
  };

  return (
    <div className="max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/10 rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
          <Calendar size={24} />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Tools</h3>
          <h2 className="text-xl font-bold dark:text-white">Age Chronometer</h2>
        </div>
      </div>

      <form onSubmit={calculateAge} className="space-y-6">
        <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-transparent text-lg font-black dark:text-white border-none focus:ring-0 outline-none cursor-pointer"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-100 dark:shadow-none"
        >
          Calculate Chronology
        </button>
      </form>

      {ageDetails && (
        <div className="mt-10 pt-10 border-t border-slate-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Life Statistics</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-gray-900/50 p-4 rounded-xl text-center border border-slate-100 dark:border-gray-700">
              <p className="text-3xl font-black text-purple-600">{ageDetails.years}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Years</p>
            </div>
            <div className="bg-slate-50 dark:bg-gray-900/50 p-4 rounded-xl text-center border border-slate-100 dark:border-gray-700">
              <p className="text-3xl font-black text-purple-600">{ageDetails.months}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Months</p>
            </div>
            <div className="bg-slate-50 dark:bg-gray-900/50 p-4 rounded-xl text-center border border-slate-100 dark:border-gray-700">
              <p className="text-3xl font-black text-purple-600">{ageDetails.days}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Days</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30 flex items-center gap-4">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center text-purple-600 shrink-0">
              <History size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Total Days Lived</p>
              <p className="text-lg font-black text-purple-900 dark:text-purple-100 italic">
                {ageDetails.totalDays.toLocaleString()} <span className="text-[10px] uppercase font-normal opacity-50">Days</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
