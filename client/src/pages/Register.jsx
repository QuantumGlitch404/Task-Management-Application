import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(formData.name, formData.email, formData.password, formData.confirmPassword);
      if (res.success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-midnight text-white font-body">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-0">
        <div className="w-full max-w-[480px] bg-midnight lg:px-[60px] lg:py-[80px]">
          <Link to="/" className="inline-block mb-12">
            <h1 className="font-heading font-bold text-[24px] text-blue-primary">TaskFlow</h1>
          </Link>

          <h2 className="font-heading font-semibold text-[32px] text-white mb-2">Create account</h2>
          <p className="font-body text-[15px] text-silver mb-10">Start organizing your productivity</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              id="name"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button 
              type="submit" 
              className="w-full mt-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" className="text-white" />
                  CREATING...
                </span>
              ) : 'SIGN UP'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="font-body text-[14px] text-silver">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-obsidian border-l border-border items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 p-12">
          <h2 className="font-heading font-medium text-[28px] text-white max-w-[400px] leading-tight">
            "Organize your life, one task at a time."
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
