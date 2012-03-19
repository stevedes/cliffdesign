		<footer id="bottom">
			<h2>Contact</h2>
			<dl>
				<dt class="post">Post:</dt>
				<dd><?php echo $site->address() ?>.  <a href="<?php echo $site->map() ?>">Google Map</a></dd>
				<dt class="phone">Phone:</dt>
				<dd class="phone"><?php echo $site->phone() ?></dd>
				<dt class="email">Email:</dt>
				<dd><a href=""><?php echo $site->email() ?></a></dd>
			</dl>
		</footer>

	</div>
		
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="assets/scripts/libs/jquery-1.7.1.min.js"><\/script>')</script>
	
	<script src="assets/scripts/plugins.js"></script>
	<script src="assets/scripts/script.js"></script>
	
	<script>
		var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>

</body>

</html>