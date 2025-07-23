<?php
class SuiteIncrementale {
    public function generateQuestion() {
        $start = rand(1, 5);
        $suite = [];
        $next = $start;
        for ($i = 1; $i <= 5; $i++) {
            $suite[] = $next;
            $next += 2 * $i + 1;
        }
        $expected = $next;
        return [
            "type" => "suite_incrementale",
            "suite" => implode(", ", $suite),
            "expected" => $expected
        ];
    }

    public function verifyAnswer($question, $clientAnswer) {
        return intval($clientAnswer) === intval($question['expected']);
    }
}
