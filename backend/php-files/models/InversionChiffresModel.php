<?php
class InversionChiffres {
    public function generateQuestion() {
        $original = rand(10, 99);
        $inversé = intval(strrev((string)$original));
        $expected = abs($original - $inversé);
        return [
            "type" => "inversion_chiffres",
            "question" => "Quelle est la différence entre $original et son inverse ?",
            "expected" => $expected
        ];
    }

    public function verifyAnswer($question, $clientAnswer) {
        return intval($clientAnswer) === intval($question['expected']);
    }
}
