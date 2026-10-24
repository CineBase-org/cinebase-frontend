import type { StreamingPlatform } from '../../../../api/movies';
import styles from './AvailableOn.module.scss';

type Props = {
  platforms: StreamingPlatform[];
};

export const AvailableOn = ({ platforms }: Props) => {
  if (platforms.length === 0) {
    return null;
  }

  return (
    <div className={styles.AvailableOnСontainer}>
      <p className={styles.title}>AVAILABLE ON</p>
      <div className={styles.platforms}>
        {platforms.map((platform) => (
          <img 
            key={platform.id}
            src={platform.logo_url}
            alt={platform.name}
          />
        ))}
      </div>
    </div>
  );
};