import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ImageIcon, 
  Calculator, 
  Calendar, 
  QrCode, 
  Menu, 
  X,
  Github,
  Twitter,
  Info,
  ListTodo
} from 'lucide-react';
import { ImageCompressor } from './components/ImageCompressor';
import { BMICalculator } from './components/BMICalculator';
import { AgeCalculator } from './components/AgeCalculator';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { TaskBudgetManager } from './components/TaskBudgetManager';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { About } from './components/About';
import { CookiePolicy } from './components/CookiePolicy';
import { ThemeToggle } from './components/ThemeToggle';
import { AdSpace } from './components/AdSpace';
import { cn } from './lib/utils';

type ToolType = 'image' | 'bmi' | 'age' | 'qr' | 'taskbudget' | 'privacy' | 'terms' | 'about' | 'cookies';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('image');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tools = [
    { id: 'image', name: 'Image Compressor', icon: ImageIcon, color: 'bg-blue-600' },
    { id: 'age', name: 'Age Calculator', icon: Calendar, color: 'bg-slate-300' },
    { id: 'bmi', name: 'BMI Calculator', icon: Calculator, color: 'bg-slate-300' },
    { id: 'qr', name: 'QR Generator', icon: QrCode, color: 'bg-slate-300' },
    { id: 'taskbudget', name: 'Task & Budget', icon: ListTodo, color: 'bg-slate-300' },
  ];

  const renderTool = () => {
    switch (activeTool) {
      case 'image': return <ImageCompressor />;
      case 'bmi': return <BMICalculator />;
      case 'age': return <AgeCalculator />;
      case 'qr': return <QRCodeGenerator />;
      case 'taskbudget': return <TaskBudgetManager />;
      case 'privacy': return <PrivacyPolicy onBack={() => setActiveTool('image')} />;
      case 'terms': return <TermsOfService onBack={() => setActiveTool('image')} />;
      case 'about': return <About onBack={() => setActiveTool('image')} />;
      case 'cookies': return <CookiePolicy onBack={() => setActiveTool('image')} />;
      default: return <ImageCompressor />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] dark:bg-black font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Top Header Navigation */}
      <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-black border-b border-slate-200 dark:border-gray-800 shadow-sm shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">O</div>
          <span className="text-xl font-bold tracking-tight dark:text-white">OmniUtil<span className="text-blue-600">Pro</span></span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-gray-400">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-5 pt-5">Dashboard</a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="md:hidden p-2 text-slate-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Sidebar Tools Navigation (Left) */}
        <aside className={cn(
          "fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 z-40 bg-[#f8fafc] dark:bg-black md:bg-transparent",
          "w-64 flex flex-col gap-4 shrink-0",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Popular Tools</h3>
            <div className="flex flex-col gap-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id as ToolType);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all text-left",
                    activeTool === tool.id 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" 
                      : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800"
                  )}
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    activeTool === tool.id ? "bg-blue-600" : "bg-slate-300 dark:bg-gray-600"
                  )}></span>
                  <tool.icon size={16} className="opacity-70" />
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
          
          <AdSpace type="sidebar" className="flex-1" />
        </aside>

        {/* Main Tool Interface (Center) */}
        <main className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col overflow-hidden">
            {activeTool !== 'privacy' && activeTool !== 'terms' && activeTool !== 'about' && activeTool !== 'cookies' && (
              <div className="p-6 border-b border-slate-100 dark:border-gray-800">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {tools.find(t => t.id === activeTool)?.name}
                </h1>
                <p className="text-slate-500 text-sm">
                  Fast, secure and easy to use online utility tool. All processing is local.
                </p>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTool()}
              </motion.div>
            </div>

            {/* Footer Actions / Info */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-gray-800/50 border-t border-slate-100 dark:border-gray-800 flex justify-between items-center text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Privacy Mode:</span>
                <div className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold uppercase text-[9px] tracking-tighter">
                  Local Processing
                </div>
              </div>
              <div className="flex gap-4">
              </div>
            </div>
          </div>

          <AdSpace type="banner" />
        </main>

        {/* Quick Stats & Recent Sidebar (Right) */}
        <aside className="hidden lg:flex w-64 flex-col gap-4 h-full overflow-hidden">

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-800 p-4 shadow-sm flex-1 flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 shrink-0">Recent Activity</h3>
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {[
                { name: 'vacation.jpg', tool: 'IMG', time: '2m ago', info: '-85%' },
                { name: 'Age Cal', tool: 'AGE', time: '15m ago', info: 'Result: 28' },
                { name: 'BMI Cal', tool: 'BMI', time: '1h ago', info: 'Healthy' },
                { name: 'Wifi Pass', tool: 'QR', time: '2h ago', info: 'SVG' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] text-slate-400 font-bold shrink-0">
                    {item.tool}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold truncate dark:text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.time} • {item.info}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[10px] font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded uppercase tracking-wider shrink-0 transition-colors">
              Clear History
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-slate-800 text-slate-400 flex items-center justify-between px-6 text-[10px] font-medium shrink-0">
        <div className="flex gap-4">
          <span>Status: <span className="text-green-400 font-bold ring-1 ring-green-400/20 px-1 rounded">Engine Online</span></span>
          <span className="hidden sm:inline">SEO Score: <span className="text-white">98/100</span></span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setActiveTool('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => setActiveTool('privacy')} className="hover:text-white transition-colors">Privacy</button>
          <button onClick={() => setActiveTool('terms')} className="hover:text-white transition-colors">Terms</button>
          <button onClick={() => setActiveTool('cookies')} className="hover:text-white transition-colors">Cookies</button>
          <span className="text-slate-500">© 2026 OmniUtil Pro</span>
        </div>
      </footer>
    </div>
  );
}
