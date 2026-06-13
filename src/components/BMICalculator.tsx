import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to m

    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = '';
      let color = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-500';
      } else if (bmi < 25) {
        category = 'Normal Color';
        color = 'text-green-500';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-500';
      } else {
        category = 'Obese';
        color = 'text-red-500';
      }

      setResult({ bmi, category, color });
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
          <Calculator size={24} />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Health Tools</h3>
          <h2 className="text-xl font-bold dark:text-white">Body Mass Index</h2>
        </div>
      </div>

      <form onSubmit={calculateBMI} className="space-y-6">
        <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full bg-transparent text-lg font-black dark:text-white border-none focus:ring-0 outline-none"
            required
          />
        </div>

        <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            className="w-full bg-transparent text-lg font-black dark:text-white border-none focus:ring-0 outline-none"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-100 dark:shadow-none"
          >
            Calculate BMI
          </button>
          <button
            type="button"
            onClick={reset}
            className="w-14 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-all border border-slate-100 dark:border-gray-700"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-10 pt-10 border-t border-slate-100 dark:border-gray-700 text-center animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Calculation Result</p>
          <div className="flex flex-col items-center">
            <h3 className={cn("text-7xl font-black mb-1 tracking-tighter", result.color)}>{result.bmi}</h3>
            <div className={cn("px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ring-1", result.color.replace('text', 'ring'))}>
              {result.category}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-4 gap-2 h-1.5 px-4">
            <div className="bg-blue-400 rounded-full opacity-30"></div>
            <div className="bg-green-400 rounded-full"></div>
            <div className="bg-yellow-400 rounded-full opacity-30"></div>
            <div className="bg-red-400 rounded-full opacity-30"></div>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 font-medium">Standard adult BMI categories applied.</p>
        </div>
      )}
    </div>
  );
};
