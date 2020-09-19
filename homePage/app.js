// Preloader for Website
$(window).on('load',function(){
    $('.preloader svg').delay(2000).fadeOut('slow');
    $('.preloader p').delay(2500).fadeOut(1000);
    $('.preloader h1').delay(2000).fadeOut('slow');
    $('.preloader').delay(2300).fadeOut(1000);
})


// Typing Animation for website
var options = {
  strings: ['Hi, my name is'],
  typeSpeed: 50,
  backSpeed: 30,
  cursorChar: '_',
  startDelay: 2800,
};
var typed = new Typed('.introTyping', options);

// Tag Cloud (3D Sphere) of programming languages

var settings = {
    height: 700,
    width: 700,
    radius: 250,
    speed: 1.5,
    slower: 0.8,
    timer: 10,
    fontMultiplier: 80,
    hoverStyle: {
        border:'none',
        color:'#e3dfe6'
    },
    mouseOutStyle: {
        border:'none',
        color:''
    }
};
$(document).ready(function(){
    $('#tagcloud').tagoSphere(settings);
    $('.about').hide().delay(3400).fadeIn(5000);
    //Delayed load in for 3D tag
    $('#tagcloud').hide().delay(3400).fadeIn(5000);
});
