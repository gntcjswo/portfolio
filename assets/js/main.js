gsap.registerPlugin(ScrollTrigger, TextPlugin);

let scrollFlag = false;
const introMotion = gsap.timeline();
const section00Motion = gsap.timeline({
	onStart: ()=>{scrollFlag=true},
	paused: true,
	onComplete: ()=>{scrollFlag=false},
	onReverseComplete: ()=>{scrollFlag=false}
});
const section01Motion = gsap.timeline({
	onStart: ()=>{scrollFlag=true},
	paused: true,
	onComplete: ()=>{scrollFlag=false},
	onReverseComplete: ()=>{scrollFlag=false}
});
const section02Motion = gsap.timeline({
	onStart: ()=>{scrollFlag=true},
	paused: true,
	onComplete: ()=>{scrollFlag=false},
	onReverseComplete: ()=>{scrollFlag=false}
});
const section03Motion = gsap.timeline({
	onStart: ()=>{scrollFlag=true},
	paused: true,
	onComplete: ()=>{scrollFlag=true},
	onReverseComplete: ()=>{scrollFlag=false}
});
const section04Motion = gsap.timeline({
	onStart: ()=>{scrollFlag=true},
	paused: true,
	onComplete: ()=>{scrollFlag=false},
	onReverseComplete: ()=>{scrollFlag=false}
});

const loadingMotion = gsap.timeline({
	onStart: ()=>{scrollFlag=true},
	paused: true,
	onComplete: ()=>{scrollFlag=false},
});

// showcase slider
let showcaseSlider;
let showcaseSliderProgress;

$(function(){
	
	// intro
	introMotion.to('.intro_path', 0.8, {
		attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
		ease: 'power2.in',
		onStart: ()=>{scrollFlag=true},
		onReverseComplete: ()=>{scrollFlag=false;}
	})
	.to('.intro_path', 0.4, {
		attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
		ease: 'power2.out'
	})
	.from('.intro_title', .8, {
		y: 75
	},'-=.8')
	.to('.intro_title', 1, {
		rotation: 0,
		scale: 1,
		ease: 'power2.out'
	})
	.to('.intro_title', 1, {
		scale: 3,
		xPercent: 100,
		ease: 'power2.inOut'
	})
	.to('.intro_title', 1, {
		xPercent: -100,
		ease: 'power2.inOut'
	})
	.to('.intro_title', 1, {
		xPercent: 0,
		ease: 'power2.inOut'
	})
	.to('.intro_title', 1, {
		xPercent: -200,
		scale: 440,
		ease: 'power2.in'
	})
	.to('.intro_section', 0, {
		display: 'none',
		autoAlpha: 0,
		onComplete: ()=>{
			scrollFlag=false;
			section00Motion.play();
		}
	});

	// showcase slider
	showcaseSlider = new Swiper('.showcase-container', {
		slidesPerView: 1,
		spaceBetween: 20,
		watchSlidesProgress: true,
		// slideToClickedSlide: true,
		// centeredSlides: true,
		// loop: true,
		speed: 1000,
		observer: true,
		observeParents: true,
		mousewheel: {
			releaseOnEdges: true,
		},
		// freeMode: true,
		scrollContainer:true,
		scrollbar:{
			el : '.showcase-scrollbar',
			draggable: true,
			dragSize: 'auto',
			hide: false
		},
		// navigation: {
		// 	nextEl: ".showcase__next",
		// 	prevEl: ".showcase__prev"
		// },
		breakpoints: {
			768: {
				spaceBetween: 35
			}
		},
	});

	$('.showcase-container').on('wheel', function (e) {
		// e.preventDefault();

		let _swiperWrapper = $(this).find('.swiper-wrapper');
		let _swiperScrollbar = $(this).find('.swiper-scrollbar-drag');

		_swiperWrapper.addClass('scrolling');
		_swiperScrollbar.addClass('scrolling');

		clearTimeout($.data(this, 'timer'));
		$.data(this, 'timer', setTimeout(function() {
			_swiperWrapper.removeClass('scrolling');
			_swiperScrollbar.removeClass('scrolling');
		}, 250));
	});

	showcaseSlider.on('progress', function (swiper, progress) {
		showcaseSliderProgress = progress;
		if (progress != 0 && progress != 1 && !scrollFlag) {
			scrollFlag = true;
		}
	});
	showcaseSlider.on('reachBeginning', function () {
		setTimeout(function(){
			scrollFlag = false;
		}, 1000);
	});
	showcaseSlider.on('reachEnd', function () {
		setTimeout(function(){
			scrollFlag = false;
		}, 1000);
	});

	cursorText();

});

