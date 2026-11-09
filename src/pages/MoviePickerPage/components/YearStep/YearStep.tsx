import React from 'react';
import styles from './YearStep.module.scss';

interface YearStepProps {
  yearRange: [number, number];
  onChange: (range: [number, number]) => void;
  minYear?: number;
  maxYear?: number;
}

export const YearStep = ({
  yearRange,
  onChange,
  minYear = 1970,
  maxYear = 2026,
}: YearStepProps) => {
  const [fromYear, toYear] = yearRange;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), toYear - 1);
    onChange([val, toYear]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), fromYear + 1);
    onChange([fromYear, val]);
  };

  // Обчислюємо відсотки для динамічного заповнення треку
  const leftPercent = ((fromYear - minYear) / (maxYear - minYear)) * 100;
  const rightPercent = 100 - ((toYear - minYear) / (maxYear - minYear)) * 100;

  return (
    <div className={styles.stepSection}>
      <div className={styles.stepTitle}>
        <span className={styles.stepNumber}>3</span>
        <h2>Release year</h2>
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.trackWrapper}>
          <div className={styles.trackBg} />
          <div
            className={styles.trackFill}
            style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
          />

          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={fromYear}
            onChange={handleMinChange}
            className={`${styles.rangeInput} ${styles.rangeMin}`}
          />
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={toYear}
            onChange={handleMaxChange}
            className={`${styles.rangeInput} ${styles.rangeMax}`}
          />
        </div>

        <div className={styles.rangeLabels}>
          <span>{fromYear}</span>
          <span>{toYear}</span>
        </div>
      </div>
    </div>
  );
};