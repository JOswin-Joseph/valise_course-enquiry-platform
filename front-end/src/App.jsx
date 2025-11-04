import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Instructors = lazy(() => import('./pages/Instructors'));
const InstructorProfile = lazy(() => import('./pages/InstructorProfile'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, marginTop: '80px' }}>
              <Suspense fallback={<Loader fullScreen />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:slug" element={<CourseDetail />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/instructors" element={<Instructors />} />
                    <Route path="/instructors/:id" element={<InstructorProfile />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Auth routes - redirect to dashboard if already logged in */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected user routes */}
                    <Route
                      path="/user/dashboard"
                      element={
                        <ProtectedRoute requireRole="user">
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Protected admin routes */}
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute requireRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
