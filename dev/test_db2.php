<?php
$territory = NULL;
$languagesite = NULL;

//get it with Geoloc by IP (if it exist)
if(file_exists('../lib/geoloc.class.php')){
    include_once('../lib/geoloc.class.php');
    $geoloc = new NesGeoLoc();
    $territory = $geoloc->getCountryCode();
}else{
    $territory = NULL;
    $languagesite = NULL;
}

echo '<br /> country from geoloc class : '.$territory.'<br />';

$territory = "FR";
$languagesite = "fr";

echo '<br /> lang : '.$languagesite;
echo '<br /> country : '.$territory.'<br />';

// Check if it's available and published in DB
if(file_exists('admin/loc/includes/db_connect.php')){
    include_once('admin/loc/includes/db_connect.php');


    // If language is not defined, get default language
    if(empty($languagesite)){
        $query = 'SELECT code, RSID, launching FROM loc_langues INNER JOIN cms ON cms.code_pays = SUBSTRING_INDEX(loc_langues.code,\'_\',-1) WHERE SUBSTRING_INDEX(code,\'_\',-1) LIKE :territory AND native = 1';
        $data = $pdo->prepare($query);
        $data->bindParam(':territory', $territory, PDO::PARAM_STR);
    }else{
        $query = 'SELECT code, RSID, launching FROM loc_langues INNER JOIN cms ON cms.code_pays = SUBSTRING_INDEX(loc_langues.code,\'_\',-1) WHERE code = CONCAT(:language, \'_\', :territory)';
        $data = $pdo->prepare($query);
        $data->bindParam(':territory', $territory, PDO::PARAM_STR);
        $data->bindParam(':language', $languagesite, PDO::PARAM_STR);
    }

    echo "<br /> data execute() ? ::::::: ";
    var_dump($data->execute());
    echo "<br /> fetch PDO::FETCH_OBJ ? :::::  ";
    var_dump(($row = $data->fetch(PDO::FETCH_OBJ)));

    // If query is executed, we get a result and the pub date is before now (only if not preview mode)
    if($data->execute() && ($row = $data->fetch(PDO::FETCH_OBJ)) !== false && (strtotime($row->launching) <= time() || $previewMode)){
        list($languagesite, $territory) = explode('_', $row->code, 2);
        //echo "<br />LIST LANGUAGE - TERRITORY ? >>> --- ".var_dump($row->code);
    }else{
        $territory = NULL;
        $languagesite = NULL;
    }
}elseif(empty($territory) || empty($languagesite)){//special case for local
    $territory = 'XX';
    $languagesite = 'en';
}

echo '<br /><br /> ----------------- Finally we have : ';
echo '<br /> country : '.$territory;
echo '<br /> lang : '.$languagesite;

?>