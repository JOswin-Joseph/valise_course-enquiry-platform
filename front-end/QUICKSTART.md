# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: **http://localhost:5173**

## 🎯 Try the Demo

### Login Credentials

**Admin Dashboard:**
```
Email: admin@takeoffupskill.com
Password: admin123
```
After login → Automatically redirects to `/admin/dashboard`

**User Dashboard:**
```
Email: student@example.com
Password: student123
```
After login → Automatically redirects to `/user/dashboard`

## ✨ Key Features to Explore

1. **Home Page** - Hero section with animated stats and featured courses
2. **Courses Page** - Search, filter, and browse courses with pagination
3. **Course Details** - Click any course to see full details
4. **Login Flow** - Watch role-based redirect in action
5. **Dashboards** - Different views for users vs admins
6. **Animations** - Smooth transitions and hover effects throughout

## 🔧 Backend Integration

### Current State: Mock Data
The app uses `src/mock/seed.json` for development

### To Connect Your Backend:

1. **Update environment:**
   ```bash
   # Edit .env file
   VITE_API_URL=https://your-backend.com/api
   ```

2. **Replace mock login in `src/pages/Login.jsx`:**
   ```javascript
   // Replace this:
   const response = await mockLogin(data.email, data.password);
   
   // With this:
   const response = await apiService.auth.login(data);
   ```

3. **Backend must return:**
   ```json
   {
     "token": "jwt-token",
     "user": {
       "id": "user-id",
       "email": "user@example.com", 
       "name": "User Name",
       "role": "admin" // or "user"
     }
   }
   ```

## 📱 Responsive Design

Test on different screen sizes:
- Desktop: Full navigation
- Tablet: Responsive grid
- Mobile: Hamburger menu

## 🎨 Customization

### Colors
Edit `src/assets/theme.css`:
```css
:root {
  --color-primary: #1E2A5E;    /* Navy blue */
  --color-accent: #3BAFDA;     /* Sky blue */
  --color-background: #F9FAFB; /* Light gray */
}
```

### Pages
Add new pages in 3 steps:
1. Create `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add link in `src/components/common/Header.jsx`

## 🏗️ Build for Production

```bash
npm run build
```

Output in `dist/` directory - ready for deployment!

## 📚 Full Documentation

See `README.md` for complete documentation including:
- Detailed architecture
- Security recommendations
- API endpoint specifications
- Component documentation

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Vite will automatically try 5174, 5175, etc.
```

**Build errors?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Styles not loading?**
```bash
# Check that theme.css is imported in index.css
```

## 🎓 Learning Resources

- **React Router**: Route configuration in `App.jsx`
- **Framer Motion**: Animation examples in `Home.jsx`
- **Form Validation**: See `Login.jsx` for React Hook Form + Yup
- **Context API**: Auth and Toast contexts for global state

---

**Built with:** React 18 + Vite + Framer Motion + React Router
**Status:** ✅ Production-ready frontend (backend integration pending)
