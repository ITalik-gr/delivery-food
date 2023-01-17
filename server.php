<?php

$_POST = json_decode( file_get_contents("php://input"), true ); // якщо json формат треба юзать в пхп
echo var_dump($_POST);

// перевірка
