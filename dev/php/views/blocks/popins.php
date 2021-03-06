<div class="popins">
	<div class="select_lang popin">
		<a href="#" class="popin_close"></a>
		<h4><?php echo $jsonLangFooter->country_and_language_text->texte; ?></h4>
		<ul class="lang_zones">
		<?php
		$now = new DateTime("now");
			foreach ($jsonCountries->continents as $key => $value){
				$countriesOk = FALSE;
				if(count((array)$value->countries) > 0){
					foreach ($value->countries as $country_id => $country) {
						$launchingDate = date_create($country->publish_date);
						if(($staging || ($launchingDate <= $now)) && !is_null($country->title)){
							$countriesOk = TRUE;
							break;
						}
					}
				}
				if($countriesOk == t) echo "<li><a href='#' data-type='".$key."'>".$key."</a></li>";
				//echo "<li><a href='#' data-type='".$key."'>".$key."</a></li>";
				
			}
		?>
		</ul>
		<div class="select_langs">
		<?php
			
			foreach ($jsonCountries->continents as $key => $value) {
				echo "<div data-type='".$key."' class='lang_zone'>";
				$i = 0;
				$nbCountries = count((array)$value->countries);
				$limitNum = 4;
				if($nbCountries > 18) $limitNum = 6;
				else if($nbCountries > 8) $limitNum = 5;
				foreach ($value->countries as $country_id => $country) {
					$launchingDate = date_create($country->publish_date);
					if(($staging || ($launchingDate <= $now)) && !is_null($country->title)){
						if($i == 0) echo "<ul>";
	            				echo "<li><div class='country_title'>";
	            				echo "<div class='country_flag _".$country_id."'></div><span>".$country->title."</span></div>";
	            				echo "<div class='country_langs'>";
	            				$l = 0;
	            				foreach ($country->languages as $lang_infos) {
	            					$classPlus = ($l > 0)? "class='country_lang_sep'" : "";
	            					echo "<a href='".$baseurl.$lang_infos->code."' ".$classPlus.">".$lang_infos->name."</a>";
	            					$l++;
	            				}
	            				echo "</div>";
	            				echo "</li>";
						$i++;
						if($i == $limitNum){
							echo "</ul>";
							$i = 0;	
						}
					}
				}
				echo "</div>";
			}
		?>
		</div>
	</div>
	<div class="share_mail popin">
		<a href="#" class="popin_close"></a>
		<h4><?php echo $jsonLangMail->form_title->texte; ?></h4>
		<span><?php echo $jsonLangMail->form_subheading->texte; ?></span>
		<form id="mail_share" method="POST" action="<?php echo $baseurl; ?>/mailing/mailing.php">
			<span><?php echo $jsonLangMail->form_senders_name->texte; ?></span>
			<input type="text" value="" name="senderName" />
			<span><?php echo $jsonLangMail->form_senders_email->texte; ?></span>
			<input type="text" value="" name="senderMail" />
			<input type="text" value="<?php echo $languagesite."_".$territory; ?>" name="code" style="display:none;" />
			<span><?php echo $jsonLangMail->form_receivers_email->texte; ?></span>
			<input type="text" value="" name="emailFriends" />
			<div></div>
			<input type="submit" value="<?php echo $jsonLangMail->form_send->texte; ?>" />
		</form>
		<span class="success_message from_message"><?php echo $jsonLangMail->success_message->texte; ?></span>
		<span class="error_message from_message"><?php echo $jsonLangMail->error_message->texte; ?></span>
	</div>
	<div class="order_phone popin">
		<a href="#" class="popin_close"></a>
		<h4><?php echo $jsonLangGlobals->order_by_phone_->texte; ?></h4>
		<div class="phone_number"><span><?php echo $jsonLangGlobals->order_by_phone_number_->texte; ?></span></div>
	</div>
	<div class='popin_black_bg'></div>
</div>