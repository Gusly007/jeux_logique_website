import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Jeux.css';

type Jeu = {
  id: number;
  nom: string;
  description: string;
  chemin: string;
};

const Jeux: React.FC = () => {
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/jeux',
          {
            credentials: "include",

         headers: {
         'Authorization': `Bearer ${token}`
         }
          }
        );
        console.log("Réponse brute :", response);
        if (!response.ok) throw new Error('Erreur lors du chargement des jeux');
        const data: Jeu[] = await response.json();
        setJeux(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchJeux();
  }, []);

  if (loading) return <p>Chargement des jeux...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
  <div className="jeux-container">
    <h1>Liste des jeux</h1>
    {jeux.length === 0 ? (
      <p>Aucun jeu disponible.</p>
    ) : (
      <ul className="jeux-liste">
        {jeux.map(jeu => (
          <li key={jeu.id} className="jeux-item">
            <h2>{jeu.nom}</h2>
            <p>{jeu.description}</p>
            <Link to={jeu.chemin}>
              <button>Jouer</button>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default Jeux;
