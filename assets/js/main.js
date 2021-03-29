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
  $(this).addClass('active');
  $("#header-menu").addClass("active");
});

$("#menu-toggle-active").click(function(e) {
  e.preventDefault();
  $("#header-menu").removeClass("active");
});

$('.btn--language').on('click', function() {
	$(this).toggleClass('active');
});

$.extend($.validator.messages, {
    required: "Fill in the field correctly",
    email: "Enter correct mail",
    password: "Enter the correct password",
});

$("form").each(function() {
    $(this).validate({
        errorPlacement: function(e, i) {
              e.addClass("error-message"),
              e.appendTo(i.parent("div"))
        },
        highlight: function(e) {
            $('.form-block__input-wrapper').removeClass('success').addClass('error');
        },
        unhighlight: function(e) {
            $('.form-block__input-wrapper').addClass('success').removeClass('error');
        },
        ignore: [],
        rules: {
            name: "required",
            tel: {
                required: !0,
            },
            email: {
                required: !0,
                email: true
            },
            password: {
                required: !0,
            },
        },
    });
});

$(document).off('change focusout keydown keypress input', 'input, textarea').on('change focusout keydown keypress input', 'input, textarea', function(e) {
 if ($(this).val() != '') {
  $(this).addClass('not-empty').parent().parent().addClass('not-empty');
 } else {
  $(this).removeClass('not-empty').parent().parent().removeClass('not-empty');
 }
});

const reviewsSwiper = new Swiper('#reviews_slider', {
  slidesPerView: 'auto',
  speed: 1000,
  spaceBetween: 38,
	navigation: {
		nextEl: '.main-reviews-button-next',
		prevEl: '.main-reviews-button-prev',
	},
  breakpoints: {
      320: {
      	spaceBetween: 20,
      },
      768: {

      },
  },
});

const videoSwiper = new Swiper('#video_slider', {
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

// const videoSwiper = new Swiper('#video_slider', {
//   slidesPerView: 'auto',
//   speed: 1000,
//   spaceBetween: 40,
//   navigation: {
//     nextEl: '.video-button-next',
//     prevEl: '.video-button-prev',
//   },
// });

// $('#video_slider').slick({
//   slidesToShow: 2,
//   slidesToScroll: 1,
//   infinite: true,
//   arrows: false,
//   dots: false,
//   fade: true,
//   swipe: false,
//   draggable: false
// });

$('.main-reviews-block__card-link').on('click', function() {
  $(this).addClass('active');
  $(this).parent().parent().addClass('active');
});


// var thanksModal = $('#popup_thanks');

// $('#main_form_button').on("click", function(){
    
//     let
//         name        = $('#main_name').val().trim(),
//         email       = $('#main_email').val().trim();

//     if(name == ""){
//         $(".alert--name").text("Enter your name");
//         $(".alert--danger").css("display", "block");

//         return false;
//     } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
//     		$(".alert--name").text("");
//         $(".alert--email").text("Mail entered incorrectly");
//         $(".alert--danger").css("display", "block");
//         return false;
//     }

//     $(".alert--name").text("");
//     $(".alert--email").text("");
//     $(".alert--danger").css("display", "none");

//     // alert("Имя: " + name + "\nEmail: " + email + "\nПароль: " + message);

//     $.ajax({
//         url: 'ajax/mail.php',
//         method: 'POST',
//         dataType: 'html',
//         cache: false,
//         data: {
//             name: 'name',
//             email: 'email',
//         },
//         beforeSend: function(){
//           $('#main_form_button').html("Dispatch");
//         },
//         success: function(data){
//           $('#main_form_button').html("Success");
//           $('.form-block__form')[0].reset();
//           openModal(thanksModal);
// 					setTimeout(function() {
// 						$('#popup_thanks .popup-block__thanks-icon').addClass('upload');
// 					}, 200);
//         },
//         error: function(){
//           $('#main_form_button').html("Error");
//         }

//     });
// });


