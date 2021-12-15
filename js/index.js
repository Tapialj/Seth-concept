class Slideshow 
{
    constructor()
    {
        this.initSlides();
        this.initSlideshow();
    }

    initSlides()
    {
        this.container = $("[data-slideshow]");
        this.slides = this.container.find("div");
        this.slides.each((index, slide) => {
            $(slide).attr("data-slide", index);
        });
    }

    initSlideshow()
    {
        this.imagesLoaded = 0;
        this.currentIndex = 0;
        this.setNextSlide();
        this.slides.each((index, slide) => {
            $("<div>").on("load", $.proxy(this.loadImage(), this));
        });
    }

    loadImage()
    {
        this.imagesLoaded++;
        
        if(this.imagesLoaded >= this.slides.length)
        {
            this.playSlideshow();
        }
    }

    setNextSlide()
    {
        this.nextSlide = this.container.find(`[data-slide="${this.currentIndex}"]`).first();
        this.nextSlide.addClass("next");
    }

    playSlideshow()
    {
        this.slideshow = window.setInterval(() => {
            this.performSlide()
        }, 3500);
    }

    performSlide()
    {
        if(this.prevSlide)
        {
            this.prevSlide.removeClass("prev fade");
        }
        
        this.nextSlide.removeClass("next");
        this.prevSlide = this.nextSlide;
        this.prevSlide.addClass("prev");
        this.currentIndex++;

        if(this.currentIndex >= this.slides.length)
        {
            this.currentIndex = 0;
        }

        this.setNextSlide();
        this.prevSlide.addClass("fade");
    }

}

$(function ()
{
    //Expand menu on menu button click
    $(".mobile-menu").click(expandMenu);

    function expandMenu() {
        $(".primary-nav").toggleClass("menu-expand");
        $(".dropdown").toggleClass("menu-open");
        $(this).toggleClass("menu-open");

        //Remove nav-shift if close is clicked to reset menu
        $(".primary-nav").removeClass("nav-shift");
        $(".dropdown-content").removeClass("nav-shift");
    }

    //Slide menu over if my galleries is clicked to show my galleries or if back button is hit to return to main nav
    $(".dropdown-btn").click(mobileGalleryMenu);
    $(".fa-chevron-left").click(mobileGalleryMenu);

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

    new Slideshow();
});

/*
let slideIndex = 0;

showSlides();

function showSlides() 
{
    let slides = document.getElementsByClassName("slide");

    for(let i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if(slideIndex > slides.length)
    {
        slideIndex = 1;
    }

    slides[slideIndex-1].style.display = "block";

    setTimeout(showSlides, 2000);
}
*/