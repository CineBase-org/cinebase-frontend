import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiFetch } from '../../api/client';
import type { AuthTokens, User } from '../../contexts/AuthContext';

import styles from './Register.module.scss';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await apiFetch("/api/user/register/", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const tokens = await apiFetch<AuthTokens>("/api/user/token/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      const userData = await apiFetch<User>("/api/user/me/");
      login(userData, tokens);
      navigate("/user");
    } catch (err) {
      console.error(err);
      setError("Registration error. Check the entered data, or this email already exists.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}>Registration with<span className={styles.accentText}>CINEBASE</span></h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create an account"}
        </button>

        <div className={styles.footerText}>
          Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
        </div>
      </form>
    </div>
  );
};