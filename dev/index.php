<?php include_once('php/config.php'); ?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Lattissima Pro</title>
        <base href="<?php echo $baseurl; ?>">

        <meta name="description" content="TODO">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="assets/imgs/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/imgs/favicon.ico" type="image/x-icon">

        <!-- Shares -->
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="<?php echo $jsonLangShare->facebook_title->texte; ?>"/>
        <meta property="og:url" content="<?php echo $baseurl; ?>"/>
        <meta property="og:image" content="assets/imgs/share.jpg"/>
        <meta property="og:description" content="<?php echo $jsonLangShare->facebook_text->texte; ?>"/>

        <!-- Css -->
        <link rel="stylesheet" href="<?php echo $baseurl; ?>assets/css/main.css">

    </head>
    <body
    data-prodmode="<?php echo (!$prodMode)?'0':'1'; ?>"
    data-url="<?php echo $baseurlang; ?>"
    data-baseurl="<?php echo $baseurl; ?>"
    data-direct="<?php echo $direct; ?>"
    data-lang="<?php echo $languagesite; ?>"
    data-country="<?php echo $territory; ?>"
    data-lang-defined="<?php echo $langDefined; ?>"
        >
        <script data-main="<?php echo $baseurl; ?>assets/js/main" src="<?php echo $baseurl; ?>assets/js/vendors/require.min.js"></script>
        <div class="container">
            <div class="nespresso_logo"></div>
            <div class="preloader">
                <div class="logo_preload"></div>
                <a class="machine_preload" href="<?php echo $jsonLangFooter->order_online_shop_link->texte; ?>" target="_blank">
                    <img src="assets/imgs/intro_machine_btn.png" />
                    <span><?php echo $jsonLangGlobals->order->texte; ?></span>
                </a>
                <span class="loader_pct">00<sup>%</sup></span>
            </div>
            <div class="content">
                <?php include('php/views/blocks/header.php'); ?>
                <?php include('php/views/blocks/footer.php'); ?>
                <?php include('php/views/blocks/menu.php'); ?>
                <?php include('php/views/blocks/popins.php'); ?>

                <div class="main">
                    <?php include('php/views/pages/home.php'); ?>
                    <?php include('php/views/pages/touchscreen.php'); ?>
                    <?php include('php/views/pages/coffeerange.php'); ?>
                    <?php include('php/views/pages/milksystem.php'); ?>
                    <?php include('php/views/pages/design.php'); ?>
                </div>
            </div>
        </div>
<script language="JavaScript" type="text/javascript">var s_account="nesp-preprod";</script>
<script language="JavaScript" type="text/javascript" src="s_code.js"></script>
<script language="JavaScript" type="text/javascript"><!--var s_code=s.t();if(s_code)document.write(s_code)//--></script>
        <script language="JavaScript" type="text/javascript"><!--
            if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
            //--></script><noscript><a href="http://www.omniture.com" title="Web Analytics"><img
src="http://metrics.nespresso.com/b/ss/nesp-prod/1/H.21--NS/0"
height="1" width="1" border="0" alt="" /></a></noscript><!--/DO NOT REMOVE/-->
        <!-- End SiteCatalyst code version: H.21. -->
    </body>
</html>