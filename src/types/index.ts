// User types
export type UserRole = 'admin' | 'volunteer' | 'donor' | 'beneficiary';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// Admin specific types
export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Volunteer specific types
export interface Volunteer extends User {
  role: 'volunteer';
  skills: string[];
  availability: string[];
  totalHours: number;
  eventsAttended: number;
  rating: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// Donor specific types
export type DonorTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface Donor extends User {
  role: 'donor';
  tier: DonorTier;
  totalDonated: number;
  donationCount: number;
  firstDonationAt: string;
  lastDonationAt?: string;
}

// Beneficiary specific types
export interface Beneficiary extends User {
  role: 'beneficiary';
  familySize: number;
  monthlyIncome: number;
  location: string;
  aidReceived: Aid[];
  totalAidValue: number;
}

// Event types
export type EventType = 'food_distribution' | 'medical_camp' | 'education' | 'clothing' | 'emergency' | 'training';
export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  location: string;
  maxVolunteers: number;
  registeredVolunteers: number;
  requiredSkills: string[];
  organizer: string;
  budget: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Donation types
export type PaymentMethod = 'cash' | 'bank_transfer' | 'mobile_banking' | 'card';
export type DonationStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: DonationStatus;
  purpose: string;
  campaign?: string;
  isAnonymous: boolean;
  isRecurring: boolean;
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly';
  transactionId?: string;
  receiptNumber?: string;
  createdAt: string;
  processedAt?: string;
}

// Aid types
export type AidType = 'food' | 'clothing' | 'medical' | 'education' | 'financial' | 'emergency';
export type AidStatus = 'requested' | 'approved' | 'distributed' | 'rejected';

export interface Aid {
  id: string;
  beneficiaryId: string;
  type: AidType;
  status: AidStatus;
  description: string;
  quantity: number;
  value: number;
  requestedAt: string;
  approvedAt?: string;
  distributedAt?: string;
  approvedBy?: string;
  distributedBy?: string;
  notes?: string;
}

// Message types
export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
  repliedAt?: string;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  status: 'draft' | 'published';
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Statistics types
export interface DashboardStats {
  totalFamiliesHelped: number;
  activeVolunteers: number;
  totalDonations: number;
  upcomingEvents: number;
  totalUsers: number;
  thisMonthDonations: number;
  totalAidDistributed: number;
  averageDonation: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  terms: boolean;
}

export interface DonationFormData {
  amount: number;
  currency: string;
  method: PaymentMethod;
  purpose: string;
  isAnonymous: boolean;
  isRecurring: boolean;
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly';
}

export interface EventFormData {
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  location: string;
  maxVolunteers: number;
  requiredSkills: string[];
  budget: number;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Filter and search types
export interface FilterOptions {
  search?: string;
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}