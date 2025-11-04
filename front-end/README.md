# TakeOff Upskill - Course Enquiry Platform

A production-quality React frontend for a course enquiry platform with role-based authentication, modern animations, and a professional UI.

## Features

- **Modern UI/UX**: Professional design with Framer Motion animations
- **Role-Based Authentication**: Separate dashboards for users and admins
- **Responsive Design**: Mobile-first approach with seamless experience across devices
- **Course Management**: Browse, filter, and search courses
- **Dashboard Analytics**: Admin dashboard with stats and enquiry management
- **Form Validation**: React Hook Form with Yup validation
- **Toast Notifications**: Real-time user feedback
- **Protected Routes**: Secure route guards based on authentication and roles

## Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Yup validation
- **HTTP Client**: Axios
- **Styling**: Modular CSS with CSS Variables
- **Icons**: Lucide React

## Project Structure

```
src/
├── assets/
│   └── theme.css              # CSS variables and theme
├── components/
│   ├── common/                # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   └── Pagination.jsx
│   ├── auth/
│   │   └── ProtectedRoute.jsx # Route protection component
│   └── layout/
│       └── PageTransition.jsx # Page transition wrapper
├── pages/                     # Page components
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── UserDashboard.jsx
│   ├── AdminDashboard.jsx
│   └── ...
├── services/
│   ├── api.js                 # API service with axios
│   └── auth.js                # Authentication utilities
├── utils/
│   ├── validators.js          # Yup validation schemas
│   └── helpers.js             # Utility functions
├── hooks/
│   ├── useAuth.js            # Authentication hook
│   └── useToast.js           # Toast notification hook
├── context/
│   ├── AuthContext.jsx       # Global auth state
│   └── ToastContext.jsx      # Global toast state
├── mock/
│   └── seed.json             # Mock data for development
├── App.jsx                   # Main app with routing
└── main.jsx                  # Entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository and navigate to the project:

```bash
cd /path/to/project
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Authentication Flow

### Login Process

1. User submits credentials via `/login` page
2. Frontend posts to `/api/auth/login` (backend endpoint)
3. Backend returns `{ token, user: { id, email, role } }`
4. Frontend stores token and user in localStorage
5. **Role-based redirect happens immediately**:
   - If `role === "admin"` → redirects to `/admin/dashboard`
   - If `role === "user"` → redirects to `/user/dashboard`
6. Protected routes verify authentication and role before rendering

### Demo Credentials (Development)

**Admin Account:**
- Email: `admin@takeoffupskill.com`
- Password: `admin123`

**User Account:**
- Email: `student@example.com`
- Password: `student123`

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```jsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute requireRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

## Connecting to Backend

### API Service

All API calls are centralized in `src/services/api.js`. The service uses Axios with interceptors for:

- Adding auth tokens to requests
- Handling 401 errors (automatic logout)
- Centralized error handling

### Backend Integration Steps

1. **Update Environment Variable**:
   ```env
   VITE_API_URL=https://your-backend-domain.com/api
   ```

2. **Backend Endpoints Expected**:

   ```
   POST   /api/auth/login          # Login with email & password
   POST   /api/auth/signup         # Create new account
   POST   /api/auth/logout         # Logout user
   GET    /api/auth/verify         # Verify token validity

   GET    /api/courses             # Get all courses (with filters)
   GET    /api/courses/:id         # Get course by ID
   GET    /api/courses/slug/:slug  # Get course by slug

   GET    /api/instructors         # Get all instructors
   GET    /api/instructors/:id     # Get instructor by ID

   POST   /api/enquiries           # Create enquiry
   GET    /api/enquiries           # Get all enquiries (admin)
   GET    /api/user/enquiries      # Get user's enquiries

   GET    /api/admin/stats         # Get dashboard statistics
   GET    /api/admin/enquiries/export  # Export enquiries as CSV
   ```

3. **Expected Response Format**:

   **Login Response:**
   ```json
   {
     "token": "jwt-token-here",
     "user": {
       "id": "user-id",
       "email": "user@example.com",
       "name": "User Name",
       "role": "user" // or "admin"
     }
   }
   ```

4. **Remove Mock Login**:

   In `src/pages/Login.jsx`, replace:
   ```javascript
   const response = await mockLogin(data.email, data.password);
   ```

   With:
   ```javascript
   const response = await apiService.auth.login(data);
   ```

## Security Considerations

### Current Implementation (Development)

- Tokens stored in `localStorage`
- Client-side role validation
- Mock authentication for testing

### Production Recommendations

1. **Use httpOnly Cookies** instead of localStorage to prevent XSS attacks
2. **Implement CSRF Protection** for state-changing operations
3. **Add Rate Limiting** on authentication endpoints
4. **Use HTTPS** for all API communication
5. **Implement Token Refresh** mechanism
6. **Add Server-Side Role Validation** (never trust client-side role checks)
7. **Sanitize User Inputs** on both frontend and backend
8. **Implement Content Security Policy (CSP)**

### Token Storage Migration

To migrate from localStorage to httpOnly cookies:

1. Backend should set cookie on login:
   ```javascript
   res.cookie('token', jwt, {
     httpOnly: true,
     secure: true,
     sameSite: 'strict'
   });
   ```

2. Frontend should remove localStorage calls in `src/services/auth.js`
3. Axios will automatically include cookies in requests

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Mock Data

During development, the app uses mock data from `src/mock/seed.json`. This includes:

- Sample courses
- Instructors
- Blog posts
- Testimonials
- FAQ items
- Demo user accounts

**Note**: Backend will need to implement `/api/seed` endpoint or database migrations to populate initial data.

## Customization

### Theme Colors

Edit `src/assets/theme.css` to customize the color palette:

```css
:root {
  --color-primary: #1E2A5E;
  --color-accent: #3BAFDA;
  --color-background: #F9FAFB;
  /* ... more variables */
}
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/common/Header.jsx`

## Animations

The app uses Framer Motion for animations:

- **Page Transitions**: Smooth fade and slide effects
- **Staggered Lists**: Courses and cards animate in sequence
- **Hover Effects**: 3D lift effects on cards
- **Modal/Toast**: Spring-based animations

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Lazy loading of routes with React.lazy()
- Image optimization with proper sizing
- CSS modules for scoped styling
- Tree-shaking with Vite
- Code splitting by route

## Contributing

This is a frontend-only project designed to integrate with a separately built backend.

## License

MIT

## Support

For issues or questions:
- Email: info@takeoffupskill.com
- Create an issue in the repository

---

**Note**: This is a frontend application only. Backend API implementation is required for full functionality.
