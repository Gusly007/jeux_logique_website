import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  profile: UserProfile | null;
  login: (username: string, profile: UserProfile) => void;
  logout: () => void;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  age: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie le localStorage au démarrage
    const storedProfile = localStorage.getItem('profile');
    const storedUser = localStorage.getItem('username');

    if (storedProfile && storedUser) {
      setUser(storedUser);
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const login = (username: string, profile: UserProfile) => {
    setUser(username);
    setProfile(profile);
    localStorage.setItem('username', username);
    localStorage.setItem('profile', JSON.stringify(profile));
    navigate('/');
  };

const logout = async () => {
  try {
    // Appel API pour détruire la session côté serveur
    await fetch('http://localhost:8085/api/logout', {
      method: 'POST',
      credentials: 'include', // 🔐 important si session PHP utilise cookie
    });
  } catch (error) {
    console.error("Erreur côté serveur pendant le logout :", error);
  }

  // Nettoyage côté front
  setUser(null);
  setProfile(null);
  localStorage.clear();
  
  navigate('/');
};


  return (
    <AuthContext.Provider value={{ user, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
