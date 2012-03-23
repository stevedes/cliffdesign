		<footer id="bottom">
			<h2>Contact</h2>
			<dl>
				<dt class="post">Post:</dt>
				<dd><?php echo $site->address() ?>.  <a href="<?php echo $site->map() ?>">Google Map</a></dd>
				<dt class="phone">Phone:</dt>
				<dd class="phone"><?php echo $site->phone() ?></dd>
				<dt class="email">Email:</dt>
				<dd><a href="mailto:&#x64;&#97;&#x76;&#x69;&#x64;&#x40;&#x63;&#x6c;&#x69;&#x66;&#102;&#100;&#101;&#x73;&#x69;&#103;&#x6e;&#46;&#99;&#x6f;&#46;&#x75;&#107;">&#100;&#97;&#x76;&#x69;&#100;&#64;&#x63;&#x6c;&#x69;&#102;&#x66;&#x64;&#101;&#x73;&#105;&#103;&#110;&#46;&#99;&#111;&#46;&#117;&#107;</a></dd>
			</dl>
		</footer>

	</div>
	
	<script type="text/javascript">
		yepnope({
			load: '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
			complete: function () {
				if (!window.jQuery) {
					yepnope('/assets/scripts/libs/jquery-1.7.1.min.js');
				}
				yepnope([
					'/assets/scripts/plugins.js',
					'/assets/scripts/master.js'
					//'ielt9!/assets/scripts/libs/selectivizr-min.js'
				]);
			}
		});
	</script>
	
	<script>
		var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>

</body>

</html>