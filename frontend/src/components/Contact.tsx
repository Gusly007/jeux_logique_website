import React from 'react';
import './contact.css';

const Contact: React.FC = () => {
  return (
    <div className="container">
      <h1>Contact</h1>
      <div className="contact-content">
        <p>Vous pouvez nous contacter via :</p>
        <ul>
          <li>Email : contact@jeuxdelogique.fr</li>
          <li>Téléphone : 0605628065</li>
          <li>Adresse : 123 rue des Jeux, 75000 Paris</li>
        </ul>
      </div>
    </div>
  );
};
export default Contact;