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
});

$("#menu-toggle-active").click(function(e) {
  e.preventDefault();
  $("#header-menu").removeClass("active");
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


$('.main-reviews-block__card-link').on('click', function() {
  $(this).addClass('active');
  $(this).parent().parent().addClass('active');
});


$('select').niceSelect();

var thanksModal = $('#popup_thanks');
var successModal = $('#popup_success');

$('#contacts_form_button').on("click", function(){
    
    let
        name        = $('#contacts_name').val().trim(),
        email       = $('#contacts_email').val().trim();

    if(name == ""){
        $(".alert--name").text("Enter your name");
        $(".alert--danger").css("display", "block");

        return false;
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        $(".alert--name").text("");
        $(".alert--email").text("Mail entered incorrectly");
        $(".alert--danger").css("display", "block");
        return false;
    }

    $(".alert--name").text("");
    $(".alert--email").text("");
    $(".alert--danger").css("display", "none");

    $.ajax({
        url: 'https://fm.sitehere.ru/html/build/ajax/mail.php',
        method: 'POST',
        dataType: 'html',
        cache: false,
        data: {
            name: 'name',
            email: 'email',
        },
        beforeSend: function(){
          $('#contacts_form_button').html("Dispatch");
        },
        success: function(data){
          $('#contacts_form_button').html("Success");
          openModal(thanksModal);
          setTimeout(function() {
            $('#popup_thanks .popup-block__thanks-icon').addClass('upload');
          }, 200);
        },
        error: function(){
          $('#contacts_form_button').html("Error");
        }

    });
});

$('#register_form_button').on("click", function(){
    
    let
        userName        = $('#registration_username').val().trim(),
        firstName       = $('#registration_firstname').val().trim(),
        lastName        = $('#registration_lastname').val().trim(),
        email           = $('#registration_email').val().trim(),
        birth           = $('#registration_birth').val().trim(),
        hometown        = $('#registration_hometown').val().trim(),
        phone           = $('#registration_phone').val().trim(),
        password        = $('#registration_password_1').val(),
        confirmPassword = $('#registration_password_2').val();

    if(userName == ""){
        $(".alert--username").text("Enter your username");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (firstName == "") {
        $(".alert--username").text("");
        $(".alert--firstname").text("Enter your First name");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (lastName == "") {
        $(".alert--firstname").text("");
        $(".alert--lastname").text("Enter your Last name");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        $(".alert--lastname").text("");
        $(".alert--email").text("Mail entered incorrectly");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (birth == "") {
        $(".alert--email").text("");
        $(".alert--birth").text("Enter your birth date");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (hometown == "") {
        $(".alert--birth").text("");
        $(".alert--hometown").text("Enter your hometown");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (phone == "") {
        $(".alert--hometown").text("");
        $(".alert--phone").text("Enter your phone number");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (password == "") {
        $(".alert--phone").text("");
        $(".alert--password").text("Enter your password");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (confirmPassword == "") {
        $(".alert--password").text("");
        $(".alert--confirmPassword").text("Enter confirm password");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (password != confirmPassword) {
        $(".alert--phone").text("");
        $(".alert--password").text("Password mismatch");
        $(".alert--danger").css("display", "block");
        return false;
    }

    $(".alert--username").text("");
    $(".alert--email").text("");
    $(".alert--firstname").text("");
    $(".alert--lastname").text("");
    $(".alert--birth").text("");
    $(".alert--hometown").text("");
    $(".alert--phone").text("");
    $(".alert--password").text("");
    $(".alert--confirmPassword").text("");
    $(".alert--danger").css("display", "none");

    $.ajax({
        url: 'https://fm.sitehere.ru/html/build/ajax/mail.php',
        method: 'POST',
        dataType: 'html',
        cache: false,
        data: {
            userName: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            birth: 'birth',
            hometown: 'hometown',
            phone: 'phone',
            password: 'password',
            confirmPassword: 'confirmPassword',
        },
        beforeSend: function(){
          $('#register_form_button').html("Dispatch");
        },
        success: function(data){

        },
        error: function(){
          $('#register_form_button').html("Error");
        }

    });
});

$('#user_form_button').on("click", function(){
    
    let
        dataUserName  = $('#user_login').val().trim(),
        datafirstName = $('#user_firstname').val().trim(),
        dataLastName  = $('#user_lastname').val().trim(),
        dataEmail     = $('#user_email').val().trim();

    if(dataUserName == ""){
        $(".alert--username").text("Enter your username");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (datafirstName == "") {
        $(".alert--username").text("");
        $(".alert--firstname").text("Enter your First name");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (dataLastName == "") {
        $(".alert--firstname").text("");
        $(".alert--lastname").text("Enter your Last name");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(dataEmail)) {
        $(".alert--lastname").text("");
        $(".alert--email").text("Mail entered incorrectly");
        $(".alert--danger").css("display", "block");
        return false;
    }

    $(".alert--username").text("");
    $(".alert--firstname").text("");
    $(".alert--lastname").text("");
    $(".alert--email").text("");
    $(".alert--danger").css("display", "none");

    $.ajax({
        url: 'https://fm.sitehere.ru/html/build/ajax/mail.php',
        method: 'POST',
        dataType: 'html',
        cache: false,
        data: {
            dataUserName: 'userName',
            dataFirstName: 'firstName',
            dataLastName: 'lastName',
            dataEmail: 'email',
        },
        beforeSend: function(){
          $('#user_form_button').html("Dispatch");
        },
        success: function(data){
          openModal(successModal);
          setTimeout(function() {
            $('#popup_success .popup-block__thanks-icon').addClass('upload');
          }, 200);
        },
        error: function(){
          $('#user_form_button').html("Error");
        }

    });
});

$('#password_form_button').on("click", function(){
    
    let
        currentPassword  = $('#current_password').val().trim(),
        newPassword      = $('#new_password').val().trim(),
        confirmPassword  = $('#confirm_password').val().trim();

    if(currentPassword == ""){
        $(".alert--current").text("Enter current password");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (newPassword == "") {
        $(".alert--current").text("");
        $(".alert--new").text("Enter new password");
        $(".alert--danger").css("display", "block");
        return false;
    } else if (confirmPassword == "") {
        $(".alert--new").text("");
        $(".alert--confirm").text("Enter confirm password");
        $(".alert--danger").css("display", "block");
        return false;
    }

    $(".alert--current").text("");
    $(".alert--new").text("");
    $(".alert--confirm").text("");
    $(".alert--danger").css("display", "none");

    $.ajax({
        url: 'https://fm.sitehere.ru/html/build/ajax/mail.php',
        method: 'POST',
        dataType: 'html',
        cache: false,
        data: {
            currentPassword: 'currentPassword',
            newPassword: 'newPassword',
            confirmPassword: 'confirmPassword',
        },
        beforeSend: function(){
          $('#password_form_button').html("Dispatch");
        },
        success: function(data){
          openModal(successModal);
          setTimeout(function() {
            $('#popup_success .popup-block__thanks-icon').addClass('upload');
          }, 200);
        },
        error: function(){
          $('#password_form_button').html("Error");
        }

    });
});

$('#update_form_button').on("click", function(){
    
    let password  = $('#delete_password').val().trim();

    if(password == ""){
        $(".alert--password").text("Enter current password");
        $(".alert--danger").css("display", "block");
        return false;
    }

    $(".alert--password").text("");
    $(".alert--danger").css("display", "none");

    $.ajax({
        url: 'https://fm.sitehere.ru/html/build/ajax/mail.php',
        method: 'POST',
        dataType: 'html',
        cache: false,
        data: {
            password: 'password',
        },
        beforeSend: function(){
          $('#update_form_button').html("Dispatch");
        },
        success: function(data){
          openModal(successModal);
          setTimeout(function() {
            $('#popup_success .popup-block__thanks-icon').addClass('upload');
          }, 200);
        },
        error: function(){
          $('#update_form_button').html("Error");
        }

    });
});

// $('.enter-block__password-hidden').on('click', function() {
//   var password = $('#enter_password');
//   if(password.attr('type') == 'password') {
//     password.attr('type', 'text');
//   } else {
//     password.attr('type', 'password');
//   }
// });

// $('.registration-block__password-hidden').on('click', function() {
//   var password = $('#registration_password_1');
//   if($(this).parent().find(password).attr('type') == 'password') {
//     password.attr('type', 'text');
//   } else {
//     password.attr('type', 'password');
//   }
// });

// $('.registration-block__password-hidden').on('click', function() {
//   var confirmPassword = $('#registration_password_2');
//   if($(this).parent().find(confirmPassword).attr('type') == 'password') {
//     confirmPassword.attr('type', 'text');
//   } else {
//     confirmPassword.attr('type', 'password');
//   }
// });

// $('.password-block__icon-hidden').on('click', function() {
//   var currentPassword = $('#current_password');
//   var newPassword = $('#new_password');
//   var passwordConfirm = $('#confirm_password');

//   if($(this).parent().find(currentPassword).attr('type') == 'password') {
//     currentPassword.attr('type', 'text');
//   } else {
//     currentPassword.attr('type', 'password');
//   }

//   if($(this).parent().find(newPassword).attr('type') == 'password') {
//     newPassword.attr('type', 'text');
//   } else {
//     newPassword.attr('type', 'password');
//   }

//   if($(this).parent().find(passwordConfirm).attr('type') == 'password') {
//     passwordConfirm.attr('type', 'text');
//   } else {
//     passwordConfirm.attr('type', 'password');
//   }
// });

// $('.delete-block__password-hidden').on('click', function() {
//   var deletePassword = $('#delete_password');
//   if(deletePassword.attr('type') == 'password') {
//     deletePassword.attr('type', 'text');
//   } else {
//     deletePassword.attr('type', 'password');
//   }
// });

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

// $.fn.datepicker.language['en'] = {
//   days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//   daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//   daysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
//   months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
//   monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   today: 'Today',
//   clear: 'Clear',
//   dateFormat: 'mm/dd/yyyy',
//   timeFormat: 'hh:ii aa',
//   firstDay: 0
// };

// var addDatepicker = $('#add_datepicker').datepicker().data('datepicker');
// var memorialDatepicker = $('#memorial_datepicker').datepicker().data('datepicker');

// $('#add_datepicker').datepicker({
//   language: 'en',
//   autoClose: true,
//   prevHtml: '<svg width="7" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M5.668 1.106l-.5.625.5-.625zm.125 1.125l-.625-.5.625.5zm-1.25-1l-.624-.5.624.5zm-1.6 2l.625.5-.625-.5zM1.353 5.22l.614.512a.773.773 0 00.01-.012l-.624-.5zm-.108.169l.723.343-.723-.343zm0 .687l.723-.343-.723.343zm.108.168l.625-.5a.864.864 0 00-.01-.013l-.615.513zm1.59 1.988l.625-.5-.625.5zm1.6 2l.625-.5-.625.5zm1.125.125l-.5-.625.5.625zm.125-1.125l-.625.5.625-.5zm-1.6-2l-.625.5.625-.5zm-1.2-1.5l-.625-.5a.8.8 0 000 1l.624-.5zm1.2-1.5l.624.5-.624-.5zm.975-2.5l1.25 1a1.6 1.6 0 00-.25-2.25l-1 1.25zm0 0l1-1.25a1.6 1.6 0 00-2.25.25l1.25 1zm-1.6 2l1.6-2-1.25-1-1.6 2 1.25 1zm-1.59 1.988l1.59-1.988-1.25-1L.729 4.72l1.25 1zm-.01.011v.001L.738 4.707c-.088.105-.16.22-.217.34l1.446.684zm0 .002L.523 5.043c-.21.44-.203.946 0 1.374l1.445-.686zm0-.002v.002l-1.445.686c.057.12.129.233.216.338L1.967 5.73zm1.6 2.001l-1.59-1.988-1.25 1 1.59 1.987 1.25-.999zm1.6 2l-1.6-2-1.25 1 1.6 2 1.25-1zm0 0l-1.25 1a1.6 1.6 0 002.25.25l-1-1.25zm0 0l1 1.25a1.6 1.6 0 00.25-2.25l-1.25 1zm-1.6-2l1.6 2 1.25-1-1.6-2-1.25 1zm-1.2-1.5l1.2 1.5 1.25-1-1.2-1.5-1.25 1zm1.2-2.5l-1.2 1.5 1.25 1 1.2-1.5-1.25-1zm1.6-2l-1.6 2 1.25 1 1.6-2-1.25-1z"/></svg>',
//   nextHtml: '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><path d="M5.9019 5.21882L5.2772 5.71858C5.28068 5.72292 5.2842 5.72723 5.28777 5.7315L5.9019 5.21882ZM4.3118 3.2312L4.9365 2.73144H4.9365L4.3118 3.2312ZM2.7118 1.2312L2.08711 1.73096L2.08711 1.73096L2.7118 1.2312ZM1.58735 1.10626L1.0876 0.481567L1.0876 0.481567L1.58735 1.10626ZM1.46241 2.23071L0.837719 2.73047V2.73047L1.46241 2.23071ZM3.06241 4.23071L3.68711 3.73096L3.06241 4.23071ZM4.26261 5.73096L4.8873 6.23071C5.12104 5.93854 5.12104 5.52338 4.8873 5.2312L4.26261 5.73096ZM3.06241 7.2312L3.68711 7.73096L3.06241 7.2312ZM1.46241 9.2312L2.08711 9.73096H2.08711L1.46241 9.2312ZM1.58735 10.3557L1.0876 10.9803H1.0876L1.58735 10.3557ZM2.7118 10.2307L2.08711 9.73096H2.08711L2.7118 10.2307ZM4.3118 8.23071L4.9365 8.73047L4.3118 8.23071ZM5.90189 6.2431L5.28777 5.73041C5.2842 5.73469 5.28068 5.739 5.2772 5.74334L5.90189 6.2431ZM6.00959 6.07492L6.73216 6.41828L6.00959 6.07492ZM6.01004 5.38795L5.28702 5.73035L5.28757 5.7315L6.01004 5.38795ZM6.52659 4.71906L4.9365 2.73144L3.68711 3.73096L5.2772 5.71858L6.52659 4.71906ZM4.9365 2.73144L3.3365 0.731445L2.08711 1.73096L3.68711 3.73096L4.9365 2.73144ZM3.3365 0.731445C2.78448 0.0414253 1.77762 -0.0704478 1.0876 0.481567L2.08711 1.73096L2.08711 1.73096L3.3365 0.731445ZM1.0876 0.481567C0.397579 1.03358 0.285704 2.04045 0.837719 2.73047L2.08711 1.73096L2.08711 1.73096L1.0876 0.481567ZM0.837719 2.73047L2.43772 4.73047L3.68711 3.73096L2.08711 1.73096L0.837719 2.73047ZM2.43772 4.73047L3.63791 6.23071L4.8873 5.2312L3.68711 3.73096L2.43772 4.73047ZM3.63791 5.2312L2.43772 6.73145L3.68711 7.73096L4.8873 6.23071L3.63791 5.2312ZM2.43772 6.73145L0.837719 8.73145L2.08711 9.73096L3.68711 7.73096L2.43772 6.73145ZM0.837719 8.73144C0.285704 9.42146 0.397579 10.4283 1.0876 10.9803L2.08711 9.73096H2.08711L0.837719 8.73144ZM1.0876 10.9803C1.77762 11.5324 2.78448 11.4205 3.3365 10.7305L2.08711 9.73096H2.08711L1.0876 10.9803ZM3.3365 10.7305L4.9365 8.73047L3.68711 7.73096L2.08711 9.73096L3.3365 10.7305ZM4.9365 8.73047L6.52659 6.74286L5.2772 5.74334L3.68711 7.73096L4.9365 8.73047ZM6.51602 6.75579C6.6032 6.65136 6.67539 6.53776 6.73216 6.41828L5.28702 5.73156C5.28718 5.73124 5.28745 5.73079 5.28777 5.73041L6.51602 6.75579ZM6.73216 6.41828C6.93547 5.99043 6.94198 5.48488 6.73252 5.0444L5.28757 5.7315L5.28702 5.73156L6.73216 6.41828ZM6.73307 5.04555C6.67616 4.92539 6.60367 4.81112 6.51603 4.70614L5.28777 5.7315C5.28745 5.73111 5.28717 5.73066 5.28702 5.73035L6.73307 5.04555Z"/></svg>',
// });

// $("#button_datepicker").on('click', function() {
//   addDatepicker.show();
// });

// $('#memorial_datepicker').datepicker({
//   language: 'en',
//   autoClose: true,
//   prevHtml: '<svg width="7" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M5.668 1.106l-.5.625.5-.625zm.125 1.125l-.625-.5.625.5zm-1.25-1l-.624-.5.624.5zm-1.6 2l.625.5-.625-.5zM1.353 5.22l.614.512a.773.773 0 00.01-.012l-.624-.5zm-.108.169l.723.343-.723-.343zm0 .687l.723-.343-.723.343zm.108.168l.625-.5a.864.864 0 00-.01-.013l-.615.513zm1.59 1.988l.625-.5-.625.5zm1.6 2l.625-.5-.625.5zm1.125.125l-.5-.625.5.625zm.125-1.125l-.625.5.625-.5zm-1.6-2l-.625.5.625-.5zm-1.2-1.5l-.625-.5a.8.8 0 000 1l.624-.5zm1.2-1.5l.624.5-.624-.5zm.975-2.5l1.25 1a1.6 1.6 0 00-.25-2.25l-1 1.25zm0 0l1-1.25a1.6 1.6 0 00-2.25.25l1.25 1zm-1.6 2l1.6-2-1.25-1-1.6 2 1.25 1zm-1.59 1.988l1.59-1.988-1.25-1L.729 4.72l1.25 1zm-.01.011v.001L.738 4.707c-.088.105-.16.22-.217.34l1.446.684zm0 .002L.523 5.043c-.21.44-.203.946 0 1.374l1.445-.686zm0-.002v.002l-1.445.686c.057.12.129.233.216.338L1.967 5.73zm1.6 2.001l-1.59-1.988-1.25 1 1.59 1.987 1.25-.999zm1.6 2l-1.6-2-1.25 1 1.6 2 1.25-1zm0 0l-1.25 1a1.6 1.6 0 002.25.25l-1-1.25zm0 0l1 1.25a1.6 1.6 0 00.25-2.25l-1.25 1zm-1.6-2l1.6 2 1.25-1-1.6-2-1.25 1zm-1.2-1.5l1.2 1.5 1.25-1-1.2-1.5-1.25 1zm1.2-2.5l-1.2 1.5 1.25 1 1.2-1.5-1.25-1zm1.6-2l-1.6 2 1.25 1 1.6-2-1.25-1z"/></svg>',
//   nextHtml: '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><path d="M5.9019 5.21882L5.2772 5.71858C5.28068 5.72292 5.2842 5.72723 5.28777 5.7315L5.9019 5.21882ZM4.3118 3.2312L4.9365 2.73144H4.9365L4.3118 3.2312ZM2.7118 1.2312L2.08711 1.73096L2.08711 1.73096L2.7118 1.2312ZM1.58735 1.10626L1.0876 0.481567L1.0876 0.481567L1.58735 1.10626ZM1.46241 2.23071L0.837719 2.73047V2.73047L1.46241 2.23071ZM3.06241 4.23071L3.68711 3.73096L3.06241 4.23071ZM4.26261 5.73096L4.8873 6.23071C5.12104 5.93854 5.12104 5.52338 4.8873 5.2312L4.26261 5.73096ZM3.06241 7.2312L3.68711 7.73096L3.06241 7.2312ZM1.46241 9.2312L2.08711 9.73096H2.08711L1.46241 9.2312ZM1.58735 10.3557L1.0876 10.9803H1.0876L1.58735 10.3557ZM2.7118 10.2307L2.08711 9.73096H2.08711L2.7118 10.2307ZM4.3118 8.23071L4.9365 8.73047L4.3118 8.23071ZM5.90189 6.2431L5.28777 5.73041C5.2842 5.73469 5.28068 5.739 5.2772 5.74334L5.90189 6.2431ZM6.00959 6.07492L6.73216 6.41828L6.00959 6.07492ZM6.01004 5.38795L5.28702 5.73035L5.28757 5.7315L6.01004 5.38795ZM6.52659 4.71906L4.9365 2.73144L3.68711 3.73096L5.2772 5.71858L6.52659 4.71906ZM4.9365 2.73144L3.3365 0.731445L2.08711 1.73096L3.68711 3.73096L4.9365 2.73144ZM3.3365 0.731445C2.78448 0.0414253 1.77762 -0.0704478 1.0876 0.481567L2.08711 1.73096L2.08711 1.73096L3.3365 0.731445ZM1.0876 0.481567C0.397579 1.03358 0.285704 2.04045 0.837719 2.73047L2.08711 1.73096L2.08711 1.73096L1.0876 0.481567ZM0.837719 2.73047L2.43772 4.73047L3.68711 3.73096L2.08711 1.73096L0.837719 2.73047ZM2.43772 4.73047L3.63791 6.23071L4.8873 5.2312L3.68711 3.73096L2.43772 4.73047ZM3.63791 5.2312L2.43772 6.73145L3.68711 7.73096L4.8873 6.23071L3.63791 5.2312ZM2.43772 6.73145L0.837719 8.73145L2.08711 9.73096L3.68711 7.73096L2.43772 6.73145ZM0.837719 8.73144C0.285704 9.42146 0.397579 10.4283 1.0876 10.9803L2.08711 9.73096H2.08711L0.837719 8.73144ZM1.0876 10.9803C1.77762 11.5324 2.78448 11.4205 3.3365 10.7305L2.08711 9.73096H2.08711L1.0876 10.9803ZM3.3365 10.7305L4.9365 8.73047L3.68711 7.73096L2.08711 9.73096L3.3365 10.7305ZM4.9365 8.73047L6.52659 6.74286L5.2772 5.74334L3.68711 7.73096L4.9365 8.73047ZM6.51602 6.75579C6.6032 6.65136 6.67539 6.53776 6.73216 6.41828L5.28702 5.73156C5.28718 5.73124 5.28745 5.73079 5.28777 5.73041L6.51602 6.75579ZM6.73216 6.41828C6.93547 5.99043 6.94198 5.48488 6.73252 5.0444L5.28757 5.7315L5.28702 5.73156L6.73216 6.41828ZM6.73307 5.04555C6.67616 4.92539 6.60367 4.81112 6.51603 4.70614L5.28777 5.7315C5.28745 5.73111 5.28717 5.73066 5.28702 5.73035L6.73307 5.04555Z"/></svg>',
// });

// $("#memorial_button_datepicker").on('click', function() {
//   memorialDatepicker.show();
// });


// $('.add-block__section-type').on('click', function() {
//   $('.add-block__section-type').removeClass('active');
//   $(this).toggleClass('active');
// })

// $('.add-block__templates-photo-wrapper').on('click', function() {
//   $('.add-block__templates-photo-wrapper').removeClass('active');
//   $(this).addClass('active');
// })

// $('.memorial-block__scheme-card-block').on('click', function() {
//   $('.memorial-block__scheme-card-block').removeClass('active');
//   $(this).addClass('active');
// })


// $('.btn--done').on('click', function() {
//   closeModal($(this).parents('.popup-block')[0]);
// });

// $('.btn--cancel').on('click', function() {
//   closeModal($(this).parents('.popup-block')[0]);
// });

// $('.btn--loading').on('click', function() {
//   $(this).addClass('disabled');
//   $(this).parent().parent().parent().find('.messages-block__table-wrapper').fadeIn(500);
// });

// $('.page-header__profile-menu-nav ul li a').on('click', function() {
//   $('.page-header__profile-menu-nav ul li a').removeClass('active');
//   $(this).addClass('active');
// });

// $('.memorial-block__theme-card-block').on('click', function() {
//   $('.memorial-block__theme-card-block').removeClass('active');
//   $(this).addClass('active');
// })

// $('.confirm-block__section-card-block').on('click', function() {
//   $('.confirm-block__section-card-block').removeClass('active');
//   $(this).addClass('active');
// })

// $('#import_load_button').on('click', function() {
//   $('.import-block__table-inner-wrapper').toggleClass('active');
// });

// $('.btn--delete').on('click', function() {
//   $('.import-block__table-wrapper').addClass('disabled');
// });

// $('.affiliates-block__questions-card-heading').click(function() {
//   $(this).toggleClass('in').next().stop().slideToggle(500).parent().toggleClass('active');
// });

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


$(window).on('scroll load', function() {
  var ScrollTopFixedHeight = 300;
  if ($(window).width() < 768) {
    ScrollTopFixedHeight = 300;
  }
  if ($(this).scrollTop() > ScrollTopFixedHeight && !($('body').hasClass("scroll-top-active")) ) {
   $('body').addClass("scroll-top-active");
  } else if($(this).scrollTop() <= ScrollTopFixedHeight && $('body').hasClass("scroll-top-active")) {
   $('body').removeClass("scroll-top-active");
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

// $('.page-block__navigation-option').focusin(function() {
//   $(this).parent().find('.page-block__message-block').addClass('active');
// })

// $('.page-block__navigation-option').focusout(function() {
//   $(this).parent().find('.page-block__message-block').addClass('active');
// })

$('.page-header__search-link').on('click', function() {
  $('.page-header__menu-transparent').addClass('active');
});

$(".page-header__menu-transparent").on('click', function(e) {
  e.preventDefault();
  $(".page-header__menu-transparent").removeClass('active');
  $('.page-header__search-inner-block').removeClass('active');
});

