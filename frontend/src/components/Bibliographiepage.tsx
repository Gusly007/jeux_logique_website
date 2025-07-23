import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import './Bibliographie.css';

type Bibliographie = {
  id: number;
  titre: string;
  auteur: string;
  annee?: number;
  editeur?: string;
  isbn?: string;
  resume?: string;
};

const BibliographiePage: React.FC = () => {
  const { user } = useAuth();
  const [biblios, setBiblios] = useState<Bibliographie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchBiblios = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/bibliographie', {
          //credentials: 'include', // 👈 Important si session PHP
        });
        
        if (!response.ok) throw new Error('Erreur lors du chargement des bibliographies.');
        const data = await response.json();
        setBiblios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchBiblios();
  }, [user]);

  if (!user) return <p>Vous devez être connecté pour voir les bibliographies.</p>;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

return (
  <div className="biblio-container">
    <h2>Liste des bibliographies</h2>
    {biblios.length === 0 ? (
      <p>Aucune entrée pour l'instant.</p>
    ) : (
      <ul className="biblio-liste">
        {biblios.map((biblio) => (
          <li key={biblio.id} className="biblio-item" tabIndex={0}>
            <h3>{biblio.titre}</h3>
            <p><strong>Auteur :</strong> {biblio.auteur}</p>
            {biblio.annee && <p><strong>Année :</strong> {biblio.annee}</p>}
            {biblio.editeur && <p><strong>Éditeur :</strong> {biblio.editeur}</p>}
            {biblio.isbn && <p><strong>ISBN :</strong> {biblio.isbn}</p>}
            {biblio.resume && <p><strong>Résumé :</strong> {biblio.resume}</p>}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default BibliographiePage;
