$(window).on('load', function(){
	$('body').removeClass('cursor-progress');
});

const DATA_POPUP_OPEN = {
	init: function (name) {
		this.action(name);
	},
	action: function (name) {
		var dataOpen = name;
		$('body').addClass('pop_open');
		$('[data-conts="' + dataOpen + '"]').fadeIn(200, function () {
			$(this).find('.page_inner').addClass('on');

			if ($(this).find('.slick-slider').length != 0) {
				$(this).find('.slick-slider').slick('refresh');
			}

			$('.page_wrap').click(function (event) {
				if (!$(event.target).closest('.page_inner').length) {
					DATA_POPUP_CLOSE.init();
				}
			});
		});
	}
};

const DATA_POPUP_CLOSE = {
	init: function () {
		this.action();
	},
	action: function () {
		$('body').removeClass('pop_open');
		$('.page_inner').removeClass('on');
		$('.page_wrap').fadeOut(200);

		popupSliderDestroy();
	}
};