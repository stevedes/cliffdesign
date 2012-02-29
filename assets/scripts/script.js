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
		/*
		$('#portfolio article h2 a').hover(
			function() {
				$(this).find('span').addClass('swing');
			},
			function() {
				$(this).find('span').removeClass('swing');
			}
		);
		*/

		$('#portfolio article').each(function() {

			$(this).find('span.close').hide();

			$(this).find('div.panel').each( function() {
				$(this).css('height', '0px');
			});

		});

		$('#portfolio article h2 a').click(
			function(e) {
				e.preventDefault();

				var parent = $(this).parent().parent();
				var contents = parent.find('div.contents');
				var trigger = '';
				var hidden_trigger = '';
				var panels = contents.find('div.panel');
				var transition = 'cubic-bezier(.22,.79,.77,.99)';


				var is_open = parent.hasClass('open');

				if (is_open) {

					trigger = $(this).find('span.close');
					hidden_trigger = $(this).find('span.open');

					// slide up
					// get height of contents;
					var contents_height = contents.outerHeight(false);

					trigger
						.show()
						.transition({ y: contents_height + 'px', easing: transition, duration: '250ms', })
						.transition({ y: '0px', easing: transition, duration: '300ms', delay: 50})
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



					
					contents.delay(350).animate({ height: '0px' }, 300, function() {
						
						parent.removeClass('open');

						panels.each( function() {
							$(this).css('height', '0px');
						});
						

					});


					//contents.css('display','block');
				}

				else {

					trigger = $(this).find('span.open');
					hidden_trigger = $(this).find('span.close');

					contents.css('height','auto');
					// slide down
					trigger
						.show()
						.transition({ y: '-55px', easing: transition, duration: '125ms', })
						.transition({ y: '-54px', easing: transition, duration: '350ms', })
						.transition({ y: '0px', easing: transition, duration: '50ms', })
						.transition({ y: '-5px', easing: transition, duration: '25ms', })
						.transition({ y: '0px', easing: transition, duration: '15ms', })
						.transition({
							delay: 0,
						    perspective: '100px',
						    rotateY: '180deg',
						    easing: transition,
						    duration: '250ms'
						}, function() {
	

							parent.addClass('open');

							hidden_trigger.transition({rotateY: '0deg', duration: '0ms' }).show();
							$(this).hide();
							//$(this).html('Open').addClass('open');
						});


					// open panels
					var inc_delay = 400;
					var i = 1;
					panels.each(function() {

						//$(this).hide();
						
						inc_delay = inc_delay + (150 * i);
						//alert(inc_delay);

						$(this).delay(inc_delay).transition({
						    height: '300px',
						    easing: 'cubic-bezier(.22,.79,.77,.99)',

	    					duration: '200ms',
						});

						i++;
		
					});
				}

			}
		);

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
			onlyOnScroll: true,
		   	offset: '0'  // middle of the page
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

	});


    return null;

}(jQuery, this, this.document));