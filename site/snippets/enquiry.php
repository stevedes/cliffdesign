<?php

?>
	
<form action="/enquiry/" method="post" class="default">

	<fieldset id="enquiry_set">
		<legend>Got a quick question?</legend>
		<p>
			<label for="enquiry_name"><abbr class="req" title="Required Field">*</abbr> Name</label>
			<input type="text" name="enquiry_name" id="enquiry_name" class="def" value="" required="required" />
		</p>
		<p>
			<label for="enquiry_email"><abbr class="req" title="Required Field">*</abbr> Email</label>
			<input type="text" name="enquiry_email" id="enquiry_email" class="def" value="" required="required" />
		</p>
		<p class="trap">
			<label for="enquiry_subject">Subject: <abbr class="req" title="Required Field">*</abbr> <em class="form_hint">Please do not fill this field in</em></label>
			<input type="text" name="enquiry_subject" id="enquiry_subject" class="def" value="" required="required" />
		</p>
		<p>
			<label for="enquiry_message"><abbr class="req" title="Required Field">*</abbr> Message</label>
			<textarea cols="60" rows="10" name="enquiry_message" id="enquiry_message" required="required"></textarea>
		</p>
	</fieldset>
	<button type="submit" name="submit" value="true" class="button">Send Enquiry</button>

</form>