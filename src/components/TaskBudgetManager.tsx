import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Wallet, 
  Plus, 
  Trash2, 
  Save, 
  TrendingUp, 
  TrendingDown,
  LayoutGrid,
  ListTodo
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface BudgetItem {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export const TaskBudgetManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'budget'>('tasks');
  
  // Task State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Budget State
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  // Load from LocalStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('omniutil_tasks');
    const savedBudget = localStorage.getItem('omniutil_budget');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedBudget) setBudgetItems(JSON.parse(savedBudget));
  }, []);

  // Save to LocalStorage
  const handleSave = () => {
    localStorage.setItem('omniutil_tasks', JSON.stringify(tasks));
    localStorage.setItem('omniutil_budget', JSON.stringify(budgetItems));
    alert('Progress saved successfully to browser storage!');
  };

  // Task Functions
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Budget Functions
  const addBudgetItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;
    const item: BudgetItem = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      type
    };
    setBudgetItems([...budgetItems, item]);
    setDescription('');
    setAmount('');
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const totalIncome = budgetItems.filter(i => i.type === 'income').reduce((acc, i) => acc + i.amount, 0);
  const totalExpense = budgetItems.filter(i => i.type === 'expense').reduce((acc, i) => acc + i.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800/50 p-2 rounded-2xl border border-slate-100 dark:border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tasks')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'tasks' 
                ? "bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <ListTodo size={18} />
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'budget' 
                ? "bg-white dark:bg-gray-800 shadow-sm text-green-600 dark:text-green-400" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Wallet size={18} />
            Budget
          </button>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all transform active:scale-95 shadow-lg"
        >
          <Save size={14} />
          Save Changes
        </button>
      </div>

      {activeTab === 'tasks' ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
          <form onSubmit={addTask} className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 p-4 bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              type="submit"
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              <Plus size={24} />
            </button>
          </form>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 dark:bg-gray-900/30 rounded-3xl border-2 border-dashed border-slate-100 dark:border-gray-800">
                <CheckSquare size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-medium italic">No pending tasks. You're all caught up!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div 
                  key={task.id} 
                  className={cn(
                    "group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border rounded-2xl transition-all",
                    task.completed ? "opacity-60 bg-slate-50 dark:bg-gray-900 border-transparent" : "border-slate-100 dark:border-gray-700 hover:shadow-md"
                  )}
                >
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                      task.completed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 dark:border-gray-600"
                    )}
                  >
                    {task.completed && <CheckSquare size={14} />}
                  </button>
                  <span className={cn(
                    "flex-1 font-medium dark:text-gray-200",
                    task.completed && "line-through text-slate-400"
                  )}>
                    {task.text}
                  </span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">Income</p>
              <p className="text-xl font-black text-green-700 dark:text-green-400">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Expenses</p>
              <p className="text-xl font-black text-red-700 dark:text-red-400">${totalExpense.toFixed(2)}</p>
            </div>
            <div className={cn(
              "p-4 rounded-2xl border",
              balance >= 0 
                ? "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30" 
                : "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30"
            )}>
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Balance</p>
              <p className={cn(
                "text-xl font-black",
                balance >= 0 ? "text-blue-700 dark:text-blue-400" : "text-orange-700 dark:text-orange-400"
              )}>${balance.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={addBudgetItem} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 dark:bg-gray-900/30 p-4 rounded-3xl border border-slate-100 dark:border-gray-800">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="md:col-span-2 p-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm"
              required
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1 p-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm"
                required
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                className="p-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl outline-none text-sm font-bold"
              >
                <option value="expense">Exp</option>
                <option value="income">Inc</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add
            </button>
          </form>

          <div className="space-y-2">
            {budgetItems.length === 0 ? (
              <div className="text-center py-12 text-slate-300 italic text-sm">No transactions yet</div>
            ) : (
              budgetItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-2xl group hover:shadow-sm transition-all"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    item.type === 'income' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>
                    {item.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm dark:text-white">{item.description}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.type}</p>
                  </div>
                  <p className={cn(
                    "font-black text-lg",
                    item.type === 'income' ? "text-green-600" : "text-red-600"
                  )}>
                    {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
                  </p>
                  <button 
                    onClick={() => deleteBudgetItem(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
