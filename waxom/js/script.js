$(document).ready(function(){
    $('.menu-toggle').click(function(){
        $('.main-menu').slideToggle();
    });

    function slider(classSlider) {
        var slideCount = $(classSlider + ' .slider__wrapper')["0"].children.length;
        $(classSlider + ' .slider__wrapper').css('width', slideCount * 100 + '%');
        $(classSlider + ' .slider__item').css('width', 'calc(' + 100 / slideCount + '%)');

        var currentSlide = 0;
        $(classSlider + ' .slider__pager:nth-child(' + (currentSlide+1) +')').addClass('slider__pager--active');

        function nextSlide () {
            if (currentSlide < slideCount-1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            translateWidth = -$(classSlider + ' .slider').width() * (currentSlide);
            $(classSlider + ' .slider__wrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            $(classSlider + ' .slider__pager').removeClass('slider__pager--active');
            $(classSlider + ' .slider__pager:nth-child(' + (currentSlide+1) +')').addClass('slider__pager--active');
        };

        $(classSlider + ' .slider__pager').click(function(){
            currentSlide = $(this).index();
            translateWidth = -$(classSlider + ' .slider').width() * currentSlide;
            $(classSlider + ' .slider__wrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            $(classSlider + ' .slider__pager').removeClass('slider__pager--active');
            $(classSlider + ' .slider__pager:nth-child(' + (currentSlide+1) +')').addClass('slider__pager--active');
        });

        $(classSlider + ' .slider__go-prev').click(function(){
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = slideCount;
            }
            translateWidth = -$(classSlider + ' .slider').width() * currentSlide;
            $(classSlider + ' .slider__wrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            $(classSlider + ' .slider__pager').removeClass('slider__pager--active');
            $(classSlider + ' .slider__pager:nth-child(' + (currentSlide+1) +')').addClass('slider__pager--active');
        })

        $(classSlider + ' .slider__go-next').click(function(){
            if (currentSlide < slideCount) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            translateWidth = -$(classSlider + ' .slider').width() * currentSlide;
            $(classSlider + ' .slider__wrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            $(classSlider + ' .slider__pager').removeClass('slider__pager--active');
            $(classSlider + ' .slider__pager:nth-child(' + (currentSlide+1) +')').addClass('slider__pager--active');
        });

        setInterval(nextSlide, 4000);
    }

    slider('.header');

    $('.portfolio-filter__item').click(function(){
        var menuItem = $(this).attr('data-portfolio-menu');
        $('.portfolio-filter__item').removeClass('portfolio-filter__item--active');
        $(this).addClass('portfolio-filter__item--active');
        $('.portfolio__item:visible').hide();
        if (menuItem != 'all') {
            $('.portfolio__item[data-portfolio-type=' + menuItem + ']').fadeIn();
        } else {
            $('.portfolio__item').fadeIn();
        }
    })

    $('.video__play').click(function(){
        $('.video__file')["0"].play()
        $('.video__file').attr('controls', 'controls');
        $('.video__file').animate({'opacity': 1}, 400);
        $('.video__text-wrapper').hide();
        $('.video').css('background-image', 'linear-gradient(to right, #211b19 0%, #4e3427 100%)');
    });
})