<?php
$twitter = $jsonLangShare->twitter_text->texte;
$pinterest = $jsonLangShare->pinterest_text->texte;
$facebook = $jsonLangShare->facebook_text->texte;
$pinterest_image = $baseurl.'assets/imgs/share.jpg';
$appleUrl = $jsonLangGlobals->apple_store_url->texte;
$androidUrl = $jsonLangGlobals->google_play_url->texte;
?>
<!--HEADER-->
<h1>Lattissima Pro</h1>
<div class="qrcode_apple"></div><div class="qrcode_android"></div>
<header>
    <ul class="white">
        <li id="select_country" class="border flag"><a class="<?php echo '_'.$territory; ?> flags" href="#"></a><!--img src="<?php echo IMG_DIR;?>flags/<?php echo strtolower($code_country); ?>.png" alt="flag" /--></li>
        <?php if(isset($appleUrl) && $appleUrl != "" ){ ?>
        <li class="apple"><a target="_blank" href="<?php echo $appleUrl; ?>" class="qrcode appleapp"><div class="apple_sprit"></div></a></li>
         <?php };
         if(isset($androidUrl) && $androidUrl != ""){ ?>
         <li class="border android"><a target="_blank" href="<?php echo $androidUrl; ?>" class="qrcode androidapp"><div class="android_sprit"></div></a></li>
        <?php } ?>
        <li class="mail"><a class="mail_sprit" href="#"></a></li>
        <?php if(isset($pinterest) && $pinterest != "" ){ ?>
        <li class="pinterest">
            <div class="pinterest_sprit">
                <a target="_blank" class="share_pinterest" href="http://pinterest.com/pin/create/button/?description=<?php echo $pinterest;?>&url=<?php echo $baseShareUrl; ?>&media=<?php echo $pinterest_image;?>"></a>
            </div></li>
        <?php } ?>
        <?php if(isset($twitter) && $twitter != "" ){ ?>
        <li class="twitter">
            <div class="twitter_sprit">
                <a target="_blank" class="share_twitter" href="http://www.twitter.com/home?status=<?php echo urlencode($twitter);?>"></a>
            </div></li>
        <?php } ?>
        <?php if(isset($facebook) && $facebook != ""){ ?>
        <li class="border facebook">
            <div class="facebook_sprit">
                <a target="_blank" class="share_facebook" href="https://www.facebook.com/sharer.php?u=<?php echo $baseurl.'index.php?l='.$languagesite."_".$territory; ?>" ></a>
            </div></li>
        <?php } ?>
        <li class="fullscreen"><a class="fullscreen_sprit" href="#"></a></li>
        <li class="sound"><a class="sound_sprit" href="#"></a></li>
    </ul>
</header>