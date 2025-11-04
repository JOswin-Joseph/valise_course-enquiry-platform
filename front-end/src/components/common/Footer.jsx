import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    courses: [
      { label: 'Web Development', path: '/courses?category=Web Development' },
      { label: 'Data Science', path: '/courses?category=Data Science' },
      { label: 'UI/UX Design', path: '/courses?category=Design' },
      { label: 'Cloud Computing', path: '/courses?category=Cloud Computing' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Instructors', path: '/instructors' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/careers' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, url: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, url: '#', label: 'Instagram' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <Link to="/" className={styles.logo}>
              <GraduationCap size={32} />
              <span>Coursify</span>
            </Link>
            <p className={styles.description}>
              Empowering learners worldwide with industry-relevant skills and expert-led courses.
              Transform your career with us.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:info@takeoffupskill.com" className={styles.contactItem}>
                <Mail size={18} />
                info@takeoffupskill.com
              </a>
              <a href="tel:+1234567890" className={styles.contactItem}>
                <Phone size={18} />
                +1 (234) 567-890
              </a>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                123 Learning St, Tech City
              </div>
            </div>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h3>Courses</h3>
              {footerLinks.courses.map((link) => (
                <Link key={link.path} to={link.path} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={styles.linkColumn}>
              <h3>Company</h3>
              {footerLinks.company.map((link) => (
                <Link key={link.path} to={link.path} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={styles.linkColumn}>
              <h3>Support</h3>
              {footerLinks.support.map((link) => (
                <Link key={link.path} to={link.path} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            {currentYear} TakeOff Upskill. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                className={styles.socialLink}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
