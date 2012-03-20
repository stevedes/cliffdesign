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

    // Capitalises first letter
    String.prototype.capitalise = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	String.prototype.firstName = function() {

		var name = this;
		var parts = this.split(' ');

		if (parts.length > 1) {
			name = parts[0];
		}

		return name;
	}

	function validateEmail(email) { 
		// http://stackoverflow.com/a/46181/11236

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

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
				last_panel = contents.find('div.panel:last-child'),
				heading_link = container.find('h2 a'),
				trigger = '',
				hidden_trigger = '',
				transition = 'cubic-bezier(.22,.79,.77,.99)',
				is_open = false,
				height_when_open = 0, // this needs calculating later on, due to flexible height images
				current_height = 0,
				time_to_open = 0,
				time_to_close = 0;

			// Init from no JS state
			container
				.removeClass('open')
				.find('span.open').show()
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

					// ---- Slide Up --->
					if (is_open) {

						trigger = $(this).find('span.close');
						hidden_trigger = $(this).find('span.open');

						// get height of contents;
						height_when_open = contents.outerHeight(false);

						// Set time for open/close animation, partly based on height
						time_to_open = 400 + (height_when_open / 8);
						time_to_close = (height_when_open / 10);

						// slide up
						trigger
							.show()
							.transition({ y: '-5px', easing: 'ease-in', duration: '50ms' })
							.transition({ y: height_when_open + 'px', easing: transition, duration: time_to_open, delay: 150 }, function() {
								contents.transition({ height: '0px', easing: 'ease-in', duration: time_to_close }, function() {
									$.waypoints('refresh');

									container.removeClass('open');
								});
							})
							.transition({ y: '0px', easing: transition, duration: time_to_close })
							.transition({
								delay: 50,
							    perspective: '100px',
							    rotateY: '180deg',
							    easing: transition,
							    duration: '150ms'
							}, function() {
								
								

								// show close trigger
								hidden_trigger.transition({rotateY: '0deg', duration: '0ms' }).show();

								// hide open
								trigger.hide();
								
							});

						// end transition
					}

					// ---- Slide Down --->
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
							.transition({ y: '-55px', easing: transition, duration: '125ms' })
							.transition({ y: '-54px', easing: transition, duration: '350ms' })
							.transition({ y: '0px', easing: transition, duration: '50ms' }, function() {

								// slide down contents
								contents.transition({ height: height_when_open+'px', easing: transition, duration: time_to_open }, function() {
	
									$.waypoints('refresh'); // refresh waypoints

									container.addClass('open');
								});
							})
							.transition({ y: '-5px', easing: transition, duration: '25ms' })
							.transition({ y: '0px', easing: transition, duration: '15ms' })
							.transition({ delay: 0, perspective: '100px', rotateY: '180deg', easing: transition, duration: '150ms' }, function() {

								

								// show close trigger
								hidden_trigger.transition({rotateY: '0deg', duration: '0ms' }).show();

								// hide open
								$(this).hide();
								
							});

						// end transition

						// add waypoint to last panel
						// this would be sweet, but proper difficult
						/*
						last_panel.waypoint(function(event, direction) {

							if (direction === 'down') {
								
								// slide trigger down
								height_when_open = contents.outerHeight(false);

								hidden_trigger.transition({ y: height_when_open + 'px', easing: transition, duration: 200, delay: 150, });
							}
						}, {
							continuous: false,
							onlyOnScroll: true,
						   	offset: '1px'  // middle of the page
						});
						*/
					}
				}
			);
		});
	};


	$.prototype.addWaypoints = function () {

		return this.each(function () {

			var contentBlock = $($(this).attr('href')),
				tar = contentBlock.attr('id');

			contentBlock.waypoint(function(event, direction) {

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

			}, {
				continuous: true,
				onlyOnScroll: false,
			   	offset: '1px'  // middle of the page
			});
		});
	};

	$.prototype.contactForm = function () {

		return this.each(function () {

			var form = $(this),
				fieldset = form.find('fieldset'),
				form_title = form.find('h2.legend'),
				name_field = form.find('#enquiry_name'),
				name_val = '',
				name_parts = [],
				email_field = form.find('#enquiry_email'),
				email_val = '',
				message_field = form.find('#enquiry_message'),
				message_val = '',
				title_parts = '',
				valid_email = false,
				has_errors = false,
				button_elem = form.find('button'),
				form_height = 0;


			name_field.blur(function() {

				message_val = message_field.val();
				email_val = email_field.val();
				name_val = $(this).val();

				if(name_val.length > 0) {
					name_field.removeClass('error');

					// if all match
					if (validateEmail(email_val) && message_val.length > 0) {
						form_title.html('There we go &hellip; Hit the button to send!');
					}
					else {
						form_title.html('Hello ' + name_val.firstName().capitalise() + ' &hellip; How can we help?');
					}
				}
				else {
					form_title.html('Something is amiss, I\'ve marked the issues');
					name_field.addClass('error');
				}

			});

			email_field.blur(function() {

				email_val = $(this).val();
				name_val = name_field.val();
				message_val = message_field.val();

				if (validateEmail(email_val)) {

					email_field.removeClass('error');

					// if all match
					if (name_val.length > 0 && message_val.length > 0) {
						form_title.html('There we go &hellip; Hit the button to send!');
					}
					else if (name_val.length > 0) {
						form_title.html('Okay ' + name_val.firstName().capitalise() + ', We\'ll email you back &hellip; What\'s up?');
					}

				}
				else {
					form_title.html('Something is amiss, I\'ve marked the issues');
					email_field.addClass('error');
				}
				
			});

			message_field.blur(function() {

				message_val = $(this).val();
				email_val = email_field.val();
				name_val = name_field.val();

				if(message_val.length > 0) {

					message_field.removeClass('error');

					// if all match
					if (validateEmail(email_val) && name_val.length > 0) {
						form_title.html('There we go &hellip; Hit the button to send!');
					}

				}
				else {
					form_title.html('Something is amiss, I\'ve marked the issues');
					message_field.addClass('error');
				}
			});

			// submit event
			form.submit(function(e) {

				e.preventDefault();

				form_title.html('Hmmm &hellip;');

				has_errors = false;

				message_val = message_field.val();
				email_val = email_field.val();
				name_val = name_field.val();

				// validate
				if (name_val.length < 1) {
					name_field.addClass('error');
					has_errors = true;
				} else {
					name_field.removeClass('error');
				}
				if (!validateEmail(email_val)) {
					email_field.addClass('error');
					has_errors = true;
				} else {
					email_field.removeClass('error');
				}
				if (message_val.length < 1) {
					message_field.addClass('error');
					has_errors = true;
				} else {
					message_field.removeClass('error');
				}

				// if no errors, send form ajax
				if (!has_errors) {

					button_elem.html('Please Wait');

					$.post("/enquiry.php",
						{
							name: name_val,
							email: email_val,
							message: message_val
						},
						function(status) {
							
							if(status == 'done') {
			
								form_height = form.height();
								form.height(form_height);

								form
									.addClass('sent')
									.find('*').remove()
									.end()
									.html('<p>I\'ve sent your message. David will reply asap. Thanks!</p>')
									.find('p').fadeIn('fast');
							}
						}
					);
				}
				else {
					form_title.html('Something is amiss, I\'ve marked the issues');
				}
			})
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

		

		// Waypoints
		$('#navigation a').addWaypoints();


		// Set height of last section to at least window height
		var last_nav = body.find('#navigation li:last-child a').attr('href'); // last nav

		var last_section_height = $(last_nav).height();
		var window_height = $(window).height();

		if (window_height > last_section_height) {
			body.find('#scrollfix').height((window_height - last_section_height) - 60);
		}


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

				var time_to_scroll = 250 + ((distance / 1000) * 50);


				// Set height of last section to at least window height
				var last_nav = body.find('#navigation li:last-child a').attr('href'); // last nav

				var last_section_height = $(last_nav).height();
				var window_height = $(window).height();

				if (window_height > last_section_height) {
					body.find('#scrollfix').height((window_height - last_section_height) - 60);
				}

				// do the scroll
				$.scrollTo(target_top, time_to_scroll, { easing: $.bez([.65, 0, .58, 1]) });
			}

		});
	
		//if ( ! $(window).scrollTop() ) $(window).trigger ( 'hashchange' );
		
		// Dropdown portfolio items

		// not for less than ie8
		if (!html.hasClass('lt-ie8')) {

			body.find('#portfolio article').folioDrop();
		}
		


		body.find('#contact_form').contactForm();
		
	});


    return null;

}(jQuery, this, this.document));