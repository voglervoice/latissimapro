<?php
$twitter = $jsonLangShare->twitter_text->texte;
$pinterest = $jsonLangShare->pinterest_text->texte;
$facebook = $jsonLangShare->facebook_text->texte;
$pinterest_image = "";
$apple_store_url = (isset($jsonLangGlobals->apple_store_url->texte))? $jsonLangGlobals->apple_store_url->texte : "";
$google_play_url = (isset($jsonLangGlobals->google_play_url->texte))? $jsonLangGlobals->google_play_url->texte : "";
?>
<!--HEADER-->
<h1>Lattissima Pro</h1>
<header>
    <ul class="white">
        <li id="select_country" class="border flag"><a class="<?php echo '_'.$territory; ?> flags" href="#"></a><!--img src="<?php echo IMG_DIR;?>flags/<?php echo strtolower($code_country); ?>.png" alt="flag" /--></li>
        <li class="apple"><a target="_blank" href="<?php echo $apple_store_url; ?>"><div class="apple_sprit"></div></a></li>
        <li class="border android"><a target="_blank" href="<?php echo $google_play_url; ?>"><div class="android_sprit"></div></a></li>
        <li class="mail"><a class="mail_sprit" href="#"></a></li>
        <?php if(isset($pinterest) && $pinterest != "" ){ ?>
        <li class="pinterest"><div class="pinterest_sprit"><a target="_blank"href="http://pinterest.com/pin/create/button/?description=<?php echo $pinterest;?>&url=<?php echo $baseShareUrl; ?>&media=<?php echo $pinterest_image;?>"></a></div></li>
        <?php } ?>
        <?php if(isset($twitter) && $twitter != "" ){ ?>
        <li class="twitter"><div class="twitter_sprit"><a target="_blank" href="http://www.twitter.com/home?status=<?php echo urlencode($twitter);?>"></a></div></li>
        <?php } ?>
        <?php if(isset($facebook) && $facebook != ""){ ?>
        <li class="border facebook"><div class="facebook_sprit"><a target="_blank" name="fb_share" type="button" href="https://www.facebook.com/sharer.php?u=<?php echo $baseShareUrl; ?>" ></a></div></li>
        <?php } ?>
        <li class="sound"><a class="sound_sprit" href="#"></a></li>
        <li class="fullscreen"><a class="fullscreen_sprit" href="#"></a></li>
    </ul>
</header>