<?php
$capsules_folder = 'assets/imgs/sections/capsules/';
$caps_w = 52;
$caps_h = 49;
$index = 0;
function getCapsules($datas, $start, $nbCaps){
	$markup = "";
	for ($i = $start; $i < $start+$nbCaps; $i++) {
		$jsonId = 'grand_cru_'.($i+1);
		$markup .= "<a href='#' data-link='".$jsonId."'>";
		$markup .= "<img src='".$capsules_folder.$jsonId.".png' width='".$caps_w."' height='".$caps_h."' />";
		$markup .= "<span>".$datas->$jsonId->texte."</span>";
		$markup .= "</a>";
	}
	return $markup;
}
?>
<section id="coffeerange">
	<div class="range_content">
		<h2><?php echo $jsonLangRangeGlobals->title->texte; ?></h2>
		<div class="range_sep"></div>
		<span class="range_description"><?php echo $jsonLangRangeGlobals->description_text->texte; ?></span>
		<div class="range_coffees">
			<div class="range_cat">
				<div class="range_cat_title"><span>Intenso</span><div></div></div>
				<div class="range_cat_caps">
					<?php
						echo getCapsules($jsonLangRangeCapsules, $index, 5);
						$index += 5;
					?>
				</div>
			</div>
			<div class="range_cat">
				<div class="range_cat_title"><span>Espresso</span><div></div></div>
				<div class="range_cat_caps">
					<?php
						echo getCapsules($jsonLangRangeCapsules, $index, 4);
						$index += 4;
					?>
				</div>
			</div>
			<div class="range_cat">
				<div class="range_cat_title"><span>Pure Origin</span><div></div></div>
				<div class="range_cat_caps">
					<?php
						echo getCapsules($jsonLangRangeCapsules, $index, 4);
						$index += 4;
					?>
				</div>
			</div>
			<div class="range_cat">
				<div class="range_cat_title"><span>Decaffeinato</span><div></div></div>
				<div class="range_cat_caps">
					<?php
						echo getCapsules($jsonLangRangeCapsules, $index, 3);
						$index += 3;
					?>
				</div>
			</div>
			<div class="range_cat">
				<div class="range_cat_title"><span>Lungo</span><div></div></div>
				<div class="range_cat_caps">
					<?php
						echo getCapsules($jsonLangRangeCapsules, $index, 3);
						$index += 3;
					?>
				</div>
			</div>
			<div class="range_cat">
				<div class="range_cat_title"><span>Variations</span><div></div></div>
				<div class="range_cat_caps">
					<?php
						echo getCapsules($jsonLangRangeCapsules, $index, 3);
						$index += 3;
					?>
				</div>
			</div>
		</div>
	</div>
	<img src="assets/imgs/sections/range_machine.png" class="range_machine" />
    	<img src="assets/imgs/sections/range_bg.jpg" class="section_background" data-w="1440" data-h="864" />
</section>