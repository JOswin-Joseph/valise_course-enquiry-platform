// Auth service for managing authentication state and token handling

/**
 * Store authentication token and user data
 * SECURITY NOTE: For production, consider using httpOnly cookies
 * instead of localStorage to prevent XSS attacks
 */
export const setAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Retrieve stored authentication token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Retrieve stored user data
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Get user role for route protection
 */
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

/**
 * Check if user has specific role
 */
export const hasRole = (role) => {
  return getUserRole() === role;
};

/**
 * Mock login function for development
 * TODO: Remove this when backend is ready
 */
export const mockLogin = async (email, password) => {
  // Import mock data
  const mockData = await import('../mock/seed.json');
  const users = mockData.default.users;

  // Check admin credentials
  if (email === users.admin.email && password === users.admin.password) {
    const { password: _, ...userData } = users.admin;
    return {
      token: 'mock-admin-token-' + Date.now(),
      user: userData,
    };
  }

  // Check user credentials
  if (email === users.user.email && password === users.user.password) {
    const { password: _, ...userData } = users.user;
    return {
      token: 'mock-user-token-' + Date.now(),
      user: userData,
    };
  }

  throw new Error('Invalid credentials');
};

export default {
  setAuthData,
  getToken,
  getUser,
  isAuthenticated,
  clearAuthData,
  getUserRole,
  hasRole,
  mockLogin,
};
