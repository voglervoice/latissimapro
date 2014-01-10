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
        
        <div class="preloader"></div>
        <div class="content">
            <?php include('php/views/blocks/header.php'); ?>
            <?php include('php/views/blocks/footer.php'); ?>
            <?php include('php/views/blocks/menu.php'); ?>

            <div class="main">
                <?php include('php/views/pages/home.php'); ?>
                <?php include('php/views/pages/touchscreen.php'); ?>
                <?php include('php/views/pages/coffeerange.php'); ?>
                <?php include('php/views/pages/milksystem.php'); ?>
                <?php include('php/views/pages/design.php'); ?>
            </div>
        </div>
    </body>
</html>