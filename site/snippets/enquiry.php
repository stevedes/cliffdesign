<?php

?>
	
<form action="/enquiry/" method="post" class="default">

	<fieldset id="enquiry_set">
		<p>
			<label for="enquiry_name">Your Name: <abbr class="req" title="Required Field">*</abbr></label>
			<input type="text" name="enquiry_name" id="enquiry_name" class="def" value="" required="required" />
		</p>
		<p>
			<label for="enquiry_phone">Telephone: </label>
			<input type="text" name="enquiry_phone" id="enquiry_phone" class="def" value="" />
		</p>
		<p>
			<label for="enquiry_email">Email Address: <abbr class="req" title="Required Field">*</abbr></label>
			<input type="text" name="enquiry_email" id="enquiry_email" class="def" value="" required="required" />
		</p>
		<p class="trap">
			<label for="enquiry_subject">Subject: <abbr class="req" title="Required Field">*</abbr> <em class="form_hint">Please do not fill this field in</em></label>
			<input type="text" name="enquiry_subject" id="enquiry_subject" class="def" value="" required="required" />
		</p>
		<p>
			<label for="enquiry_message">Enquiry: <abbr class="req" title="Required Field">*</abbr></label>
			<textarea cols="60" rows="10" name="enquiry_message" id="enquiry_message" required="required"></textarea>
		</p>
	</fieldset>
	<button type="submit" name="submit" value="true" class="button">Send Enquiry</button>

</form>