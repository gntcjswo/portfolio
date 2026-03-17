// main youtube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player,
	settings, startVal, endVal, muteVal;

var stateVal = 'stop';
function onYouTubeIframeAPIReady() {
	startVal = 99;
	endVal = 122;
	muteVal = 1;
	settings = { autoplay: 1, start: startVal, end: endVal, rel: 0, mute: muteVal, controls: 0 }
	player = new YT.Player( 'mainVideoPlayer', {
		width: 100 + '%',
		height: 100 + '%',
		videoId: 'yFdN2MoEvbg',
		playerVars: settings,
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange,
		}
	});
}
function onPlayerReady(event) {
	playFullscreen();
}
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED ) {
		if(stateVal == 'stop') {
			player.seekTo( startVal, true ).start;
		}else if(stateVal == 'play') {

		}
	}

	/*
	// fullscreen 해제시
	document.addEventListener("fullscreenchange", function() {
		if (!document.fullscreenElement) {
			stateVal = 'stop';
			player.loadVideoById({
				videoId: 'yFdN2MoEvbg',
				startSeconds: startVal,
				endSeconds: endVal
			});
			player.mute();
			$('#mainVideoPlayer').removeClass('on');
		}
	}, false);

	document.addEventListener("msfullscreenchange", function() {
		if (!document.msFullscreenElement) {
			stateVal = 'stop';
			player.loadVideoById({
				videoId: 'yFdN2MoEvbg',
				startSeconds: startVal,
				endSeconds: endVal
			});
			player.mute();
			$('#mainVideoPlayer').removeClass('on');
		}
	}, false);

	document.addEventListener("mozfullscreenchange", function() {
		if (!document.mozFullScreen) {
			stateVal = 'stop';
			player.loadVideoById({
				videoId: 'yFdN2MoEvbg',
				startSeconds: startVal,
				endSeconds: endVal
			});
			player.mute();
			$('#mainVideoPlayer').removeClass('on');
		}
	}, false);
	document.addEventListener("webkitfullscreenchange", function() {
		if (!document.webkitIsFullScreen) {
			stateVal = 'stop';
			player.loadVideoById({
				videoId: 'yFdN2MoEvbg',
				startSeconds: startVal,
				endSeconds: endVal
			});
			player.mute();
			$('#mainVideoPlayer').removeClass('on');
		}
	}, false);
	*/
}

function playFullscreen (){
	/*
	// fullscreen으로 재생
	var $ = document.querySelector.bind(document);

	$('.btn_main_video--play').addEventListener('click', function(){

		player.unMute();
		player.stopVideo();
		player.playVideo();

		var playerElement = $('#mainVideoPlayer');
		playerElement.classList.add('on');
		var requestFullScreen = playerElement.requestFullScreen || playerElement.msRequestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen;
		if (requestFullScreen) {
			requestFullScreen.bind(playerElement)();
		}

		stateVal = 'play';

	});
	*/
	$('.btn_main_video--play').grtyoutube();

}

$(function(){
	// programs
	/* $('.main-programs-exbox ul li').mouseenter(function(){
		$('.main-programs-exbox ul li').not(this).removeClass('on');
		$(this).addClass('on');
	}); */

	// image parallax
	var image = document.getElementsByClassName('thumbnail');
	var imageUp = document.getElementsByClassName('thumbnail--up');
	new simpleParallax(image, {
		orientation: 'down',
		delay: 0.8
	});
	new simpleParallax(imageUp, {
		orientation: 'up',
		delay: 0.8
	});
	
	var sta = 50;
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 50) {
			$('#header').addClass('fixed');
		}
		else {
			$('#header').removeClass('fixed');
		}
	});
	$(window).on("load resize", function(){
		var sta = $('.sta').outerHeight();
		if ($(window).scrollTop() >= 50) {
			$('#header').addClass('fixed');
		}
		else {
			$('#header').removeClass('fixed');
		}
	});

	// aos init
	AOS.init();
});
