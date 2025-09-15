import React, { useEffect, useState } from 'react';

const Factorielle: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [questionValue, setQuestionValue] = useState<number | null>(null);
  const [answer, setAnswer] = useState('');
  const [resultat, setResultat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const fetchNouvelleQuestion = async () => {
    if (questionCount >= 5) {
      setIsFinished(true);
      return;
    }

    setIsLoading(true);
    setResultat(null);
    setAnswer('');
    setQuestionValue(null);

    try {
      const res = await fetch('http://localhost:8085/api/fact');
      const data = await res.json();

      if (data.question) {
        setQuestionValue(data.question);
        const questionTexte = `Quelle est la factorielle de ${data.question} ?`;
        setQuestion(questionTexte);
      } else {
        setQuestion('Erreur : question invalide.');
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de la question :", err);
      setQuestion('Erreur de connexion au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  const envoyerReponse = async () => {
    if (!answer.trim() || questionValue === null) return;
    setIsWaiting(true);

    try {
      const res = await fetch('http://localhost:8085/api/factanswer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reponse: answer,
          question: questionValue,
        }),
      });

      const raw = await res.text();
      const data = JSON.parse(raw);

      if (data && typeof data.message === 'string') {
        setResultat(data.message);

        if (data.correct === true) {
          setScore((prev) => prev + 1);
        }
      } else {
        setResultat("Réponse inattendue du serveur.");
      }

      setQuestionCount((prev) => prev + 1);

      setTimeout(() => {
        fetchNouvelleQuestion();
        setIsWaiting(false);
      }, 2000);
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      setResultat("Erreur lors de la vérification.");
      setIsWaiting(false);
    }
  };

  const rejouer = () => {
    // Réinitialisation complète
    setQuestion('');
    setQuestionValue(null);
    setAnswer('');
    setResultat(null);
    setIsLoading(false);
    setIsWaiting(false);
    setQuestionCount(0);
    setScore(0);
    setIsFinished(false);
    fetchNouvelleQuestion();
  };

  useEffect(() => {
    fetchNouvelleQuestion();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Calcul de Factorielle</h2>

      {isFinished ? (
        <>
          <p><strong>Fin du jeu !</strong></p>
          <p>Votre score final : {score} / 5</p>
          <button onClick={rejouer}>Rejouer</button>
        </>
      ) : isLoading ? (
        <p>Chargement de la question...</p>
      ) : (
        <>
          <p><strong>Question {questionCount + 1} sur 5 :</strong> {question}</p>

          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Votre réponse"
            disabled={isWaiting}
          />

          <button onClick={envoyerReponse} disabled={isWaiting || !answer.trim()}>
            Envoyer
          </button>

          {resultat && <p><strong>{resultat}</strong></p>}
        </>
      )}
    </div>
  );
};

export default Factorielle;
