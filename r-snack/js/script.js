var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('video', {
		height: '315',
		width: '560',
		videoId: 'zqW380RZsnE'
	});
}
					
document.ready = function() {
	$('.open-block').click(function(){
		$('.opened-block').each(function(){
			if ($(this).css('display') == 'block') {
				$('.opened-block').css('display', 'none');
			}
		});
		var nameBlock = $(this).attr('id');
		var id = 'block-' + nameBlock;
		$('#' + id).css('display', 'block');
		if (nameBlock == 'delivery' || nameBlock  == 'photo' || nameBlock  == 'photo' || nameBlock  == 'social' || nameBlock  == 'question') {
			$('#black-background').css('display', 'block');
			$('#main').addClass('alerting');
			if ($('#image-background').css('display') == 'block') $('#image-background').css('display', 'none');
		} else if (nameBlock == 'about' || nameBlock == 'product') {
			$('#image-background').css('display', 'block');
			$(".logo").css({"width":"274px", "height":"160px", "right":"120px"});
			if ($('#black-background').css('display') == 'block') $('#black-background').css('display', 'none');
			if ($('#main').hasClass('alerting')) $('#main').removeClass('alerting');
		}
	});
	
	$('.close').click(function(){
		$('.opened-block').css('display', 'none');
		var nameBlock = $(this).parent().attr("id");
		if (nameBlock == 'block-delivery' || nameBlock  == 'block-photo' || nameBlock  == 'block-social' || nameBlock  == 'block-question') {
			$('#black-background').css('display', 'none');
			$('#main').removeClass('alerting');
		} else if (nameBlock == 'block-about' || nameBlock == 'block-product') {
			$('#image-background').css('display', 'none');
			$(".logo").css({"width":"400px", "height":"234px", "right":"20px"});
			player.pauseVideo();
		}
	});
	
	$('.hide-text__title').click(function(){
		$(this).toggleClass('hide-text__show');
	});
	
	$("#why-we").addClass("active");
	$("#healthy").addClass("active");
	$(".text-healthy").show();
	
	$('.sub-link').click(function(){
		$(this).addClass('active')
		.siblings('.active').removeClass('active');
		var nameBlock = $(this).attr('id');
		var id = 'text-' + nameBlock;
		$('.' + id).slideDown("fast")
		.siblings(".information:visible").hide();
	});
	
	$('.main-image').click(function(){
		$('.active').removeClass('active');
		$('.information:visible').hide();
		$(this).addClass('active')
		.siblings().children(':first-child').addClass('active');
		var nameBlock = $(this).attr('id');
		var id = 'text-' + nameBlock;
		$('.' + id).children(':first-child').slideDown("fast");
	})
	
	$('.button-product__item').click(function(){
		$(this).addClass('active')
		.siblings().removeClass('active');
		var nameBlock = $(this).attr('id');
		var id = nameBlock + '-product';
		$('.' + id).addClass('show')
		.siblings('.show').removeClass('show');
	})
	
	$('.product-item').click(function(){
		var nameBlock = $(this).attr('id');
		var id = nameBlock + '-block';
		$('#' + id).css('display','block');
		$('.close').css('display','none');
	})
	
	$('.menu-close').click(function(){
		$('.product-block:visible').css('display','none');;
		$('.close').css('display','block');
	})
}

window.onload=function() {
	function CSSLoad(file) {
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", file);
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	CSSLoad('css/second-style.css');
}