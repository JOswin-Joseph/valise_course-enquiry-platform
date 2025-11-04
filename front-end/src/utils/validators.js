import * as yup from 'yup';

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Signup validation schema
export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

// Enquiry form validation schema
export const enquirySchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
    .required('Phone number is required'),
  courseId: yup
    .string()
    .required('Please select a course'),
  message: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters')
    .required('Message is required'),
});

// Contact form validation schema
export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .required('Message is required'),
});

// Profile update validation schema
export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
    .nullable(),
  bio: yup
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .nullable(),
});

export default {
  loginSchema,
  signupSchema,
  enquirySchema,
  contactSchema,
  profileSchema,
};
