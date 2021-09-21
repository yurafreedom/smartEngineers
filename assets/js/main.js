// Set fixed elements that need padding-right when locking the scroll
window.paddingRightItems = '#page-header';

// Locking scroll plugin options
var bodyScrollOptions = {
    reserveScrollBarGap: true,
    allowTouchMove: true
};

function openModal(hrefModal) {

    if ($(hrefModal).length > 0){
		$(hrefModal).trigger('beforeOpenModal').addClass('active');
		
		setTimeout(function() {
			$(hrefModal).addClass('fadeIn').trigger('afterOpenModal');
		}, 50);
    
        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }

}

function closeAllModals() {
	$('.popup-block.active').trigger('beforeCloseModal').removeClass('fadeIn');
	
	setTimeout(function() {
		$('.popup-block.active').removeClass('active', function() {
			bodyScrollLock.clearAllBodyScrollLocks();
		}).trigger('afterCloseModal');

		bodyScrollLock.clearAllBodyScrollLocks();
	}, 200);
}

function closeModal(hrefModal) {
	$(hrefModal).trigger('beforeCloseModal').removeClass('fadeIn');
	
	setTimeout(function() {
		$(hrefModal).removeClass('active', function() {
			bodyScrollLock.clearAllBodyScrollLocks();
		}).trigger('afterCloseModal');

		bodyScrollLock.clearAllBodyScrollLocks();
	}, 200);
}

$(document).keydown(function(event) { 
	if (event.keyCode == 27) { 
		closeAllModals();
	}
});

// Switch Modal function
$(document.body).on('click','[data-toggle="switch-modal"]',function(e) {
	e.preventDefault();
	
	var hrefModal = $(this).attr('data-target');
	
	$('.popup-block:not(:hidden)').removeClass('fadeIn active');
	
	$(hrefModal).addClass('active').addClass('fadeIn').scrollTop(0);
    
	bodyScrollLock.disableBodyScroll($(hrefModal)[0], bodyScrollOptions);
	
});

// Basic open modal
$(document.body).on('click','[data-toggle="modal"]',function(e) {
	e.preventDefault();
	
	var hrefModal = $(this).attr('data-target');

	openModal(hrefModal);

});

// Close modals if clicked on popup overlay
$(document.body).on('click','.popup-block__overlay',function(e) {
	var closeButton = $(this).children('[data-toggle="modal-dismiss"]');
	
	if (!(e.target != this)) {
		closeModal($(this).parents('.popup-block')[0]);
	}

	$('.popup-block').removeClass('upload');
});

// Attribute for closing modals
$(document.body).on('click','[data-toggle="modal-dismiss"]',function(e) {
	e.preventDefault();
	
	closeModal($(this).parents('.popup-block')[0]);
	$('.popup-block').removeClass('upload');
});


$('[data-toggle="scroll-to-top"]').click(function(e) {
	e.preventDefault();

	$('html,body').animate({
		scrollTop: 0
	}, 600);
});

$('[data-toggle="anchor"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target'),
		targetPos = $(dataTarget).offset().top - 150;

	$('html,body').animate({
		scrollTop: targetPos
	}, 400);
});

$('[data-toggle="tab"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target');

	if ($(this).parent().is('li')) {
		$(this).addClass('active').parent().addClass('active').siblings().removeClass('active').children().removeClass('active');
	} else {
		$(this).addClass('active').siblings().removeClass('active');
	}

	$(dataTarget).addClass('active').siblings().removeClass('active');

});

$(window).on('scroll load orientationchange', function() {
	var scrolledHeight = 100;

	if ($(this).scrollTop() > scrolledHeight && !($('body').hasClass("scrolled")) ) {
		$('body').addClass("scrolled");
	} else if($(this).scrollTop() <= scrolledHeight && $('body').hasClass("scrolled")) {
		$('body').removeClass("scrolled");
	}
});

