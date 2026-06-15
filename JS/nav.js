$(function() {
    var $hamburger = $(".hamburger");
    var $overlay = $('#mobileMenuOverlay');

    $hamburger.on("click", function(e) {
        if ($hamburger.hasClass("is-active")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu on link click
    $('.mobile-nav-link').on('click', function() {
        closeMobileMenu();
    });

    function openMobileMenu() {
        $overlay.addClass("active");
        $hamburger.addClass("is-active");
    }

    function closeMobileMenu() {
        $overlay.removeClass("active");
        $hamburger.removeClass("is-active");
    }

    $(window).resize(function() {
        if ($(window).width() > 768) {
            closeMobileMenu();
        }
    });
});
