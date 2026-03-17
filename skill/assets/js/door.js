$(function(){
	carouselSet();
	
	VANTA.FOG({
		el: "#doorSection02",
		mouseControls: true,
		touchControls: true,
		gyroControls: false,
		minHeight: 200.00,
		minWidth: 200.00,
		highlightColor: 0x3e3e3e,
		midtoneColor: 0x0,
		lowlightColor: 0x5c5c5c,
		baseColor: 0x222222,
		blurFactor: 0.33,
		zoom: 1.70
	});

	$('.gnb_controller button').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	if ($('.page_portfolio').length != 0) {
		$('.item_set').each(function(){
			var _imgSelf = $(this).find('img');
			var _img = _imgSelf.attr('src');
			var _gridX = 20;
			$(this).children('a').append($('<div class="clip"></div>').fadeIn(0, function(){
				for (let x = 0; x < _gridX; x++) {
					$(this).append($('<div class="clipel"></div>').fadeIn(0, function(){
						$(this).css({
							'background-image': 'url(' + _img + ')',
							'clip-path': 'polygon(' + (_gridX-2-x) * 1 / (_gridX) * 100 + '%' + ' 0, ' + (_gridX-x) * 1 / (_gridX) * 100 + '%' + ' 0, ' + (_gridX-x) * 1 / (_gridX) * 100 + '%' + ' 100%, ' + (_gridX-2-x) * 1 / (_gridX) * 100 + '%' + ' 100%)'
						});
					}));
				}
				// $(this).find('.clipel').css('background-image', 'url(' + _img + ')');
				setTimeout(function(){
					_imgSelf.addClass('tran_opacity');
				}, 2000);
			}));
		});
	}

	// getNumber(1);
	$('.cube_page[data-page="1"]').addClass('active');
	orientationFunc();
});

$(window).on('resize', function(){
	carouselSet();
});

$(window).on('load', function(){
	carouselEffect();

	setTimeout(function(){
		$('img.carousel_item').css('opacity', 0);
	}, 2000);
});

$(window).on("resize orientationchange",function(){
	orientationFunc();
});

function orientationFunc() {
	if(window.orientation == 0 || $(window).outerWidth() < $(window).outerHeight()) // Portrait
	{
		$('body').removeClass('landscape').addClass('portrait');
	}
	else // Landscape
	{
		$('body').removeClass('portrait').addClass('landscape');
	}
}

function carouselSet() {
	let _width = $('.carousel_set').outerWidth();
	let _widthHalf = _width / 2;
	let _length = $('.item_set').length;
	let _deg = 360 / _length;
	let _degHalf = _deg / 2;
	
	let _rad = _degHalf * Math.PI/180; 
	let _tan = Math.tan(_rad);
	let _dis = parseInt(_widthHalf/_tan);
	
	$('.scene_set').css('perspective', 103 * _length + 'px');
	
	$('.item_set').each(function(){
		let _degEach = _deg * $(this).index();
		$(this).css({
			'transform': 'rotateY(' + _degEach + 'deg) translateZ(' + _dis + 'px)'
		});
	});

	let _prevDeg;
	let _nextDeg;
	$('.btn_controller--pause').on('click', function(){
		$('.carousel_set').addClass('paused');
		$(this).hide();
		$('.btn_controller--resume').show();
	});
	$('.btn_controller--resume').on('click', function(){
		$('.carousel_set').removeClass('paused');
		$(this).hide();
		$('.btn_controller--pause').show();
	});
	$('.btn_controller--stop').on('click', function(){
		$('.carousel_set').removeClass('paused carousel_set--play');
		$(this).hide();
		$('.btn_controller--pause').hide();
		$('.btn_controller--resume').hide();
		$('.btn_controller--prev').show();
		$('.btn_controller--next').show();
		$('.btn_controller--play').show();

		_prevDeg = _deg;
		_nextDeg = '-' + _deg;
	});
	$('.btn_controller--play').on('click', function(){
		$('.carousel_set').removeClass('paused').addClass('carousel_set--play');
		$(this).hide();
		$('.btn_controller--pause').show();
		$('.btn_controller--resume').hide();
		$('.btn_controller--prev').hide();
		$('.btn_controller--next').hide();
		$('.btn_controller--stop').show();

		$('.carousel_set').removeAttr('style');
	});
	$('.btn_controller--prev').on('click', function(){
		$('.carousel_set').css({
			'transform': 'rotateY(' + _prevDeg + 'deg)'
		});
		_prevDeg += _deg;
		_nextDeg = _prevDeg - _deg*2;
	});
	$('.btn_controller--next').on('click', function(){
		$('.carousel_set').css({
			'transform': 'rotateY(' + _nextDeg + 'deg)'
		});
		_nextDeg -= _deg;
		_prevDeg = _nextDeg + _deg*2;
	});
}

function carouselEffect() {
	var controller3 = new ScrollMagic.Controller();
	$('.carousel_effect').each(function(){
		var _ = $(this);
		var tween3 = function(){
			var el = _.find('.carousel_item');
			$.each(el, function(e){
				var _ = $(this);
				setTimeout(function() {
					TweenLite.fromTo(_, 1, {autoAlpha:0, top: '-30px'}, { autoAlpha:1, top: 0} )
					_.addClass('effect_on');
				}, e * 100);
			})
		}
		var scene3 = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.5,
			offset: 200,
			reverse: false // once animating
		})
		.setTween(tween3)
		.addTo(controller3);
	});

	// var tween4 = TweenMax.fromTo($('#doorSection02'), 0.5, {
	// 	autoAlpha:0
	// },
	// {
	// 	autoAlpha:1
	// });
	// var scene4 = new ScrollMagic.Scene({
	// 	triggerElement: '.carousel_effect',
	// 	triggerHook: 0.5,
	// 	offset: 50,
	// 	reverse: true,
	// 	duration: "30%"
	// })
	// // .addIndicators()
	// .setTween(tween4)
	// .addTo(controller3);
}

function getNumber(num) {
	var cube = $('.cube');
	var numArray = [
		{x : 0, y : 0, z : 0}, // front
		{x : 1, y : 0, z : 0}, // bottom
		{x : 0, y : -1, z : 0}, // right
		{x : 0, y : 1, z : 0}, // left
		{x : 3, y : 0, z : 0}, // top
		{x : 2, y : 0, z : 0}// back
	];

	var xNum = numArray[num-1].x;
	var yNum = numArray[num-1].y;
	var zNum = numArray[num-1].z;

	var xRand = choiceRandom(xNum);
	var yRand = choiceRandom(yNum);
	var zRand = choiceRandom(zNum);

	$('.dice_box').addClass('loading');
	setTimeout(function(){
		$('.dice_box').removeClass('loading').attr('data-page', num);
		$('.cube_page[data-page="' + num + '"]').addClass('active').siblings().removeClass('active');
	}, 1000);

	$('.dice_box').on('click', function(){
		if($(this).data('page') == 3) location.pathname='/portfolio.html';
	});

	cube.css('transform', 'rotateX('+xRand+'deg) rotateY('+yRand+'deg) rotateZ('+zRand+'deg)');
}

function choiceRandom(num) {
	if (num == 0) {
		return 0;
	} else {
		// return (4 * (Math.floor(Math.random() * 6) + 1) + num) * 90;
		return (num) * 90;
	}
}