function MM_swapImgRestore() { //v3.0
var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}



//1.스크립트 위로 튕기는것
$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});



//VISUAL
var vis = {
	init : function(){
		this.action();
	},
	action : function(){
		var set = {
			roll : $('.section1 .roll')
		};
		set.roll.bxSlider({
			auto: true,
			useCSS: false,
			controls: false,
			pager: false,
			pause: 6000,
			speed: 1200,
			touchEnabled: true,
			stopAutoOnClick: true,
			easing: 'easeInOutExpo'
		});
	}
}


//VISUAL
var sec04 = {
	init : function(){
		this.action();
	},
	action : function(){
		var set = {
			roll : $('.sec04 .roll')
		};
		set.roll.bxSlider({
			auto: true,
			useCSS: false,
			controls: true,
			pager: false,
			pause: 4000,
			speed: 500,
			touchEnabled: true,
			stopAutoOnClick: true,
			easing: 'easeInOutExpo'
		});
	}
}



//Popup Images
$(function(){
	
	$('.sec02img').click(function(e){
			e.preventDefault();

			$('.popimg_bg').stop().fadeIn();
			$(this).next('.popimg').stop().fadeIn();

			if($(this).index('.sec02img') > 4){
				$('.popimg').css({'margin-left':'-700px'});
			}else{
				$('.popimg').css({'margin-left':'0'});
			}
				
	});

//Popup Background
	$('.popClose, .popimg_bg').click(function(e){
		e.preventDefault();
		$('.popimg').fadeOut();
		$('.popimg_bg').fadeOut();
	});

});


//버튼 위치 이동 스크롤
$(window).load(function(){

	var win = $(window);
	var sec = $('.section');
	var btnActive = $('.gnb li');
	var btnSlide = $('.gnb li');
	var wh = []; //높이 배열
	var secNum = 0;
	var spd = 600;

	sec.each(function(i){
		wh[i] = sec.eq(i).offset().top;
	});


	btnSlide.on({
		'click' : function(){
			var i = $(this).index();
			var pos = $('.section').eq(i).offset().top-55;
			
			$('html,body').animate({
				'scrollTop' : pos
			},600,'easeInOutQuart');

			return false;
		}

	});





	
	function acc(){
		btnActive.eq(secNum).addClass('active').siblings().removeClass('active');
	}
	acc();

	win.on({
		'scroll' : function(){
			var sh = $(this).scrollTop();
			
			for (i=0;i<sec.length;i++){ // 위치값 확인
				if(sh >= parseInt(wh[i]) - (win.height()/2)){
					secNum = i;
					acc();
				}
			}

		}
	});
});



var main = {
	init : function(){
		this.action();
	},
	action : function(){
		var set = {
			win : $(window),
			app : $('.appear'),
			motion : $('.motion')
		};

		var spd = 900;
		set.motion.css('opacity',0);

		set.app.appear();

		set.app.each(function(i){
			$(this).on({
				'appear' : function(){
					$(this).find('.motion').each(function(i){
						$(this).delay(800).delay(i*500).animate({'top':0,'opacity':1},spd);
					});
				}
			});
		});

	}
}


var bg = {
	init : function(){
		if(!/iPhone|iPad|iPod|BlackBerry|Android|Windows CE|LG|MOT|SAMSUNG|SonyEricsson|webOS|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			this.action();
		}
	},
	action : function(){
		var set = {
			hb : $('html,body'),
			win : $(window),
			bg : $('.bg')
		};

		var bgNum = 0;
		var bh = [];
		var wh = set.win.height();

		set.bg.each(function(i){
			bh[i] = $(this).offset().top;
		});

		set.bg.appear();

		var sh = 0;

		set.win.on({
			'scroll' : function(){
				sh = $(this).scrollTop();
			}
		});

		set.bg.eq(0).css({"backgroundPosition": "50% "+ ((bh[0] - sh) * 0.03) +"px"});

		set.bg.each(function(i){
			$(this).on('appear',function(){
				$(this).css({"backgroundPosition": "50% "+ ((bh[i] - sh) * 0.03) +"px"});
			});
		});

	}
}

