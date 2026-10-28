import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { User } from '../../contexts/AuthContext';
import { LogOut, User as UserIcon, MapPin, Calendar, FileText, Edit, X, Save } from 'lucide-react';

import styles from './UserPage.module.scss';
import { apiFetch } from '../../api/client';



export const UserPage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      location: user?.location || '',
      birth_date: user?.birth_date || '',
      bio: user?.bio || '',
    });

    const handleLogout = () => {
        logout();
        navigate("/"); 
    };

    const handleEditToggle = () => {
      if (isEditing) {
        setFormData ({
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          location: user?.location || '',
          birth_date: user?.birth_date || '',
          bio: user?.bio || '',
        });
        setError(null);
      }
      setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        const updatedUser = await apiFetch<User>("/api/user/me/", {
          method: "PUT",
          body: JSON.stringify(formData),
        });

        updateUser(updatedUser);
        setIsEditing(false);
      } catch (err) {
        console.error(err);
        setError("Failed to update profile. Check the entered data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
        return <div className={styles.loader}>Завантаження...</div>;
    }

    return (
        <div className={styles.userPageContainer}>
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <div className={styles.avatar}>
                        <UserIcon size={48} />
                    </div>

                    {!isEditing && (
                      <>
                        <h1>
                          {user.first_name || user.last_name 
                              ? `${user.first_name} ${user.last_name}` 
                              : "User CineBase"}
                        </h1>
                        <button 
                          className={styles.editIconBtn} 
                          onClick={handleEditToggle}
                          aria-label="Edit profile"
                        >
                          <Edit size={18} />
                        </button>
                      </>
                    )}
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {isEditing ?(
                  <form onSubmit={handleSubmit} className={styles.editForm}>
                    <div className={styles.row}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="first_name">Name</label>
                        <input 
                          id="first_name" 
                          name="first_name" 
                          type="text"
                          value={formData.first_name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="last_name">Surname</label>
                        <input 
                          id="last_name" 
                          name="last_name" 
                          type="text"
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="location">Location</label>
                        <input 
                          id="location" 
                          name="location" 
                          type="text"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="City, Country"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="birth_date">Date of birth</label>
                        <input 
                          id="birth_date" 
                          name="birth_date" 
                          type="date"
                          value={formData.birth_date}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="bio">BIO</label>
                        <input 
                          id="bio" 
                          name="bio" 
                          type="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Tell us a little about yourself..."
                        />
                      </div>

                      <div className={styles.formActions}>
                        <button 
                          type="button"
                          className={styles.cancelBtn}
                          onClick={handleEditToggle}
                          disabled={isLoading}
                        >
                          <X size={18} /> Cancel
                        </button>
                        <button 
                          type="submit"
                          className={styles.saveBtn}
                          disabled={isLoading}
                        >
                          <Save size={18} /> {isLoading ? "Saving" : "Save"}
                        </button>
                      </div>
                  </form>
                ) : (
                <>
                    <div className={styles.infoList}>
                      <div className={styles.infoItem}>
                          <MapPin className={styles.icon} size={20} />
                          <div>
                              <span className={styles.label}>Location</span>
                              <p>{user.location || "Not specified"}</p>
                          </div>
                      </div>

                      <div className={styles.infoItem}>
                          <Calendar className={styles.icon} size={20} />
                          <div>
                              <span className={styles.label}>Date of birth</span>
                              <p>{user.birth_date || "Not specified"}</p>
                          </div>
                      </div>

                      <div className={styles.infoItem}>
                          <FileText className={styles.icon} size={20} />
                          <div>
                              <span className={styles.label}>BIO</span>
                              <p>{user.bio || "Not specified"}</p>
                          </div>
                      </div>
                  </div>

                  <button className={styles.logoutButton} onClick={handleLogout}>
                      <LogOut size={20} />
                      <span>Sign out</span>
                  </button>
                </>
                )}
            </div>
        </div>
    );
};