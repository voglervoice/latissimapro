<?php
$base = dirname($_SERVER['PHP_SELF']) . '/';
if($base == '//')
    $base = '/';

echo 'BASE : '.$base.'<br />';

$domainURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['SERVER_NAME'];

echo 'domainURL : '.$domainURL.'<br />';

// That version is better than just test modules are enabled via `apache_get_modules()` (see `.htaccess`)
$rewriteURL = isset($_SERVER['HTACCESS_REWRITE']) && $_SERVER['HTACCESS_REWRITE'] == 'on';
echo 'rewriteURL : '.$rewriteURL.'<br />';
$requestParts = explode('?', $_SERVER["REQUEST_URI"]);
$baseFullPath = array_shift($requestParts);
// Remove base
$fullPath = substr($baseFullPath, strlen($base));
echo 'fullPath : '.$fullPath.'<br />';
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

echo 'direct -----> '.$direct.'<br />';

// preview mode
$previewMode = isset($_GET['preview']);

echo 'previewMode ::  -----> '.$previewMode;

?>