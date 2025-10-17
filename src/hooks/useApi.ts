import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, PaginatedResponse } from '@/types';
import toast from 'react-hot-toast';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

// Mock API service
class MockApiService {
  private delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

  async get<T>(url: string): Promise<ApiResponse<T>> {
    await this.delay();
    
    // Simulate different responses based on URL
    if (url.includes('/stats')) {
      return {
        success: true,
        data: {
          totalFamiliesHelped: 1247,
          activeVolunteers: 156,
          totalDonations: 2456789,
          upcomingEvents: 8
        } as T
      };
    }
    
    // Default successful response
    return {
      success: true,
      data: [] as T,
      message: 'Data fetched successfully'
    };
  }

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    await this.delay();
    return {
      success: true,
      data: { id: Date.now().toString(), ...data } as T,
      message: 'Created successfully'
    };
  }

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    await this.delay();
    return {
      success: true,
      data: data as T,
      message: 'Updated successfully'
    };
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    await this.delay();
    return {
      success: true,
      data: null as T,
      message: 'Deleted successfully'
    };
  }
}

const apiService = new MockApiService();

// Hook for GET requests
export const useApi = <T>(
  url: string,
  options: UseApiOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<T>(url);
      
      if (response.success) {
        setData(response.data);
        options.onSuccess?.(response.data);
      } else {
        const errorMessage = response.message || 'Failed to fetch data';
        setError(errorMessage);
        options.onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

// Hook for mutations (POST, PUT, DELETE)
export const useMutation = <T, V = any>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (
    method: 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: V
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      let response: ApiResponse<T>;
      
      switch (method) {
        case 'POST':
          response = await apiService.post<T>(url, data);
          break;
        case 'PUT':
          response = await apiService.put<T>(url, data);
          break;
        case 'DELETE':
          response = await apiService.delete<T>(url);
          break;
        default:
          throw new Error('Invalid method');
      }

      if (response.success) {
        toast.success(response.message || 'Operation completed successfully');
        return response.data;
      } else {
        const errorMessage = response.message || 'Operation failed';
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    loading,
    error
  };
};

// Hook for paginated data
export const usePaginatedApi = <T>(
  url: string,
  initialPage: number = 1,
  initialLimit: number = 10
) => {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number = pagination.page, limit: number = pagination.limit) => {
    setLoading(true);
    setError(null);

    try {
      // Mock paginated response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = Array.from({ length: limit }, (_, index) => ({
        id: `item-${page}-${index + 1}`,
        name: `Item ${(page - 1) * limit + index + 1}`
      })) as T[];
      
      const total = 100; // Mock total count
      const totalPages = Math.ceil(total / limit);
      
      setData(mockData);
      setPagination({
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  const goToPage = useCallback((page: number) => {
    fetchData(page, pagination.limit);
  }, [fetchData, pagination.limit]);

  const changeLimit = useCallback((limit: number) => {
    fetchData(1, limit);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    refetch: () => fetchData(pagination.page, pagination.limit),
    goToPage,
    changeLimit
  };
};