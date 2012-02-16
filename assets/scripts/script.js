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

		body.find('#navigation a').click(function() {
			
			var target = $(this).attr('href');
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
			//alert($(window).scrollTop());

			//$('html, body').scrollTo(target, 650, {easing: $.bez([.75,.36,.35,1.16])});

			var time_to_scroll = 200 + ((distance / 1000) * 400);

			//alert(time_to_scroll);

			$('html, body').animate({
			    scrollTop: target_top
			}, time_to_scroll, $.bez([.59,.04,.35,1.16]));
			
			return false;
		});
		

		

	});


    return null;

}(jQuery, this, this.document));