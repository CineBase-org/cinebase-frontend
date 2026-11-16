import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/client";
import styles from './PaymentSuccess.module.scss';
import { CheckCircle2, Loader2 } from "lucide-react";

interface SubscriptionStatus {
  is_active: boolean;
}

export const PaymentSuccess = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTimeout, setHasTimeout] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    let isMounted = true;
    
    const checkSubscription = async () => {
      try {
        const data = await apiFetch<SubscriptionStatus>('/api/payment/subscription/');
        if (!isMounted) return;

        if (data.is_active) {
          setIsActive(true);
          setIsLoading(false);
          setTimeout(() => {
            navigate('/movie-picker');
          }, 2500)
        }
      } catch (error) {
        console.error("Checking subscription error:", error);
      }
    };

    checkSubscription();

    const interval = setInterval(checkSubscription, 2000);

    const timeout = setTimeout(() => {
      if (isMounted && !isActive) {
        setIsLoading(false);
        setHasTimeout(true);
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    }
  }, [navigate, isActive]);


  return (
    <main className={styles.paymentSuccessContainer}>
      <div className={styles.card}>
        {isLoading && !hasTimeout && (
          <>
          <Loader2 className={styles.spinner} size={56} />
          <h1 className={styles.title}>Payment processing...</h1>
          <p className={styles.text}>
            We are contacting Stripe to activate your subscription. This will take just a few seconds.
          </p>
          </>
        )}

        {isActive && (
          <>
          <CheckCircle2 className={styles.successIcon} size={64} />
          <h1 className={styles.title}>Thank you for subscribing!</h1>
          <p className={styles.text}>
            Payment successfully confirmed. We are now redirecting you to MoviePicker...
          </p>
          </>
        )}

        {hasTimeout && !isActive && (
          <>
          <h1 className={styles.title}>Activation delay</h1>
          <p className={styles.text}>
            The payment went through, but the backend is still processing the webhook. You can head over to MoviePicker right now.
          </p>
          <button
            className={styles.button}
            onClick={() => navigate('/moviepicker')}
          >
            Go to MoviePicker
          </button>
          </>
        )}
      </div>
    </main>
  );
};