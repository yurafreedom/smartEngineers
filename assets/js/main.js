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

  reviewSwiper.update(true);
  videoSwiper.update(true);
  blogSwiper.update(true);
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

var reviewSwiper = new Swiper('#reviews_slider', {
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 40,
  loop: true,
	navigation: {
		nextEl: '.main-reviews-button-next',
		prevEl: '.main-reviews-button-prev',
	},
  breakpoints: {
      320: {
      	spaceBetween: 20,
      },
      768: {
        spaceBetween: 30,
      },
  },
});

var videoSwiper = new Swiper('#video_slider', {
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 40,
  navigation: {
    nextEl: '.video-button-next',
    prevEl: '.video-button-prev',
  },
  breakpoints: {
      320: {
        spaceBetween: 20,
      },
      768: {

      },
  },
});

var blogSwiper = new Swiper('#blog_slider', {
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: '.blog-button-next',
    prevEl: '.blog-button-prev',
  },
  breakpoints: {
      320: {
        spaceBetween: 20,
      },
      768: {

      },
  },
});

var partnerSwiper = new Swiper('#partners_slider', {
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: '.partners-button-next',
    prevEl: '.partners-button-prev',
  },
  breakpoints: {
      320: {
        spaceBetween: 20,
      },
      768: {
        spaceBetween: 20,
      },
  },
});


$('select').niceSelect();

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
  $(this).parent().find('.page-footer__control-wrapper').slideToggle(600);
  $(this).find('.icon--down').toggleClass('active');
})

$('.page-header__menu-nav ul .list-product-cat').click(function(e) {
  e.preventDefault();
  $(this).find('.icon--down').toggleClass('active');
  $('.page-header__menu-nav ul .page-header__menu-subnav').slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
  e.stopPropagation();

  var span = $(this).find('.glyphicon');
  span.toggleClass('glyphicon-menu-up glyphicon-menu-down');
});



