<?php

$base = dirname($_SERVER['PHP_SELF']) . '/';
if($base == '//')
    $base = '/';

$domainURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['SERVER_NAME'];

// That version is better than just test modules are enabled via `apache_get_modules()` (see `.htaccess`)
$rewriteURL = isset($_SERVER['HTACCESS_REWRITE']) && $_SERVER['HTACCESS_REWRITE'] == 'on';
$requestParts = explode('?', $_SERVER["REQUEST_URI"]);
$baseFullPath = array_shift($requestParts);
// Remove base
$fullPath = substr($baseFullPath, strlen($base));
$pathSlices = explode('/', $fullPath, 2);
$direct = "";
//echo var_dump($pathSlices);
if(count($pathSlices) > 0){
    //echo "LANG : ".$pathSlices[0];
    $country      = explode("_", $pathSlices[0]);
    $language   = $country[0];
    $territory    = $country[1];
    if(count($pathSlices) > 1){
        //echo "DIRECT -> : ".$pathSlices[1];
        $direct = $pathSlices[1];
    }
}

// preview mode
$previewMode = isset($_GET['preview']);

$prod = false;
if(strpos($_SERVER['SERVER_NAME'], 'nespresso') !== false) $prod = true;

//If territory is not defined
if(empty($territory)){
    //get it with Geoloc by IP (if it exist)
    if(file_exists('../lib/geoloc.class.php')){
        include_once('../lib/geoloc.class.php');
        $geo = new NesGeoLoc();
        $territory = $geo­>getCountryCode();
    }else{
        $territory = null;
        $language = null;
    }
}

// Handle special cases
if(strtoupper($territory) == 'LU'){
    $territory = 'BE';
}else if(strtoupper($territory) == 'GB'){
    $territory = 'UK';
}

if(file_exists('admin/loc/includes/db_connect.php')){
        include_once('admin/loc/includes/db_connect.php');
        // If language is not defined, get default language
        if(empty($language)){
            $query = 'SELECT code, RSID, launching FROM loc_langues INNER JOIN cms ON cms.code_pays = SUBSTRING_INDEX(loc_langues.code,\'_\',­1) WHERE SUBSTRING_INDEX(code,\'_\',­1) LIKE :territory AND native = 1';
        }else{
            $query = 'SELECT code, RSID, launching FROM loc_langues INNER JOIN cms ON cms.code_pays = SUBSTRING_INDEX(loc_langues.code,\'_\',­1) WHERE code = CONCAT(:language, \'_\', :territory)';
        }
        //RSID == ApplicationContext­>getCountryTrackingCode()
        $data = $pdo­>prepare($query);
        $data­>bindParam(':language', $language);
        $data­>bindParam(':territory', $territory);
        if($data­>execute() && ($row = $data­>fetch(PDO::FETCH_OBJ)) !== false && (strtotime($row­>launching) <= time() || $previewMode)){
            list($language, $territory) = explode('_', $row­>code, 2);
        }else{
            $territory = null;
            $language = null;
        }
}elseif(empty($territory) || empty($language)){
    //special case for local
    $territory = 'XX';
    $language = 'en';
}

// REDIRECTIONS -- ??
require_once("php/class/Mobile_Detect.php");
$detectMobile   =   new Mobile_Detect();
if ( $detectMobile->isMobile() || $detectMobile->isTablet() ) {
    // TODO : good urls
    $redirection = 'http://www.nespresso.com/lattisima_pro_mobile/';
    header('HTTP/1.0 308 Permanent Redirect');
    header('Location: ' . $redirection);
    exit();
}

if(empty($territory) || empty($language)){
    $redirection = 'http://www.nespresso.com/worldofcoffee/';
    header('HTTP/1.0 308 Permanent Redirect');
    header('Location: ' . $redirection);
    exit();
}

// **************************************** init ******************************************
$folder = "lattissima-pro/";
if($_SERVER['HTTP_HOST'] == "latissimapro.dev:8080") $folder = "";
$baseurl = 'http://'.$_SERVER['HTTP_HOST'].'/'.$folder;
$baseurlang = $baseurl.$language."_".$territory."/";
$baseShareUrl = $baseurlang;
// JSON LANG
$dirname    =   $_SERVER['DOCUMENT_ROOT']."/".$folder;

$jsonFile = $dirname.'assets/datas/'.$language.'_'.$territory.'.json';
if (file_exists($jsonFile))         $jsoncontent = file_get_contents($jsonFile);
else                                        $jsoncontent = file_get_contents($dirname.'assets/datas/en_XX.json');

// datas
$jsonLang = json_decode($jsoncontent)->data->sections;
// datas - shortcuts
$jsonLangGlobals = $jsonLang->global__utils->blockText;
$jsonLangShare = $jsonLang->global__facebook_twitter->blockText;
$jsonLangFooter = $jsonLang->global__footer->blockText;
?>