import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Download } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { setPageTitle } from '../utils/helpers';
import styles from './Dashboard.module.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { success } = useToast();
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Full Stack Web Development', status: 'pending', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Data Science', status: 'replied', date: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', course: 'UI/UX Design', status: 'pending', date: '2024-01-13' },
  ]);

  useEffect(() => {
    setPageTitle('Admin Dashboard');
  }, []);

  const stats = [
    { icon: <Users size={24} />, label: 'Total Students', value: '1,247', change: '+12%' },
    { icon: <MessageSquare size={24} />, label: 'New Enquiries', value: '48', change: '+5%' },
    { icon: <TrendingUp size={24} />, label: 'Revenue', value: '$45,230', change: '+18%' },
  ];

  const handleExportCSV = () => {
    success('CSV export started! Download will begin shortly.');
  };

  return (
    <PageTransition>
      <div className={styles.dashboard}>
        <div className="container">
          <div className={styles.header}>
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage enquiries and monitor platform performance</p>
            </div>
            <button className="btn btn-primary" onClick={handleExportCSV}>
              <Download size={20} /> Export CSV
            </button>
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
                  <span className={styles.change}>{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.section}>
            <h2>Recent Enquiries</h2>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td>{enq.name}</td>
                      <td>{enq.email}</td>
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

export default AdminDashboard;
