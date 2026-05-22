import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating settings
    toast.success('Settings updated successfully!');
  };

  return (
    <div className="max-w-[800px] mx-auto animate-fade-in">
      <h1 className="font-heading font-semibold text-[24px] text-white mb-8">Settings</h1>
      
      <div className="bg-obsidian border border-border rounded-xl p-8 mb-8">
        <h2 className="font-heading font-semibold text-[18px] text-white mb-6 border-b border-border pb-4">Profile Information</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input 
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          
          <Input 
            id="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
          
          <div className="pt-4 mt-2 border-t border-border">
            <h3 className="font-heading font-medium text-[16px] text-white mb-4">Change Password</h3>
            <div className="flex flex-col gap-6">
              <Input 
                id="currentPassword"
                type="password"
                label="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <Input 
                id="newPassword"
                type="password"
                label="New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-6 mt-2">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
