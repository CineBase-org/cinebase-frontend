import { useState } from 'react';
import { apiFetch } from '../../../../api/client';
import { CreditCard, ExternalLink, Loader2 } from 'lucide-react';
import styles from './UserSubscriptionSection.module.scss';


export const UserSubscriptionSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await apiFetch<{ url: string }>('/api/payments/portal/', {
        method: 'POST',
      });
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Failed to open billing portal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.subscriptionCard}>
      <div className={styles.subscriptionHeader}>
        <CreditCard className={styles.subscriptionIcon} size={24} />
        <h3 className={styles.subscriptionTitle}>Subscription Management</h3>
      </div>
      <p className={styles.subscriptionText}>
        Manage your payment method, view your transaction history, or cancel your subscription via the secure Stripe portal.
      </p>
      <button
        onClick={handleManageSubscription}
        disabled={isLoading}
        className={styles.portalButton}
      >
        {isLoading ? (
          <>
            <Loader2 className={styles.spinner} size={18} />
            Opening the portal...
          </>
        ) : (
          <>
            Manage subscription
            <ExternalLink size={16} />
          </>
        )}
      </button>
    </div>
  );
};