section00Motion.to('.fix_section', 0, {
	autoAlpha: 1
})
.to('.fix_section__line__line01', 1, {
	autoAlpha: '1',
	left: 'calc(50vw - 160px)',
	width: '320px',
	ease: 'power2.inOut'
}, '-=.4')
.to('.fix_section__line__line02', .8, {
	top: 'calc(50vh - 90px)',
	autoAlpha: '1',
	ease: 'power2.inOut'
})
.to('.fix_section__line__line03', .8, {
	autoAlpha: '1',
	top: 'calc(50vh + 80px)',
	ease: 'power2.inOut'
}, '-=.8')
.to('.fix_section__h1', .8, {
	color: '#000',
	ease: 'power2.inOut'
}, '-=.8')
.to('.fix_section__line > div', .8, {
	'--element-color': '#000',
	ease: 'power2.inOut'
}, '-=.8')
.from('.fix_section__h1 > span', .5, {
	yPercent: 100,
	ease: 'power2.inOut'
}, '-=.3')
.from('.fix_section__p > span', .5, {
	yPercent: -100,
	ease: 'power2.inOut'
}, '-=.5')
.from('.fix_section__nav > button', 1, {
	y: 50,
	autoAlpha: 0,
	stagger: .2,
	ease: 'power3.out',
	// onComplete: ()=>{scrollFlag=false}
}, '-=.5')
.from('.fix_section__portfolio', 1, {
	right: '-200px',
	ease: 'power2.inOut'
}, '-=1');

