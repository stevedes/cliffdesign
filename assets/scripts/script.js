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
    $.easing.easeOutBack = function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	};

	var cliffScroll = function(e) {
		
		var target_top = $(e).offset().top;
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

		var time_to_scroll = 300 + ((distance / 1000) * 300);

		$('html, body').animate(
			{ scrollTop: target_top },
			time_to_scroll,
			$.bez([.59,.17,.39,1.19]),
			function() {
			
				window.location.hash = e;
			}
		);

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


		body.find('#scrollfix').height($(window).height());

		body.find('#navigation a').click(function(e) {
			
			e.preventDefault();

			var targ = $(this).attr('href');

			//window.location.hash = targ;

			cliffScroll(targ);

			//return false;
		});
		
		$(window).hashchange( function(event){

			event.preventDefault();

			/*
		
			var target_top = $(location.hash).offset().top;
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

			var time_to_scroll = 300 + ((distance / 1000) * 300);

			$('html, body').animate(
				{ scrollTop: 29 },
				500
			);

			*/
			cliffScroll(location.hash);
	
		});
				
	
		

	});


    return null;

}(jQuery, this, this.document));