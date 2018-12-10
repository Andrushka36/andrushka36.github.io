$(document).ready(function(){
	$('.menu-toggle').click(function(){
		$(this).toggleClass('opened-menu');
		if ($('.main-menu').css('display') == 'none') {
			$('.main-menu').show(600);
		} else {
			$('.main-menu').hide(600);
		}
	})
		 
	$('.main-menu__item').click(function(){
		var section = $(this).attr('id');
		$('body,html').animate({scrollTop: $('.'+section).offset().top}, 600);
		$('.menu-toggle').removeClass('opened-menu');
		$('.main-menu').hide();
	});
	
	$('.button-contact').click(function(){
		$('body,html').animate({scrollTop: $('.contact-us').offset().top}, 600);
	})
	
	function slider(classSlider) {
		var slideCount = $(classSlider + ' .slider__wrapper').children.length+1;
		$(classSlider + ' .slider__wrapper').css('width', slideCount*100 + '%');

		var currentSlide = 1;
		$(classSlider + ' .slider__pager:nth-child(' +currentSlide+')').addClass('slider__current');

		function nextSlide () {
			if (currentSlide >= slideCount) {
				$(classSlider + ' .slider__wrapper').css('transform', 'translate(0,0)');
				currentSlide = 1;
			} else {
				translateWidth = -$(classSlider + ' .slider__viewport').width() * (currentSlide);
				$(classSlider + ' .slider__wrapper').css({
					'transform': 'translate(' + translateWidth + 'px, 0)',
					'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
					'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
				});
				currentSlide++;
			}
			$(classSlider + ' .slider__pager').removeClass('slider__current');
			$(classSlider + ' .slider__pager:nth-child(' +currentSlide+')').addClass('slider__current');
		};

		$(classSlider + ' .slider__pager').click(function(){
			var numberSlide = $(this).index();
			translateWidth = -$(classSlider + ' .slider__viewport').width() * (numberSlide);
			$(classSlider + ' .slider__wrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			currentSlide = numberSlide + 1;
			$(classSlider + ' .slider__pager').removeClass('slider__current');
			$(classSlider + ' .slider__pager:nth-child(' +currentSlide+')').addClass('slider__current');
		})

		setInterval(nextSlide, 2000);
	}
	
	slider('.about-us__slider');
	
	slider('.what-they-say__photo');
	
	$('.show-detail').click(function(){
		$(this).parent().css('display', 'none');
		$(this).parent().next().css('display', 'table-cell');
	});
	
	$('.cross').click(function(){
		$(this).parent().css('display', 'none');
		$(this).parent().prev().css('display', 'table-cell');
	});
	
	$('.show-content').click(function(){
		if ($(this).siblings('.content').css('display') == 'none') {
			$(this).removeClass('hidden-content');
			$(this).text('HIDE CONTENT');
		} else {
			$(this).addClass('hidden-content');
			$(this).text('SHOW CONTENT');
		}
		
	});
	
	$('.button-up').click(function(){
		$('body,html').animate({scrollTop: 0}, 600);
	});
	
	$('.small-team__wrapper').hover(
		function(){
			$(this).children('.small-team__about').show(400);
		},
		function(){
			$(this).children('.small-team__about').hide(400);
		}		
	);
	
	var currentPhotoSlide = 1;
	var photoSliderCount = $('.what-they-say-slider >  .what-they-say-slider__viewport > .what-they-say-slider__wrapper').children.length+1;
	$('.what-they-say-slider >  .what-they-say-slider__viewport > .what-they-say-slider__wrapper').css('width', photoSliderCount*100 + '%');
	$('.next-slide').click(function(){
		if (currentPhotoSlide >= photoSliderCount) {
			$('.what-they-say-slider >  .what-they-say-slider__viewport > .what-they-say-slider__wrapper').css('transform', 'translate(0,0)');
			currentPhotoSlide = 1;
		} else {
			translateWidth = -$('.what-they-say-slider >  .what-they-say-slider__viewport').width() * (currentPhotoSlide);
			$('.what-they-say-slider >  .what-they-say-slider__viewport > .what-they-say-slider__wrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			currentPhotoSlide++;
		}		
	})
	
	$('.prev-slide').click(function(){
		if (currentPhotoSlide <= 1) {
			currentPhotoSlide = photoSliderCount;
		} else {
			currentPhotoSlide--;
		};
		translateWidth = -$('.what-they-say-slider >  .what-they-say-slider__viewport').width() * (currentPhotoSlide - 1);
		$('.what-they-say-slider >  .what-they-say-slider__viewport > .what-they-say-slider__wrapper').css({
			'transform': 'translate(' + translateWidth + 'px, 0)',
			'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
			'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
		});
	})
	
	$('.form-row__input').focus(function(){
		$(this).siblings('.form-row__label').css({
			'top': '0',
			'font-size': '12px',
		})
	})
	
	$('.form-row__input').focusout(function(){
		if ($(this).val() == '') {
			$(this).siblings('.form-row__label').css({
				'top': '15px',
				'font-size': '15px',
			})
		}
	})
	
	$('.form-row__textarea').focus(function(){
		$(this).siblings('.form-row__label').css({
			'top': '0',
			'font-size': '12px',
		})
	})
	
	$('.form-row__textarea').focusout(function(){
		if ($(this).val() == '') {
			$(this).siblings('.form-row__label').css({
				'top': '15px',
				'font-size': '15px',
			})
		}
	})
});

$(window).scroll(function() {
	if ($('html').scrollTop() > 1200 & $('.button-up').css('display') == 'none') {
		$('.button-up').show(400);
	}
	if ($('html').scrollTop() < 1200 & $('.button-up').css('display') == 'block') {
		$('.button-up').hide(400);
	}
});