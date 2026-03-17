$(window).on('load', function () {
	commonEffect();
	directionEffect();
});

function commonEffect() {
	var controller = new ScrollMagic.Controller();
	$('.common_effect').each(function(){
		var _ = $(this);
		var tween1 = function(){
			var el = _.find('.ce_item');
			$.each(el, function(e){
				var _ = $(this);
				setTimeout(function() {
					TweenLite.fromTo(_, 0.5, {position: 'relative', autoAlpha:0, bottom: '-30px'}, { autoAlpha:1, bottom: 0} )
				}, e * 200);
			})
		}
		var scene1 = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 'onEnter',
			offset: 250,
			reverse: false // once animating
		})
		.setTween(tween1)
		.addTo(controller);
	});
}

function directionEffect() {
	var controller2 = new ScrollMagic.Controller();
	$('.direction_effect').each(function () {
		var _ = $(this);
		var tween1 = function () {
			var el = _.find('.de_item');
			$.each(el, function (e) {
				var _ = $(this);
				var _delay = $(this).attr('data-delay');
				var _direction = $(this).attr('data-direction');
				var _duration = $(this).attr('data-duration');

				if (_delay == undefined) _delay = 1;
				if (_direction == undefined) _direction = 'center';
				if (_duration == undefined) _duration = 0.5;

				if (_direction == 'up') {
					TweenLite.fromTo(_, _duration, { autoAlpha: 0, transform: 'translateY(30px)' }, { autoAlpha: 1, transform: 'translateY(0)', delay: _delay * .2 })
				} else if (_direction == 'down') {
					TweenLite.fromTo(_, _duration, { autoAlpha: 0, transform: 'translateY(-30px)' }, { autoAlpha: 1, transform: 'translateY(0)', delay: _delay * .2 })
				} else if (_direction == 'right') {
					TweenLite.fromTo(_, _duration, { autoAlpha: 0, transform: 'translateX(-30px)' }, { autoAlpha: 1, transform: 'translateX(0)', delay: _delay * .2 })
				} else if (_direction == 'left') {
					TweenLite.fromTo(_, _duration, { autoAlpha: 0, transform: 'translateX(30px)' }, { autoAlpha: 1, transform: 'translateX(0)', delay: _delay * .2 })
				} else if (_direction == 'center') {
					TweenLite.fromTo(_, _duration, { autoAlpha: 0 }, { autoAlpha: 1, delay: _delay * .2 })
				} else if (_direction == 'zoomout') {
					TweenLite.fromTo(_, _duration, { autoAlpha: 0, transform: 'scale(1.3)' }, { autoAlpha: 1, transform: 'scale(1)', delay: _delay * .2 })
				}
				_.addClass('effect_on');
				_.parents('.direction_effect').addClass('effect_on');
			})
		}
		var scene1 = new ScrollMagic.Scene({
			triggerElement: this,
			//				triggerHook: 'onEnter',
			triggerHook: 0.5,
			//				offset: 50,
			offset: -50,
			reverse: false // once animating
		})
			.setTween(tween1)
			//			.addIndicators()
			.addTo(controller2);
	});
}

function popupDraggable() {
	$('.main_layer_pop_box').each(function(i){
		var _top;
		var _left;

		$(this).draggable({
			containment:'parent',
			scroll:false,
			start: function() {
				var cookieObj = 'N';
				$.cookie('draggableCookie' + i, cookieObj);
			},
			stop: function() {
				_top = $(this).css('top');
				_left = $(this).css('left')
				
				var cookieObj = 'Y' + '%' + _top + '%' + _left;
				$.cookie('draggableCookie' + i, cookieObj, {
					expires : 365
				});
			}
		});

		var cookie = $.cookie('draggableCookie' + i);
		var mycookies;
		if (cookie != undefined) {
			mycookies = cookie.split('%');
			if (mycookies[0] == 'Y') {
				$(this).css({
					'top': mycookies[1],
					'left': mycookies[2]
				});
			}
		}
	});
}