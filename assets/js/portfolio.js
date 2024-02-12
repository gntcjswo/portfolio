gsap.registerPlugin(ScrollTrigger, TextPlugin);

const lenis = new Lenis()

lenis.on('scroll', (e) => {
//   console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)

const introMotion = gsap.timeline();
introMotion.from('.tit > .line', .5, {
	width: 0,
	ease: 'power2.out'
}, 1)
.from('.txt_01', .5, {
	x: -50,
	autoAlpha: 0,
	ease: 'power2.out'
})
.from('.txt_02', .5, {
	x: -50,
	autoAlpha: 0,
	ease: 'power2.out'
}, '-=.2')
.from('.line_01', .5, {
	height: 0,
	ease: 'power2.out'
}, '-=.2')
.from('.line_02', .5, {
	width: 0,
	ease: 'power2.out'
}, '-=.2')
.from('.references', .5, {
	x: 50,
	autoAlpha: 0,
	ease: 'power2.out'
}, '-=.2')
.from('.tit .letter', .5, {
	rotationX: 360,
	autoAlpha: 0,
	stagger: {
		amount: 1,
	},
	ease: 'power2.out'
});

const titleMotion = gsap.timeline();
titleMotion.from('.fit_info_box__line', 2, {
	width: 0,
	ease: 'power2.out'
})
.from('.fit_info_box > p', 1, {
	x: -50,
	autoAlpha: 0,
	ease: 'power2.out'
})
.to('.project_name', 1, {
	text: 'I WORKS IT!'
})
.to('.fit_info_box__line', 2, {
	width: 'calc(40vw - 3vw)',
	ease: 'power2.out'
});
ScrollTrigger.create({
	animation: titleMotion,
	trigger: '.port_section',
	start: 'top 40%',
	end: 'top -100%',
	scrub: true
});

const portfolioItem = gsap.utils.toArray('.portfolio_item');
portfolioItem.forEach((item,i)=>{
	const portfolioItemAni = gsap.from(item, {
		skewY: 8,
		transformOrigin: 'top left',
		scrollTrigger: {
			trigger: item,
			start: 'top bottom',
			end: 'top 20%',
			scrub: true
		}
	});

	let itemComment = $(item).find('ul');
	const portfolioItemCommentAni = gsap.from(itemComment, {
		yPercent: 100,
		scrollTrigger: {
			trigger: item,
			start: 'top bottom',
			end: 'top 20%',
			scrub: true
		}
	});
	const portfolioItemCommentAni2 = gsap.fromTo(itemComment, {
		yPercent: 0,
	}, {
		yPercent: 100,
		skewY: -8,
		scrollTrigger: {
			trigger: item,
			start: 'top 20%',
			end: 'top top-=60%',
			scrub: true
		}
	});

	const portfolioItemText = gsap.timeline({
		scrollTrigger: {
			trigger: item,
			start: 'top 70%',
			// end: 'bottom 50%-=30vh',
			end: 'bottom bottom',
			scrub: true
			// toggleActions: 'restart none restart reverse'
		}
	});
	portfolioItemText.to('.project_name', 1, {
		text: $(item).find('figcaption').text(),
	});
});

const portfolioImg = gsap.utils.toArray('.portfolio_item > figure');
portfolioImg.forEach((item,i)=>{
	const child = item.children[0];
	const portfolioImgAni = gsap.from(child, {
		scale: 1.5
	});
	ScrollTrigger.create({
		animation: portfolioImgAni,
		trigger: item,
		start: 'top bottom',
		end: 'top 20%',
		scrub: true
	});
});