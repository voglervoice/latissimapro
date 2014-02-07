<section id="design">
	<div class="design_content">
		<div class="design_content_title">
			<h2 class="h2_n"><?php echo $jsonLangDesign->title->texte; ?></h2>
			<div class="content_line_design_sep"></div>
			<span class="design_description"><?php echo proccedText($jsonLangDesign->text->texte); ?></span>
		</div>
		<div class="design_content_infos">
			<div class="design_content_infos_col">
				<h3><?php echo proccedText($jsonLangDesign->{'bloc_1_•_characteristics'}->texte); ?></h3>
				<div></div>
				<ul>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_1__info_1'}->texte); ?></li>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_1__info_2'}->texte); ?></li>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_1__info_3'}->texte); ?></li>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_1__info_4'}->texte); ?></li>
				</ul>
			</div>
			<div class="design_content_infos_col">
				<h3><?php echo proccedText($jsonLangDesign->{'bloc_2_•_intuitive_touchscreen'}->texte); ?></h3>
				<div></div>
				<ul>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_2__info_1'}->texte); ?></li>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_2__info_2'}->texte); ?></li>
				</ul>
			</div>
			<div class="design_content_infos_col">
				<h3><?php echo proccedText($jsonLangDesign->{'bloc_3_•_optimal_milk_froth_quality'}->texte); ?></h3>
				<div></div>
				<ul>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_3__info_1'}->texte); ?></li>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_3__info_2'}->texte); ?></li>
				</ul>
			</div>
			<div class="design_content_infos_col">
				<h3><?php echo proccedText($jsonLangDesign->{'bloc_4_•_auto_clean_system'}->texte); ?></h3>
				<div></div>
				<ul>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_4__info_1'}->texte); ?></li>
					<li><?php echo proccedText($jsonLangDesign->{'bloc_4__info_2'}->texte); ?></li>
				</ul>
			</div>
		</div>
		<div class="design_footer">
			<a href="<?php echo $jsonLangDesign->user_guide_url->texte ?>" target="_blank" class="design_pdf"><?php echo $jsonLangDesign->download_user_guide->texte ?></a>
			<a href="<?php echo $jsonLangDesign->youtube_video_playlist_url->texte ?>" target="_blank" class="design_youtube"><?php echo $jsonLangDesign->assistance_video->texte ?></a>
		</div>
	</div>
	<img src="assets/imgs/sections/design_machine.png" class="design_machine" />
    	<img src="assets/imgs/sections/design_bg.jpg" class="section_background" data-w="1440" data-h="864" />
</section>