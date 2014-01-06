<?php
//If territory is not defined
if(empty($territory)){
//get it with Geoloc by IP (if it exist)
if(file_exists('../lib/geoloc.class.php')){ include_once('../lib/geoloc.class.php'); $geo = new NesGeoLoc();
$territory = $geo­>getCountryCode();
}else{
    $territory = null;
    $language = null;
} }
// Handle special cases
if(strtoupper($territory) == 'LU'){ $territory = 'BE';
}else if(strtoupper($territory) == 'GB'){ $territory = 'UK';}
// preview mode
$previewMode = isset($_GET['preview']);

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

if(empty($territory) || empty($language)){
$redirection = 'http://www.nespresso.com/worldofcoffee/'; header('HTTP/1.0 308 Permanent Redirect'); header('Location: ' . $redirection);
exit();
}

$baseurl = 'http://'.$_SERVER['HTTP_HOST'].'/';
$baseurlang = $baseurl.$territory."_".$language."/";
?><!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Lattissima Pro</title>

        <meta name="description" content="TODO">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="assets/imgs/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/imgs/favicon.ico" type="image/x-icon">

        <!-- Shares -->
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Lattissima Pro"/>
        <meta property="og:url" content="<?php echo $baseurl; ?>"/>
        <meta property="og:image" content="assets/imgs/share.jpg"/>
        <meta property="og:description" content=""/>

        <!-- Css -->
        <link rel="stylesheet" href="assets/css/main.css">

    </head>
    <body>
        <script data-main="assets/js/main" src="assets/js/vendors/require.min.js"></script>

        <h1>Lattissima Pro</h1>
        <header></header>
        <a href="#">order Lattissima</a>
        <footer>
            <a href="#">order</a>
            <a href="#">Nespresso</a>
            <ul>
                <li><a href="#">contact</a></li>
                <li><a href="#">legal notice</a></li>
                <li><a href="#">store locator</a></li>
            </ul>
        </footer>
        <div class="preloader"></div>
        <a href="#"><span>Scroll to explore</span><div></div></a>
        <nav>
            <ul>
                <li><a href="<?php echo $baseurlang; ?>home" data-link="home">Home</a></li>
                <li><a href="<?php echo $baseurlang; ?>onetouch" data-link="onetouch">One touch is all</a></li>
                <li><a href="<?php echo $baseurlang; ?>palette" data-link="palette">A palette of tastes</a></li>
                <li><a href="<?php echo $baseurlang; ?>milk" data-link="milk">Milk to your taste</a></li>
                <li><a href="<?php echo $baseurlang; ?>powerful" data-link="powerful">Powerful inside & out</a></li>
            </ul>
        </nav>
        <div class="main">
            <section id="home">
                <a href="#">One touch is all</a>
                <a href="#">Powerful inside and out</a>
                <a href="#">Milk to your taste</a>
                <a href="#">Palette of tastes</a>
            </section>
            <section id="onetouch">
                
            </section>
        </div>
    </body>
</html>