import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Header.css';

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
     console.log('Réponse send todu serveur :', formData);
    try {
      const response = await fetch('http://localhost:8085/api/login', {
        method: 'POST',
        credentials: "include", // Envoie et reçoit le cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const rawText = await response.text();
      console.log('Réponse brute du serveur :', rawText);

      if (!response.ok) throw new Error('Identifiants invalides');

      const data = JSON.parse(rawText);

      // ✅ Stocker le token
      localStorage.setItem('token', data.token);

      // ✅ Appeler login avec username et profil
      login(data.profile.username, data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="form-group">
        {error && <div className="alert error">{error}</div>}

        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
