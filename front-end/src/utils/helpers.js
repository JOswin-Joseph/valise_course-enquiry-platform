// Utility helper functions

/**
 * Format currency value
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (original, discounted) => {
  return Math.round(((original - discounted) / original) * 100);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Generate slug from string
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Debounce function for search inputs
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Download file from blob
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get query params from URL
 */
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Set page title
 */
export const setPageTitle = (title) => {
  document.title = title ? `${title} | TakeOff Upskill` : 'TakeOff Upskill - Transform Your Career';
};

/**
 * Set meta description
 */
export const setMetaDescription = (description) => {
  let metaTag = document.querySelector('meta[name="description"]');
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.name = 'description';
    document.head.appendChild(metaTag);
  }
  metaTag.content = description;
};

export default {
  formatCurrency,
  formatDate,
  calculateDiscount,
  truncateText,
  slugify,
  debounce,
  isInViewport,
  scrollToElement,
  getInitials,
  generateId,
  downloadFile,
  copyToClipboard,
  isValidEmail,
  getQueryParams,
  setPageTitle,
  setMetaDescription,
};
