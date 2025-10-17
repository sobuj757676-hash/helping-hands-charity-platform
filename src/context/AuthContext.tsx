import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@helpinghands.org',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'John Volunteer',
    email: 'volunteer@helpinghands.org',
    role: 'volunteer',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sarah Donor',
    email: 'donor@helpinghands.org',
    role: 'donor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Ahmed Beneficiary',
    email: 'beneficiary@helpinghands.org',
    role: 'beneficiary',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  }
];

const mockPasswords: Record<string, string> = {
  'admin@helpinghands.org': 'admin123',
  'volunteer@helpinghands.org': 'volunteer123',
  'donor@helpinghands.org': 'donor123',
  'beneficiary@helpinghands.org': 'beneficiary123'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('helpingHandsUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('helpingHandsUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = mockUsers.find(u => u.email === email);
      const expectedPassword = mockPasswords[email];
      
      if (mockUser && expectedPassword === password) {
        setUser(mockUser);
        localStorage.setItem('helpingHandsUser', JSON.stringify(mockUser));
        toast.success(`Welcome back, ${mockUser.name}!`);
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('helpingHandsUser');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { 
        ...user, 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      
      setUser(updatedUser);
      localStorage.setItem('helpingHandsUser', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) => {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner w-8 h-8" />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};