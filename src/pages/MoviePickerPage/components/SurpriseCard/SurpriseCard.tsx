import { Dices, Shuffle } from 'lucide-react';
import styles from './SurpriseCard.module.scss';

interface SurpriseCardProps {
  isLoading: boolean;
  onSurprise: () => void;
}

export const SurpriseCard = ({ isLoading, onSurprise }: SurpriseCardProps) => (
  <div className={styles.surpriseCard}>
    <div className={styles.surpriseInfo}>
      <Dices className={styles.accentIcon} size={32} />
    </div>
    <div>
      <h3>Not sure? Let us surprise you</h3>
      <p>We'll pick a movie based on your taste.</p>
    </div>
    <button
      type="button"
      className={styles.outlineButton}
      onClick={onSurprise}
      disabled={isLoading}
    >
      <Shuffle size={18} />
      {isLoading ? 'Searching...' : 'Surprise me'}
    </button>
  </div>
);