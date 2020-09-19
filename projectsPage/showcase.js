// // Card showcase scrolling animation by moving your mouse over the cards
$(document).ready(function() {
    setTimeout(function() {
        let section = $('section');
        section.mousemove(function(event) {
        var mouseX = event.pageX,
        offset = $('body').width() * .15;
        section.scrollLeft(5000 / $('body').width() * ((mouseX - offset)/2));
        });
    }, 2000);
});