section01Motion.to('#section01', .2, {
	display: 'flex',
	autoAlpha: 1,
	zIndex: 10,
	onStart: ()=>{
		// console.log('start');
		$('.fix_section__nav button').eq(0).addClass('active').siblings().removeClass('active');
		$('.fix_section__bg > div').eq(0).addClass('active').siblings().removeClass('active');
	},
})
.to('.fix_section__line__line01', 1, {
	top: '50vh',
	left: '30px',
	width: '80vw',
	ease: 'power2.inOut'
}, '-=.2')
.to('.fix_section__line__line02', 1, {
	top: '25vh',
	left: '20vw',
	width: '50vw',
	height: '5px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line__line03', 1, {
	top: '75vh',
	left: '30vw',
	width: '40vw',
	height: '5px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__tit', 1, {
	top: 'calc(50vh - 80px)',
	left: '30px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line > div', 1, {
	'--element-color': '#000',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__p', 1, {
	left: '0',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__h1', 1, {
	color: '#e51550',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__h1 > span', 1, {
	text: 'Feature',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__p > span', 1, {
	text: 'By Woosung',
	ease: 'power2.inOut'
}, '-=1')
.from('.feature_box > .inbox', 1, {
	x: 50,
	autoAlpha: 0,
	// stagger: .2,
	ease: 'power3.out'
});

section02Motion.to('#section01', .5, {
	display: 'none',
	autoAlpha: 0,
	zIndex: 0,
	onStart: ()=>{
		// console.log('start');
		$('.fix_section__nav button').eq(1).addClass('active').siblings().removeClass('active');
		$('.fix_section__bg > div').eq(1).addClass('active').siblings().removeClass('active');
	},
})
.to('#section02', 0, {
	display: 'flex',
	autoAlpha: 1,
	zIndex: 10
})
.to('.fix_section__line__line01', 1, {
	top: '60vh',
	left: '0',
	width: '100vw',
	ease: 'power2.inOut'
})  
.to('.fix_section__line__line02', 1, {
	top: '40vh',
	left: '0',
	width: '100vw',
	height: '2px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line__line03', 1, {
	top: '80vh',
	left: '0',
	width: '100vw',
	height: '2px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__tit', 1, {
	top: 'calc(40vh - 80px)',
	left: '30px',
	color: '#000',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__h1', 1, {
	color: '#08548d',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line > div', 1, {
	'--element-color': '#000',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__h1 > span', 1, {
	text: 'Service',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__p > span', 1, {
	text: 'By Woosung',
	ease: 'power2.inOut',
}, '-=1')
.from('.service_comment', 1, {
	autoAlpha: 0,
	ease: 'power2.inOut',
}, '-=.5')
.from('.service_item', 1, {
	autoAlpha: 0,
	ease: 'power2.inOut',
}, '-=1');

section03Motion.to('#section02', .5, {
	display: 'none',
	autoAlpha: 0,
	zIndex: 0,
	onStart: ()=>{
		$('.fix_section__nav button').eq(2).addClass('active').siblings().removeClass('active');
		$('.fix_section__bg > div').eq(2).addClass('active').siblings().removeClass('active');
	},
})
.to('#section03', 0, {
	display: 'flex',
	autoAlpha: 1,
	zIndex: 10
})
.to('.fix_section__line__line01', 1, {
	top: '70vh',
	ease: 'power2.inOut'
})  
.to('.fix_section__line__line02', 1, {
	top: '60vh',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line__line03', 1, {
	height: '20vh',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__tit', 1, {
	top: '2vh',
	width: '410px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line > div', 1, {
	'--element-color': '#e51550',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__h1', 1, {
	color: '#000',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__p', 1, {
	x: '290px',
	y: '-60px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__h1 > span', 1, {
	text: 'Show Case',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__p > span', 1, {
	text: 'By Woosung',
	ease: 'power2.inOut',
}, '-=1')
.from('.showcase_wrap', 1, {
	x: 50,
	autoAlpha: 0,
	ease: 'power3.out',
	// onComplete: ()=>{$('.showcase-container').update()}
});

section04Motion.to('#section03', .5, {
	display: 'none',
	autoAlpha: 0,
	zIndex: 0,
	onStart: ()=>{
		$('.fix_section__nav button').eq(3).addClass('active').siblings().removeClass('active');
		$('.fix_section__bg > div').eq(3).addClass('active').siblings().removeClass('active');
	},
})
.to('#section04', 0, {
	display: 'flex',
	autoAlpha: 1,
	zIndex: 10
})
.to('.fix_section__line__line01', 1, {
	top: '20vh',
	left: '-50vw',
	width: '200vw',
	ease: 'power2.inOut'
})  
.to('.fix_section__line__line02', 1, {
	top: '80vh',
	left: '-50vw',
	width: '200vw',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line__line03', 1, {
	top: 'calc(100vh - 2px)',
	left: '-50vw',
	width: '200vw',
	height: '2px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__tit', 1, {
	left: '-410px',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line > div', 1, {
	'--element-color': '#e51550',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__portfolio', 1, {
	top: 'calc(20vh + 2px)',
	right: '50vw',
	width: '700px',
	height: 'calc(60vh - 2px)',
	xPercent: 50,
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__line', 1, {
	rotate: -20,
	ease: 'power2.inOut'
})
.to('.fix_section__portfolio', 1, {
	rotate: -20,
	backgroundColor: '#fff',
	boxShadow: '-3px 3px 20px rgba(0,0,0,.1)',
	ease: 'power2.inOut'
}, '-=1')
.to('.fix_section__portfolio__inbox', 1, {
	rotate: 20,
	ease: 'power2.inOut'
}, '-=1')
.to('.port_comment_box', 1, {
	autoAlpha: 1,
	height: 'auto',
	marginTop: 30,
	ease: 'power2.inOut'
}, '-=1');

loadingMotion.to('.loading_section', 0, {
	display: 'flex',
	ease: 'power2.in',
})
.to('.loading_path', 0.8, {
	attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
	ease: 'power2.in',
})
.to('.loading_path', 0.4, {
	attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
	ease: 'power2.out'
})
.to('.loading_section > h3', 0, {
	display: 'block',
	text: '화면',
}, '+=.4')
.to('.loading_section > h3', 0, {
	display: 'none'
}, '+=.1')
.to('.loading_section > h3', 0, {
	display: 'block',
	text: '전환은',
}, '+=.2')
.to('.loading_section > h3', 0, {
	display: 'none'
}, '+=.1')
.to('.loading_section > h3', 0, {
	display: 'block',
	text: '화려하게',
}, '+=.2')
.to('.loading_section > h3', 0, {
	display: 'none'
}, '+=.1')
.to('.loading_section > h3', 0, {
	display: 'block',
	text: '와우!',
}, '+=.2')
.to('.loading_section > h3', 0, {
	display: 'none'
}, '+=.1') 
.to('.loading_path', 0.8, {
	attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' },
	ease: 'power2.in',
})
.to('.loading_section', 0, {
	display: 'none',
	ease: 'power2.in',
})
.to('.loading_section > h3', 0, {
	text: '화면',
})

function cursorText(){
    setTimeout(function(){
		$('.cursor_txt').each(function() {
			var items = $(this).attr('title') + ';' + $(this).text();
			$(this).empty().attr('title', '').teletype({
				text: $.map(items.split(';'), $.trim),
				typeDelay: 20,
				backDelay: 10,
				cursor: '_',
				delay: 1000,
				preserve: false,
				prefix: '',
				loop: 0
			});
		});
	},1000)
}

window.addEventListener('wheel', function(event){
	if (!scrollFlag) {
		if (event.target.closest('.port_section')) {
			const portSection = event.target.closest('.port_section');
			const sectionNumber = Number($(portSection).data('section'));
			let elementActive = sectionNumber;

			if (event.deltaY < 0) { // up
				scrollFlag=true;
				elementActive = sectionNumber-2 >= 0 ? sectionNumber-2 : null;
				switch (sectionNumber) {
					case 1:
						section01Motion.reverse();
						break;
	
					case 2:
						section02Motion.reverse();
						break;
	
					case 3:
						if (showcaseSliderProgress != 0) return false;
						section03Motion.reverse();
						break;

					case 4:
						showcaseSlider.slideTo(0, 0, false);
						section04Motion.reverse();
						break;
				
					default:
						break;
				}
			} else if (event.deltaY > 0) { // down
				elementActive = sectionNumber;
				// console.log(sectionNumber);
				switch (sectionNumber) {
					case 1:
						section02Motion.play();
						break;
	
					case 2:
						showcaseSlider.slideTo(0, 0, false);
						section03Motion.play();
						break;
	
					case 3:
						if (showcaseSliderProgress != 1) return false;
						section04Motion.play();
						break;

					case 4:
						
						break;
				
					default:
						break;
				}
			}

			if (elementActive != null) {
				$('.fix_section__nav button').eq(elementActive).addClass('active').siblings().removeClass('active');
				$('.fix_section__bg > div').eq(elementActive).addClass('active').siblings().removeClass('active');
			} else {
				$('.fix_section__nav button').removeClass('active');
				$('.fix_section__bg > div').removeClass('active');
			}
		} else {
			if (event.deltaY < 0) {
				
			} else if (event.deltaY > 0) {
				// $('.fix_section__nav button').eq(0).addClass('active').siblings().removeClass('active');
				// $('.fix_section__bg > div').eq(0).addClass('active').siblings().removeClass('active');
				section01Motion.play();
			}
		}
	}
});

$(function(){
	$('.fix_section__nav > button').on('click', function(){
		if ($(this).index() == 0) {
			loadingMotion.totalProgress(0).play();
			setTimeout(function(){
				section04Motion.reverse().totalProgress(0);
				section03Motion.reverse().totalProgress(0);
				section02Motion.reverse().totalProgress(0);
				section01Motion.totalProgress(0).play();
			}, 1200);
		} else if ($(this).index() == 1) {
			loadingMotion.totalProgress(0).play();
			setTimeout(function(){
				section04Motion.reverse().totalProgress(0);
				section03Motion.reverse().totalProgress(0);
				section01Motion.totalProgress(1).play();
				section02Motion.totalProgress(0).play();
			}, 1200);
		} else if ($(this).index() == 2) {
			loadingMotion.totalProgress(0).play();
			setTimeout(function(){
				showcaseSlider.slideTo(0, 0, false);
				section04Motion.reverse().totalProgress(0);
				section01Motion.totalProgress(1).play();
				section02Motion.totalProgress(1).play();
				section03Motion.totalProgress(0).play();
				scrollFlag = true;
			}, 1200);
		} else if ($(this).index() == 3) {
			loadingMotion.totalProgress(0).play();
			setTimeout(function(){
				section01Motion.totalProgress(1).play();
				section02Motion.totalProgress(1).play();
				section03Motion.totalProgress(1).play();
				section04Motion.totalProgress(0).play();
				scrollFlag = true;
			}, 1200);
		}
	});
});