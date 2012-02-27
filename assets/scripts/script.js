/* Author:
	Steve Urmston
*/

(function ($, window, document) {

    "use strict";

    if (typeof jQuery === 'undefined') {
        return null;
    }

    var body,
        head,
        html,
        root;

    root = new $.prototype.init(document);

    /*
    	Plain JS Functions
    */

    // should we scroll HTML or BODY?
	function scrollto ($this) {
		if ( ! $this.hash ) return ( "" );
		var $this_hash = $($this.hash);
		if ( ! $this_hash ) return ( "" );
		var $parent1 = $this_hash.closest ( '.noscroll' );
		if ( $parent1.length ) {
			var $parent2 = $this_hash.closest ( '.scrollto' );
			if ( $parent2.length &&
			$parent2.html().length <= $parent1.html().length )
			$parent1 = "";
		}
		if ( ! $parent1.length &&
		( location.hostname == $this.hostname || ! $this.hostname ) &&
		location.pathname.replace(/^\//,'') == $this.pathname.replace(/^\//,'') )
		return ( $this_hash );
		else
		return ( "" );
	}



    /*
    	Custom Plugins
    */


    /*
    	Make Rocket Go Now!
    */
    root.ready(function () {

		/*
			Cache <html>, <head> & <body>
		*/
		html = root.find('html');
		head = html.find('head');
		body = html.find('body');

		
		// Sets an elem at the bottom of page to window height
		// ensures page scroll works as expected
		body.find('#scrollfix').height($(window).height());


		$('#top a').click ( function(e) {

			var links = $('#top a');
			links.removeClass('active');

			var link = $(this);
			var $this = this;
			var $this_hash = scrollto ( this );
			// Determine applicable cases:
			if ( ! e.isDefaultPrevented()) {
				e.preventDefault();
		

				if ( location.hash == $this.hash ) {
					// Reclick case is special:
					$(window).trigger ( 'hashchange' );
				}
				
				else {
					//alert($this.hash);
					//alert($this.hash);

					// Update history without scrolling:
					var hash = $this.hash.substr(1),
					dummy = $( '' ).css({
						visibility: 'hidden',
						position: 'fixed',
						top: '0px'
					})
						.attr ( 'id', hash )
						.prependTo ( document.body );
					$this_hash.attr ( 'id', '' );
					location.hash = $this.hash;
					dummy.remove();
					$this_hash.attr ( 'id', hash );

					// set active class
					link.addClass('active');
				}
			}
		});


		$(window).hashchange( function(event){

			var $this = location, $this_hash = scrollto ( location );

			var navLinks = $('#top a');

		    if ( $this_hash.length )
		    {

				var target = location.hash;
				var target_top = $(target).offset().top;
				var current_position = $(window).scrollTop();
				var distance = 0;

				// going back up
				if (current_position > target_top) {
					distance = current_position - target_top;
				}
				// going down
				else {
					distance = target_top - current_position;
				}

				var time_to_scroll = 200 + ((distance / 1000) * 150);

				$.scrollTo(target_top, time_to_scroll, { easing: $.bez([.69,.17,0,1.2]) });

				// add active class to nav


			}
			// else go to top
			else {
				//alert('hello');
				
			}

		});
				
	
		if ( ! $(window).scrollTop() ) $(window).trigger ( 'hashchange' );

	});


    return null;

}(jQuery, this, this.document));