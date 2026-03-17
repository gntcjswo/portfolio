$(function(){
	// About(What is KTIGERS?) slider
	var applicationSlider = $('.sub-slider--col-12').slick({
		dots: true,
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		autoplay: true,
		speed: 400,
		autoplaySpeed: 6000,
		lazyLoad: 'ondemand',
		pauseOnHover: false,
		pauseOnFocus: false
	});
	
	// About(Centre) slider
	var instructorSlider = $('.sub-slider--col-4-overflow').slick({
		dots: false,
		infinite: false,
		arrows: true,
		slidesToShow: 3,
		autoplay: false,
		speed: 400,
		autoplaySpeed: 6000,
		lazyLoad: 'ondemand',
		pauseOnHover: false,
		pauseOnFocus: false,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.btn-instructor.btn-prev').on('click', function(){
		instructorSlider.slick('slickPrev');
	});
	$('.btn-instructor.btn-next').on('click', function(){
		instructorSlider.slick('slickNext');
	});
	
	// image parallax
	var image = document.getElementsByClassName('thumbnail');
	var imageUp = document.getElementsByClassName('thumbnail--up');
	var imageOveflowUp = document.getElementsByClassName('thumbnail-overflow--up');
	new simpleParallax(image, {
		orientation: 'down',
		delay: 0.8
	});
	new simpleParallax(imageUp, {
		orientation: 'up',
		delay: 0.8
	});
	new simpleParallax(imageOveflowUp, {
		orientation: 'up',
		delay: 0.8,
		overflow: true
	});
	
	// background image parallax
	var $el = $('.parallax-background');
	$(window).on('scroll', function () {
		var scroll = $(document).scrollTop();
		$el.css({
			'background-position':'50% '+(.4*scroll)+'px'
		});
	});
	
	// tab
	$('.sub-tab > ul li a').on('click', function(e){
		e.preventDefault();
		var i = $(this).parent('li').index();
		$('.sub-tab > ul li a').not(this).removeClass('on');
		$(this).addClass('on');
		$('.sub-tab__conts > ul > li').hide();
		$('.sub-tab__conts > ul > li').eq(i).fadeIn(200);
	});
	
	// accordian
	$(".oper_accor>ul>li>a").unbind("click").bind("click",function(e){
		e.preventDefault();
		$(".oper_accor>ul>li>a").not(this).parent().removeClass("on").children("ul").slideUp(200);
		$(this).parent().addClass("on").children("ul").slideToggle(200, function() {
			if ($(this).css("display") == "none") {
				$(this).parent().removeClass("on");
			}else{
				var headerHeight = $("#header").outerHeight();
				$("html,body").animate({
					scrollTop: $(this).parent('li').offset().top - headerHeight
				}, 200);
			}
		});
	});
	
	// gallery
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		closeOnBgClick: false,
		enableEscapeKey: false,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				// return item.el.find('.gallery-title').text();
				return item.el.attr('title');
			},
			markup: '<div class="mfp-figure">'+
			'<div class="mfp-close"></div>'+
			'<div class="mfp-img"></div>'+
			'<div class="mfp-bottom-bar">'+
			'<div class="mfp-title"></div>'+
			'<div class="mfp-counter"></div>'+
			'</div>'+
			'<button title="Previous (Left arrow key)" onclick="magPrev();" class="mb-only mfp-arrow mfp-arrow-left mfp-prevent-close"></button>'+
			'<button title="Next (Right arrow key)" onclick="magNext();" class="mb-only mfp-arrow mfp-arrow-right mfp-prevent-close"></button>'+
			'</div>'
		},
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
			'<div class="mfp-close"></div>'+
			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			'<div class="mfp-title">Some caption</div>'+
			'<button title="Previous (Left arrow key)" onclick="magPrev();" class="mb-only mfp-arrow mfp-arrow-left mfp-prevent-close"></button>'+
			'<button title="Next (Right arrow key)" onclick="magNext();" class="mb-only mfp-arrow mfp-arrow-right mfp-prevent-close"></button>'+
			'</div>'
		},
		callbacks: {
			markupParse: function(template, values, item) {
				values.title = item.el.attr('title');
				// values.title = item.el.find('.gallery-title');
			}
		},
	});
	$('.popup-gallery').find('.gallery-title').each(function(){
		var _txt = $(this).html();
		var _title = $(this).parent().parent('a').attr('title', _txt);
	});
	$('.mfp-arrow-right').on('click', function(){
		var magnificPopup = $.magnificPopup.instance;
		magnificPopup.next();
		console.log('aa');
	});
	
	// aos init
	AOS.init();
});

(function() {
	var magnificPopup = $.magnificPopup.instance;

	$(".popup-gallery ul li a").click(function(e) {

		setTimeout(function() {
			$(".mfp-container").swipe( {
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
					magnificPopup.next();
				},

				swipeRight:function(event, direction, distance, duration, fingerCount) {
					magnificPopup.prev();
				},
			});
		}, 500);
	});

}).call(this);

$(window).on('load', function(){
	var galleryImg = $('.popup-gallery ul li a figure img, .goods-gallery ul li a figure img');
	galleryImg.each(function(){
		var galleryImgWidth = $(this).width();
		var galleryImgHeight = $(this).height();
		if(galleryImgWidth <= galleryImgHeight) {
			$(this).css('width', '100%');
			console.log(galleryImgWidth);
			console.log(galleryImgHeight);
		}else{
			$(this).css('height', '100%');
		}
	});
});

function magPrev() {
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.prev();
}
function magNext() {
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.next();
}