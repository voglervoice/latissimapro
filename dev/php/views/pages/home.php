<section id="home">
	<div class="home_promotion" data-on="<?php echo $jsonCms->promocoupon1; ?>">
		<a href="<?php echo $jsonLangHomePromo->url->texte; ?>" target="_blank">
			<span class="home_promotion_receive"><?php echo $jsonLangHomePromo->receive->texte; ?></span>
			<div class="home_promotion_price">
				<span class="home_promotion_price_value"><?php echo $jsonLangHomePromo->price->texte ?></span>
			</div>
			<span class="home_promotion_price_currency"><?php echo $jsonLangHomePromo->currency->texte; ?></span>
			<span class="home_promotion_date"><?php echo $jsonLangHomePromo->range_date->texte; ?></span>
			<span class="home_promotion_cta"><?php echo $jsonLangHomePromo->cta->texte; ?></span>
		</a>
		<div class="home_promotion_border"></div>
	</div>
	<div class="home_anchors">
		<a href="<?php echo $baseurlang; ?>touchscreen" data-centerx="-51" data-centery="-259" data-link="touchscreen">
			<span class="home_anchors_off"><?php echo $jsonLang->one_touch_is_all->blockText->title->texte; ?></span>
			<span class="home_anchors_roll"><?php echo $jsonLang->one_touch_is_all->blockText->title->texte; ?></span>
		</a>
		<a href="<?php echo $baseurlang; ?>design" data-centerx="-125" data-centery="-75" data-link="design">
			<span class="home_anchors_off"><?php echo $jsonLang->{'powerful_inside_and_out'}->blockText->title->texte; ?></span>
			<span class="home_anchors_roll"><?php echo $jsonLang->{'powerful_inside_and_out'}->blockText->title->texte; ?></span>
		</a>
		<a href="<?php echo $baseurlang; ?>milksystem" data-centerx="23" data-centery="-175"  data-link="milksystem">
			<span class="home_anchors_off"><?php echo $jsonLang->milk->blockText->title->texte; ?></span>
			<span class="home_anchors_roll"><?php echo $jsonLang->milk->blockText->title->texte; ?></span>
		</a>
		<a href="<?php echo $baseurlang; ?>coffeerange" data-centerx="154" data-centery="111" data-link="coffeerange">
			<span class="home_anchors_off"><?php echo $jsonLang->range__global->blockText->title->texte; ?></span>
			<span class="home_anchors_roll"><?php echo $jsonLang->range__global->blockText->title->texte; ?></span>
		</a>
    	</div>
    	<div id="raphael_home_anchors"></div>
    	<img src="assets/imgs/sections/home_machine.png" class="home_machine" />
    	<img src="assets/imgs/sections/home_bg.jpg" class="section_background" data-w="1440" data-h="854" />
</section>