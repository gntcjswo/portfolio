$(function(){
	contribution();
});

function contribution(){
	var controller = new ScrollMagic.Controller();
	$('.tw-ani').each(function(){
		var _ = $(this);
		var _offset = _.attr('data-tw-offset');
		if(_offset == undefined || _offset == null) {
			if (matchMedia("screen and (min-width: 768px)").matches) {
				_offset = 500;
			}else {
				_offset = 300;
			}
		}
		var tween1 = function(){
			var el = _.find('[data-tw^="tw-fade"]');
			$.each(el, function(e){
				var _ = $(this);
				var delay = _.attr('data-tw-delay');
				if(delay == undefined || delay == null) {
					delay = 0;
				}
				var duration = _.attr('data-tw-duration');
				if(duration == undefined || duration == null) {
					duration = 0.5;
				}
				var amount = _.attr('data-tw-amount');
				if(amount == undefined || amount == null) {
					amount = 20;
				}
				setTimeout(function(){
					var dataTw = _.attr('data-tw');
					if(dataTw == 'tw-fade-down') {
						TweenLite.fromTo(_, duration, {position: 'relative', autoAlpha:0, top: - + amount + 'px'}, { autoAlpha:1, top: 0} );
					}else if (dataTw == 'tw-fade-left') {
						TweenLite.fromTo(_, duration, {position: 'relative', autoAlpha:0, right: - + amount + 'px'}, { autoAlpha:1, right: 0} )
					}else if (dataTw == 'tw-fade-up') {
						TweenLite.fromTo(_, duration, {position: 'relative', autoAlpha:0, bottom: - + amount + 'px'}, { autoAlpha:1, bottom: 0} )
					}else if (dataTw == 'tw-fade-right') {
						TweenLite.fromTo(_, duration, {position: 'relative', autoAlpha:0, left: - + amount + 'px'}, { autoAlpha:1, left: 0} )
					}else if (dataTw == 'tw-fade') {
						TweenLite.fromTo(_, duration, {position: 'relative', autoAlpha:0}, { autoAlpha:1} );
					}
				}, delay)
			})
		}
		var scene1 = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 'onEnter',
			offset: _offset,
			reverse: false // once animating
		})
		.setTween(tween1)
		.addTo(controller);
	});


}
