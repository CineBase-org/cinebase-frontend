import type { LucideIcon } from 'lucide-react';
import styles from './MoodStep.module.scss';
import clsx from 'clsx';

export interface Moodoption {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface MoodStepProps {
  moods: Moodoption[];
  selectedMood: string;
  onSelectMood: (moodId: string) => void;
}

export const MoodStep = ({ moods, selectedMood, onSelectMood }: MoodStepProps) => (
  <div className={styles.stepSection}>
    <div className={styles.stepTitle}>
      <span className={styles.stepNumber}>2</span>
      <h2>What mood are you in?</h2>
    </div>
    <div className={styles.moodGrid}>
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selectedMood === mood.id;

        return (
          <button
            key={mood.id}
            type="button"
            className={clsx(styles.moodCard, isSelected && styles.selected)}
            onClick={() => onSelectMood(mood.id)}
          >
            <div className={styles.radio}>
              {isSelected && <div className={styles.radioDot} />}
            </div>
            <Icon size={26} className={styles.moodIcon} />
            <span>{mood.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);