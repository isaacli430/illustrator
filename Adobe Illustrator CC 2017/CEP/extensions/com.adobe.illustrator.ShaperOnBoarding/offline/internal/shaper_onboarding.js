(function($) {
$.fn.swipe = function(options) {
    // Default thresholds & swipe functions
    var defaults = {
        threshold: {
            x: 20,
            y: 640
        },
        swipeLeft: function() { alert('swiped left') },
        swipeRight: function() { alert('swiped right') },
        preventDefaultEvents: true
    };

    var final_options = $.extend(defaults, options);

    if (!this) return false;

    return this.each(function() {

        var me = $(this)

        // Private variables for each element
        var originalCoord = { x: 0, y: 0 }
        var finalCoord = { x: 0, y: 0 }

        // Screen touched, store the original coordinate
        function touchStart(event) {
            console.log('Starting swipe gesture...')
            originalCoord.x = event.targetTouches[0].pageX
            originalCoord.y = event.targetTouches[0].pageY
        }

        // Store coordinates as finger is swiping
        function touchMove(event) {
            if (final_options.preventDefaultEvents)
                event.preventDefault();
            finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
            finalCoord.y = event.targetTouches[0].pageY
        }

        // Done Swiping
        // Swipe should only be on X axis, ignore if swipe on Y axis
        // Calculate if the swipe was left or right
        function touchEnd(event) {
            console.log('Ending swipe gesture...')
            var changeY = originalCoord.y - finalCoord.y
            if(changeY < final_options.threshold.y && changeY > (final_options.threshold.y*-1)) {
                changeX = originalCoord.x - finalCoord.x

                if(changeX > final_options.threshold.x) {
                    final_options.swipeLeft()
                }
                if(changeX < (final_options.threshold.x*-1)) {
                    final_options.swipeRight()
                }
            }
        }

        // Swipe was canceled
        function touchCancel(event) { 
            console.log('Canceling swipe gesture...')
        }

        // Add gestures to all swipable areas
        this.addEventListener("touchstart", touchStart, false);
        this.addEventListener("touchmove", touchMove, false);
        this.addEventListener("touchend", touchEnd, false);
        this.addEventListener("touchcancel", touchCancel, false);

    });
};
})(jQuery);

$(document).ready(function () {					
  var cs = new CSInterface();
  // Get properties according to current locale of host application.
  var resourceBundle = cs.initResourceBundle();	
});	