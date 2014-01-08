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
        <link rel="stylesheet" href="assets/css/main.css">

    </head>
    <body>
        <script data-main="assets/js/main" src="assets/js/vendors/require.min.js"></script>
        
        <div class="content">
            <?php include('php/views/blocks/header.php'); ?>
            <?php include('php/views/blocks/footer.php'); ?>
            
            <div class="preloader"></div>
            <a href="#"><span><?php echo $jsonLangGlobals->scroll_to_explore->texte; ?></span><div></div></a>
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
        </div>
    </body>
</html>