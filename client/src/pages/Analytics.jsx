import React from 'react';
import { useTasks } from '../context/TaskContext';
import StatsCard from '../components/dashboard/StatsCard';
import { ListTodo, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const Analytics = () => {
  const { stats } = useTasks();

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      <h1 className="font-heading font-semibold text-[24px] text-white mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total Tasks" count={stats.total} type="Total" icon={ListTodo} />
        <StatsCard title="Pending" count={stats.pending} type="Pending" icon={Clock} />
        <StatsCard title="In Progress" count={stats.inProgress} type="In Progress" icon={AlertCircle} />
        <StatsCard title="Completed" count={stats.completed} type="Completed" icon={CheckCircle2} />
      </div>

      <div className="bg-obsidian border border-border rounded-xl p-8 mb-8">
        <h2 className="font-heading font-semibold text-[18px] text-white mb-6">Productivity Insights</h2>
        <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-border rounded-xl">
          <p className="font-body text-silver text-[14px]">
            Detailed charts and graphs will appear here as you complete more tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
