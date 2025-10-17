import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Users,
  Heart,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  HandHeart,
  TrendingUp,
  Receipt,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { NavItem } from '@/types';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggleCollapse }) => {
  const { user } = useAuth();
  const router = useRouter();

  // Navigation items for each role
  const getNavigationItems = (role: string): NavItem[] => {
    switch (role) {
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
          { name: 'Volunteers', href: '/admin/volunteers', icon: Users },
          { name: 'Donors', href: '/admin/donors', icon: Heart },
          { name: 'Beneficiaries', href: '/admin/beneficiaries', icon: UserCheck },
          { name: 'Events', href: '/admin/events', icon: Calendar },
          { name: 'Donations', href: '/admin/donations', icon: DollarSign },
          { name: 'Aid Distribution', href: '/admin/aid', icon: HandHeart },
          { name: 'Blog Posts', href: '/admin/posts', icon: FileText },
          { name: 'Messages', href: '/admin/messages', icon: MessageSquare, badge: '3' },
          { name: 'Settings', href: '/admin/settings', icon: Settings }
        ];
      
      case 'volunteer':
        return [
          { name: 'Dashboard', href: '/volunteer', icon: LayoutDashboard },
          { name: 'Events', href: '/volunteer/events', icon: Calendar },
          { name: 'My Hours', href: '/volunteer/hours', icon: Clock },
          { name: 'Achievements', href: '/volunteer/achievements', icon: Award },
          { name: 'Profile', href: '/volunteer/profile', icon: Settings }
        ];
      
      case 'donor':
        return [
          { name: 'Dashboard', href: '/donor', icon: LayoutDashboard },
          { name: 'Make Donation', href: '/donor/donate', icon: Heart },
          { name: 'Donation History', href: '/donor/history', icon: TrendingUp },
          { name: 'Tax Receipts', href: '/donor/receipts', icon: Receipt },
          { name: 'Settings', href: '/donor/settings', icon: Settings }
        ];
      
      case 'beneficiary':
        return [
          { name: 'Dashboard', href: '/beneficiary', icon: LayoutDashboard },
          { name: 'Request Aid', href: '/beneficiary/request', icon: HandHeart },
          { name: 'Aid History', href: '/beneficiary/aid', icon: FileText },
          { name: 'Profile', href: '/beneficiary/profile', icon: Settings },
          { name: 'Help & Support', href: '/beneficiary/support', icon: HelpCircle }
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = user ? getNavigationItems(user.role) : [];

  const isActiveRoute = (href: string) => {
    if (href === '/admin' || href === '/volunteer' || href === '/donor' || href === '/beneficiary') {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  if (!user) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={clsx(
        'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-64 bg-white border-r border-gray-200 transition-all duration-300',
        collapsed && 'lg:w-16'
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Helping Hands</h2>
                <p className="text-xs text-gray-500 capitalize">{user.role} Panel</p>
              </div>
            </div>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto scrollbar-thin">
          {navigationItems.map((item) => {
            const Icon = item.icon!;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'sidebar-link',
                  isActive ? 'sidebar-link-active' : 'sidebar-link-inactive',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.name : ''}
              >
                <Icon className={clsx('h-5 w-5', collapsed ? '' : 'mr-3')} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-danger-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info - Bottom */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex justify-around py-2">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon!;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex flex-col items-center justify-center px-2 py-2 text-xs font-medium transition-colors relative',
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;