<?php include_once('php/config.php'); ?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie ie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie ie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie ie" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js ie9 ie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Lattissima Pro</title>
        <base href="<?php echo $baseurl; ?>">
        
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="TODO">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="assets/imgs/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/imgs/favicon.ico" type="image/x-icon">

        <!-- Shares -->
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="<?php echo $jsonLangShare->facebook_title->texte; ?>"/>
        <meta property="og:url" content="<?php echo $baseurl.'index.php?l='.$languagesite."_".$territory; ?>"/>
        <meta property="og:image" content="<?php echo $baseurl; ?>assets/imgs/share.jpg"/>
        <meta property="og:description" content="<?php echo $jsonLangShare->facebook_text->texte; ?>"/>
		<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<script src="assets/js/vendors/history.html4.js"></script>
	<script src="assets/js/vendors/json2.js"></script>
	<![endif]-->
	<!--[if IE 9]>    <script src="assets/js/vendors/history.html4.js"></script> <![endif]-->
		
        <!-- Css -->
        <link rel="stylesheet" href="<?php echo $baseurl; ?>assets/css/main.css">
        <?php
        if($arialVersion){ ?>
        <style type="text/css">
        a{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        h2{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .touch_description_n {font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .milk_description_n {font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .range_content .range_description_n {font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .design_content .design_description_n {font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .content_span_text {font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .content_span_text_smaller {font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .home_anchors a span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        nav ul li a span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        footer ul li a{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .milk_content .visual_fig span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif; font-weight: bold; }
        .order_footer_btn span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif; font-weight: bold; padding-top: 2px;}
        .preloader .machine_preload span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif; font-weight: bold;}
        .range_content .range_coffees .range_cat .range_cat_title span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .design_content .design_content_infos .design_content_infos_col h3{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .design_content .design_content_infos .design_content_infos_col ul li{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .design_content .design_footer a{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .popins .popin h4{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .popins .share_mail span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .popins .share_mail form span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .popins .share_mail form input[type=submit]{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .touchscreen_cta span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .touchscreen_rolls .touchscreen_roll .touchscreen_roll_inner span{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .range_rolls .range_roll .range_roll_arom{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .range_rolls .range_roll .range_roll_milk{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .range_rolls .range_roll .range_roll_intensity{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .range_rolls .range_roll .range_roll_title{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .home_promotion a .home_promotion_date{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .home_promotion a .home_promotion_price_currency{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .home_promotion a .home_promotion_receive{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .home_promotion a .home_promotion_cta{font-family: 'Arial Unicode', Arial, Helvetica, sans-serif;}
        .range_content .range_coffees .range_cat .range_cat_caps a span{font-weight: lighter;}
        </style>
        <?php } ?>
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
                <?php if($jsonLangFooter->order->texte != ""){ ?>
                <a class="machine_preload" href="<?php echo $jsonLangFooter->order_online_shop_link->texte; ?>" target="_blank">
                    <img src="assets/imgs/intro_machine_btn.png" />
                    <span><?php echo $jsonLangGlobals->order->texte; ?></span>
                </a>
                <?php } ?>
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
<script language="JavaScript" type="text/javascript">var s_account="<?php echo $s_account; ?>";</script>
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