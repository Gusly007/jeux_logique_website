import React, { useState } from 'react';

// Types for form data
type FormData = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic email validation
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Submit data on button click
  const handleClick = async () => {
    setError(null);

    // Client-side validation
    if (!formData.username.trim() || !formData.password) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError('Email invalide');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8085/api/register', {
        method: 'POST',
        mode: 'cors',                 // Enable CORS requests
        credentials: 'omit',       // donotSend cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Inscription</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">Inscription réussie !</div>}

      <form noValidate>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Nom d'utilisateur"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full p-2 border rounded"
            placeholder="Mot de passe"
          />
        </div>

        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'En cours...' : 'Envoyer'}
        </button>
      </form>

    </div>
  );
};

export default Register;
