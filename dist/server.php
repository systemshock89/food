<?php
// Нативно php не умеет работать с json
// получаем json данные для работы с ними
$_POST = json_decode(file_get_contents("php://input"), true);
// если надо работать с FormData, то строку выше закомментировать

echo var_dump($_POST);
