// src/pages/Signup.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { signupSchema } from '../utils/validators';
import { setPageTitle } from '../utils/helpers';
import PageTransition from '../components/layout/PageTransition';
import styles from './Login.module.css'; // reuse same polished Login CSS for identical look

export default function Signup() {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const confirmRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => setPageTitle('Sign Up'), []);

  // Autofill sync — read actual DOM values (some browsers fill without events)
  useEffect(() => {
    const sync = () => {
      try {
        const elName = document.querySelector('input[name="name"]');
        const elEmail = document.querySelector('input[name="email"]');
        const elPwd = document.querySelector('input[name="password"]');
        const elConfirm = document.querySelector('input[name="confirmPassword"]');

        if (elName?.value) setValue('name', elName.value, { shouldValidate: true, shouldDirty: true });
        if (elEmail?.value) setValue('email', elEmail.value, { shouldValidate: true, shouldDirty: true });
        if (elPwd?.value) setValue('password', elPwd.value, { shouldValidate: true, shouldDirty: true });
        if (elConfirm?.value) setValue('confirmPassword', elConfirm.value, { shouldValidate: true, shouldDirty: true });
      } catch (e) {
        // ignore
      }
    };
    sync();
    const t = setTimeout(sync, 250);
    return () => clearTimeout(t);
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Replace with real API call if you have one
      const mockUser = { id: 'user-' + Date.now(), name: data.name, email: data.email, role: 'user' };
      const mockToken = 'token-' + Date.now();

      // Call your auth login (adapt to signature)
      if (typeof login === 'function') {
        try {
          if (login.length === 1) login({ token: mockToken, user: mockUser });
          else login(mockToken, mockUser);
        } catch (e) {
          // fallback: store token
          localStorage.setItem('token_debug', mockToken);
        }
      } else {
        localStorage.setItem('token_debug', mockToken);
      }

      success('Account created successfully!');
      navigate('/user/dashboard', { replace: true });
    } catch (err) {
      console.error('Signup error', err);
      error(err?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className={styles.page}>
        <div className={styles.backdrop} aria-hidden />

        <motion.main
          className={styles.cardWrap}
          initial={{ opacity: 0, y: 12, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          role="main"
          aria-labelledby="signup-title"
        >
          <header className={styles.header}>
            <div className={styles.logoCircle} aria-hidden>
              <UserPlus size={28} />
            </div>
            <h1 id="signup-title" className={styles.title}>Create an account</h1>
            <p className={styles.subtitle}>Start your learning journey with Coursify</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
            {/* Full name */}
            <div className={styles.field}>
              <div className={styles.fieldInner}>
                <span className={styles.leftIcon}><User size={14} /></span>
                <input
                  id="name"
                  name="name"
                  placeholder=" "
                  autoComplete="name"
                  {...register('name')}
                  className={`${styles.input} ${errors.name ? styles.err : ''}`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  ref={nameRef}
                />
                <label htmlFor="name" className={styles.flabel}>Full name</label>
              </div>
              {errors.name && <div id="name-error" className={styles.error}>{errors.name.message}</div>}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <div className={styles.fieldInner}>
                <span className={styles.leftIcon}><Mail size={14} /></span>
                <input
                  id="email"
                  name="email"
                  placeholder=" "
                  autoComplete="email"
                  {...register('email')}
                  className={`${styles.input} ${errors.email ? styles.err : ''}`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  ref={emailRef}
                />
                <label htmlFor="email" className={styles.flabel}>Email address</label>
              </div>
              {errors.email && <div id="email-error" className={styles.error}>{errors.email.message}</div>}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <div className={styles.fieldInner}>
                <span className={styles.leftIcon}><Lock size={14} /></span>
                <input
                  id="password"
                  name="password"
                  placeholder=" "
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password')}
                  className={`${styles.input} ${errors.password ? styles.err : ''}`}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  ref={pwdRef}
                />
                <label htmlFor="password" className={styles.flabel}>Password</label>

                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => {
                    setShowPassword((s) => !s);
                    if (pwdRef.current) pwdRef.current.focus();
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <div id="password-error" className={styles.error}>{errors.password.message}</div>}
            </div>

            {/* Confirm Password */}
            <div className={styles.field}>
              <div className={styles.fieldInner}>
                <span className={styles.leftIcon}><Lock size={14} /></span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder=" "
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={`${styles.input} ${errors.confirmPassword ? styles.err : ''}`}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  ref={confirmRef}
                />
                <label htmlFor="confirmPassword" className={styles.flabel}>Confirm password</label>
              </div>
              {errors.confirmPassword && <div id="confirmPassword-error" className={styles.error}>{errors.confirmPassword.message}</div>}
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.primary} disabled={isLoading} aria-disabled={isLoading}>
                {isLoading ? 'Creating…' : 'Create account'}
              </button>
            </div>
          </form>

          <div className={styles.lower}>
            <div className={styles.orRow}><span className={styles.line} /><span className={styles.orText}>or</span><span className={styles.line} /></div>
            <p className={styles.signup}>
              Already have an account? <Link to="/login" className={styles.link}>Sign in</Link>
            </p>
          </div>
        </motion.main>
      </div>
    </PageTransition>
  );
}
