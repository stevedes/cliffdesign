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

	function scrollto ($this) {
		//console.log($this);

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
    $.prototype.folioDrop = function () {

		return this.each(function () {

			var container = $(this),
				contents = container.find('div.contents'),
				heading_link = container.find('h2 a'),
				trigger = '',
				hidden_trigger = '',
				transition = 'cubic-bezier(.22,.79,.77,.99)',
				is_open = false,
				height_when_open = 0, // this needs calculating later on, due to flexible height images
				current_height = 0,
				time_to_open = 0;

			// Init from no JS state
			container
				.removeClass('open')
				.find('span.close').hide();
			contents
				.css('height', '0px');

			// Bind open/close to heading link
			heading_link.click(

				function(e) {
					
					// prevent default click
					e.preventDefault();

					// check if item is open
					is_open = container.hasClass('open');

					if (is_open) {

						trigger = $(this).find('span.close');
						hidden_trigger = $(this).find('span.open');

						// get height of contents;
						height_when_open = contents.outerHeight(false);

						// Set time for open/close animation, partly based on height
						time_to_open = 200 + (height_when_open / 8);

						// slide up
						trigger
							.show()
							.transition({ y: height_when_open + 'px', easing: transition, duration: time_to_open, delay: 50, }, function() {
								contents.transition({ height: '0px', easing: transition, duration: time_to_open, }, function() {
									$.waypoints('refresh');

									container.removeClass('open');
								});
							})
							.transition({ y: '0px', easing: transition, duration: time_to_open, })
							.transition({
								delay: 50,
							    perspective: '100px',
							    rotateY: '180deg',
							    easing: transition,
							    duration: '250ms'
							}, function() {
								//alert('done');
								hidden_trigger.transition({rotateY: '0deg', duration: '0ms' }).show();
								trigger.hide();
								//$(this).html('Open').addClass('open');
							});

						// end transition
					}

					else {

						trigger = $(this).find('span.open');
						hidden_trigger = $(this).find('span.close');

						// Determine Height
						// set height to auto
						contents.css("height","auto");

						// Store auto height
						height_when_open = contents.height();

						// Put height back
						contents.css("height", '0px');

						// Set time for open/close animation, partly based on height
						time_to_open = 200 + (height_when_open / 8);

						// Slide Down Transition
						trigger
							.show()
							.transition({ y: '-55px', easing: transition, duration: '125ms', })
							.transition({ y: '-54px', easing: transition, duration: '350ms', })
							.transition({ y: '0px', easing: transition, duration: '50ms', }, function() {

								// slide down contents
								contents.transition({ height: height_when_open+'px', easing: transition, duration: time_to_open, }, function() {
	
									$.waypoints('refresh'); // refresh waypoints

									container.addClass('open');
								});
							})
							.transition({ y: '-5px', easing: transition, duration: '25ms', })
							.transition({ y: '0px', easing: transition, duration: '15ms', })
							.transition({ delay: 0, perspective: '100px', rotateY: '180deg', easing: transition, duration: '250ms', }, function() {

								// show close trigger
								hidden_trigger.transition({rotateY: '0deg', duration: '0ms' }).show();
								// hide open
								$(this).hide();
							});

						// end transition
					}

				}
			);
	

		});

	};


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

		// Waypoints
		$('#about, #portfolio, #services, #pipeline, #intro').waypoint(function(event, direction) {

			
			var tar = $(this).attr('id');

			// if currently active, stop this nightmare
			if ($('#top a[href*="' + tar + '"]').hasClass('active') && direction === 'down') {
				return true;
			}
			$('#top a').removeClass('active');


			if (direction === 'down') {
				//$('#top a[href!="' + tar + '"]').removeClass('active');
				$('#top a[href*="' + tar + '"]').addClass('active');
			}
			else {
				//$('#top a').removeClass('active');
				$('#top a[href*="' + tar + '"]').parent().prev().find('a').addClass('active');
			}

			/*
			if (direction === 'down') {
				$('#top a[href*="' + tar + '"]').addClass('active');
			}
			else {

				$('#top a[href*="' + tar + '"]').parent().prev().find('a').addClass('active');
			}
			*/

		}, {
			continuous: true,
			onlyOnScroll: false,
		   	offset: '1px'  // middle of the page
		});
		/*
		$('#about, #portfolio, #services, #pipeline, #intro').waypoint(function(event, direction) {
			if (direction === 'up') {
				$('#top a[href!="' + tar + '"]').removeClass('active');
				var tar = $(this).attr('id');
				$('#top a[href*="' + tar + '"]').addClass('active');
			}
		}, {
		   offset: 'bottom-in-view'
		});
		*/

		$('a[href*=#]').click ( function(e) {

			var link = $(this);
			var $this = this;
			var $this_hash = scrollto ( this );
			//console.log($this_hash);

			// Determine applicable cases:
			if ( ! e.isDefaultPrevented()) {
				e.preventDefault();
		

				if ( location.hash == $this.hash ) {
					// Reclick case is special:
					$(window).trigger ( 'hashchange' );
				}
				
				else {
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
				}
			}
		});


		$(window).hashchange( function(event){

			var $this = location, $this_hash = scrollto ( location );

			// rmoeve any active classes
			//$('#top a').removeClass('active');

		    if ( $this_hash.length ) {

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

				var time_to_scroll = 150 + ((distance / 1000) * 150);

				$.scrollTo(target_top, time_to_scroll, { easing: $.bez([.14,.32,.79,1.04]) });

				// add active class to nav
				//$('#top a[href*="' + target + '"]').addClass('active');

			}

		});
	
		if ( ! $(window).scrollTop() ) $(window).trigger ( 'hashchange' );

		
		$('#portfolio article').folioDrop();

		/*
		$('#portfolio article').each(function() {

			$(this).removeClass('open');

			$(this).find('span.close').hide();

			$(this).find('div.contents').css('height', '0px');
			

		});
		*/

		
		
		

	});


    return null;

}(jQuery, this, this.document));