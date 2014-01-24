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
$langDefined = 0;
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
    if(!empty($territory)) $langDefined = 1;
}

// preview mode
$previewMode = isset($_GET['preview']);

$prodMode = false;
if(strpos($_SERVER['SERVER_NAME'], 'nespresso') !== false) $prodMode = true;

if(empty($territory)){
    //get it with Geoloc by IP (if it exist)
    if(file_exists('../lib/geoloc.class.php')){
        include_once('../lib/geoloc.class.php');
        $geoloc = new NesGeoLoc();
        $territory = $geoloc->getCountryCode();
    }else if(file_exists('php/class/geoloc.class.php')){
        include_once('php/class/geoloc.class.php');
        $geogeo = new NesGeoLoc();
        $territory = $geogeo->getCountryCode();
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

// Check if it's available and published in DB
if(file_exists('admin/loc/includes/db_connect.php')){
    include_once('admin/loc/includes/db_connect.php');

    // If language is not defined, get default language
    if(empty($language)){
        $query = 'SELECT code, RSID, launching FROM loc_langues INNER JOIN cms ON cms.code_pays = SUBSTRING_INDEX(loc_langues.code,\'_\',-1) WHERE SUBSTRING_INDEX(code,\'_\',-1) LIKE :territory AND native = 1';
    }else{
        $query = 'SELECT code, RSID, launching FROM loc_langues INNER JOIN cms ON cms.code_pays = SUBSTRING_INDEX(loc_langues.code,\'_\',-1) WHERE code = CONCAT(:language, \'_\', :territory)';
    }

    $data = $pdo->prepare($query);
    $data->bindParam(':language', $language);
    $data->bindParam(':territory', $territory);

    // If query is executed, we get a result and the pub date is before now (only if not preview mode)
    if($data->execute() && ($row = $data->fetch(PDO::FETCH_OBJ)) !== false && (strtotime($row->launching) <= time() || $previewMode)){
        list($language, $territory) = explode('_', $row->code, 2);
    }else{
        $territory = null;
        $language = null;
    }
}elseif(empty($territory) || empty($language)){//special case for local
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
// JSON LANG ::
$dirname    =   $_SERVER['DOCUMENT_ROOT']."/".$folder;
$jsonFolderPath = $dirname.'json/';

$jsonFile = $jsonFolderPath.$language.'_'.$territory.'.json';
$jsonCmsFile = $jsonFolderPath.'_cms_'.$territory.'.json';
if (file_exists($jsonFile))         $jsoncontent = file_get_contents($jsonFile);
else                                        $jsoncontent = file_get_contents($jsonFolderPath.'en_XX.json');
if (file_exists($jsonCmsFile))  $jsonCmsContent = file_get_contents($jsonCmsFile);
else                                        $jsonCmsContent = file_get_contents($jsonFolderPath.'_cms_XX.json');
// datas
$jsonLang = json_decode($jsoncontent)->data->sections;
$jsonCms = json_decode($jsonCmsContent);
// datas - shortcuts
$jsonLangGlobals = $jsonLang->global__utils->blockText;
$jsonLangShare = $jsonLang->global__facebook_twitter->blockText;
$jsonLangFooter = $jsonLang->global__footer->blockText;
$jsonLangMail = $jsonLang->global__mail->blockText;
$jsonLangMenu = $jsonLang->navigation_menu->blockText;
$jsonLangRangeGlobals = $jsonLang->range__global->blockText;
$jsonLangRangeCapsules = $jsonLang->range__grand_cru->blockText;
$jsonLangMilk = $jsonLang->milk->blockText;
$jsonLangDesign = $jsonLang->{'powerful_inside_&_out'}->blockText;
$jsonLangTouch = $jsonLang->one_touch_is_all->blockText;
$jsonLangHomePromo = $jsonLang->spring_activation->blockText;

// JSON COUNTRIES ::
$jsonCountriesContent = file_get_contents($jsonFolderPath.'countries.json');
$jsonCountries = json_decode($jsonCountriesContent);

// test date from json
$now = new DateTime("now");
$launchingDate = date_create($jsonCountries->launching);
if($launchingDate > $now && !$previewMode){
    $redirection = 'http://www.nespresso.com/worldofcoffee/';
    header('HTTP/1.0 308 Permanent Redirect');
    header('Location: ' . $redirection);
    exit();
}

// JSON CAPSULES ::
$jsonCapsulesContent = file_get_contents($jsonFolderPath.'capsules.json');
$jsonCapsulesList = json_decode($jsonCapsulesContent)->capsules;

?>