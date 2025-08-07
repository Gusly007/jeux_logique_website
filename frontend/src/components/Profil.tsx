import React from 'react';
import { useAuth } from '../AuthContext';
import './profil.css';


type Profile = {
  username: string;
  email: string;
  age: number;
};

type User = {
  id: string;
  email: string;
};

const Profil: React.FC = () => {
    
  const { profile, user, logout } = useAuth() as {
    profile: Profile | null;
    user: User | null;
    logout: () => void;
  };


  if (!user) {
    return <p>Vous devez être connecté pour voir votre profil.</p>;
  }

  if (!profile) {
    return <p>Chargement du profil...</p>;
  }

  return (
<div className="profil-container">
    <h1>Bienvenue, {user.email} !</h1>
    <p>Voici vos informations de profil :</p>
      <h2>Profil de {profile.username}</h2>
      <p><strong>Nom d'utilisateur :</strong> {profile.username}</p>
      <p><strong>age</strong>{profile.age} </p>
      <p><strong>Email :</strong> {profile.email}</p>
      <p><strong>score:</strong> </p>

      <button onClick={logout} style={{ marginTop: '1rem' }}>
        Se déconnecter
      </button>
    </div>
  );
};

export default Profil;
