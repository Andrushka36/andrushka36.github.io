$(document).ready(function(){
	$('.menu-toggle').click(function(){
		$(this).toggleClass('opened');
		$('.menu').toggleClass('active')
	})
	
	$('.bxslider').bxSlider({
		mode: 'fade',
		speed: 1000,
		auto: true
	});
});
	