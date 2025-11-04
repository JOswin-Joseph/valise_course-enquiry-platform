import axios from 'axios';

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    signup: (userData) => api.post('/auth/signup', userData),
    logout: () => api.post('/auth/logout'),
    verifyToken: () => api.get('/auth/verify'),
  },

  // Courses endpoints
  courses: {
    getAll: (params) => api.get('/courses', { params }),
    getById: (id) => api.get(`/courses/${id}`),
    getBySlug: (slug) => api.get(`/courses/slug/${slug}`),
    getFeatured: () => api.get('/courses/featured'),
  },

  // Instructors endpoints
  instructors: {
    getAll: () => api.get('/instructors'),
    getById: (id) => api.get(`/instructors/${id}`),
  },

  // Blog endpoints
  blog: {
    getAll: (params) => api.get('/blog', { params }),
    getById: (id) => api.get(`/blog/${id}`),
    getBySlug: (slug) => api.get(`/blog/slug/${slug}`),
  },

  // Enquiry endpoints
  enquiries: {
    create: (enquiryData) => api.post('/enquiries', enquiryData),
    getAll: (params) => api.get('/enquiries', { params }),
    getById: (id) => api.get(`/enquiries/${id}`),
    update: (id, data) => api.put(`/enquiries/${id}`, data),
    delete: (id) => api.delete(`/enquiries/${id}`),
    exportCSV: () => api.get('/enquiries/export', { responseType: 'blob' }),
  },

  // Contact endpoint
  contact: {
    send: (contactData) => api.post('/contact', contactData),
  },

  // User endpoints
  user: {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    getEnquiries: () => api.get('/user/enquiries'),
  },

  // Admin endpoints
  admin: {
    getDashboardStats: () => api.get('/admin/stats'),
    getEnquiries: (params) => api.get('/admin/enquiries', { params }),
    updateEnquiryStatus: (id, status) => api.patch(`/admin/enquiries/${id}/status`, { status }),
  },
};

export default api;
