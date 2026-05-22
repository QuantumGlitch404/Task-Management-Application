import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import FloatingTaskCard from '../components/3d/FloatingTaskCard';
import ParticleBackground from '../components/3d/ParticleBackground';
import { LayoutDashboard, RefreshCw, Layout } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-midnight text-white font-body relative overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <div className="font-heading font-bold text-[24px] text-blue-primary">
          TaskFlow
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="secondary" className="h-10 text-[13px]">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" className="h-10 text-[13px]">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 min-h-[calc(100vh-88px)] max-w-[1200px] mx-auto">
        <h1 className="font-heading font-extrabold text-[36px] md:text-[56px] leading-[1.1] tracking-[-0.03em] animate-fade-in max-w-4xl">
          STAY ORGANIZED, <br className="hidden md:block" />
          STAY PRODUCTIVE
        </h1>
        
        <p className="font-body text-[20px] text-silver mt-4 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Your tasks, your way. Built for focus.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <Link to="/register">
            <Button className="w-[180px] h-[52px]">Get Started →</Button>
          </Link>
          <a href="#features">
            <Button variant="secondary" className="w-[180px] h-[52px]">View Demo</Button>
          </a>
        </div>

        {/* 3D Element */}
        <div className="w-full max-w-[800px] mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <FloatingTaskCard />
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 bg-midnight py-[100px] px-10 border-t border-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-obsidian border border-border rounded-xl p-10 text-center hover:border-blue-primary transition-colors duration-300 group">
            <div className="w-12 h-12 mx-auto mb-6 text-blue-primary group-hover:-translate-y-1 transition-transform">
              <LayoutDashboard size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading font-semibold text-[20px] mb-2 text-white">Smart Organization</h3>
            <p className="font-body text-[15px] text-silver leading-[1.6]">
              Kanban boards, lists, filters
            </p>
          </div>

          <div className="bg-obsidian border border-border rounded-xl p-10 text-center hover:border-blue-primary transition-colors duration-300 group">
            <div className="w-12 h-12 mx-auto mb-6 text-blue-primary group-hover:-translate-y-1 transition-transform">
              <RefreshCw size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading font-semibold text-[20px] mb-2 text-white">Real-time Sync</h3>
            <p className="font-body text-[15px] text-silver leading-[1.6]">
              Works across devices
            </p>
          </div>

          <div className="bg-obsidian border border-border rounded-xl p-10 text-center hover:border-blue-primary transition-colors duration-300 group">
            <div className="w-12 h-12 mx-auto mb-6 text-blue-primary group-hover:-translate-y-1 transition-transform">
              <Layout size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-heading font-semibold text-[20px] mb-2 text-white">Beautiful UI</h3>
            <p className="font-body text-[15px] text-silver leading-[1.6]">
              Dark mode, clean design
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
