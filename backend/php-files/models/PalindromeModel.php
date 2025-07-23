<?php
class PalindromeModel{
    public function generateQuestion() {
        $a = "donnez un palyndrome";
    return $a;
    }
    public function verifyAnswer($clientAnswer) {
       return strval($clientAnswer) === strrev(strval($clientAnswer));
    }
}