$(document).ready( function(){

	$('.tab_link').on('click', function(e){
			
		e.preventDefault();

		var itemTabLink = $(this).closest('.tab_link'),
			contentItem = $('.tab_content'),
			itemPosition = itemTabLink.index();

		contentItem.eq( itemPosition ).add( itemTabLink ).addClass('active').siblings().removeClass('active');
	});


	$(window).resize(function() {
		if ($(window).width() > 950) {
			$('.header_menu').css('display', 'block');
			$('.button_menu').css('display', 'none');
			$('.button_menu').removeClass('close');
		} else {
			$('.header_menu').css('display', 'none');
			$('.button_menu').css('display', 'block');
			$('.button_menu').removeClass('close');
			$('.button_menu .button_open').css('display', 'block');
			$('.button_menu .button_close').css('display', 'none');
		}

    });

	$('.button_menu').on('click', function(e){
			
		e.preventDefault();

		if ($('.button_menu').hasClass('close')) {

			$('.button_menu').removeClass('close');
			$('.button_menu .button_open').css('display', 'block');
			$('.button_menu .button_close').css('display', 'none');
			$('.header_menu').css('display', 'none');
		}
		else {

			$('.button_menu').addClass('close');
			$('.button_menu .button_open').css('display', 'none');
			$('.button_menu .button_close').css('display', 'block');
			$('.header_menu').css('display', 'block');
		}

	});


	var images = $('.portfolio .image img');

	for(var i = 0; i < images.length; i++ ){

		var img = $('.portfolio .image:eq(' + i + ') img');
			src = $('.portfolio .image:eq(' + i + ') img').attr('src'),
			par = img.parent();
		
		img.remove();
		par.css('background', 'url("' + src + '")');
		par.css('background-size', 'cover');
		par.css('background-repeat', 'no-repeat');
		par.css('background-position', 'center center');

		
	}

	var discountsImages = $('.discounts .item .image img');

	for(var i = 0; i < discountsImages.length; i++ ){

		var img = $('.discounts .item .image:eq(' + i + ') img');
			src = $('.discounts .item .image:eq(' + i + ') img').attr('src'),
			par = img.parent();
		
		img.remove();
		par.css('background-image', 'url("' + src + '")');
	}

});