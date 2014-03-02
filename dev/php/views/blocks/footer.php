<!--FOOTER-->
<?php if($jsonLangFooter->order->texte != ""){ ?>
<a href="<?php echo $jsonLangFooter->order_online_shop_link->texte; ?>" class="order_footer_btn_visual" target="_blank">
	<img src="assets/imgs/ui/machine.png" class="order_footer_btn_machine" />
	<img src="assets/imgs/ui/machine_arrow.png" class="order_footer_btn_arrow" height="12" width="8"/>
</a>
<a href="<?php echo $jsonLangFooter->order_online_shop_link->texte; ?>" class="order_footer_btn"  target="_blank"><span><?php echo $jsonLangFooter->order->texte; ?></span></a>
<?php } ?>
<footer>
        <a href="<?php echo $jsonLangFooter->nespresso_link->texte; ?>" target="_blank" class="logo"></a>
        <ul>
            <li><a href="<?php echo $jsonLangFooter->contact_link->texte;?>" target="_blank" class="contact_link"><?php echo $jsonLangFooter->contact->texte;?></a></li>
            <li class="sep"></li>
            <li><a href="<?php echo $jsonLangFooter->legals_link->texte;?>" target="_blank" class="legals_link"><?php echo $jsonLangFooter->legals->texte;?></a></li>
            <li class="sep"></li>
            <li><a href="<?php echo $jsonLangFooter->store_locator_link->texte;?>" target="_blank" class="store_locator_link"><?php echo $jsonLangFooter->store_locator->texte;?></a></li>
        </ul>
</footer>