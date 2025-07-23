import React, { useEffect, useState } from 'react';

type MotManquantQuestion = {
  phrase: string;
};

type ResultatReponse = {
  question: string;
  answer: string;
  expected: string;
  correct: boolean;
};

const MotManquant: React.FC = () => {
  const [questions, setQuestions] = useState<MotManquantQuestion[]>([]);
  const [reponses, setReponses] = useState<string[]>([]);
  const [resultats, setResultats] = useState<ResultatReponse[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('http://localhost:8085/api/motmanquant', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      const text = await res.text();
      const data = JSON.parse(text);

      setQuestions(data);
      setReponses(new Array(data.length).fill(''));
      setResultats(null);
      setScore(null);
    } catch (error) {
      console.error('Erreur fetch :', error);
      setQuestions([{ phrase: "Erreur de connexion au serveur." }]);
    }
  };

  const handleReponseChange = (index: number, value: string) => {
    const newReponses = [...reponses];
    newReponses[index] = value;
    setReponses(newReponses);
  };

  const verifierReponses = async () => {
    setIsWaiting(true);

    try {
      const res = await fetch('http://http://10.130.162.168:8085/api/motmanquantverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          questions.map((q, i) => ({
            question: { phrase: q.phrase },
            answer: reponses[i],
          }))
        ),
      });

      const text = await res.text();
      console.log("Résultat reçu :", text);
      const data = JSON.parse(text);
      console.log("Résultat reçu :", data);

      setResultats(data.results);
      setScore(data.score);
    } catch (error) {
      console.error('Erreur vérification :', error);
      setResultats(null);
      setScore(null);
    }

    setIsWaiting(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mot Manquant</h2>

      {questions.length > 0 ? (
        <>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '1em' }}>
              <p>
                <strong>Question {index + 1} :</strong> {q.phrase}
              </p>
              <input
                type="text"
                value={reponses[index] || ''}
                onChange={(e) => handleReponseChange(index, e.target.value)}
                disabled={isWaiting || resultats !== null}
              />
              {resultats && resultats[index] && (
                <p style={{ fontWeight: 'bold', color: resultats[index].correct ? 'green' : 'red' }}>
                  {resultats[index].correct
                    ? '✅ Bonne réponse'
                    : `❌ Mauvaise réponse (attendu : "${resultats[index].expected}")`}
                </p>
              )}
            </div>
          ))}

          {resultats === null ? (
            <button onClick={verifierReponses} disabled={isWaiting}>
              Envoyer toutes les réponses
            </button>
          ) : (
            <>
              <h3>Score : {score} / {questions.length}</h3>
              <button onClick={fetchQuestions}>Rejouer</button>
            </>
          )}
        </>
      ) : (
        <p>Chargement des questions...</p>
      )}
    </div>
  );
};

export default MotManquant;
