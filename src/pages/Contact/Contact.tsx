import { Code, Mail } from 'lucide-react';
import styles from './Contact.module.scss';


export const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.top}>
        <h1 className={styles.title}>Get in<span className={styles.specialSpan}>Touch</span></h1>
        <p className={styles.description}>Have a question, feedback, or a feature request? We'd love to hear from you.</p>
      </div>

      <div className={styles.contentGrid}>
        <a href="mailto:hello@cinebase.fun" className={styles.contactCard}>
          <div className={styles.iconBox}>
            <Mail size={28} />
          </div>
          <div className={styles.cardInfo}>
            <h3>Email Us</h3>
            <p>hello@cinebase.fun</p>
          </div>
        </a>

        <a 
          href="https://github.com/CineBase-org" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.contactCard}
        >
          <div className={styles.iconBox}>
            <Code size={28} />
          </div>
          <div className={styles.cardInfo}>
            <h3>GitHub</h3>
            <p>Check out the code</p>
          </div>
        </a>
      </div>
    </div>
  );
};