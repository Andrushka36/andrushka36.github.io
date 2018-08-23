var i;
var browserHeight;
var currentElement;
var idValue;

$(document).ready(function(){
    $('.menu-toggle').click(function(){
        $(this).toggleClass('opened-menu');
        $('.main-menu').slideToggle();
    });

    $('.main-menu__item').click(function(){
        idValue = $(this).attr('id');
        if (idValue != 'home') {
            $('body,html').animate({scrollTop: $('.' + idValue).offset().top}, 500);
        } else {
            $('body,html').animate({scrollTop: 0}, 500);
        }
    })
})

$(document).scroll(function() {
    browserHeight = $(window).height() / 3;
    i = $('.about__item').length - 1;
    while (i >= 0) {
        currentElement = $('.about__item:eq(' + i + ')');
        if ($('body,html').scrollTop() + browserHeight >= currentElement.offset().top) {
            if (!currentElement.hasClass('about__item--active')) {
                $('.about__item').removeClass('about__item--active');
                currentElement.addClass('about__item--active');
            }
            break;
        };
        i--;
    }
})