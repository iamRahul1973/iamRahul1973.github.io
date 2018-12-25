$(document).ready(function () {

    // -----------------------------------------------------
    // PRE LOADER
    // -----------------------------------------------------

    window.onload = function () {
        setTimeout(function () {
            $('#pre-loader-wrapper').fadeOut(1000, function () {
                $('#pre-loader-wrapper').remove();
            });
        }, 1000);
    };

    // -----------------------------------------------------
    // FADING OUT THE PRE-LOADER ON CLICKING THE BOX
    // -----------------------------------------------------

    $('#box').on('click', function () {
        $('#pre-loader-wrapper').fadeOut(1000, function () {
            $('#pre-loader-wrapper').remove();
        });
    });

    // -----------------------------------------------------
    // MY TOOLS
    // -----------------------------------------------------

    var owlTools = $('#owl-tools');

    owlTools.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ['<i class="far fa-hand-point-left"></i>', '<i class="far fa-hand-point-right"></i>'],
        navContainer: '.main-content .custom-nav',
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        },
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });

    // -----------------------------------------------------
    // MY PORTFOLIO
    // -----------------------------------------------------

    var owlFolio = $('#owl-folio');

    owlFolio.owlCarousel({
        dots: true,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    // -----------------------------------------------------
    // NAVIGATION SCROLL
    // -----------------------------------------------------

    var navbarHeight = $('.navbar').height();

    $('.nav-link').click(function (event) {
        var id = $(this).attr("href");
        var target = $(id).offset().top - (navbarHeight + 30);
        $('html, body').animate({
            scrollTop: target
        }, 500);
        event.preventDefault();
    });

    // -----------------------------------------------------
    // SENDING EMAIL
    // -----------------------------------------------------

    var emailForm = $('form#sendEmail');

    $(emailForm).on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        var spinner = '<div class="ajax-loader">' +
            '<div id="fountainG">' +
            '<div id="fountainG_1" class="fountainG"></div>' +
            '<div id="fountainG_2" class="fountainG"></div>' +
            '<div id="fountainG_3" class="fountainG"></div>' +
            '<div id="fountainG_4" class="fountainG"></div>' +
            '<div id="fountainG_5" class="fountainG"></div>' +
            '<div id="fountainG_6" class="fountainG"></div>' +
            '<div id="fountainG_7" class="fountainG"></div>' +
            '<div id="fountainG_8" class="fountainG"></div>' +
            '</div>' +
            '</div>';
        var submitBtn = $(emailForm).find('input:submit');

        $.ajax({
            url: 'https://webhorizon.000webhostapp.com/index.php/welcome/send_email',
            type: 'POST',
            dataType: 'JSON',
            data: formData,
            cache: false,
            beforeSend: function () {
                submitBtn.after(spinner);
                submitBtn.attr('disabled', 'disabled');
            },
            complete: function () {
                $('#fountainG').fadeOut('500');
                $('#fountainG').remove();
                submitBtn.removeAttr('disabled');
                emailForm.trigger('reset');
            }
        }).done(function (data) {
            if (data.status === true) {
                toastr.success('Thank you for contacting me !');
            } else {
                toastr.warning('Sorry ! The servers are down ! Try after sometimes !');
            }
        }).fail(function (data) {
            toastr.error('Sorry ! An Error Occurred !');
            console.log(data);
        });
    });
});

// -----------------------------------------------------
// HOURGLASS NAV-BRAND
// -----------------------------------------------------

// Animation to fill the hourglass
function hourglassFill() {
    let hourglass = document.getElementById('hourglass');
    hourglass.innerHTML = "&#xf251";

    // half
    setTimeout(function () {
        hourglass.innerHTML = "&#xf252";
    }, 1000);

    // end
    setTimeout(function () {
        hourglass.innerHTML = "&#xf253";
    }, 2000);

    // rotate
    setTimeout(function () {
        hourglass.classList.toggle('rotated');
    }, 3000);

    // rotate again to the original position
    setTimeout(function () {
        hourglass.classList.toggle('rotated');
        hourglass.innerHTML = "&#xf251";
    }, 3500);
}

hourglassFill();
setInterval(hourglassFill, 4000);