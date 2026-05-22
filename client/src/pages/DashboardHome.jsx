import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import StatsCard from '../components/dashboard/StatsCard';
import TaskCard from '../components/tasks/TaskCard';
import EmptyState from '../components/ui/EmptyState';
import { TaskCardSkeleton } from '../components/ui/Skeleton';
import { CheckCircle2, Clock, ListTodo, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const { user } = useAuth();
  const { stats, tasks, loading } = useTasks();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="font-heading font-semibold text-[32px] text-white mb-2 flex items-center gap-3">
          {getGreeting()}, {user?.name?.split(' ')[0]}! <span className="animate-bounce">👋</span>
        </h1>
        <p className="font-body text-[16px] text-silver">
          You have <span className="text-white font-medium">{stats.dueToday}</span> tasks due today
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total Tasks" count={stats.total} type="Total" icon={ListTodo} />
        <StatsCard title="Pending" count={stats.pending} type="Pending" icon={Clock} />
        <StatsCard title="In Progress" count={stats.inProgress} type="In Progress" icon={AlertCircle} />
        <StatsCard title="Completed" count={stats.completed} type="Completed" icon={CheckCircle2} />
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading font-semibold text-[20px] text-white">Recent Tasks</h2>
          <Link to="/dashboard/tasks" className="font-body text-[14px] text-blue-primary hover:underline">
            View All →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            Array(3).fill(0).map((_, i) => <TaskCardSkeleton key={i} />)
          ) : recentTasks.length > 0 ? (
            recentTasks.map((task, index) => (
              <div 
                key={task._id} 
                className="animate-slide-in-right"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskCard task={task} />
              </div>
            ))
          ) : (
            <div className="bg-obsidian border border-border rounded-xl p-8">
              <EmptyState 
                icon={ListTodo} 
                message="No tasks yet. Create your first one!" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
