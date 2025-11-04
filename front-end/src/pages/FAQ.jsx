import { useEffect } from 'react';
import PageTransition from '../components/layout/PageTransition';
import { setPageTitle } from '../utils/helpers';

const FAQ = () => {
  useEffect(() => {
    setPageTitle('FAQ');
  }, []);

  return (
    <PageTransition>
      <div style={{minHeight: '60vh', padding: '4rem 0'}}>
        <div className="container">
          <h1>FAQ</h1>
          <p style={{marginTop: '1rem', color: 'var(--color-text-secondary)'}}>
            This page is ready for implementation. Connect to backend API endpoints for full functionality.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default FAQ;
