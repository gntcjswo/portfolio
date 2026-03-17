$(function(){

	// ripple effect
	[].map.call(document.querySelectorAll('[anim="ripple"]'), el=> {
		el.addEventListener('click',e => {
			e = e.touches ? e.touches[0] : e;
			const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
			el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop;
			el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
		})
	});

});

$(function(){
	// menu button
	var num = 0;
	var flag = true;
	$(".m-menu-btn").unbind("click").bind("click",function(){
		num++;
		if(flag){
			$("#header .m-gnb-bg").fadeIn();
			$("#header .gnb").animate({"right":0,"opacity":1},200);
			$("#header .m-lang").animate({"right":0,"opacity":1},200);
			$(".top-btn").animate({"right":-80+"px","opacity":0},200);
			$("body").css("overflow","hidden");
			flag = false;
		}else{
			$("#header .m-gnb-bg").fadeOut();
			$("#header .gnb").animate({"right":-100+"%","opacity":1},200);
			$("#header .m-lang").animate({"right":-100+"%","opacity":0},200);
			$(".top-btn").animate({"right":30+"px","opacity":1},200);
			flag = true;
			$("body").css("overflow","visible");
		}
		$(this).toggleClass("on");
	});
	// mobile 2depth
	var inTarget = $('.gnb ul > li');
	inTarget.each(function(){
		if ($(this).find('ul').length != 0) {
			$(this).addClass('in');
		}
	});
	function gnbClickOn () {
		$(".gnb>ul>li>a").unbind("click").bind("click",function(e) {
			var tag = $(this).parent().has("ul").text();
			if(tag.length != 0) {
				e.preventDefault();
				$(".gnb>ul>li>a").not(this).parent().removeClass("on").children("ul").slideUp(200);
				$(this).parent().addClass("on").children("ul").slideToggle(200,function() {
					if($(this).css("display") == "none" ) {
						$(this).parent().removeClass("on");
					}
				});
			}
		});
	}
	function gnbClickOff () {
		$(".gnb>ul>li>a").unbind("click").bind("click",function(e){
			e.stopPropagation();
		});
	}
	$(document).ready(function() {
		var w = $(window).width()+18;
		if ( w <= 1200) {
			gnbClickOn();
		}else {
			gnbClickOff();
		}

	});
	$(window).on("load resize", function(){
		var w = $(window).width()+18;
		if ( w <= 1200) {
			gnbClickOn();
		}else {
			gnbClickOff();
		}
	});
	
	// enquiry
	$('.btn-enquiry').on('click', function(e){
		e.preventDefault();
		enquiryCreate();
	});
	
	// top btn
	var $window = $(window);
	var btn = $('.top-btn');
	$window.scroll(function() {
		($window.scrollTop() > 300) ? btn.addClass('on'): btn.removeClass('on');
	});

	btn.on('click', function(e) {
		e.stopPropagation();
		TweenMax.to($window, 0.5, {
			scrollTo: 0
		});
	});
	
});

// enquiry 호출
function enquiryCreate(sv) {
	$.get('../../contents/enquiry/enquiry.html', function(data){
		$('#container').append($('<div class="bg-wrap">' + data + '</div>').hide().fadeIn(10, function(){
			$(this).find('#enquiryWrap').addClass('on');
			if(sv != undefined || sv != null) {
				if(sv == 'collaboration') {
					$('#enquirySelect-02').show();
					$('.enquiry-wrap__inner__body__section.franchise').fadeIn(200);
				}else {
					$('.enquiry-wrap__inner__body__section.' + sv).fadeIn(200);
				}
				$('#enquirySelect-01').val(sv);
				$('.enquiry-wrap__inner__body__section:not(.' + sv + ')').hide();
			}
		}));
		$('body').css('overflow', 'hidden');
		$('.btn-enquiry-close').on('click', function(){
			$('#enquiryWrap').removeClass('on');
			$('#enquiryWrap').fadeOut(200, function(){$(this).remove();});
			$('body').css('overflow', 'visible');
		});
	});
}

// 알림팝업 생성
function dataAlertDesign(alertTitle, alertMsg) {
	$('#container').append($('<div class="alert_design_form">\
								<div class="alert_design_form__inner">\
									<div class="alert_design_form__inner__cont">\
										<div>\
											<h2>' + alertTitle + '</h2>\
											<p>' + alertMsg +'</p>\
										</div>\
									</div>\
									<div class="alert_design_form__inner__btn">\
										<a href="javascript:clearAlert();">Cancel</a>\
									</div>\
								</div>\
							</div>').hide().fadeIn(200, function(){$(this).addClass('on');}))
}
// 알림팝업 제거
function clearAlert() {
	$('.alert_design_form').removeClass('on');
	$('.alert_design_form').fadeOut(200, function(){$(this).remove();});
}
