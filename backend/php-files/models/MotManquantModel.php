<?php

class MotManquantModel
{
    /**
     * @var array<int, array{phrase: string, mot: string}>
     */
    private array $phrases = [
        ["phrase" => "Le ciel est ___ aujourd'hui.", "mot" => "bleu"],
        ["phrase" => "Le chat ___ sur le canapé.", "mot" => "dort"],
        ["phrase" => "J'aime manger des ___ en été.", "mot" => "glaces"],
        ["phrase" => "Il faut ___ avant de traverser.", "mot" => "regarder"],
        ["phrase" => "Le soleil se ___ à l'horizon.", "mot" => "couche"],
        ["phrase" => "Il a oublié son ___ à la maison.", "mot" => "sac"],
        ["phrase" => "Nous partons en ___ demain.", "mot" => "vacances"],
        ["phrase" => "Elle lit un ___ passionnant.", "mot" => "livre"],
        ["phrase" => "Les oiseaux ___ le matin.", "mot" => "chantent"],
        ["phrase" => "Il faut bien ___ avant de parler.", "mot" => "réfléchir"],
    ];

    /**
     * Génère une question avec la phrase et le mot attendu.
     *
     * @return array{phrase: string, answer: string}
     */
    public function generateQuestion(): array
    {
        $q = $this->phrases[array_rand($this->phrases)];
        return [
            "phrase" => $q["phrase"],
        ];
    }

public function findAnswerByPhrase(string $phrase): ?string
{
    foreach ($this->phrases as $entry) {
        if (trim($entry['phrase']) === trim($phrase)) {
            return $entry['mot'];
        }
    }
    return null; // Si la phrase n'est pas trouvée
}

public function verifyAnswers(array $data): array
{
    $results = [];
    $score = 0;

    foreach ($data as $entry) {
        $phrase = $entry['question']['phrase'] ?? '';
        $userAnswer = strtolower(trim($entry['answer'] ?? ''));

        $expectedAnswer = strtolower(trim($this->findAnswerByPhrase($phrase)));

        $isCorrect = $expectedAnswer !== null && $userAnswer === $expectedAnswer;

        if ($isCorrect) {
            $score++;
        }

        $results[] = [
            'question' => $phrase,
            'answer' => $userAnswer,
            'expected' => $expectedAnswer,
            'correct' => $isCorrect
        ];
    }

    return [
        'score' => $score,
        'total' => count($results),
        'results' => $results
    ];
}
}
