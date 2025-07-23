import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import { useAuth } from "../AuthContext";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = ({ 
  title = "Bienvenue sur le site de jeux de logique !",
  subtitle = "Mets ta matière grise à l'épreuve avec nos différents jeux."
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = e.target.value;
    if (path) navigate(path);
  };

  return (
    <header className="header">
      {/* Premier div : boutons de connexion et langue */}
      <div className="top-bar">
  <div className="right-buttons">
    {!user ? (
      <>
        <Link to="/login" className="login-button">Connexion</Link>
        <Link to="/register" className="register-button">Register</Link>
      </>
    ) : (
      <button onClick={logout} className="logout-button">Déconnexion</button>
    )}
    <select className="language-select">
      <option value="fr">FR</option>
      <option value="en">EN</option>
    </select>
  </div>
</div>

      {user && (
  <header className="nav-bar">
    <div className="title-section">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    <nav className="nav-section">
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/Jeux">Jeux</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/Bibliographiepage">Bibliographie</Link></li>
        <li><Link to="/Profil">Profil</Link></li>
      </ul>
      <select className="nav-select" onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>Menu rapide</option>
        <option value="/">Accueil</option>
        <option value="/Jeux">Jeux</option>
        <option value="/contact">Contact</option>
        <option value="/Bibliographiepage">Bibliographie</option>
        <option value="/Profil">Profil</option>
        <option value="/logout">Déconnexion</option>
      </select>
    </nav>
  </header>
)}

    </header>
  );
};

export default Header;
