/**
 * Slideshow plugin
 * 
 * @param {string} elementSelector
 * @param {number} [interval=3000]      - time in ms between the automatic slides
 * @param {boolean} [pauseOnHover=true] - determines if the automatic sliding should pause when hovering the slideshow
 * @param {boolean} [controls=true]     - determines if the slideshow should have prev and next buttons
 */
var createSlideshows = function(elementSelector, interval, pauseOnHover, controls) {
    // defaults
    interval = interval || 3000;
    pauseOnHover = pauseOnHover || true;
    controls = controls || true;

    var slideshows = document.querySelectorAll(elementSelector);
    var slideFnc = function(slideshow) {
        var currSlide = parseInt(slideshow.getAttribute("data-currSlide"));
        var slideCount = slideshow.children.length;
        var nextSlide = (currSlide + 1) % slideCount;

        // slide to the next slide
        slideshow.style.left = nextSlide * -100 + "%";
        slideshow.setAttribute("data-currSlide", nextSlide);
    };
    var autoSlideInterval = [];

    function autoSlide(slideshow) {
        autoSlideInterval.push(setInterval(slideFnc, interval, slideshow));
    }

    function setHoverEvents(slideshowNum) {
        slideWrapper.addEventListener("mouseover", function() {
            clearInterval(autoSlideInterval[slideshowNum]);
        });

        slideWrapper.addEventListener("mouseout", function() {
            autoSlideInterval[slideshowNum] = setInterval(slideFnc, interval, this);
        });
    }

    function createControls() {
        // code
    }

    // loop through every slideshow element
    for (var i = 0; i < slideshows.length; i++) {
        var slideWrapper = slideshows[i].querySelector('.img-wrapper');
        var slideCount = slideWrapper.children.length;

        // set correct wrapper width, needed for sliders that don't have 5 slides
        slideWrapper.style.width = slideCount * 100 + "%";
        slideWrapper.setAttribute("data-currSlide", 0);

        autoSlide(slideWrapper);

        if (pauseOnHover) {
            setHoverEvents(i);
        }
    }
};