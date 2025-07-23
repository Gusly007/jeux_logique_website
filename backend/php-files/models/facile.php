<?php
class MathDeBase {
    private $result;

    public function __construct() {
        $this->result = 0;
    }

    private function randomNumber($min, $max) {
        return rand($min, $max);
    }

    public function calculmenthal() {
        $operators = ['+', '-', '*', '/'];
        $operator = $operators[array_rand($operators)];
        $a = $this->randomNumber(1, 100);
        $b = $this->randomNumber(1, 100);

        return ["arg1" => $a, "arg2" => $b, "operator" => $operator];
    }

    private function evaluate($answer, $client) {
        $arg1 = $answer['arg1'];
        $arg2 = $answer['arg2'];
        $operator = $answer['operator'];
        $rightanswer = 0;

        switch ($operator) {
            case '+':
                $rightanswer = $arg1 + $arg2;
                break;
            case '-':
                $rightanswer = $arg1 - $arg2;
                break;
            case '*':
                $rightanswer = $arg1 * $arg2;
                break;
            case '/':
                if ($arg2 == 0) {
                    throw new Exception("Division par zéro impossible");
                }
                $rightanswer = $arg1 / $arg2;
                break;
            default:
                throw new Exception("Opérateur non valide");
        }

        return $client == $rightanswer;
    }

    public function play($client) {
        $answer = $this->calculmenthal();
        $arg1 = $answer['arg1'];
        $arg2 = $answer['arg2'];
        $operator = $answer['operator'];
        $result = $this->evaluate($answer, $client);
        $correctResult = eval("return $arg1 $operator $arg2;");

        if ($result) {
            return "Bravo, vous avez trouvé la bonne réponse";
        } else {
            return "Désolé, la bonne réponse était $arg1 $operator $arg2 = $correctResult";
        }
    }

    // 1. Test de primalité
    public function isPrime($n) {
        if ($n <= 1) return false;
        for ($i = 2; $i <= sqrt($n); $i++) {
            if ($n % $i == 0) return false;
        }
        return true;
    }

    // 2. Factorielle
    public function factorial($n) {
        if ($n < 0) return null;
        $result = 1;
        for ($i = 2; $i <= $n; $i++) {
            $result *= $i;
        }
        return $result;
    }

    // 3. Palindrome numérique
    public function isPalindrome($n) {
        return strval($n) === strrev(strval($n));
    }

    // 4. Somme des chiffres
    public function sumDigits($n) {
        return array_sum(str_split(strval(abs($n))));
    }

    // 5. Suite de Fibonacci
    public function fibonacci($n) {
        if ($n <= 0) return [];
        if ($n == 1) return [0];
        $fib = [0, 1];
        while (count($fib) < $n) {
            $fib[] = end($fib) + $fib[count($fib) - 2];
        }
        return $fib;
    }

    // 6. Deviner un nombre (jeu simple)
    public function guessNumber($guess, $secret = null) {
        $secret = $secret ?? $this->randomNumber(1, 100);
        if ($guess == $secret) {
            return "Correct !";
        } elseif ($guess < $secret) {
            return "Trop petit !";
        } else {
            return "Trop grand !";
        }
    }

    // 7. PGCD (algorithme d'Euclide)
    public function pgcd($a, $b) {
        while ($b != 0) {
            $temp = $b;
            $b = $a % $b;
            $a = $temp;
        }
        return abs($a);
    }

    // 8. PPCM
    public function ppcm($a, $b) {
        return abs($a * $b) / $this->pgcd($a, $b);
    }

    // 9. Tri à bulles
    public function bubbleSort($arr) {
        $n = count($arr);
        for ($i = 0; $i < $n - 1; $i++) {
            for ($j = 0; $j < $n - $i - 1; $j++) {
                if ($arr[$j] > $arr[$j + 1]) {
                    $temp = $arr[$j];
                    $arr[$j] = $arr[$j + 1];
                    $arr[$j + 1] = $temp;
                }
            }
        }
        return $arr;
    }

    // 10. Nombre parfait
    public function isPerfect($n) {
        $sum = 0;
        for ($i = 1; $i < $n; $i++) {
            if ($n % $i == 0) $sum += $i;
        }
        return $sum == $n;
    }

    // 11. Résolution d'équation linéaire ax + b = c
    public function solveLinearEquation($a, $b, $c) {
        if ($a == 0) {
            return $b == $c ? "Infinité de solutions" : "Aucune solution";
        }
        return ($c - $b) / $a;
    }
}
