import { Film, Target, Zap } from 'lucide-react';
import styles from './About.module.scss';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Stop scrolling. <span className={styles.specialSpan}>Start watching.</span></h1>
          <p className={styles.description}>
            CineBase was born out of a simple frustration: spending more time looking 
            for a movie than actually watching one. We built this tool to help you 
            find the perfect film for your mood in seconds.
          </p>
        </div>

        <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}><Zap size={24} /></div>
          <h3>Smart Selection</h3>
          <p>Filter by mood, genre, year, and rating to narrow down thousands of movies to just the right ones.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}><Target size={24} /></div>
          <h3>No Decision Fatigue</h3>
          <p>Use our "Surprise Me" feature to let fate (and our algorithm) decide your evening entertainment.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.iconBox}><Film size={24} /></div>
          <h3>Quality Data</h3>
          <p>Powered by TMDB, providing you with up-to-date ratings, synopses, and beautiful high-res posters.</p>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2>Ready to find your movie?</h2>
        <Link to="/moviepicker" className={styles.primaryBtn}>
          Go to Movie Picker
        </Link>
      </div>
    </div>
  );
};