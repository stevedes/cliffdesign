<?php

?>
	
<form action="/enquiry/" method="post" id="contact_form" class="default">

	<h2 class="legend">Hello, we should talk &hellip;</h2>
	<hr />

	<fieldset id="enquiry_set">
		
		<p>
			<label for="enquiry_name"><abbr class="req" title="Required Field">*</abbr> Name</label>
			<input type="text" name="enquiry_name" id="enquiry_name" class="def" value="" required="required" />
		</p>
		<p>
			<label for="enquiry_email"><abbr class="req" title="Required Field">*</abbr> Email</label>
			<input type="email" name="enquiry_email" id="enquiry_email" class="def" value="" required="required" />
		</p>
		<p>
			<label for="enquiry_message"><abbr class="req" title="Required Field">*</abbr> Message</label>
			<textarea cols="60" rows="10" name="enquiry_message" id="enquiry_message" required="required"></textarea>
		</p>
	</fieldset>
	<button type="submit" name="submit" value="true" class="button">Send Enquiry</button>

</form>