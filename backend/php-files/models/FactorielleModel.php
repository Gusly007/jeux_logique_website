<?php

class FactorielleModel
{
    public function __construct() {
       
    }
 public function generateQuestion() {
    $n = rand(1, 5); 
    return [
        "question" => "$n!",
    ];
}

public function factorielle($n) {
    return ($n <= 1) ? 1 : $n * $this->factorielle($n - 1);
}


}