$(window).scroll(function() {
    var e = 200,
        t = 300;
    $(this).scrollTop() > e && !$("body").hasClass("scrolled") ? $("body").addClass("scrolled") : $(this).scrollTop() <= e && $("body").hasClass("scrolled") && $("body").removeClass("scrolled"), $(this).scrollTop() > t && !$("body").hasClass("menu-fixed") ? $("body").addClass("menu-fixed") : $(this).scrollTop() <= t && $("body").hasClass("menu-fixed") && $("body").removeClass("menu-fixed")
});

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $(this).toggleClass('active');
  $("#header-menu").toggleClass("active");
  $('#transparent_menu').addClass('active');
});

$("#menu-toggle-mobile").click(function(e) {
  e.preventDefault();
  $(this).toggleClass('active');
  $("#header-menu").toggleClass("active");
});

$("#menu-toggle-active").click(function(e) {
  e.preventDefault();
  $("#header-menu").removeClass("active");
  $('#transparent_menu').removeClass('active');
});

// $("#profile-menu-toggle").click(function(e) {
//   e.preventDefault();
//   $(this).toggleClass('active');
//   $('#settings-header-menu').removeClass('active');
//   $('.btn--profile').removeClass('active');
//   $("#profile-header-menu").toggleClass("active");
// });

// $('.btn--profile').click(function(e) {
//   e.preventDefault();
//   $(this).toggleClass('active');
//   $('#profile-menu-toggle').removeClass('active');
//   $('#profile-header-menu').removeClass('active');
//   $("#settings-header-menu").toggleClass("active");
// });

// $('.page-header__settings-toggle').click(function(e) {
//   e.preventDefault();
//   $(this).toggleClass('active');
//   $("#settings-header-menu").toggleClass("active");
// });



// $("#profile-menu-toggle-active").click(function(e) {
//   e.preventDefault();
//   $("#profile-header-menu").removeClass("active");
// });


// $.extend($.validator.messages, {
//     required: "Fill in the field correctly",
//     email: "Enter correct mail",
//     password: "Enter the correct password",
// });

// $("form").each(function() {
//     $(this).validate({
//         errorPlacement: function(e, i) {
//               e.addClass("error-message"),
//               e.appendTo(i.parent("div"))
//         },
//         highlight: function(e) {
//             $('.form-block__input-wrapper').removeClass('success').addClass('error');
//         },
//         unhighlight: function(e) {
//             $('.form-block__input-wrapper').addClass('success').removeClass('error');
//         },
//         ignore: [],
//         rules: {
//             name: "required",
//             tel: {
//                 required: !0,
//             },
//             email: {
//                 required: !0,
//                 email: true
//             },
//             password: {
//                 required: !0,
//             },
//         },
//     });
// });

$(document).off('change focusout keydown keypress input', 'input, textarea').on('change focusout keydown keypress input', 'input, textarea', function(e) {
 if ($(this).val() != '') {
  $(this).addClass('not-empty').parent().parent().addClass('not-empty');
 } else {
  $(this).removeClass('not-empty').parent().parent().removeClass('not-empty');
 }
});

// $('select').niceSelect();

$(window).on('load scroll resize', function () {
  var t = $(this);
  var progress = t.scrollTop() / ($(document).height() - t.height()) * 100;
  var dashoffset = 180 - 180 * progress / 100;
  $('.scroll-progress-circle circle').css({
    'stroke-dashoffset': dashoffset
  });
});

$(window).on('scroll', function () {
  $('.page-footer__scroll-progress').addClass('active');
});

$(document).on('click', '.page-footer__scroll-progress', function () {
  scrollToBlock('body', 1000);
  return false;
});

function scrollToBlock(to, speed, offset) {
  if (typeof to === 'string') to = $(to);
  if (!to[0]) return;

  if (!offset) {
    offset = $(window).width() < 1024 ? 60 : 65;
  }

  speed = speed || 1000;
  $('html, body').stop().animate({
    scrollTop: to.offset().top - offset
  }, speed);
}

$('.form-control').focusin(function() {
  $(this).parent().addClass('active');
});

