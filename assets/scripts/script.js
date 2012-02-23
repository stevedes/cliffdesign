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

	function scrollto ( $this )
  {
    if ( ! $this.hash ) return ( "" );
    var $this_hash = $($this.hash);
    if ( ! $this_hash ) return ( "" );
    var $parent1 = $this_hash.closest ( '.noscroll' );
    if ( $parent1.length )
    {
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

		$.scrollTo(target_top, time_to_scroll, { easing: $.bez([.59,.17,.39,1.19]) });

		/*
		$('html, body').animate(
			{ scrollTop: target_top },
			time_to_scroll,
			$.bez([.59,.17,.39,1.19]),
			function() {
			
				window.location.hash = e;
			}
		);
		*/
	}

	 function scrollableElement(els) {
	    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	      var el = arguments[i],
	          $scrollElement = $(el);
	      if ($scrollElement.scrollTop()> 0) {
	        return el;
	      } else {
	        $scrollElement.scrollTop(1);
	        var isScrollable = $scrollElement.scrollTop()> 0;
	        $scrollElement.scrollTop(0);
	        if (isScrollable) {
	          return el;
	        }
	      }
	    }
	    return [];
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

		/*
		body.find('#navigation a').click(function(e) {
			
			

			var targ = $(this).attr('href');

			location.hash = targ;

			e.preventDefault();
			//cliffScroll(targ);

			return false;
		});
		*/

		$('a[href*="#"]').click ( function(e)
  {
    var $this = this, $this_hash = scrollto ( this );
    // Determine applicable cases:
    if ( ! e.isDefaultPrevented() && $this_hash.length )
    {
      e.preventDefault();

      if ( location.hash == $this.hash )
      {
        // Reclick case is special:
        $(window).trigger ( 'hashchange' );
      }
      else
      {
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

		var scrollElem = scrollableElement('html', 'body');

		$(window).hashchange( function(event){

			var $this = location, $this_hash = scrollto ( location );

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

				var time_to_scroll = 300 + ((distance / 1000) * 300);

				$.scrollTo(target_top, time_to_scroll, { easing: $.bez([.59,.17,.39,1.19]) });
			}
			
          /*
			alert('hello');

			cliffScroll(location.hash);

			event.preventDefault();
			*/

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
			
	
		});
				
	
		if ( ! $(window).scrollTop() ) $(window).trigger ( 'hashchange' );

	});


    return null;

}(jQuery, this, this.document));