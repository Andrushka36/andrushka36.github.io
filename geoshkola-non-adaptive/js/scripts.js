jQuery(document).ready(function(){
	
	$('.fancybox').fancybox();

	$('li').click(function(){
		var section = $(this).attr('id');
		$('body,html').animate({scrollTop: $('.'+section).offset().top-60}, 200);	
	});
 
	$('#text-to-find').change(function(){
		$('.search').attr('n', -1);
	});
 
	$('.find-text').click(function(){
		var text = $('#text-to-find').val();
		$('body').removeHighlight();
		$('body').highlight(text);
		var k = +$('.search').attr('n');	
		if (k == -1) {
			$('body,html').animate({scrollTop: $('span.highlight:first').offset().top-100}, 200);
		} else {
			$('body,html').animate({scrollTop: $('span.highlight:gt('+k+'):first').offset().top-100}, 200);
		};	
		$('.search').attr('n', k+1);
	});
 
	$('.delete-text').click(function(){
		$('body').removeHighlight();
		$('#text-to-find').val('');
	});
	
	$(document).scroll(function(){
		var dif = $('header').offset().left;
		$('.header-line').css('margin-left', '-'+dif);
	});
});

