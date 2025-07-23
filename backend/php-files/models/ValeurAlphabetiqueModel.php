<?php
class ValeurAlphabetique {
    public function generateQuestion() {
        $lettres = range('A', 'Z');
        $l1 = $lettres[rand(0, 25)];
        $l2 = $lettres[rand(0, 25)];
        $expected = ord($l1) - 64 + ord($l2) - 64; // A=1
        return [
            "type" => "valeur_alphabetique",
            "question" => "$l1 + $l2",
            "expected" => $expected
        ];
    }

    public function verifyAnswer($question, $clientAnswer) {
        return intval($clientAnswer) === intval($question['expected']);
    }
}
