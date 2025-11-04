import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { setPageTitle } from '../utils/helpers';
import seedData from '../mock/seed.json';
import styles from './Home.module.css';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    setPageTitle('Home');
    setFeaturedCourses(seedData.courses.filter(c => c.featured).slice(0, 3));
  }, []);

  const stats = [
    { icon: <Users size={32} />, value: '10,000+', label: 'Active Students' },
    { icon: <Award size={32} />, value: '50+', label: 'Expert Instructors' },
    { icon: <TrendingUp size={32} />, value: '95%', label: 'Success Rate' },
    { icon: <Star size={32} />, value: '4.8/5', label: 'Average Rating' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className={styles.home}>
        <section className={styles.hero}>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1>Transform Your Career with Expert-Led Courses</h1>
              <p>Learn in-demand skills from industry professionals and accelerate your path to success</p>
              <div className={styles.heroActions}>
                <Link to="/courses" className="btn btn-primary">
                  Explore Courses <ArrowRight size={20} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className="container">
            <motion.div
              className={styles.statsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} className={styles.statCard} variants={itemVariants}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className={styles.featured}>
          <div className="container">
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Featured Courses</h2>
              <p>Start your learning journey with our most popular courses</p>
            </motion.div>

            <motion.div
              className={styles.coursesGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredCourses.map((course) => (
                <motion.div key={course.id} className={styles.courseCard} variants={itemVariants} whileHover={{ y: -10 }}>
                  <img src={course.thumbnail} alt={course.title} />
                  <div className={styles.courseContent}>
                    <span className={styles.category}>{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>{course.shortDescription}</p>
                    <div className={styles.courseFooter}>
                      <span className={styles.price}>${course.price}</span>
                      <Link to={`/courses/${course.slug}`} className={styles.viewBtn}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className={styles.viewAll}>
              <Link to="/courses" className="btn btn-secondary">
                View All Courses
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <div className="container">
            <h2 className="text-center">What Our Students Say</h2>
            <motion.div
              className={styles.testimonialsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {seedData.testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} className={styles.testimonialCard} variants={itemVariants}>
                  <div className={styles.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--color-warning)" stroke="var(--color-warning)" />
                    ))}
                  </div>
                  <p>{testimonial.content}</p>
                  <div className={styles.author}>
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <motion.div
              className={styles.ctaContent}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Take Off?</h2>
              <p>Join thousands of learners transforming their careers</p>
              <Link to="/signup" className="btn btn-primary">
                Sign Up Now <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
