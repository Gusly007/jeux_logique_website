import React, { useEffect, useState } from 'react';

type SuiteQuestion = {
  type: string;
  suite: string;
  expected: number;
};

type ResponseItem = {
  question: {
    suite: string;
    expected: number;
  };
  reponse: number;
};

type VerificationResult = {
  question: string;
  given: number;
  expected: number;
  correct: boolean;
};

const SuiteIncrementale: React.FC = () => {
  const [questions, setQuestions] = useState<SuiteQuestion[]>([]);
  const [reponses, setReponses] = useState<string[]>([]);
  const [resultats, setResultats] = useState<VerificationResult[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('http://localhost:8085/api/suite');
      const data = await res.json();
      setQuestions(data);
      setReponses(new Array(data.length).fill(''));
      setResultats(null);
      setScore(null);
    } catch (error) {
      console.error('Erreur chargement des suites :', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (index: number, value: string) => {
    const updated = [...reponses];
    updated[index] = value;
    setReponses(updated);
  };

  const verifier = async () => {
    setIsWaiting(true);

    const payload: ResponseItem[] = questions.map((q, i) => ({
      question: {
        suite: q.suite,
        expected: q.expected,
      },
      reponse: parseInt(reponses[i], 10) || 0,
    }));

    try {
      const res = await fetch('http://localhost:8085/api/suiteincrementaleverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResultats(data.details);
      setScore(data.score);
    } catch (error) {
      console.error('Erreur vérification :', error);
    }

    setIsWaiting(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧩 Suite Incrémentale</h2>

      {questions.length > 0 ? (
        <>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: '1em' }}>
              <p>
                <strong>Suite {i + 1} :</strong> {q.suite}, <em>?</em>
              </p>
              <input
                type="number"
                value={reponses[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={!!resultats}
              />
              {resultats && resultats[i] && (
                <p style={{ fontWeight: 'bold', color: resultats[i].correct ? 'green' : 'red' }}>
                  {resultats[i].correct
                    ? '✅ Bonne réponse'
                    : `❌ Faux (attendu : ${resultats[i].expected})`}
                </p>
              )}
            </div>
          ))}

         {resultats ? (
  <>
    {resultats.map((r, i) => (
      <div key={i} style={{ marginBottom: '1em' }}>
        <p><strong>Suite :</strong> {r.question}, ?</p>
        <p style={{ fontWeight: 'bold', color: r.correct ? 'green' : 'red' }}>
          {r.correct
            ? '✅ Bonne réponse'
            : `❌ Faux (attendu : ${r.expected}, vous avez mis ${r.given})`}
        </p>
      </div>
    ))}
    <h3>🎯 Score : {score} / {resultats.length}</h3>
    <button onClick={fetchQuestions}>🔁 Rejouer</button>
  </>
) : (
  <button onClick={verifier} disabled={isWaiting}>Vérifier</button>
)}

        </>
      ) : (
        <p>Chargement des suites...</p>
      )}
    </div>
  );
};

export default SuiteIncrementale;
