// Pre loader delay animation
$(function(){
    $('.preloader svg').delay(2000).fadeOut('slow');
    $('.preloader p').delay(2500).fadeOut(1000);
    $('.preloader').delay(2300).fadeOut(1000);
})

// Card showcase scrolling animation by moving your mouse over the cards
$(document).ready(function() {
    setTimeout(function() {
        let section = $('section');
        section.mousemove(function(event) {
            var mouseX = event.pageX,
            offset = $('body').width() * .25;
            // animate here to make scrolling smoother -- 15ms animation is ideal to prevent stuttering
            section.animate({scrollLeft: (5000 / $('body').width() * ((mouseX - offset)/2))},15);
        });
    }, 2000);
});
