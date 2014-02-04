<?php
$index = 0;
function getCapsules($datas, $start, $nbCaps){
	$markup = "";
	for ($i = $start; $i < $start+$nbCaps; $i++) {
		$jsonId = 'grand_cru_'.($i+1);
		$markup .= "<a href='#' data-id='".$jsonId."'>";
		$markup .= "<div class='".$jsonId."' ></div>";
		$markup .= "<span>".$datas->$jsonId->texte."</span>";
		$markup .= "</a>";
	}
	return $markup;
}
?>
<section id="coffeerange">
	<div class="range_rolls">
		<?php
		foreach ($jsonLangRangeCapsules as $key => $value) {
			if(strpos($key, 'grand_cru_') === 0){
				$force = 0;
				foreach ($jsonCapsulesList as $capsuleObj) {
					if($capsuleObj->label == $key){
						$force = $capsuleObj->force;
						break;
					}
				}

				$aromJsonId = $key.'_aromatic_profile';
				$milkJsonId = $aromJsonId.'_with_milk';
				//echo ' -> '.$aromJsonId.' ///// '.$milkJsonId;
				echo '<div data-id="'.$key.'" class="range_roll">';
					echo '<span class="range_roll_title">'.$value->texte.'</span>';
					echo '<span class="range_roll_intensity"><strong>'.$jsonLangRangeGlobals->intensity->texte.'</strong></span>';
					echo '<span class="range_roll_intensity_value_num">'.$force.'</span>';
					echo '<div class="range_roll_intensity_value"></div>';
					echo '<span class="range_roll_arom"><strong>'.$jsonLangRangeGlobals->aromatic_notes->texte.'</strong> '.$jsonLangRangeCapsules->$aromJsonId->texte.'</span>';
					echo '<span class="range_roll_milk"><strong>'.$jsonLangRangeGlobals->with_milk___->texte.'</strong> '.$jsonLangRangeCapsules->$milkJsonId->texte.'</span>';
				echo '</div>';
			}
		}
		?>
	</div>
	<div class="range_content">
		<h2><?php echo $jsonLangRangeGlobals->title->texte; ?></h2>
		<div class="content_line_sep"></div>
		<span class="range_description"><?php echo proccedText($jsonLangRangeGlobals->description_text->texte); ?></span>
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