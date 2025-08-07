import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/AProposDeMoi">about us</Link></li>
            <li><Link to="/mentionlegal">mention legal</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <p>&copy; 2025 Jeux de Logique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;