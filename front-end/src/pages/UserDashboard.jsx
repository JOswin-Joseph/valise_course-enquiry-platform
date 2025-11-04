import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, MessageSquare } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../hooks/useAuth';
import { setPageTitle } from '../utils/helpers';
import styles from './Dashboard.module.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([
    { id: 1, course: 'Full Stack Web Development', status: 'pending', date: '2024-01-15' },
    { id: 2, course: 'Data Science Masterclass', status: 'replied', date: '2024-01-10' },
  ]);

  useEffect(() => {
    setPageTitle('Dashboard');
  }, []);

  const stats = [
    { icon: <BookOpen size={24} />, label: 'Courses Enrolled', value: '3' },
    { icon: <MessageSquare size={24} />, label: 'Active Enquiries', value: '2' },
    { icon: <Mail size={24} />, label: 'Messages', value: '5' },
  ];

  return (
    <PageTransition>
      <div className={styles.dashboard}>
        <div className="container">
          <div className={styles.header}>
            <div>
              <h1>Welcome back, {user?.name}!</h1>
              <p>Here's what's happening with your learning journey</p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.section}>
            <h2>My Enquiries</h2>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td>{enq.course}</td>
                      <td>
                        <span className={`${styles.status} ${styles[enq.status]}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td>{enq.date}</td>
                      <td>
                        <button className="btn btn-outline" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserDashboard;
