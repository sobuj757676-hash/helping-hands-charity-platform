import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Heart, User, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoginFormData } from '@/types';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const { login, loading } = useAuth();
  const router = useRouter();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      const redirectTo = router.query.redirect as string || '/dashboard';
      router.push(redirectTo);
    }
  };

  const demoAccounts = [
    { 
      email: 'admin@helpinghands.org', 
      password: 'admin123', 
      role: 'Admin', 
      description: 'Full system access with all management features'
    },
    { 
      email: 'volunteer@helpinghands.org', 
      password: 'volunteer123', 
      role: 'Volunteer', 
      description: 'Event registration and hour tracking'
    },
    { 
      email: 'donor@helpinghands.org', 
      password: 'donor123', 
      role: 'Donor', 
      description: 'Donation management and impact tracking'
    },
    { 
      email: 'beneficiary@helpinghands.org', 
      password: 'beneficiary123', 
      role: 'Beneficiary', 
      description: 'Aid requests and distribution tracking'
    }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your Helping Hands account
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Demo Credentials Toggle */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
            >
              {showDemoCredentials ? 'Hide' : 'Show'} Demo Accounts
            </Button>
          </div>

          {/* Demo Credentials */}
          {showDemoCredentials && (
            <Card className="mb-6">
              <Card.Header>
                <h3 className="text-sm font-medium text-gray-900">
                  Demo Accounts
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Click any account below to auto-fill credentials
                </p>
              </Card.Header>
              <Card.Body className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => fillDemoCredentials(account.email, account.password)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900 group-hover:text-primary-700">
                        {account.role}
                      </span>
                      <Badge 
                        variant={account.role === 'Admin' ? 'danger' : 'primary'} 
                        size="sm"
                      >
                        {account.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{account.description}</p>
                    <p className="text-xs text-gray-500">{account.email}</p>
                  </button>
                ))}
              </Card.Body>
            </Card>
          )}

          {/* Login Form */}
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  leftIcon={<User className="h-4 w-4" />}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                  placeholder="Enter your email address"
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    error={errors.password?.message}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="form-checkbox h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary-600 hover:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  loading={loading}
                  leftIcon={<Heart className="h-4 w-4" />}
                >
                  Sign In
                </Button>
              </form>
            </Card.Body>
          </Card>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;