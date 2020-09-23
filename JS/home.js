// On load tasks
$(function(){
    // PreLoader
    $('.preloader svg').delay(2000).fadeOut('slow');
    $('.preloader p').delay(2500).fadeOut(1000);
    $('.preloader h1').delay(2000).fadeOut('slow');
    $('.preloader').delay(2300).fadeOut(1000);

    // Tagcloud sphere
    $('#tagcloud').tagoSphere(settings);
    //3D tag fade in
    $('#tagcloud').hide().delay(3600).fadeIn(5000);
    // Intro Bullet Points fade in
    $('.introBullets').hide().delay(3600).fadeIn(5000);
    // Paper Plane fade in
    $('#paperPlane').hide().delay(3600).fadeIn(5000);
})

// Forces page scroll up before page load
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});


// Typing Animation for website
var options = {
  strings: ['Hi, my name is'],
  typeSpeed: 50,
  backSpeed: 30,
  cursorChar: '_',
  startDelay: 3000,
};
var typed = new Typed('.introTyping', options);

// Tag Cloud settings (3D Sphere of known programming languages)

var settings = {
    height: 800,
    width: 800,
    radius: 250,
    speed: 1.5,
    slower: 0.8,
    timer: 10,
    fontMultiplier: 60,
    hoverStyle: {
        border:'none',
        color:'#e3dfe6'
    },
    mouseOutStyle: {
        border:'none',
        color:''
    }
};

// About me scroll animation

// Paper Airplane animation
const flightPath = {
    curviness: 1,
    autoRotate: true,
    values: [
        {x: 450, y: 70},
        {x: 600, y: 90},
        {x: 800, y: -100},
        {x: 500, y: -300},
        {x: 300, y: -100},
        {x: 450, y: 120},
        {x: 800, y: 120},
        {x: 1100, y: -200},
        {x: 1400, y: -200},
        {x: 1500, y: 600},
    ]
}

const tween = new TimelineLite();
var animBool = true;
$(document).scroll(function() {
    let scrollLeft = $(window).scrollTop()
    if(scrollLeft > 500 && animBool){
        $('#paperPlane').css("opacity","100%");
        animBool = false;
        tween.add(
            TweenLite.to('#paperPlane',8, {
                bezier: flightPath,
                ease: Power1.easeInOut,
            }, "paperPlane")
        )
    }
    if(scrollLeft < 500) {
        animBool = true;
        $('#paperPlane').css("bottom","100px");
        $('#paperPlane').css("left","-50px");
    }
});


// About me text scroll animations
$(document).scroll(function() {
    let scrollLeft = $(window).scrollTop(),
    amount = -100+(scrollLeft*0.2);
    if ($('body').width() > 700){
        if (amount < 5) {
            $('.onScroll_Letter').css("left", amount + "px");
            $('.onScroll_Letter').css("line-height",(210 - amount) + "px");
            
        }
        if (amount < 20){
            $('.onScroll_Period').css("right", (-15 + amount) + "px");
            $('.onScroll_Second').css("line-height",(303 - (amount*6)) + "px");
            // $('.aboutText').css("opacity",((amount*3) + 10) + "%");
        }
        else {
            $('.onScroll_Letter').css("left", "0px");
            $('.onScroll_Letter').css("line-height","200px");
            $('.onScroll_Period').css("right", "0px");
            $('.onScroll_Second').css("line-height","200px");
            $('.aboutText').css("opacity","100%");
        }
    }
});

// About button function to scroll down the page
function scrollDown() {
    window.scrollTo({ top: 900, behavior: 'smooth' })
}

// Mobile hamburger button to display nav
var $hamburger = $(".hamburger");
$hamburger.on("click", function(e) {
    let $sidenav = $('.sidenav');
    if ($hamburger.hasClass("is-active")) {
        $sidenav.css("visibility","hidden");
    }
    else $sidenav.css("visibility","visible");
    // Toggle active class
    $hamburger.toggleClass("is-active");
});
// To make the hamburger work with no resizing bugs I 
// have to control the visibility of the nav with 
// javascript and no media queries.
$(window).resize(function() {
    if ($('body').width() > 700) {
        console.log($('body').width())
        $('.sidenav').css("visibility","visible");
    }  
    if ($('body').width() < 700) {
        $('.sidenav').css("visibility","hidden");
        if($hamburger.hasClass("is-active")) {
            $hamburger.toggleClass("is-active");
        }
    }
});