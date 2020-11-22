// Pre loader delay animation
$(function(){
    $('.preloader svg').delay(2000).fadeOut('slow');
    $('.preloader p').delay(2500).fadeOut(1000);
    $('.preloader').delay(2300).fadeOut(1000);
});

// Card showcase scrolling animation by moving your mouse over the cards
// Calculates the mouse position when the mouse is over the card section element.
// I created an arbitrary equation to calculate the rate of the card movement to
// the left and right respectively. Asnyc functions and promises are used to 
// prevent the function from being called too rapidly causing jittery movements.
$(document).ready(function() {
    setTimeout(function() {
        let section = $('section'),
        mouseLeftSide = false,
        mouseRightSide = false;
        var mouseX = 0
        section.mousemove(function(event){
            mouseX = event.pageX;
        });
        section.mousemove(async function(event) {
            // Check if mouseX is to the right of the screen
            if (mouseX > $('body').width()/2.5){
                if (!mouseLeftSide){
                    mouseLeftSide = true;
                    let stop = false;
                    while(mouseLeftSide && !stop && section.scrollLeft() < section.width()){
                        section.mouseleave(function(){
                            stop = true;
                        });
                        await new Promise(resolve => setTimeout(resolve, 10));
                        section.scrollLeft(section.scrollLeft() + Math.pow(10,mouseX/100)*.0000001);
                    }
                }
            }
            else{
                mouseLeftSide = false;
            }
            // Check if mouseX is to the left of the screen
            if (mouseX < 150){
                if (!mouseRightSide){
                    mouseRightSide = true;
                    let stop = false;
                    while(mouseRightSide && !stop && section.scrollLeft() > 1){
                        section.mouseleave(function(){
                            stop = true;
                        });
                        await new Promise(resolve => setTimeout(resolve, 10));
                        section.scrollLeft(section.scrollLeft() - Math.pow(1.5,1/((mouseX + 1.5)/10))*3);
                    }
                }
            }
            else{
                mouseRightSide = false;
            }
        });
    }, 2000);
});

// Refreshes the page to prevent issue where the cards freeze after "View Project" click
// The timeout waits 100ms to allow the page to navigate to the project before refreshing.
function refreshCards(){
    setTimeout(function(){ location.reload(); }, 100);
    return false;
}
