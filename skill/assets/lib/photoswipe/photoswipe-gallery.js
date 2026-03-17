var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');
			

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            index: index,
			loop: false,
			// preload: [1,3],
			zoomEl: true,
			captionEl: true,
			arrowEl: true,
			fullscreenEl: false,
			counterEl: true,
			shareEl: true,
			tapToClose: false,
			// preloaderEl: true,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
			
			shareButtons: [
				{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
				{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
				{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
				{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
			],

        };

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
		gallery.listen('imageLoadComplete', function(index, item) {
			// 첫 이미지 로딩완료시 실행함수 입니다.
			
			document.querySelector('body').classList.add('photoswipe--open');
			
			var total = gallery.options.getNumItemsFn();
			var prevBtn = document.querySelector('.pswp__button--arrow--left');
			var nextBtn = document.querySelector('.pswp__button--arrow--right');
			if (index == 0) {
				prevBtn.classList.add("disabled");
			} else {
				prevBtn.classList.remove("disabled");
			}
			if (index == total-1) {
				nextBtn.classList.add("disabled");
			} else {
				nextBtn.classList.remove("disabled");
			}
		});
		
		gallery.listen('beforeChange', function() {
			// 슬라이드 변경전 실행함수 입니다.
		});
		gallery.listen('afterChange', function(index, item) {
			// 슬라이드 변경후 실행함수 입니다.
			
			var total = gallery.options.getNumItemsFn();
			var current = gallery.getCurrentIndex();
			var prevBtn = document.querySelector('.pswp__button--arrow--left');
			var nextBtn = document.querySelector('.pswp__button--arrow--right');
			if (current == 0) {
				prevBtn.classList.add("disabled");
			} else {
				prevBtn.classList.remove("disabled");
			}
			if (current == total-1) {
				nextBtn.classList.add("disabled");
			} else {
				nextBtn.classList.remove("disabled");
			}
		});
		gallery.listen('close', function() {
			// 슬라이드 종료시 실행함수 입니다.
			document.querySelector('body').classList.remove('photoswipe--open');
		});
		window.onresize = function(event) {
			// 모바일 가로모드로 변경시(윈도우 리사이즈) 사진첩 팝업 닫기
			gallery.close();
		};
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
};

$(function(){
	swipeImgSize();
});

$(window).on('load', function(){
	swipeImgSize();
	
	var filter = "win16|win32|win64|mac|macintel";
	var bTE = true;
	if ( navigator.platform ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) >= 0 ) {
			// initPhotoSwipeFromDOM('.swipe_gallery');
			$('[data-size]').attr('href', 'javascript:;');
		} else {
			// $('[data-size]').attr('target', '_blank');
			initPhotoSwipeFromDOM('.swipe_gallery');
		}
	}

	// execute above function
	// initPhotoSwipeFromDOM('.swipe_gallery');
});

// 갤러리 이미지 원본사이즈
function swipeImgSize() {
	$('.swipe_gallery__btn').each(function(){
		var _width = $(this).find('img').get(0).naturalWidth;
		var _height = $(this).find('img').get(0).naturalHeight;
		$(this).attr('data-size', _width + 'x' + _height);
	});
}