$('.form-control').focusout(function() {
  var $this = $(this),
      val = $this.val();

  if(val.length >= 1){
    $(this).parent().addClass('active');
  } else {
    $(this).parent().removeClass('active');
  }
});

$('.form-control').on('keyup',function(){
  var $this = $(this),
      val = $this.val();
  
  if(val.length >= 1){
    $(this).parent().addClass('active');
  } else {
    $(this).parent().removeClass('active');
  }
});

$('.page-header__search-link').on('click', function() {
  $('.page-header__search-inner-block').removeClass('disabled');
  $('.page-header__search-inner-block').addClass('active');
})

$('.page-header__search-logo-block').on('click', function() {
  $(this).parent().toggleClass('disabled');
})

$('[data-toggle="expand"]').on('click', function() {
  $(this).toggleClass('active');
  $(this).next().slideToggle(200);
});

$('.service-block__nav-subsection-title').removeClass('active');

$(window).scroll(function() {

  var height = $(window).scrollTop();

  if (height > 400) {
    $('.page-block__navigation-block').addClass('fixed');
  } else {
    $('.page-block__navigation-block').removeClass('fixed');
  }

});

if($('.page-block__navigation-option').hover()) {
  $(this).parent().find('.page-block__message-block').addClass('active');
} else {
  $(this).parent().find('.page-block__message-block').removeClass('active');
};

$('.page-block__navigation-option').on('mouseover', function() {
  $(this).parent().find('.page-block__message-block').addClass('active');
}).on('mouseout', function() {
  $(this).parent().find('.page-block__message-block').removeClass('active');
});

$('.page-block__message-block').on('mouseover', function() {
  $(this).addClass('active');
}).on('mouseout', function() {
  $(this).removeClass('active');
});

$('.page-header__search-link').on('click', function() {
  $('#transparent_search').addClass('active');
});

$('#transparent_search').on('click', function(e) {
  e.preventDefault();
  $(this).removeClass('active');
  $('.page-header__search-inner-block').removeClass('active');
});

$('#transparent_menu').on('click', function(e) {
  e.preventDefault();
  $(this).removeClass('active');
  $("#header-menu").removeClass("active");
});

// const scrollBarWidth = window.innerWidth - document.documentElement.offsetWidth;
// document.body.style.paddingRight = '${scrollBarWidth}px';
// $('body').toggleClass('active');

$('.page-footer__title-wrapper').on('click', function() {
  if ( $(window).width() < 767) {
    $(this).parent().find('.page-footer__control-wrapper').slideToggle(600);
    $(this).find('.icon--down').toggleClass('active');
  }
});

$(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    
    var dropdownlink = this.el.find('.list-product-cat');
    dropdownlink.on('click',
                    { el: this.el, multiple: this.multiple },
                    this.dropdown);
  };
  
  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
        $this = $(this),
        $next = $this.next();
    
    $next.slideToggle();
    $this.parent().toggleClass('open');
    
    if(!e.data.multiple) {
      $el.find('.page-header__menu-subnav').not($next).slideUp().parent().removeClass('open');
    }
  }
  
  var accordion = new Accordion($('.page-header__menu-nav'), false);
});

$('.projects-block__control-link').on('click', function() {
  $('.projects-block__card-block').removeClass('active');
  $(this).parent().find('.projects-block__card-block').addClass('active');
  $('.projects-block__map-transparent').addClass('active');
});

$('.projects-block__toggle-close').on('click', function() {
  $(this).parent().parent().parent().removeClass('active');
});

$('.projects-block__map-transparent').on('click', function() {
  $('.projects-block__card-block').removeClass('active');
  $(this).removeClass('active');
});

