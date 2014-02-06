<section id="milksystem">
	<div class="milk_zoom"><div class="milk_zoom_inner"><div class="milk_zoom_img"></div></div></div>
	<div class="milk_content">
		<h2><?php echo $jsonLangMilk->title->texte; ?></h2>
		<div class="content_line_milk_sep"></div>
		<span class="milk_description"><?php echo proccedText($jsonLangMilk->text_paragraph_1_milk_frothtext_paragraph_1_milk_froth->texte); ?></span>
		<div class="visual_fig">
			<div class="visual_pot"></div>
			<span><?php echo $jsonLangMilk->schema_milk_froth_text_->texte; ?></span>
		</div>
		<div class="logo_clean"></div>
		<span class="milk_description"><?php echo proccedText($jsonLangMilk->text_paragraph_2_auto_clean->texte); ?></span>
	</div>
	<img src="assets/imgs/sections/milk_machine.png" class="milk_machine" />
    	<img src="assets/imgs/sections/milk_bg.jpg" class="section_background" data-w="1440" data-h="864" />
</section>