$(function(){
	carouselSet();
	
	VANTA.FOG({
		el: "#doorsection_portfolio",
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

	// if ($('.page_portfolio').length != 0) {
		$('.item_set').each(function(){
			var _imgSelf = $(this).find('img');
			var _img = _imgSelf.attr('src');
			var _gridX = 20;
			var _gridY = 2;
			$(this).children('a').append($('<div class="clip"></div>').fadeIn(0, function(){
				// for (let x = 0; x < _gridX; x++) {
				// 	$(this).append($('<div class="clipel"></div>').fadeIn(0, function(){
				// 		$(this).css({
				// 			'background-image': 'url(' + _img + ')',
				// 			'clip-path': 'polygon(' + (_gridX-2-x) * 1 / (_gridX) * 100 + '%' + ' 0, ' + (_gridX-x) * 1 / (_gridX) * 100 + '%' + ' 0, ' + (_gridX-x) * 1 / (_gridX) * 100 + '%' + ' 100%, ' + (_gridX-2-x) * 1 / (_gridX) * 100 + '%' + ' 100%)'
				// 		});
				// 	}));
				// }
				for (let y = 0; y < _gridY; y++) {
					$(this).append($('<div class="clipel"></div>').fadeIn(0, function(){
						$(this).css({
							'background-image': 'url(' + _img + ')',
							'clip-path': 'polygon(0 ' + (_gridY-1-y) * 1 / (_gridY) * 100 + '%' + ', 0 ' + (_gridY-y) * 1 / (_gridY) * 100 + '%' + ', 100% ' + (_gridY-y) * 1 / (_gridY) * 100 + '%' + ', 100% ' + (_gridY-1-y) * 1 / (_gridY) * 100 + '%' + ')'
						});
					}));
				}
			}));
		});
	// }

	$('.gnb_controller button').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	// 슬라이드 효과 스위치
	$('#switchCarousel').on('change', function(){
		if ($(this).prop('checked')) {
			$('.section_portfolio').removeClass('type_list');
		} else {
			$('.section_portfolio').addClass('type_list');
		}
	});
		
	orientationFunc();
});

$(window).on('load scroll', function(){
	var _scrollWinH = $(window).scrollTop() + $(window).outerHeight()/2;
	var _portSection = $('.main_section.section_portfolio').offset().top;
	if (_scrollWinH > _portSection) {
		$('.switch_box, .btn_controller').removeClass('hide_vis');
	} else {
		$('.switch_box, .btn_controller').addClass('hide_vis');
	}
});

$(window).on('resize', function(){
	carouselSet();
});

$(window).on('load', function(){
	carouselEffect();

	// setTimeout(function(){
	// 	$('img.carousel_item').css('opacity', 0);
	// }, 2000);
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
					TweenLite.fromTo(_, 1, {autoAlpha:0, transform: 'translateY(-30px)'}, { autoAlpha:1, transform: 'translateY(0)'} )
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

	var tween4 = TweenMax.fromTo($('#doorsection_portfolio'), 0.5, {
		autoAlpha:0
	},
	{
		autoAlpha:1
	});
	var scene4 = new ScrollMagic.Scene({
		triggerElement: '.carousel_effect',
		triggerHook: 0.5,
		offset: 50,
		reverse: true,
		duration: "120%"
	})
	// .addIndicators()
	.setTween(tween4)
	.addTo(controller3);
}

// canvas motion
const html = document.documentElement;
const canvas = document.getElementById("publishMotion");
const context = canvas.getContext("2d");

const frameCount = 147;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
	for (let i = 1; i <= frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i);
	}
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
	context.drawImage(img, 0, 0);
}

const updateImage = index => {
	img.src = currentFrame(index);
	context.drawImage(img, 0, 0);
}

$(window).on('load resize scroll', () => {  
	motionImages();
});

const motionImages = () => {
	const scrollTop = $(window).scrollTop();
	const maxScrollTop = $('body').prop('scrollHeight') - $('body').prop('clientHeight') -  $(window).outerHeight()/2 - $('.section_portfolio').outerHeight() + $(window).outerHeight()/2;

	let scrollTopStandard;
	if (scrollTop - $('.sction_visual').outerHeight() <= 0) {
		scrollTopStandard = 0;
	} else if (scrollTop - $('.sction_visual').outerHeight() >= maxScrollTop) {
		scrollTopStandard = maxScrollTop;
	} else {
		scrollTopStandard = scrollTop - $('.sction_visual').outerHeight();
	}
	
	const scrollFraction = scrollTopStandard / maxScrollTop;
	const frameIndex = Math.min(
		frameCount - 1,
		Math.ceil(scrollFraction * frameCount)
	);

	if (scrollTop >= $(window).outerHeight()/2 && scrollTop < $('.section_portfolio').offset().top - $(window).outerHeight()/2) {
		$('#publishMotion').fadeIn(400);
		requestAnimationFrame(() => updateImage(frameIndex + 1))
	} else {
		$('#publishMotion').fadeOut(400);
	}
};

preloadImages()