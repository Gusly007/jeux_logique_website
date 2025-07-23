<?php
class AnagrammeModel {
    private $mots = ["chien", "porte", "livre", "pomme", "voiture"];

    public function generateQuestion() {
        $mot = $this->mots[array_rand($this->mots)];
        $anagramme = str_shuffle($mot);
        return ["anagramme" => $anagramme, "mot" => $mot];
    }

    public function verifyAnswer($clientAnswer, $question) {
        return strtolower(trim($clientAnswer)) === $question["mot"];
    }
}