// Core
function initCarousel( options ) {
  function CustomCarousel( options ) {
    this.init( options );
    this.addListeners();
    return this;
  }

  CustomCarousel.prototype.init = function ( options ) {
    this.node        = options.node;
    this.node.slider = this;
    this.slides      = this.node.querySelector( '.slides' ).children;
    this.slidesN     = this.slides.length;
    this.pagination  = this.node.querySelector( '.pagination' );
    this.pagTransf   = 'translate( -50%, -50% )';
    this.dots        = this.pagination.children;
    this.dotsN       = this.dots.length;
    this.step        = -360/this.dotsN;
    this.angle       = 0;
    this.next        = this.node.querySelector( '.next' );
    this.prev        = this.node.querySelector( '.prev' );
    this.activeN     = options.activeN || 0;
    this.prevN       = this.activeN;
    this.speed       = options.speed || 300;
    this.autoplay    = options.autoplay || false;
    this.autoplayId  = null;

    this.setSlide( this.activeN );
    this.arrangeDots();
    this.pagination.style.transitionDuration = this.speed +'ms';
    if ( this.autoplay ) this.startAutoplay();
  }

  CustomCarousel.prototype.addListeners = function () {
    var slider = this;

    if ( this.next ) {
      this.next.addEventListener( 'click', function() {
        slider.setSlide( slider.activeN + 1 );
      });
    }

    if ( this.prev ) {
      this.prev.addEventListener( 'click', function() {
        slider.setSlide( slider.activeN - 1 );
      });
    }

    for ( var i = 0; i < this.dots.length; i++ ) {    
      this.dots[i].addEventListener( 'click', function( i ) {
        return function() { slider.setSlide( i ); }
      }( i ));
    }

    if ( this.autoplay ) {
      this.node.addEventListener( 'mouseenter', function() {
        slider.stopAutoplay();
      });

      this.node.addEventListener( 'mouseleave', function() {
        slider.startAutoplay();
      });
    }
  };

  CustomCarousel.prototype.setSlide = function ( slideN ) {
    this.slides[ this.activeN ].classList.remove( 'active' );
    if ( this.dots[ this.activeN ] ) this.dots[ this.activeN ].classList.remove( 'active' );

    this.prevN = this.activeN;
    this.activeN = slideN;
    if ( this.activeN < 0 ) this.activeN = this.slidesN -1;
    else if ( this.activeN >= this.slidesN ) this.activeN = 0;

    this.slides[ this.activeN ].classList.toggle( 'active' ); 
    if ( this.dots[ this.activeN ] ) this.dots[ this.activeN ].classList.toggle( 'active' );

    this.rotate();
  };

  CustomCarousel.prototype.rotate = function () {
    if ( this.activeN < this.dotsN ) {
      this.angle += function ( dots, next, prev, step ) {
        var inc, half = dots/2;
        if( prev > dots ) prev = dots - 1;
        if( Math.abs( inc = next - prev ) <= half ) return step * inc;
        if( Math.abs( inc = next - prev + dots ) <= half ) return step * inc;
        if( Math.abs( inc = next - prev - dots ) <= half ) return step * inc;
      }( this.dotsN, this.activeN, this.prevN, this.step )

      this.pagination.style.transform = this.pagTransf +'rotate('+ this.angle +'deg)';
    }
  };

  CustomCarousel.prototype.startAutoplay = function () {
    var slider = this;

    this.autoplayId = setInterval( function(){
      slider.setSlide( slider.activeN + 1 );
    }, this.autoplay );
  };

  CustomCarousel.prototype.stopAutoplay = function () {
    clearInterval( this.autoplayId );
  };

  CustomCarousel.prototype.arrangeDots = function () {
    for ( var i = 0; i < this.dotsN; i++ ) {
      this.dots[i].style.transform = 'rotate('+ 360/this.dotsN * i +'deg)';
    }
  };
  
  return new CustomCarousel( options );
}


// Init
var plugins = {
  customCarousel: document.querySelectorAll( '.circle-carousel' )
}

document.addEventListener( 'DOMContentLoaded', function() {
  if( plugins.customCarousel.length ) {
    for ( var i = 0; i < plugins.customCarousel.length; i++ ) {
      var carousel = initCarousel({
        node: plugins.customCarousel[i],
        speed: plugins.customCarousel[i].getAttribute( 'data-speed' ),
        autoplay: plugins.customCarousel[i].getAttribute( 'data-autoplay' )
      });
    }
  }
});
