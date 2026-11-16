import styles from './MoviePickerPaywal.module.scss';

interface MoviePickerPaywallProps {
  onCheckout: () => void;
}

export const MoviePickerPaywall = ({ onCheckout }: MoviePickerPaywallProps) => {
  return (
    <section className={styles.moviePickerContainer}>
      <div className={styles.paywallCard}>
        <h2 className={styles.paywallTitle}>
          MoviePicker is available by subscription
        </h2>
        <p className={styles.paywallText}>
          Subscribe to CineBase for unlimited access to personalized movie recommendations based on mood and genre.
        </p>

        <div className={styles.testCardHint}>
          <p className={styles.testCardTitle}>🧪 Test payment mode:</p>
          <p>Картка: <code className={styles.codeSnippet}>4242 4242 4242 4242</code></p>
          <p className={styles.testCardSub}>Any future date and CVC</p>
        </div>

        <button
          onClick={onCheckout}
          className={styles.subscribeButton}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};