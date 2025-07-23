import React from 'react';


const MentionsLegales: React.FC = () => {
  return (
    <div className="mentions-container">
      <h1>Mentions Légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          <strong>Nom du site :</strong> Jeux de Logique<br />
          <strong>Responsable :</strong> Jean Dupont<br />
          <strong>Email :</strong> contact@jeuxdelogique.fr<br />
          <strong>Téléphone :</strong> 06 05 62 80 65<br />
          <strong>Adresse :</strong> 123 rue des Jeux, 75000 Paris
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          <strong>Hébergeur :</strong> OVH SAS<br />
          2 rue Kellermann, 59100 Roubaix, France<br />
          Site : <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">www.ovh.com</a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le contenu du site est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Les données collectées sont utilisées uniquement dans le cadre du fonctionnement du site. Vous disposez d'un droit d'accès, de modification et de suppression de vos données.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Ce site utilise des cookies à des fins de statistiques et de fonctionnement. Vous pouvez les désactiver dans les paramètres de votre navigateur.
        </p>
      </section>
    </div>
  );
};

export default MentionsLegales;
