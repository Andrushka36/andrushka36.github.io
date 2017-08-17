$(document).ready(function(){
	$('li').click(function(){
		var section = $(this).attr('id');
		var height = $('nav .container').height();
		$('body,html').animate({scrollTop: $('.'+section).offset().top-height}, 200);
		$('input:checkbox').prop('checked',false);
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
	
	$('.send-request').click(function(){
		$('.request-form').addClass('show-form');
	});
	
	$('body').click(function(e){
		if (e.target.className == 'request-form show-form' || e.target.className == 'close-icon') {
			$('.request-form').removeClass('show-form');
		}
	})
});
	