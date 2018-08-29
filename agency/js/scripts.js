$(document).ready(function(){
    var scrollValue;
    var topValue;
    var idValue;
    var i;

    $(window).scroll(function(){
        scrollValue = $('body,html').scrollTop();
        if (scrollValue < 30) {
            topValue = 30 - scrollValue;
        } else {
            topValue = 0;
        }
        $('.menu').css('top', topValue + 'px');

        i = $('.main-menu__item').length - 1;
        while (i >= 0) {
            idValue = $('.main-menu__item:eq(' + i + ')').attr('id');
            var menuElement = $('[data-menu-item-content="' + idValue + '"]');
            if (scrollValue + 90 >= menuElement.offset().top) {
                if (!menuElement.hasClass('active')) {
                    $('.main-menu__item').removeClass('active');
                    $('#' + idValue).addClass('active');
                }
                break;
            };
            i--;
        }
    });

    $('.menu-toggle').click(function(){
        $(this).toggleClass('opened-menu');
        $('.main-menu').slideToggle();
    });

    $('.products-filter__name').click(function(){
        $('.products-filter__name.active').removeClass('active');
		$(this).addClass('active');
		$('.products__item:visible').hide();
		if ($(this).attr('id') == 'all') {
			$('.products__item').slideDown("slow");
		} else {
			$('.product-' + $(this).attr('id')).slideDown("slow");
		}
    })

    $('.team__preview').click(function(){
        $('.team__preview:hidden').show();
        $(this).hide();
        $('.team__photo:visible').hide();
        $('.photo-' + $(this).attr('id')).fadeIn("slow");
        $('.team__person:visible').hide();
        $('.person-' + $(this).attr('id')).fadeIn("slow");
    })

    $('.contact-button').click(function(){
        $('body,html').animate({scrollTop: $('.contacts').offset().top-90}, 500);
    })

    $('.main-menu__item').click(function(){
        idValue = $(this).attr('id');
        $('body,html').animate({scrollTop: $('[data-menu-item-content="' + idValue + '"]').offset().top-89}, 500);
    })
})