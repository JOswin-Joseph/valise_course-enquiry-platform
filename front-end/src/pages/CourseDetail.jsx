import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Award, CheckCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { setPageTitle, formatCurrency } from '../utils/helpers';
import seedData from '../mock/seed.json';
import styles from './CourseDetail.module.css';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const foundCourse = seedData.courses.find(c => c.slug === slug);
    if (foundCourse) {
      setCourse(foundCourse);
      setPageTitle(foundCourse.title);
      const foundInstructor = seedData.instructors.find(i => i.id === foundCourse.instructor);
      setInstructor(foundInstructor);
    }
  }, [slug]);

  if (!course) return <div className="container" style={{padding: '4rem 0'}}>Course not found</div>;

  return (
    <PageTransition>
      <div className={styles.courseDetail}>
        <div className={styles.hero} style={{backgroundImage: `url(${course.thumbnail})`}}>
          <div className={styles.heroOverlay}>
            <div className="container">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className={styles.category}>{course.category}</span>
                <h1>{course.title}</h1>
                <p>{course.shortDescription}</p>
                <div className={styles.meta}>
                  <span><Users size={16} /> {course.studentsEnrolled} students</span>
                  <span><Clock size={16} /> {course.duration}</span>
                  <span><Award size={16} /> {course.level}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container" style={{padding: '3rem 0'}}>
          <div className={styles.content}>
            <div className={styles.main}>
              <section className={styles.section}>
                <h2>About This Course</h2>
                <p>{course.description}</p>
              </section>

              {course.syllabus && course.syllabus.length > 0 && (
                <section className={styles.section}>
                  <h2>Course Syllabus</h2>
                  {course.syllabus.map((week) => (
                    <div key={week.week} className={styles.syllabusItem}>
                      <h3>Week {week.week}: {week.title}</h3>
                      <ul>
                        {week.topics.map((topic, i) => (
                          <li key={i}><CheckCircle size={16} /> {topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {instructor && (
                <section className={styles.section}>
                  <h2>Your Instructor</h2>
                  <div className={styles.instructor}>
                    <img src={instructor.image} alt={instructor.name} />
                    <div>
                      <h3>{instructor.name}</h3>
                      <p className={styles.title}>{instructor.title}</p>
                      <p>{instructor.bio}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <div className={styles.sidebar}>
              <div className={styles.priceCard}>
                <div className={styles.price}>
                  <span className={styles.current}>{formatCurrency(course.price)}</span>
                  {course.originalPrice && (
                    <span className={styles.original}>{formatCurrency(course.originalPrice)}</span>
                  )}
                </div>
                <Link to="/contact" className="btn btn-primary">Enquire Now</Link>
                <div className={styles.features}>
                  <h3>This course includes:</h3>
                  <ul>
                    {course.features.map((feature, i) => (
                      <li key={i}><CheckCircle size={16} /> {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CourseDetail;
