gsap.registerPlugin(ScrollTrigger, TextPlugin);

const introMotion = gsap.timeline();
introMotion.from('.tit > .line', .5, {
	width: 0
}, 1)
.from('.txt_01', .5, {
	x: -50,
	autoAlpha: 0
})
.from('.txt_02', .5, {
	x: -50,
	autoAlpha: 0
}, '-=.2')
.from('.line_01', .5, {
	height: 0
}, '-=.2')
.from('.line_02', .5, {
	width: 0
}, '-=.2')
.from('.references', .5, {
	x: 50,
	autoAlpha: 0
}, '-=.2')
.from('.tit .letter', .5, {
	rotationX: 360,
	autoAlpha: 0,
	stagger: {
		amount: 1,
	}
})