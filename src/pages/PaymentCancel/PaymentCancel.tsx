import { useNavigate } from "react-router-dom";
import styles from './PaymentCancel.module.scss';
import { XCircle } from "lucide-react";

export const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.paymentCancelContainer}>
      <div className={styles.card}>
        <XCircle className={styles.cancelIcon} size={64} />
        <h1 className={styles.title}>Payment cancelled</h1>
        <p className={styles.text}>
          You have cancelled the subscription process. No funds have been charged to your card.
        </p>
        <div className={styles.action}>
          <button
            className={styles.button}
            onClick={() => navigate('/moviepicker')}
          >
            Return to MoviePicker
          </button>
        </div>
      </div>
    </main>
  );
};