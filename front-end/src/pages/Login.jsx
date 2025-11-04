// // src/pages/Login.jsx
// import { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { motion } from 'framer-motion';
// import { LogIn, Eye, EyeOff, Mail } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import { useToast } from '../hooks/useToast';
// import { loginSchema } from '../utils/validators';
// import { mockLogin } from '../services/auth';
// import { setPageTitle } from '../utils/helpers';
// import PageTransition from '../components/layout/PageTransition';
// import styles from './Login.module.css';

// const containerVariant = {
//   hidden: { opacity: 0, y: 8 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.06, when: 'beforeChildren' },
//   },
// };

// const itemVariant = {
//   hidden: { opacity: 0, y: 10 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: 'easeOut' } },
// };

// export default function Login() {
//   const { login } = useAuth();
//   const { success, error } = useToast();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const pwdRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//   });

//   useEffect(() => setPageTitle('Login'), []);

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     try {
//       const response = await mockLogin(data.email, data.password);
//       login(response.token, response.user);
//       success('Login successful!');
//       if (response.user.role === 'admin') navigate('/admin/dashboard', { replace: true });
//       else navigate(from, { replace: true });
//     } catch (err) {
//       error(err?.message || 'Invalid credentials. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <PageTransition>
//       <div className={styles.hero}>
//         <div className={styles.gradientLayer} />
//         <div className={styles.gridWrap}>
//           <motion.div
//             className={styles.card}
//             initial={{ opacity: 0, scale: 0.985, y: 8 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ type: 'spring', stiffness: 240, damping: 26 }}
//             role="main"
//             aria-labelledby="login-heading"
//           >
//             <motion.header className={styles.cardHeader} initial="hidden" animate="show" variants={containerVariant}>
//               <motion.div className={styles.iconBox} variants={itemVariant} whileHover={{ scale: 1.06 }}>
//                 <LogIn size={36} />
//               </motion.div>

//               <motion.h1 className={styles.title} id="login-heading" variants={itemVariant}>
//                 Welcome Back
//               </motion.h1>

//               <motion.p className={styles.lead} variants={itemVariant}>
//                 Sign in to continue your learning journey
//               </motion.p>
//             </motion.header>

//             <motion.form
//               className={styles.form}
//               onSubmit={handleSubmit(onSubmit)}
//               initial="hidden"
//               animate="show"
//               variants={containerVariant}
//               noValidate
//             >
//               {/* EMAIL */}
//               <motion.div className={styles.field} variants={itemVariant}>
//                 <div className={styles.fieldInner}>
//                   <input
//                     id="email"
//                     type="email"
//                     {...register('email')}
//                     className={`${styles.input} ${errors.email ? styles.err : ''}`}
//                     placeholder=" "
//                     aria-invalid={errors.email ? 'true' : 'false'}
//                     aria-describedby={errors.email ? 'email-error' : undefined}
//                   />
//                   <label htmlFor="email" className={styles.floatingLabel}>
//                     Email address
//                   </label>

//                   <span className={styles.leftIcon} aria-hidden>
//                     <Mail size={14} />
//                   </span>
//                 </div>

//                 {errors.email && (
//                   <motion.span className={styles.fieldError} id="email-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                     {errors.email.message}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* PASSWORD */}
//               <motion.div className={styles.field} variants={itemVariant}>
//                 <div className={styles.fieldInner}>
//                   <input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     {...register('password')}
//                     className={`${styles.input} ${errors.password ? styles.err : ''}`}
//                     placeholder=" "
//                     aria-invalid={errors.password ? 'true' : 'false'}
//                     aria-describedby={errors.password ? 'password-error' : undefined}
//                     ref={pwdRef}
//                   />
//                   <label htmlFor="password" className={styles.floatingLabel}>
//                     Password
//                   </label>

//                   <button
//                     type="button"
//                     className={styles.pwdToggle}
//                     onClick={() => {
//                       setShowPassword((s) => !s);
//                       if (pwdRef.current) pwdRef.current.focus();
//                     }}
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>

//                 {errors.password && (
//                   <motion.span className={styles.fieldError} id="password-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                     {errors.password.message}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* SIGN-IN BUTTON */}
//               <motion.div className={styles.actions} variants={itemVariant}>
//                 <button
//                   type="submit"
//                   className={styles.primary}
//                   disabled={isLoading}
//                   aria-disabled={isLoading}
//                 >
//                   <span className={styles.primaryLabel}>{isLoading ? 'Signing In...' : 'Sign In'}</span>
//                   {/* animated shimmer */}
//                   <span className={styles.shimmer} aria-hidden />
//                 </button>
//               </motion.div>
//             </motion.form>

//             {/* divider */}
//             <motion.div className={styles.orWrap} variants={itemVariant}>
//               <span className={styles.orLine} />
//               <span className={styles.orText}>or</span>
//               <span className={styles.orLine} />
//             </motion.div>

//             <motion.div className={styles.signUpNote} variants={itemVariant}>
//               Don't have an account? <Link to="/signup" className={styles.signUpLink}>Sign up</Link>
//             </motion.div>

//             <motion.div className={styles.demoBox} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
//               <strong>Demo Credentials:</strong>
//               <div className={styles.demoLine}><code>admin@takeoffupskill.com</code> / <code>admin123</code></div>
//               <div className={styles.demoLine}><code>student@example.com</code> / <code>student123</code></div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </PageTransition>
//   );
// }



// import { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { motion } from 'framer-motion';
// import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import { useToast } from '../hooks/useToast';
// import { loginSchema } from '../utils/validators';
// import { mockLogin } from '../services/auth';
// import { setPageTitle } from '../utils/helpers';
// import PageTransition from '../components/layout/PageTransition';
// import styles from './Login.module.css';

// export default function Login() {
//   const { login } = useAuth();
//   const { success, error } = useToast();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const pwdRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//   });

//   useEffect(() => setPageTitle('Login'), []);

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     try {
//       const response = await mockLogin(data.email, data.password);
//       login(response.token, response.user);
//       success('Login successful!');
//       navigate(
//         response.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard',
//         { replace: true }
//       );
//     } catch (err) {
//       error(err?.message || 'Invalid credentials. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <PageTransition>
//       <div className={styles.wrapper}>
//         {/* Left side hero */}
//         <motion.div
//           className={styles.heroSection}
//           initial={{ x: -60, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//         >
//           <div className={styles.heroOverlay}>
//             <h1>Welcome to <span>Coursify</span></h1>
//             <p>Your personalized learning companion for skill growth.</p>
//           </div>
//         </motion.div>

//         {/* Right side login form */}
//         <motion.div
//           className={styles.formSection}
//           initial={{ x: 60, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//         >
//           <div className={styles.formCard}>
//             <div className={styles.header}>
//               <LogIn size={40} className={styles.icon} />
//               <h2>Sign in to Coursify</h2>
//               <p>Continue your journey of learning and growth</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//               <div className={styles.inputGroup}>
//                 <label>Email Address</label>
//                 <div className={styles.inputWrap}>
//                   <Mail size={18} className={styles.inputIcon} />
//                   <input
//                     type="email"
//                     {...register('email')}
//                     placeholder="you@example.com"
//                     className={errors.email ? styles.inputError : ''}
//                   />
//                 </div>
//                 {errors.email && <span className={styles.error}>{errors.email.message}</span>}
//               </div>

//               <div className={styles.inputGroup}>
//                 <label>Password</label>
//                 <div className={styles.inputWrap}>
//                   <Lock size={18} className={styles.inputIcon} />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     {...register('password')}
//                     placeholder="Enter your password"
//                     className={errors.password ? styles.inputError : ''}
//                     ref={pwdRef}
//                   />
//                   <button
//                     type="button"
//                     className={styles.eyeBtn}
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label="Toggle password visibility"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <span className={styles.error}>{errors.password.message}</span>
//                 )}
//               </div>

//               <button type="submit" className={styles.submitBtn} disabled={isLoading}>
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </button>
//             </form>

//             <p className={styles.signupText}>
//               Don't have an account? <Link to="/signup">Sign up</Link>
//             </p>

//             <div className={styles.demoBox}>
//               <strong>Demo Credentials:</strong>
//               <p>Admin: admin@takeoffupskill.com / admin123</p>
//               <p>User: student@example.com / student123</p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </PageTransition>
//   );
// }


// src/pages/Login.jsx
// src/pages/Login.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { loginSchema } from '../utils/validators';
import { mockLogin } from '../services/auth';
import { setPageTitle } from '../utils/helpers';
import PageTransition from '../components/layout/PageTransition';
import styles from './Login.module.css';

export default function Login() {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pwdRef = useRef(null);
  const emailRef = useRef(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => setPageTitle('Login'), []);

  // ---------- AUTOFILL SYNC ----------
  // On mount (and shortly after), read actual DOM input values (browser autofill often fills them
  // without firing events) and sync to react-hook-form using setValue.
  useEffect(() => {
    const syncAutofill = () => {
      try {
        const elEmail = document.querySelector('input[name="email"]');
        const elPassword = document.querySelector('input[name="password"]');

        if (elEmail && elEmail.value) {
          setValue('email', elEmail.value, { shouldValidate: true, shouldDirty: true });
        }
        if (elPassword && elPassword.value) {
          setValue('password', elPassword.value, { shouldValidate: true, shouldDirty: true });
        }
      } catch (e) {
        // silent
        // console.warn('autofill sync error', e);
      }
    };

    // run immediately and again after a short delay (covers delayed autofill)
    syncAutofill();
    const t = setTimeout(syncAutofill, 250);

    return () => clearTimeout(t);
  }, [setValue]);

  // ---------- SUBMIT ----------
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await mockLogin(data.email, data.password);

      // robust handling for different mock shapes
      const token = response?.token ?? response?.data?.token ?? response?.accessToken;
      const user = response?.user ?? response?.data?.user ?? response?.userInfo ?? response;

      if (!token || !user) {
        // If mockLogin returns token/user directly, fallback to response
        // but if still missing, throw
        if (!response?.token && !response?.user && !(response?.email && response?.role)) {
          throw new Error(response?.message || 'Login failed — invalid response.');
        }
      }

      // Adapt to common useAuth signatures:
      if (typeof login === 'function') {
        // If login expects one object, pass object; else pass token,user
        try {
          if (login.length === 1) {
            login({ token, user });
          } else {
            login(token, user);
          }
        } catch (e) {
          // best-effort: if login throws, at least store token locally (debug)
          if (token) localStorage.setItem('token_debug', token);
          console.warn('useAuth.login threw:', e);
        }
      } else {
        if (token) localStorage.setItem('token_debug', token);
      }

      success('Login successful!');
      // redirect
      if (user?.role === 'admin') navigate('/admin/dashboard', { replace: true });
      else navigate(from, { replace: true });
    } catch (err) {
      // show server error if present
      const msg = err?.message || (err?.response && err.response.data?.message) || 'Invalid credentials';
      error(msg);
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
          aria-labelledby="login-title"
        >
          <header className={styles.header}>
            <div className={styles.logoCircle} aria-hidden>
              <LogIn size={28} />
            </div>
            <h1 id="login-title" className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to continue your learning journey</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
            {/* Email */}
            <div className={styles.field}>
              <div className={styles.fieldInner}>
                <span className={styles.leftIcon}><Mail size={14} /></span>

                {/* IMPORTANT: add name & autoComplete; register will attach the ref */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  {...register('email')}
                  className={`${styles.input} ${errors.email ? styles.err : ''}`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  ref={(e) => {
                    // keep react-hook-form ref and also local ref for focus if needed
                    const reg = register('email');
                    reg.ref(e);
                    emailRef.current = e;
                  }}
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
                  autoComplete="current-password"
                  {...register('password')}
                  className={`${styles.input} ${errors.password ? styles.err : ''}`}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  ref={(e) => {
                    const reg = register('password');
                    reg.ref(e);
                    pwdRef.current = e;
                  }}
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

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.primary}
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                <span className={styles.primaryText}>{isLoading ? 'Signing in…' : 'Sign in'}</span>
              </button>
            </div>
          </form>

          <div className={styles.lower}>
            <div className={styles.orRow}><span className={styles.line} /><span className={styles.orText}>or</span><span className={styles.line} /></div>
            <p className={styles.signup}>
              Don’t have an account? <Link to="/signup" className={styles.link}>Sign up</Link>
            </p>

            <div className={styles.demo}>
              <strong>Demo Credentials:</strong>
              <div className={styles.demoLine}><code>admin@takeoffupskill.com</code> / <code>admin123</code></div>
              <div className={styles.demoLine}><code>student@example.com</code> / <code>student123</code></div>
            </div>
          </div>
        </motion.main>
      </div>
    </PageTransition>
  );
}
