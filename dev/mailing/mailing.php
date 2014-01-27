<?php

$senderName = $_POST['senderName']; 
$senderMail = $_POST['senderMail']; 
$emailFriends = $_POST['emailFriends']; 
$code = $_POST['code'];

/********************************************************
$senderName = 'MATTHIEU'; 
$senderMail = 'matt@boodcode.com'; 
$emailFriends = 'matt.hebert@free.fr';
$code = 'fr_FR';
/********************************************************/

$emailsTo = explode(',', $emailFriends);

$langue = substr($code, 0,2);
$pays = substr($code,3,2);

$cms_config = json_decode(file_get_contents('../json/_cms_'.$pays.'.json'));
//print_r($cms_config);
$machine = $cms_config->fb_umat ? 'umat' : ($cms_config->fb_umilk ? 'umilk' : 'umachine');

//echo $machine;


require_once('_inc/PHPMailer_5.2.1/class.phpmailer.php');
$mail   = new PHPMailer(); // defaults to using php "mail()"
$mail->CharSet = "UTF-8";

$config = json_decode(file_get_contents('../json/'.$code.'.json'));

switch($machine){
	case 'umachine':
		$subject = $config->data->sections->global__mail->blockText->email_template_subject_umachine->texte;
		$content = $config->data->sections->global__mail->blockText->email_template_content_umachine->texte;
		$cta = $config->data->sections->global__mail->blockText->email_template_call_to_action_umachine->texte;
		break;
	case 'umat':
		$subject = $config->data->sections->global__mail->blockText->email_template_subject_umat->texte;
		$content = $config->data->sections->global__mail->blockText->email_template_content_umat->texte;
		$cta = $config->data->sections->global__mail->blockText->email_template_call_to_action_umat->texte;
		break;
	case 'umilk':
		$subject = $config->data->sections->global__mail->blockText->email_template_subject_umilk->texte;
		$content = $config->data->sections->global__mail->blockText->email_template_content_umilk->texte;
		$cta = $config->data->sections->global__mail->blockText->email_template_call_to_action_umilk->texte;
		break;
}


$cta_link = 'http://www.nespresso.com/umachine/'.$code.'/#/'.$machine;


$subject = strip_tags(preg_replace(array("/\{SenderName\}/i","/#U/"),array($senderName,'U'),$subject));
$content = preg_replace(array("/\{SenderName\}/i","/#U/"),array("<strong>".$senderName."</strong>","<strong>U</strong>"),$content);



$body = file_get_contents("templates/".$machine."/template.html");

if($langue=='en'){
	$body = preg_replace("/_05\.jpg/","_05_en.jpg",$body);
	if($machine=="umachine"){
		$body = preg_replace("/_12\.jpg/","_12_en.jpg",$body);
	}
} else{
	$trad1 = "* ".$config->data->sections->global__utils->blockText->the_u_lives_like_you->texte;
	$trad2 = "* ".$config->data->sections->umachine->blockText->catchphrase_translate->texte;
	$trad_umat = "* ".$config->data->sections->umat->blockText->asterisk_translate->texte;
	$trad_umilk = "* ".$config->data->sections->umilk->blockText->catchphrase_translate->texte;
}

$body = preg_replace("/\{trad1\}/",$trad1,$body);
$body = preg_replace("/\{trad2\}/",$trad2,$body);
$body = preg_replace("/\{trad_umat\}/",$trad_umat,$body);
$body = preg_replace("/\{trad_umilk\}/",$trad_umilk,$body);

$body = preg_replace("/\{content\}/",$content,$body);
$body = preg_replace("/\{cta\}/",$cta,$body);
$body = preg_replace("/\{cta_link\}/",$cta_link,$body);


$body = preg_replace("{src=\"images}","src=\"templates/".$machine."/images",$body);
//echo $body;

$mail->AddReplyTo('noreply@nespresso.com','Nespresso.com');
$mail->SetFrom('noreply@nespresso.com','Nespresso.com');


for($i=0;$i<sizeof($emailsTo);$i++) :
	$mail->ClearAddresses();
    $mail->AddAddress(trim($emailsTo[$i]));
	
	/*******************************************/
	
	//echo $sujet;
	$mail->Subject    = $subject;
	$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
	$mail->MsgHTML($body);
	if(!$mail->Send()) {echo '0';} else {echo '1';}
endfor;
?>