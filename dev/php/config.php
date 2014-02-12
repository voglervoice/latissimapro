<?php
$territory = NULL;
$languagesite = NULL;

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
    $languagesite   = $country[0];
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
$staging = false;
if(strpos($_SERVER['SERVER_NAME'], 'nespresso') !== false) $prodMode = true;
if(strpos($_SERVER['SERVER_NAME'], 'staging.nespresso') !== false) $staging = true;

if(empty($territory)){
    //get it with Geoloc by IP (if it exist)
    if(file_exists('../lib/geoloc.class.php')){
        include_once('../lib/geoloc.class.php');
        $geoloc = new NesGeoLoc();
        $territory = $geoloc->getCountryCode();
    }else{
        $territory = NULL;
        $languagesite = NULL;
    }
}

// Handle special cases
/*
if(strtoupper($territory) == 'LU'){
    $territory = 'BE';
}else if(strtoupper($territory) == 'GB'){
    $territory = 'UK';
}
*/
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
    
    //echo "<br /> data execute() ? ";
    //var_dump($data->execute());

    // If query is executed, we get a result and the pub date is before now (only if not preview mode)
    if($data->execute() && ($row = $data->fetch(PDO::FETCH_OBJ)) !== false && (strtotime($row->launching) <= time() || $previewMode || $staging)){
    //if($data->execute() && ($row = $data->fetch(PDO::FETCH_OBJ)) !== false){
        list($languagesite, $territory) = explode('_', $row->code, 2);
    }elseif($langDefined == 0 || !$staging){
        $territory = NULL;
        $languagesite = NULL;
    }
}elseif(empty($territory) || empty($languagesite)){//special case for local
    $territory = 'XX';
    $languagesite = 'en';
}



// REDIRECTIONS -- ??
require_once("php/class/Mobile_Detect.php");
$detectMobile   =   new Mobile_Detect();
if ( $detectMobile->isMobile() || $detectMobile->isTablet() ) {
    // TODO : good urls
    $redirection = 'http://www.nespresso.com/lattisima_pro_mobile/';
    //header('HTTP/1.0 308 Permanent Redirect');
    header('Location: ' . $redirection);
    exit();
}

//echo "<br /> ".$territory.' ///// '.$languagesite;

if((empty($territory) || empty($languagesite)) && !$staging){
    $redirection = 'http://www.nespresso.com/worldofcoffee/';
    //header('HTTP/1.0 308 Permanent Redirect');
    header('Location: ' . $redirection);
    exit();
}

// **************************************** init ******************************************
$folder = "lattissima-pro/";
if($_SERVER['HTTP_HOST'] == "latissimapro.dev:8080") $folder = "";
$baseurl = 'http://'.$_SERVER['HTTP_HOST'].'/'.$folder;
$baseurlang = $baseurl.$languagesite."_".$territory."/";
$baseShareUrl = $baseurlang;
// JSON LANG ::
$dirname    =   $_SERVER['DOCUMENT_ROOT']."/".$folder;
$jsonFolderPath = $dirname.'json/';

$jsonFile = $jsonFolderPath.$languagesite.'_'.$territory.'.json';
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
$jsonLangDesign = $jsonLang->{'powerful_inside_and_out'}->blockText;
$jsonLangTouch = $jsonLang->one_touch_is_all->blockText;
$jsonLangHomePromo = $jsonLang->spring_activation->blockText;

// JSON COUNTRIES ::
$jsonCountriesContent = file_get_contents($jsonFolderPath.'countries.json');
$jsonCountries = json_decode($jsonCountriesContent);

// test date from json
/*$now = new DateTime("now");
$launchingDate = date_create($jsonCountries->launching);
if($launchingDate > $now && !$previewMode){
    $redirection = 'http://www.nespresso.com/worldofcoffee/';
    header('HTTP/1.0 308 Permanent Redirect');
    header('Location: ' . $redirection);
    exit();
}*/

// JSON CAPSULES ::
if (file_exists($dirname.'admin/cms/capsules.json'))
    $jsonCapsulesContent = file_get_contents($dirname.'admin/cms/capsules.json');
else 
    $jsonCapsulesContent = file_get_contents($jsonFolderPath.'capsules.json');
$jsonCapsulesList = json_decode($jsonCapsulesContent)->capsules;

// italic
function proccedText($string){
    $pattern1 = '/\b(nespresso)\b/i';
    $string = preg_replace($pattern1, '<i>$0</i>', $string);

    $pattern2 = '/\b(lattissima pro)\b/i';
    $string = preg_replace($pattern2, '<i>$0</i>', $string);

    $pattern3 = '/\b(de colombia)\b/i';
    $string = preg_replace($pattern3, '<i>$0</i>', $string);

    $pattern4 = '/\b(from india)\b/i';
    $string = preg_replace($pattern4, '<i>$0</i>', $string);

    $pattern5 = '/\b(do brasil)\b/i';
    $string = preg_replace($pattern5, '<i>$0</i>', $string);

    $pattern6 = '/\b(ka ethiopia)\b/i';
    $string = preg_replace($pattern6, '<i>$0</i>', $string);

    return $string;
}

?>