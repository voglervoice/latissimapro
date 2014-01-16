<div class="popins">
	<div class="select_lang popin">
		<a href="#" class="popin_close"></a>
		<h4>Select your country</h4>
		<ul class="lang_zones">
			<li><a href="#" data-type="africa">Africa</a></li>
			<li><a href="#" data-type="america">America</a></li>
			<li><a href="#" data-type="europe">Europe</a></li>
			<li><a href="#" data-type="middle_east">Middle East</a></li>
			<li><a href="#" data-type="asia">Asia</a></li>
			<li><a href="#" data-type="oceania">Oceania</a></li>
		</ul>
		<div class="select_langs">
			<div data-type="africa" class="lang_zone">
				<ul>
					<li>France</li>
					<li>France</li>
					<li>France</li>
					<li>France</li>
					<li>France</li>
				</ul>
				<ul>
					<li>France</li>
					<li>France</li>
					<li>France</li>
					<li>France</li>
					<li>France</li>
				</ul>
			</div>
			<div data-type="america" class="lang_zone">America</div>
			<div data-type="europe" class="lang_zone">Europe</div>
			<div data-type="middle_east" class="lang_zone">Middle East</div>
			<div data-type="asia" class="lang_zone">Asia</div>
			<div data-type="oceania" class="lang_zone">Oceania</div>
		</div>
	</div>
	<div class="share_mail popin">
		<a href="#" class="popin_close"></a>
		<h4><?php echo $jsonLangMail->form_title->texte; ?></h4>
		<span><?php echo $jsonLangMail->form_subheading->texte; ?></span>
		<form>
			<span><?php echo $jsonLangMail->form_senders_name->texte; ?></span>
			<input type="text" value="" name="name" />
			<span><?php echo $jsonLangMail->form_senders_email->texte; ?></span>
			<input type="text" value="" name="email" />
			<span><?php echo $jsonLangMail->form_receivers_email->texte; ?></span>
			<input type="text" value="" name="friend_email" />
			<div></div>
			<input type="submit" value="<?php echo $jsonLangMail->form_send->texte; ?>" />
		</form>
		
	</div>
	<div class="order_phone popin">
		<a href="#" class="popin_close"></a>
		<h4><?php echo $jsonLangGlobals->order_by_phone_->texte; ?></h4>
		<div class="phone_number"><span><?php echo $jsonLangGlobals->order_by_phone_number_->texte; ?></span></div>
	</div>
	<div class='popin_black_bg'></div>
</div>