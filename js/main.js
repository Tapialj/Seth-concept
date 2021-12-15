

/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function() {

    //window and animation items
    var animation_elements = $.find('.animation-element');
    var web_window = $(window);
  
    //check to see if any animation containers are currently in view
    function check_if_in_view() {
        //get current window information
        var window_height = web_window.height();
        var window_top_position = web_window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
    
        //iterate through elements to see if its in view
        $.each(animation_elements, function() {
    
            //get the element sinformation
            var element = $(this);
            var element_height = $(element).outerHeight();
            var element_top_position = $(element).offset().top;
            var element_bottom_position = (element_top_position + element_height);
    
            //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position))
            {
            element.addClass('in-view');
            }
        });
  
    }


    function expandMenu() {
        $(".primary-nav").toggleClass("menu-expand");
        $(".dropdown").toggleClass("menu-open");
        $(this).toggleClass("menu-open");

        //Remove nav-shift if close is clicked to reset menu
        $(".primary-nav").removeClass("nav-shift");
        $(".dropdown-content").removeClass("nav-shift");
    }

    function mobileGalleryMenu(e) {
        const dropdownClasses = $(".dropdown").attr("class").split(/\s+/);

        $.each(dropdownClasses, function(i, attr) {
            if(attr === "menu-open") {
                e.preventDefault();
                $(".primary-nav").toggleClass("nav-shift");
                $(".dropdown-content").toggleClass("nav-shift");
            }
        });
    }
  
    //on or scroll, detect elements in view
    $(window).on('scroll resize', function() {
        check_if_in_view()
    })
    
    //trigger our scroll event on initial load
    $(window).trigger('scroll');

    //Expand menu on menu button click
    $(".mobile-menu").click(expandMenu);

    //Slide menu over if my galleries is clicked to show my galleries or if back button is hit to return to main nav
    $(".dropdown-btn").click(mobileGalleryMenu);
    $(".fa-chevron-left").click(mobileGalleryMenu);

});