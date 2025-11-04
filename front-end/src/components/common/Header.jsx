// src/components/common/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  GraduationCap,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (isUserOpen && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setIsUserOpen(false);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [isUserOpen]);

  const handleLogout = () => {
    logout?.();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/instructors', label: 'Instructors' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.25 }}
      role="banner"
    >
      {/* use module-local inner wrapper (avoids global .container conflicts) */}
      <div className={styles.inner}>
        {/* Brand */}
        <Link to="/" className={styles.brand} aria-label="Coursify home">
          <GraduationCap size={24} />
          <span className={styles.brandText}>Coursify</span>
        </Link>

        {/* Centered nav */}
        <nav className={styles.desktopNav} role="navigation" aria-label="Main">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={styles.navLink}
              aria-current={location.pathname === l.path ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions (right) */}
        <div className={styles.actions}>
          {isAuthenticated ? (
            <div className={styles.userArea} ref={userMenuRef}>
              <button
                className={styles.userBtn}
                onClick={() => setIsUserOpen(v => !v)}
                aria-expanded={isUserOpen}
                aria-haspopup="true"
                type="button"
              >
                <User size={16} />
                <span className={styles.userName}>{user?.name || user?.email || 'Account'}</span>
              </button>

              <AnimatePresence>
                {isUserOpen && (
                  <>
                    <motion.div
                      className={styles.menuBackdrop}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsUserOpen(false)}
                      aria-hidden
                    />
                    <motion.div
                      className={styles.dropdown}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.12 }}
                      role="menu"
                    >
                      <Link
                        to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                        className={styles.dropdownItem}
                        role="menuitem"
                        onClick={() => setIsUserOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                      </Link>

                      <button
                        type="button"
                        className={styles.dropdownItem}
                        onClick={() => { setIsUserOpen(false); handleLogout(); }}
                        role="menuitem"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
            </>
          )}

          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileOpen(v => !v)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            type="button"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              aria-hidden
            />
            <motion.aside
              className={styles.mobilePanel}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.24 }}
              aria-label="Mobile menu"
            >
              <nav className={styles.mobileNav}>
                {navLinks.map(l => (
                  <Link key={l.path} to={l.path} className={styles.mobileNavLink} onClick={() => setIsMobileOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className={styles.mobileFooterActions}>
                {isAuthenticated ? (
                  <>
                    <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className={styles.mobileBtn} onClick={() => setIsMobileOpen(false)}>Dashboard</Link>
                    <button className={styles.mobileBtn} onClick={() => { setIsMobileOpen(false); handleLogout(); }}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={styles.mobileBtn} onClick={() => setIsMobileOpen(false)}>Login</Link>
                    <Link to="/signup" className={styles.mobileBtnAccent} onClick={() => setIsMobileOpen(false)}>Sign Up</Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
