# Project Structure Overview

## Complete File Structure

```
project/
├── .env                           # Environment configuration
├── .env.example                   # Environment template
├── README.md                      # Comprehensive setup guide
├── package.json                   # Dependencies and scripts
├── vite.config.ts                # Vite configuration
└── src/
    ├── main.jsx                  # Application entry point
    ├── App.jsx                   # Root component with routing
    ├── index.css                 # Global styles
    │
    ├── assets/
    │   └── theme.css             # CSS variables & theme system
    │
    ├── components/
    │   ├── common/               # Reusable UI components
    │   │   ├── Header.jsx        # Responsive header with auth
    │   │   ├── Header.module.css
    │   │   ├── Footer.jsx        # Footer with links
    │   │   ├── Footer.module.css
    │   │   ├── Loader.jsx        # Loading spinner
    │   │   ├── Loader.module.css
    │   │   ├── Modal.jsx         # Animated modal component
    │   │   ├── Modal.module.css
    │   │   ├── Toast.jsx         # Toast notifications
    │   │   ├── Toast.module.css
    │   │   ├── Pagination.jsx    # Pagination component
    │   │   └── Pagination.module.css
    │   │
    │   ├── auth/
    │   │   └── ProtectedRoute.jsx # Route guard component
    │   │
    │   └── layout/
    │       └── PageTransition.jsx # Page transition wrapper
    │
    ├── pages/                    # Page components
    │   ├── Home.jsx              # Landing page with hero & features
    │   ├── Home.module.css
    │   ├── Login.jsx             # Login with role-based redirect
    │   ├── Login.module.css
    │   ├── Signup.jsx            # User registration
    │   ├── Courses.jsx           # Course catalog with filters
    │   ├── Courses.module.css
    │   ├── CourseDetail.jsx      # Individual course page
    │   ├── CourseDetail.module.css
    │   ├── UserDashboard.jsx     # User dashboard
    │   ├── AdminDashboard.jsx    # Admin dashboard with analytics
    │   ├── Dashboard.module.css  # Shared dashboard styles
    │   ├── Pricing.jsx           # Pricing page (stub)
    │   ├── Instructors.jsx       # Instructors page (stub)
    │   ├── InstructorProfile.jsx # Instructor detail (stub)
    │   ├── Blog.jsx              # Blog listing (stub)
    │   ├── BlogArticle.jsx       # Blog article (stub)
    │   ├── FAQ.jsx               # FAQ page (stub)
    │   └── Contact.jsx           # Contact page (stub)
    │
    ├── services/
    │   ├── api.js                # Axios API service with interceptors
    │   └── auth.js               # Auth utilities & mock login
    │
    ├── utils/
    │   ├── validators.js         # Yup validation schemas
    │   └── helpers.js            # Utility functions
    │
    ├── hooks/
    │   ├── useAuth.js           # Authentication hook
    │   └── useToast.js          # Toast notification hook
    │
    ├── context/
    │   ├── AuthContext.jsx      # Global auth state provider
    │   └── ToastContext.jsx     # Global toast provider
    │
    └── mock/
        └── seed.json            # Mock data for development
```

## Key Features by File

### Authentication Flow
- **Login.jsx**: Handles login, calls mock API, performs role-based redirect
- **AuthContext.jsx**: Manages global auth state
- **ProtectedRoute.jsx**: Guards routes by role
- **auth.js**: Auth utilities including mock login for development

### UI Components
- **Header.jsx**: Sticky header with scroll effect, mobile menu, user dropdown
- **Footer.jsx**: Multi-column footer with links and social media
- **Modal.jsx**: Animated modal with Framer Motion
- **Toast.jsx**: Notification system with success/error/warning types
- **Pagination.jsx**: Smart pagination with ellipsis for large page counts

### Pages
- **Home.jsx**: Hero section, stats, featured courses, testimonials, CTA
- **Courses.jsx**: Course catalog with search, filter, pagination
- **CourseDetail.jsx**: Full course info, syllabus, instructor, sticky price card
- **UserDashboard.jsx**: User's enquiries and profile
- **AdminDashboard.jsx**: Admin analytics and enquiry management

### Styling System
- **theme.css**: Complete design system with CSS variables
  - Color palette
  - Typography scales
  - Spacing system
  - Shadow definitions
  - Z-index layers
- **Module CSS**: Component-scoped styles for encapsulation

### API Integration
- **api.js**: Centralized API service
  - Axios interceptors for auth tokens
  - Automatic logout on 401
  - Organized endpoint structure
  - Ready for backend connection

### Mock Data
- **seed.json**: Comprehensive mock data
  - Demo user accounts (admin & user)
  - Sample courses with full details
  - Instructors
  - Blog posts
  - Testimonials
  - FAQs

## Component Architecture

### Context Providers
```
App
├── AuthProvider (manages user session)
└── ToastProvider (manages notifications)
    └── Router
        └── Routes (with lazy loading)
```

### Protected Routes
```
ProtectedRoute
├── Checks authentication
├── Validates user role
└── Redirects if unauthorized
```

## Animations

### Framer Motion Usage
- **Page transitions**: Fade + slide on route changes
- **Staggered reveals**: Course cards, stats, testimonials
- **Hover effects**: Card lift and 3D tilt
- **Modal/Toast**: Spring-based entrance animations
- **Scroll animations**: Elements animate on scroll into view

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Login with demo credentials** (see README)
3. **Role-based redirect** happens automatically
4. **Mock data** loads from seed.json
5. **Hot reload** on file changes

## Production Ready

✅ Build successfully completes
✅ All routes configured
✅ Authentication flow implemented
✅ Responsive design
✅ Accessibility features
✅ SEO-friendly page titles
✅ Lazy loading enabled
✅ Professional animations
✅ Form validation

## Next Steps (Backend Integration)

1. Deploy backend API
2. Update `VITE_API_URL` in `.env`
3. Replace mock login with real API call
4. Test authentication flow
5. Verify role-based redirects
6. Connect all API endpoints
7. Test full user journey