function Aniscroll(){

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			jQuery.extend(jQuery.easing, {
					easeOutQuint: function(x, t, b, c, d) {
							return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
					}
			});

			if($('html.nshtml' == false)){

			setTimeout(function(){
					var wheel = false,
									$docH = $(document).height() - $(window).height(),
									$scrollTop = $(window).scrollTop();

					$(window).bind('scroll', function() {
							if (wheel === false) {
									$scrollTop = $(this).scrollTop();
							}
					});
					$(document).bind('DOMMouseScroll mousewheel', function(e, delta) {
							delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;
							wheel = true;

							$scrollTop = Math.min($docH, Math.max(0, parseInt($scrollTop - delta * 50)));

							$($.browser.webkit ? 'body' : 'html').stop().animate({
									scrollTop: $scrollTop + 'px'
							}, 1000, 'easeOutQuint', function() {
									wheel = false;
							});
							return false;
					});
			}, 1000);

			}
	}
}




$(function(){
	//vis.init();//VIS
	sec04.init();//SEC04
	main.init();//MAIN
	bg.init();//BG
});

// 상단이동 부드럽게
$(function () {
    $("#goTop").on("click", function () {
        let top = $("body").offset().top;
        $("html, body").animate({ scrollTop: top }, 800);
    });
  });

  $(function () {
	$("#locIcon").on("click", function (event) {
	  event.preventDefault(); // 기본 동작(링크 이동)을 막습니다.
	  let target = $("#se08"); // 스크롤 대상이 되는 "section" 요소를 선택합니다.
	  
	  if (target.length) { // 스크롤 대상 요소가 존재하는지 확인합니다.
		let top = target.offset().top; // 대상 섹션의 상단 위치를 가져옵니다.
		$("html, body").animate({ scrollTop: top }, 800); // 부드러운 스크롤 애니메이션을 적용합니다.
	  }
	});
  });
 

  /*menuOpen*/
  $(function(){
    $('.menuOpen button.open').on('click', function(){
        $('.menuOpen .menuWrap').addClass('on');
    });
        $('.menuOpen .menuWrap .close').on('click',function(){
            $('.menuOpen .menuWrap').removeClass('on');
        });
});



//mo-section스크롤이동
$(document).ready(function() {
    $('.menuOpen #m-gnb li a').on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        var top = $(targetId).offset().top;
        $('html, body').animate({ scrollTop: top }, 400);
    });
});

//   의료진소개-Slide
var text = ['정성웅 원장','정재협 원장', '이보현 원장'];
		
var bottomSwiper = new Swiper('.swiper-bottom', {
	slidesPerView: '1',
	pagination: {
		el: ".swiper-pagination-custom",
			clickable: true,
			bulletClass:"custom_bullet",
			bulletActiveClass: "swiper-pagination-custom-bullet-active",

renderBullet: function (index, className) {
 return '<div class="'+className+'"><span>'+ (text[index]) +'</span></div>'
},
	},

	autoplay: {
		delay: false,
		disableOnInteraction:false,
	},
	speed: false,
	loop: true,
	touchRatio: 0.2,
	observer: true,
	observeParents: true
});



//인테리어소개
$(document).ready(function() {
    // object-fit : IE 대응   
    if($(document).find('.object-fit').length > 0){    
      var objectFitImg = new App.ObjectFit();
      objectFitImg.init('.object-fit');
    }  
    
    $('.gallery-main-swiper').each(function() {
      var thumbSwiper = new Swiper('.gallery-thumb-swiper', {
        spaceBetween: 10,
        slidesPerView: 5,
        loopedSlides: 5,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        loop: true,
        breakpoints: {
          480: {
            slidesPerView: 3,
            loopedSlides: 3
          }
        }
      });
      var mainSwiper = new Swiper('.gallery-main-swiper', {
        effect: 'fade',
        spaceBetween: 10,
        allowTouchMove: false,
        loop: true,
        loopedSlides: 5,
        navigation: {
          nextEl: '.swiper-gallery-next',
          prevEl: '.swiper-gallery-prev'
        },
        breakpoints: {

          480: {
            loopedSlides: 3
          }
        }
      });
      mainSwiper.controller.control = thumbSwiper;
      thumbSwiper.controller.control = mainSwiper;
    })
  })
  
  var App = new Object();
  
  //------------------------------------------------------
  //object-fit(IE)
  //------------------------------------------------------  
  App.ObjectFit = function () {
    var self;
    return {
      init: function (param) {
        if ('objectFit' in document.documentElement.style === false) {
          var container = document.querySelectorAll(param);
          for (var i = 0; i < container.length; i++) {
            var imageSource = container[i].querySelector('img').src;
            container[i].querySelector('img').style.display = 'none';
            container[i].style.backgroundSize = 'cover';
            container[i].style.backgroundImage = 'url(' + imageSource + ')';
            container[i].style.backgroundPosition = '50% 50%';
          }
        }
      }
    }
  };  