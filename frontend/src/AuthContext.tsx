import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  profile: UserProfile | null;
  login: (username: string, profile: UserProfile) => void;
  logout: () => void;
  loading: boolean;
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
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/checksession', {
          method:'GET',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération de la session');
        const data = await response.json();
        if (data.username && data.profile) {
          setUser(data.username);
          setProfile(data.profile);
          localStorage.setItem('username', data.username);
          localStorage.setItem('profile', JSON.stringify(data.profile));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session :", error);
        setUser(null);
        setProfile(null);
        localStorage.removeItem('username');
        localStorage.removeItem('profile');
      }finally{
        setLoading(false);
      }
    };  
    fetchSession();
  },[]);

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
    <AuthContext.Provider value={{ user, profile, login, logout,loading, }}>
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
