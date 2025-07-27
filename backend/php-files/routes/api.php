<?php

// === Chargement des classes ===
require_once __DIR__ . '/../controllers/ContactController.php';
require_once __DIR__ . '/../controllers/RegisterController.php';
require_once __DIR__ . '/../controllers/LoginController.php';
require_once __DIR__ . '/../controllers/LogOutController.php';
require_once __DIR__ . '/../controllers/JeuxListeController.php';
require_once __DIR__ . '/../controllers/BibliographieController.php';
require_once __DIR__ . '/../controllers/MotManquantController.php';
require_once __DIR__ . '/../controllers/FactorielleController.php';
require_once __DIR__ . '/../controllers/CheckSessionController.php';




// === Instanciation des contrôleurs ===
$controllers = [
    'contact'       => new ContactController(),
    'register'      => new RegisterController(),
    'login'         => new LoginController(),
    'logout'        => new LogOutController(),
    'jeux'          => new JeuxController(),
    'bibliographie' => new BibliographieController(),
    'motmanquant'   => new MotManquantController(),
    'factorielle'   => new FactorielleController(),
    'checksession'  => new CheckSessionController(), 
];

// === Définition des routes ===
$routes = [
    'GET' => [
        '/api/fact'        => [$controllers['factorielle'], 'getQuestion'],
        '/api/jeux'            => [$controllers['jeux'], 'getJeux'],
        '/api/bibliographie'   => [$controllers['bibliographie'], 'getAll'],
        '/api/motmanquant'     => [$controllers['motmanquant'], 'getQuestions'],
        '/api/checksession'    => [$controllers['checksession'], 'checkSession'],
    ],
    'POST' => [
        '/api/contact'              => [$controllers['contact'], 'sendMessage'],
        '/api/factanswer'           => [$controllers['factorielle'], 'checkAnswer'],
        '/api/register'             => [$controllers['register'], 'register'],
        '/api/logout'               => [$controllers['logout'], 'logout'],
        '/api/login'                => [$controllers['login'], 'login'],
        '/api/motmanquantverify'    => [$controllers['motmanquant'], 'verifyAnswer'],
    ],
];

// === Gestion de la requête ===
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
error_log("URI demandée : $uri");

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (isset($routes[$method][$uri])) {
    call_user_func($routes[$method][$uri]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Route non trouvée je suis désolé."]);
}
// === Fin de la gestion des routes ===
