$(document).ready(function(){
    $('.menu-toggle').click(function(){
        $(this).toggleClass('opened-menu');
        $('.main-menu').slideToggle();
    });

    $('.play-video').click(function(){

        $('#video')["0"].play();
        $('#video').attr('controls', 'controls');
        $('.play-video-wrapper').hide();
    });

    $('.portfolio__inner').hover(
        function(){
            $(this).children('.portfolio-add').css('display', 'flex');
            $(this).children('.portfolio__details').fadeIn("100");
        },
        function(){
            $(this).children('.portfolio-add').hide();
            $(this).children('.portfolio__details').fadeOut("100")
        }
    );

    $('.team__item').hover(
        function(){
            $('.triangle:visible').hide();
            $('.person-details:visible').hide();
            $(this).parent().next('.person-details').fadeIn("200");
            $(this).children('.triangle').fadeIn("200");
        },
        function () {
        }
    );

    var currentSlide = 0;
    var sliderCount = 4;
    var sliderWidth;
    $('.testimonials-slider__wrapper').css('width', sliderCount * 100 + '%');
    $('.testimonials-slider__item').css('width', 'calc(100%/' + sliderCount + ')');

    function goSlider() {
        if (currentSlide < sliderCount-1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        sliderWidth =  $('.testimonials-slider').width();
        $('.testimonials-slider__wrapper').css({
            'transform': 'translate(-' + currentSlide * sliderWidth + 'px,0)',
            '-webkit-transform': 'translate(-' + currentSlide * sliderWidth + 'px,0)',
            '-ms-transform': 'translate(-' + currentSlide * sliderWidth + 'px,0)'
        });
        $('.testimonials-slider__button.active').removeClass('active');
        $('.testimonials-slider__button:eq(' + currentSlide +')').addClass('active');
    }

    setInterval(goSlider, 4000);

    $('.testimonials-slider__button').click(function(){
        $('.testimonials-slider__button.active').removeClass('active');
        $(this).addClass('active');
        currentSlide = $(this).index();
        sliderWidth =  $('.testimonials-slider').width();
        $('.testimonials-slider__wrapper').css({
            'transform': 'translate(-' + currentSlide * sliderWidth + 'px,0)',
            '-webkit-transform': 'translate(-' + currentSlide * sliderWidth + 'px,0)',
            '-ms-transform': 'translate(-' + currentSlide * sliderWidth + 'px,0)'
        })
    })
});