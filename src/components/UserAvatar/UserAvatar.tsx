import clsx from "clsx";
import styles from './UserAvatar.module.scss';
import { User } from "lucide-react";
import { useState } from "react";

type UserAvatarProps = {
  avatarUrl?: string | null;
  altText?: string;
  className?: string; 
};

export const UserAvatar = ({ 
  avatarUrl, 
  altText = "User Avatar", 
  className 
}: UserAvatarProps) => {

  const [errorUrl, setErrorUrl] = useState<string | null>(null);

  const hasError = avatarUrl && errorUrl === avatarUrl;

  return (
    <div className={clsx(styles.avatarWrapper, className)}>
      {avatarUrl && !hasError ? (
        <img 
          src={avatarUrl} 
          alt={altText} 
          className={styles.image} 
          loading="lazy" 
          onError={() => setErrorUrl(avatarUrl)} 
        />
      ) : (
        <div className={styles.fallback}>
          <User size={18} />
        </div>
      )}
    </div>
  );
};