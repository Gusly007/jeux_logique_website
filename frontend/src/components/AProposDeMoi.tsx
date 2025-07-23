import React from 'react';

const APropos: React.FC = () => {
  return (
    <section className="apropos-section">
      <h1>À propos de nous</h1>

      <div className="apropos-content">
        <article className="presentation">
          <h2>Notre Histoire</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </article>

        <article className="mission">
          <h2>Notre Mission</h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
          </p>
        </article>

        <article className="valeurs">
          <h2>Nos Valeurs</h2>
          <ul>
            <li>Innovation</li>
            <li>Qualité</li>
            <li>Satisfaction client</li>
            <li>Développement durable</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default APropos;
