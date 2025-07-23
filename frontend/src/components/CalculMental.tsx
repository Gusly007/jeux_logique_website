import React, { useEffect, useState } from 'react';

type CalculQuestion = {
  arg1: number;
  arg2: number;
  operator: string;
};

type ResultatReponse = {
  question: string;
  given: number;
  expected: number;
  correct: boolean;
};

const CalculMental: React.FC = () => {
  const [questions, setQuestions] = useState<CalculQuestion[]>([]);
  const [reponses, setReponses] = useState<string[]>([]);
  const [resultats, setResultats] = useState<ResultatReponse[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

 const fetchQuestions = async () => {
  try {
    const res = await fetch('http://10.130.162.168:8085/api/calculmental');
    const text = await res.text(); // On lit brut (pas JSON)
    console.log('💬 Réponse texte brute:', text);

    // Essai de parser manuellement
    try {
      const data = JSON.parse(text);
      setQuestions(data.questions);
      setReponses(new Array(data.length).fill(''));
      setResultats(null);
      setScore(null);
    } catch (e) {
      console.error('⛔ Erreur parsing JSON:', e);
      throw new Error('Le serveur ne retourne pas du JSON valide');
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des questions :', error);
    setQuestions([]);
  }
};


  const handleReponseChange = (index: number, value: string) => {
    const updated = [...reponses];
    updated[index] = value;
    setReponses(updated);
  };

const verifierReponses = async () => {
  setIsWaiting(true);

  try {
    const payload = questions.map((q, i) => ({
      question: q,
      reponse: parseInt(reponses[i], 10) || 0,
    }));

    const res = await fetch('http://localhost:8085/api/calcverify', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log('🔍 Envoi des réponses au serveur :', JSON.stringify(payload));
    const text = await res.text();

    try {
      const data = JSON.parse(text);
      console.log('✅ Résultat serveur :', data);
      setResultats(data.details);
      setScore(data.score);
    } catch (e) {
      console.error('⛔ Réponse serveur invalide :', text);
      throw new Error('La réponse du serveur n\'est pas au format JSON.');
    }
  } catch (error) {
    console.error('❌ Erreur vérification :', error);
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
      <h2>🧠 Calcul Mental</h2>

      {questions.length > 0 ? (
        <>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '1em' }}>
              <p>
                <strong>Question {index + 1} :</strong> {q.arg1} {q.operator} {q.arg2} = ?
              </p>
              <input
                type="number"
                value={reponses[index]}
                onChange={(e) => handleReponseChange(index, e.target.value)}
                disabled={isWaiting || resultats !== null}
              />
              {resultats && resultats[index] && (
                <p style={{ fontWeight: 'bold', color: resultats[index].correct ? 'green' : 'red' }}>
                  {resultats[index].correct
                    ? '✅ Bonne réponse'
                    : `❌ Mauvaise réponse (attendu : ${resultats[index].expected})`}
                </p>
              )}
            </div>
          ))}

          {resultats === null ? (
            <button onClick={verifierReponses} disabled={isWaiting}>
              ✅ Vérifier mes réponses
            </button>
          ) : (
            <>
              <h3>🎯 Score : {score} / {questions.length}</h3>
              <button onClick={fetchQuestions}>🔁 Rejouer</button>
            </>
          )}
        </>
      ) : (
        <p>⏳ Chargement des questions...</p>
      )}
    </div>
  );
};

export default CalculMental;
