(function ($) {
	"use strict";

	$(window).on("load", function () {
		preloader();
		wowAnimation();
		xb_text_invert();
		textAnim();
	});
	
	/*------------------------------------------
	= preloader
	-------------------------------------------*/
	function preloader() {
		$('#preloader').fadeOut('slow',function(){
			$(this).remove();
		});
	}
	setTimeout(function () {
		if ($('#preloader').length) {
			preloader();
		}
	}, 2000);
	
	// gsap
	gsap.config({
		nullTargetWarn: false,
	});
	
	/*------------------------------------------
	= back to top
	-------------------------------------------*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.xb-backtotop').addClass('active');
		} else {
			$('.xb-backtotop').removeClass('active');
		}
	});  
	$(function () {
		$(".scroll").on('click', function (e) {
			e.preventDefault();
			var lenis = window.lenis || document.documentElement._lenis;
			if (lenis && typeof lenis.scrollTo === "function") {
				lenis.scrollTo(0, { duration: 1.15 });
			} else {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
			return false;
		});
	});

	/*------------------------------------------
	= sticky header
	-------------------------------------------*/
	function stickyHeader() {
		var scrollDirection = "";
		var lastScrollPosition = 0;

		// Clone and make header sticky if the element with class 'xb-header' exists
		if ($('.xb-header').length && !$("#xb-header-area").hasClass("header-premium")) {
			$('.xb-header').addClass('original').clone(true).insertAfter('.xb-header').addClass('xb-header-area-sticky xb-sticky-stt').removeClass('original');
		}

		// Handle scroll events
		$(window).on("scroll", function () {
			var currentScrollPosition = $(window).scrollTop();

			// Determine scroll direction
			scrollDirection = currentScrollPosition < lastScrollPosition ? "up" : "down";
			lastScrollPosition = currentScrollPosition;

			// Check if element with ID 'xb-header-area' has class 'is-sticky'
			if ($("#xb-header-area").hasClass("is-sticky")) {
				// Add or remove classes based on scroll position for sticky header and mobile header
				if (lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stb").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stb").removeClass("xb-header-fixed");
				}

				// Add or remove classes for sticky header based on scroll direction
				if (scrollDirection === "up" && lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stt").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stt").removeClass("xb-header-fixed");
				}
			}
		});
	}
	stickyHeader();

	/*------------------------------------------
	= header search
	-------------------------------------------*/
	$(".header-search-btn").on('click', function () {
		e.preventDefault();
		$(".header-search-form-wrapper").addClass("open");
		$('.header-search-form-wrapper input[type="search"]').focus();
		$('.body-overlay').addClass('active');
	});
	$(".xb-search-close").on('click', function () {
		e.preventDefault();
		$(".header-search-form-wrapper").removeClass("open");
		$("body").removeClass("active");
		$('.body-overlay').removeClass('active');
	});

	/*------------------------------------------
	= sidebar
	-------------------------------------------*/
	$('.sidebar-menu-close, .body-overlay').on('click', function () {
		$('.offcanvas-sidebar').removeClass('active');
		$('.body-overlay').removeClass('active');
	});

	$('.offcanvas-sidebar-btn').on('click', function () {
		$('.offcanvas-sidebar').addClass('active');
		$('.body-overlay').addClass('active');
	});
	$('.offcanvas-sidebar .xb-menu-primary a[href^="#"], .header-premium__nav a[href^="#"], .header-premium__cta').on('click', function () {
		$('.offcanvas-sidebar').removeClass('active');
		$('.body-overlay').removeClass('active');
	});
	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".header-search-form-wrapper").removeClass("open");
	});

	/*------------------------------------------
	= mobile menu
	-------------------------------------------*/
	$('.xb-nav-hidden li.menu-item-has-children > a').append('<span class="xb-menu-toggle"></span>');
	$('.xb-header-menu li.menu-item-has-children, .xb-menu-primary li.menu-item-has-children').append('<span class="xb-menu-toggle"></span>');
	$('.xb-menu-toggle').on('click', function () {
		if (!$(this).hasClass('active')) {
			$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
			$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
		}
		$(this).toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
	});

	$('.xb-nav-hidden li.menu-item-has-children > a').on('click', function () {
		var target = $(e.target);
		if ($(this).attr('href') === '#' && !(target.is('.xb-menu-toggle'))) {
			e.stopPropagation();
			if (!$(this).find('.xb-menu-toggle').hasClass('active')) {
				$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
				$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
			}
			$(this).find('.xb-menu-toggle').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
		}
	});
	$(".xb-nav-mobile").on('click', function () {
		$(this).toggleClass('active');
		$('.xb-header-menu').toggleClass('active');
		$('body').toggleClass('body-overflow');
	});

	$(".xb-menu-close, .xb-header-menu-backdrop").on('click', function () {
		$(this).removeClass('active');
		$('.xb-header-menu').removeClass('active');
		$('body').toggleClass('body-overflow');
	});
	
	/*--------------------------------------------------------------
	= addClass & removeClass with offcanvas-sidebar item
	---------------------------------------------------------------*/
	$('.offcanvas-sidebar .xb-header-menu-scroll > nav > ul > li').addClass('is-active');
	$('.offcanvas-sidebar .xb-header-menu-scroll > nav > ul > li').on("mouseenter", function () {
		$(this).addClass('is-active').siblings().removeClass('is-active');
	}).on("mouseleave", function () {
		$(this).siblings().addClass('is-active');
	});

	/*------------------------------------------
	= nice select
	-------------------------------------------*/
	$("select").not(".contact-premium select").niceSelect();

	/*------------------------------------------
	= data background and bg color
	-------------------------------------------*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ") ")
	})
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));

	});

	/*------------------------------------------
	= aos animation
	-------------------------------------------*/
	function wowAnimation() {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	}

	/*------------------------------------------
	= counter
	-------------------------------------------*/
	if ($(".xbo").length) {
		$('.xbo').appear();
		$(document.body).on('appear', '.xbo', function (e) {
			var odo = $(".xbo");
			odo.each(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.xboOptions = {
				format: 'd',
			};
		});
	}

	if ($(".xbo_trigger").length) {
        var odo = $(".xbo_trigger");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            var odometerInstance = new Odometer({
                el: this,
                value: 0,
                format: 'd',
            });
            odometerInstance.render();
            odometerInstance.update(countNumber);
        });
        $('.xbo_trigger').appear();
        $(document.body).on('appear', '.xboh', function (e) {
            // This event handler can be empty or used for additional functionality if needed
        });
    }

	/*------------------------------------------
	= smooth scroll
	-------------------------------------------*/
	const lenis = new Lenis({
		duration: 1.35,
		smoothWheel: true,
	});
	window.lenis = lenis;
	document.documentElement._lenis = lenis;

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	/*------------------------------------------
	= in-page nav (header + footer + logo)
	-------------------------------------------*/
	var hallNavIds = ["home", "about", "services", "portfolio", "contact"];

	function hallScrollTo(target, duration) {
		var scroller = window.lenis || document.documentElement._lenis;
		var opts = { duration: duration == null ? 1.15 : duration };
		if (scroller && typeof scroller.scrollTo === "function") {
			scroller.scrollTo(target, opts);
			return;
		}
		if (typeof target === "number") {
			window.scrollTo({ top: target, behavior: "smooth" });
			return;
		}
		var el = typeof target === "string" ? document.querySelector(target) : target;
		if (el && el.scrollIntoView) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	function hallSetNav(id) {
		$(".header-premium__nav li").removeClass("active");
		$('.header-premium__nav a[href="#' + id + '"]').parent().addClass("active");
		$(".xb-menu-primary .menu-item").removeClass("current-menu-item");
		$('.xb-menu-primary a[href="#' + id + '"]').parent().addClass("current-menu-item");
		$('.footer-premium__col[aria-label="Company"] a').removeClass("is-current");
		$('.footer-premium__col[aria-label="Company"] a[href="#' + id + '"]').addClass("is-current");
	}

	function hallSpy() {
		var current = "home";
		var i;
		var el;
		for (i = 0; i < hallNavIds.length; i++) {
			el = document.getElementById(hallNavIds[i]);
			if (!el) continue;
			if (el.getBoundingClientRect().top <= 140) current = hallNavIds[i];
		}
		if ((window.innerHeight + (window.scrollY || 0)) >= (document.documentElement.scrollHeight - 24)) {
			current = "contact";
		}
		hallSetNav(current);
	}

	$(document).on("click", 'a[href^="#"]', function (e) {
		var href = this.getAttribute("href");
		if (!href || href === "#") return;
		var id = href.slice(1);
		if (!id || id.indexOf("svc-") === 0) return;
		var el = document.getElementById(id);
		if (!el) return;
		e.preventDefault();
		$(".offcanvas-sidebar, .body-overlay").removeClass("active");
		hallScrollTo(id === "home" ? 0 : el);
		if (history.replaceState) {
			history.replaceState(null, "", href);
		}
		hallSetNav(id);
	});

	if (typeof lenis.on === "function") {
		lenis.on("scroll", hallSpy);
	} else {
		$(window).on("scroll", hallSpy);
	}
	hallSpy();

	if (window.location.hash) {
		var bootEl = document.getElementById(window.location.hash.slice(1));
		if (bootEl) {
			setTimeout(function () {
				hallScrollTo(window.location.hash === "#home" ? 0 : bootEl, 0.9);
			}, 80);
		}
	}

	/*------------------------------------------
	= isotop
	-------------------------------------------*/
	$('.grid').imagesLoaded(function () {
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item',
			}
		});

		// filter items on button click
		$('.xb-istop-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
	});

	//for menu active class
	$('.xb-istop-menu button').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});

	/*------------------------------------------
	= Background Parallax - Start
	-------------------------------------------*/
	$('.parallaxie').parallaxie({
		speed: 0.5,
		offset: 0,
	});

	/*------------------------------------------
	= about slide
	-------------------------------------------*/
	var swiper = new Swiper(".xb-about-year-nav", {
		spaceBetween: 19,
		slidesPerView: 5,
		autoplay: {
			enabled: true,
			delay: 6000,
		},
		breakpoints: {
			'768': {
				spaceBetween: 19,
			},
			'0': {
				spaceBetween: 5,
			},
			
		},
	});
	var swiper2 = new Swiper(".xb-about-content-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		autoplay: {
			delay: 6000,
			enabled: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
	});

	/*------------------------------------------
	= ap-about slide
	-------------------------------------------*/
	var swiper = new Swiper(".ap-about-content-slider", {
		loop: true,
		spaceBetween: 0,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	/*------------------------------------------
	= testimonial-slider
	-------------------------------------------*/
	var slider = new Swiper(".xb-testimonial-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 30,
		slidesPerView: 4,
		centeredSlides: false,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= project slide
	-------------------------------------------*/
	document.addEventListener("DOMContentLoaded", function () {

		var isPaused = false;
		var btn = document.querySelector('.xb-progress-btn');
		var progressCircle = document.querySelector('.xb-progress-btn svg circle');

		if (!btn || !progressCircle) return; 

		var progress = 0;
		var duration = 6000;
		var dash = 100;
		var lastTime = null;

		function resetProgress() {
			progress = 0;
			progressCircle.style.strokeDashoffset = dash;
			lastTime = null;
		}

		function animateProgress(timestamp) {
			if (!lastTime) lastTime = timestamp;
			var delta = timestamp - lastTime;
			lastTime = timestamp;

			if (!isPaused) {
				progress += delta;
				var percent = progress / duration;
				progressCircle.style.strokeDashoffset = dash - dash * percent;

				if (percent >= 1) {
					progress = 0;
				}
			}

			requestAnimationFrame(animateProgress);
		}

		requestAnimationFrame(animateProgress);

		var projectSlide = new Swiper(".xb-project-nav-slider", {
			spaceBetween: 25,
			slidesPerView: 4,
			autoplay: {
				delay: duration,
				disableOnInteraction: false,
			},
			breakpoints: {
				'768': {
					slidesPerView: 4,
					spaceBetween: 25,
				},
				'576': {
					spaceBetween: 15,
					slidesPerView: 3,
				},
				'0': {
					spaceBetween: 15,
					slidesPerView: 2,
				},
			},
			on: {
				slideChange: resetProgress
			}
		});

		var projectSlide2 = new Swiper(".xb-project-img-slider", {
			loop: true,
			effect: "fade",
			speed: 400,
			autoplay: {
				delay: duration,
				disableOnInteraction: false,
			},
			thumbs: {
				swiper: projectSlide,
			},
			on: {
				slideChange: resetProgress
			}
		});

		btn.addEventListener("click", function () {
			isPaused = !isPaused;

			if (isPaused) {
				projectSlide.autoplay.stop();
				projectSlide2.autoplay.stop();

				// aria-label change
				btn.setAttribute("aria-label", "Play Content");

			} else {
				resetProgress();
				projectSlide.autoplay.start();
				projectSlide2.autoplay.start();

				// aria-label change
				btn.setAttribute("aria-label", "Pause Content");
			}
		});


	});

	/*------------------------------------------
	= ar-testimonial-slider
	-------------------------------------------*/
	var slider = new Swiper(".ar-testimonial-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		centeredSlides: false,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".testimonials-premium .swiper-button-next",
			prevEl: ".testimonials-premium .swiper-button-prev",
		}
	});

	/*------------------------------------------
	= hero img slide
	-------------------------------------------*/
	function syncHeroHeading(index) {
		document.querySelectorAll(".hero-premium__heading").forEach(function (el) {
			el.classList.toggle("is-active", Number(el.getAttribute("data-slide")) === index);
		});
	}

	var slider = new Swiper(".xb-hero-img-slider", {
		loop: true,
		speed: 700,
		spaceBetween: 0,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		pagination: {
			el: ".xb-swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		on: {
			init: function () {
				syncHeroHeading(this.realIndex);
			},
			slideChange: function () {
				syncHeroHeading(this.realIndex);
			}
		}
	});

	/*------------------------------------------
	= xb-gallary-img-slider
	-------------------------------------------*/
	if (document.querySelector(".xb-gallary-img-slider")) {
	var slider = new Swiper(".xb-gallary-img-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 25,
		slidesPerView: 6,
		centeredSlides: false,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1200': {
				slidesPerView: 6,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 3,
			},
		},
	});
	}

	/*------------------------------------------
	= ie-hero-img-slider
	-------------------------------------------*/
	var slider = new Swiper(".ie-hero-img-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	/*------------------------------------------
	= ie-testimonial-slider
	-------------------------------------------*/
	var slider = new Swiper(".ie-testimonial-slider", {
		direction: "vertical",
		loop: true,
		speed: 800,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: false,
		autoplay: {
			delay: 15000,
			disableOnInteraction: false,
			
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".ie-testi-fraction",
			type: "fraction",
		},
	});

	/*------------------------------------------
	= ie-service-img-slider
	-------------------------------------------*/
	var slider = new Swiper(".ie-service-img-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		effect: "fade",
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	/*------------------------------------------
	= ie-service-item-slider
	-------------------------------------------*/
	var slider = new Swiper(".ie-service-item-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 3,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".xb-swiper-button-next",
			prevEl: ".xb-swiper-button-prev",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= ap-value-slider
	-------------------------------------------*/
	var slider = new Swiper(".ap-value-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 30,
		slidesPerView: 6,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= xb-team-slider
	-------------------------------------------*/
	var slider = new Swiper(".xb-team-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 0,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000
		},
	});

	/*------------------------------------------
	= blog-slider
	-------------------------------------------*/
	var slider = new Swiper(".blog-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 10,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	/*------------------------------------------
	= fc-brand-slider
	-------------------------------------------*/
	var slider = new Swiper(".fc-brand-slider", {
		loop: true,
		speed: 400,
		spaceBetween: 10,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000
		},
	});

	/*------------------------------------------
	= about slide
	-------------------------------------------*/
	var swiperItem = new Swiper(".ie-project-item-slider", {
		slidesPerView: 1,
		spaceBetween: 10,
		speed: 600,
		loop: true,
		effect: "slide",
		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
		},
	});

	/*------------------------------------------
	= image slider 
	-------------------------------------------*/
	var swiperImg = new Swiper(".ie-project-img-slider", {
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 600,
		loop: true,
		effect: "fade",
		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
		},
	});
	//  two-way control
	swiperItem.controller.control = swiperImg;
	swiperImg.controller.control = swiperItem;

	/*------------------------------------------
	= inhover active
	-------------------------------------------*/
	$(".xb-mouseenter").on('mouseenter', function () {
		$(".xb-mouseenter").removeClass("active");
		$(this).addClass("active");
	});
	$(".xb-mouseenter2").on('click', function () {
		$(".xb-mouseenter2").removeClass("active");
		$(this).addClass("active");
	});

	/*------------------------------------------
	= click button active
	-------------------------------------------*/
	$(function () {
		$('.category li').on('click', function () {
			var active = $('.category li.active');
			active.removeClass('active');
			$(this).addClass('active');
		});
	});

	/*------------------------------------------
	= magnificPopup
	-------------------------------------------*/
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	$('.popup-video').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
	});

	/*------------------------------------------
	= Accordion Box
	-------------------------------------------*/
	if ($(".accordion_box").length) {
		$(".accordion_box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion_box");
			var target = $(this).parents(".accordion");

			if ($(this).next(".acc_body").is(":visible")) {
				$(this).removeClass("active");
				$(this).next(".acc_body").slideUp(300);
				$(outerBox).children(".accordion").removeClass("active-block");
			} else {
				$(outerBox).find(".accordion .acc-btn").removeClass("active");
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox).find(".accordion").children(".acc_body").slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc_body").slideDown(300);
			}
		});
	}
	
	/*------------------------------------------
	= marquee
	-------------------------------------------*/
	$('.hero-premium__marquee').marquee({
		speed: 28,
		gap: 40,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});
	$('.marquee-left').marquee({
		speed: 20,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});	
	$('.marquee-right').marquee({
		speed: 20,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});	
	$('.project-marquee-left').marquee({
		speed: 20,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: true,
		startVisible: true,
	});
	
	
	/*------------------------------------------
	= Text reveal With Scroll 
	-------------------------------------------*/
	function xb_text_invert() {
		document.fonts.ready.then(() => {

			const split = new SplitText(".xb_text_invert", { type: "lines" });

			split.lines.forEach((target) => {
				gsap.to(target, {
					backgroundPositionX: 0,
					ease: "none",
					scrollTrigger: {
						trigger: target,
						scrub: 1,
						start: 'top 85%',
						end: "bottom center"
					}
				});
			});

		});
	}

	/*------------------------------------------
	= xb_header_text
	-------------------------------------------*/
	function textAnim() {
		document.fonts.ready.then(() => {
			let split2 = SplitText.create(".xb_header_text", {
				type: "chars",
			})
			gsap.from(split2.chars, {
				y: -300,
				autoAlpha: 0,
				stagger: 0.1,
			})
		})
	}

	/*------------------------------------------
	= fade-class-active
	-------------------------------------------*/
	if ($(".xb_fade_animation").length > 0) {
		gsap.utils.toArray(".xb_fade_animation").forEach((item) => {
			let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
				tp_duration_value = item.getAttribute("data-duration") || 0.75,
				tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
				tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
				tp_delay_value = item.getAttribute("data-delay") || 0.15,
				tp_ease_value = item.getAttribute("data-ease") || "power2.out",
				tp_anim_setting = {
					opacity: 0,
					ease: tp_ease_value,
					duration: tp_duration_value,
					delay: tp_delay_value,
					x: (tp_fade_direction == "left" ? -tp_fade_offset : (tp_fade_direction == "right" ? tp_fade_offset : 0)),
					y: (tp_fade_direction == "top" ? -tp_fade_offset : (tp_fade_direction == "bottom" ? tp_fade_offset : 0)),
			    };
			if (tp_onscroll_value == 1) {
				tp_anim_setting.scrollTrigger = {
					trigger: item,
					start: 'top 85%',
				};
			}
			gsap.from(item, tp_anim_setting);
		});
	}
	
	/*------------------------------------------
	= hover class active and change elements
	-------------------------------------------*/
	function service_animation() {
		var active_bg = $(".xb-service-list .active-bg");
		var element = $(".xb-service-list .current");
	
		function activeServiceList(active_bg, e) {
			if (!e.length) {
				active_bg.css({ height: "100%" });
				return false;
			}
			var topOff = e.offset().top;
			var height = e.outerHeight();
			var menuTop = $(".xb-service-list").offset().top;
	
			active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
			e.closest(".xb-service-item").removeClass("mleave").addClass("current");
			e.closest(".xb-service-item").siblings().removeClass("current").addClass("mleave");
		}
	
		$(".xb-service-list .xb-service-item").on("mouseenter", function () {
			var e = $(this);
			var index = e.index();
	
			activeServiceList(active_bg, e);
			$(".service-content-image .item").removeClass("active").eq(index).addClass("active");
		});
	
		$(".xb-service-list").on("mouseleave", function () {
			element = $(".xb-service-list .current");
			var index = element.index();
	
			activeServiceList(active_bg, element);
	
			$(".service-content-image .item").removeClass("active").eq(index).addClass("active");
	
			element.closest(".xb-service-item").siblings().removeClass("mleave");
		});
	
		$(".xb-service-list .xb-service-item").on("click", function () {
			$(".xb-service-list .xb-service-item").removeClass("current");
			$(this).addClass("current");
	
			var index = $(this).index();
			$(".service-content-image .item").removeClass("active").eq(index).addClass("active");
		});
		activeServiceList(active_bg, element);
	}
	service_animation();
	
	/*------------------------------------------
	= xb-text-scale-anim
	-------------------------------------------*/
	const headings = document.querySelectorAll('.xb-text-scale-anim');
    headings.forEach(heading => {
        const textNodes = [];

        heading.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split(' ').forEach((word, index, array) => {
                    const wordSpan = document.createElement('span');
                    wordSpan.classList.add('xb-word');
                    word.split('').forEach(letter => {
                        const letterSpan = document.createElement('span');
                        letterSpan.classList.add('xb-letter');
                        letterSpan.textContent = letter;
                        wordSpan.appendChild(letterSpan);
                    });
                    textNodes.push(wordSpan);
                    if (index < array.length - 1) {
                        textNodes.push(document.createTextNode(' '));
                    }
                })
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                textNodes.push(node.cloneNode(true));
            }
        });

        heading.innerHTML = '';
        textNodes.forEach(node => heading.appendChild(node));
    });

	/*------------------------------------------
	= hover image wrapper
	-------------------------------------------*/
	const imageWrapper = document.querySelector(".xb-image-wrapper");
	const imageSlider = document.querySelector(".xb-image-slider");
	const itemsts = gsap.utils.toArray(".items");

	if (imageWrapper && imageSlider && itemsts.length > 0) {

		$('[data-index-number]').each((index, el) => {
			$(el).on("mouseenter", () => {
				gsap.to(imageWrapper, {
					opacity: 1,
					duration: 0.5,
				});
			});

			$(el).on("mouseleave", () => {
				gsap.to(imageWrapper, {
					opacity: 0,
					duration: 0.5,
				});
			});

			const itemCount = imageSlider.children.length;
			const movePercent = 100 / itemCount;
			$(el).on("mousemove", function(){
				const indexNumber = $(this).data('index-number');
				gsap.to(imageSlider, {
					y: -(movePercent * indexNumber) + '%',
					duration: 0.6,
					ease: "power2.out"
				});
			});
		})

		$(document).on("mousemove", ".xb-items-wrap", function(event){
			const parentOffset = $(this).offset();
			const relativeX = event.pageX - parentOffset.left;
			const relativeY = event.pageY - parentOffset.top;

			const offsetX = -200;
			const offsetY = 0; 

			gsap.to(imageWrapper, {
				x: relativeX - offsetX,
				y: relativeY - offsetY,
				duration: 0.5,
				ease: "power2.out"
			});
		});
	}

	/*------------------------------------------
	= element parallax (button)
	-------------------------------------------*/
	$('.xb-element-parallax').each(function () {
		var $this = $(this);
		var dampingFactor = 0.5;
		function handleMouseMove(e) {
			var offset = $this.offset();
			var mouseX = e.pageX - offset.left;
			var mouseY = e.pageY - offset.top;
			var translateX = (mouseX - $this.width() / 2) * dampingFactor;
			var translateY = (mouseY - $this.height() / 2) * dampingFactor;
			var translateTransform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
			$this.css({
				'transform': translateTransform,
				'transition': 'transform 0.1s ease-out'  
			});
		}
		function resetTransform() {
			$this.css({
				'transform': 'none',
				'transition': 'transform 0.3s ease-out'  
			});
		}
		if ($this.closest('.xb-parent-element-parallax').length) {
			var pare2 = $this.closest('.xb-parent-element-parallax');
			pare2.on('mousemove', function (e) {
				handleMouseMove(e);
			});
			pare2.on('mouseleave', resetTransform);
		} else {
			$this.on('mousemove', handleMouseMove);
			$this.on('mouseleave', resetTransform);
		}
	});

	/*------------------------------------------
	= about-funfact 
	-------------------------------------------*/
	gsap.registerPlugin(ScrollTrigger);

	let mm = gsap.matchMedia();

	mm.add("(min-width: 992px)", () => {

		let wrap = document.querySelector(".horozontal-scroll-wrap");
		let sections = gsap.utils.toArray(".scroll-item");

		let totalWidth = 0;
		sections.forEach(item => {
			totalWidth += item.offsetWidth;
		});

		gsap.to(sections, {
			x: () => -(totalWidth - window.innerWidth),
			ease: "none",
			scrollTrigger: {
				trigger: wrap,
				pin: true,
				scrub: 1,
				start: "top top",
				end: () => "+=" + (totalWidth - window.innerWidth),
				invalidateOnRefresh: true
			}
		});

	});
	
	/*------------------------------------------
	= xb-quote-bg scale animation
	-------------------------------------------*/
	if (document.querySelector(".quote-section")) {
		let md = gsap.matchMedia();
		md.add("(min-width: 992px)", () => {
			gsap.to(".xb-quote-bg", {
				scale: 3, 
				duration: 1,
				ease: "none",
				scrollTrigger: {
					trigger: ".quote-section",
					start: "top 0%",
					end: "bottom 0%",
					scrub: true,
					pin: true,
				}
			});
		});
	}

	/*------------------------------------------
	= footer-title-animation
	-------------------------------------------*/
	document.fonts.ready.then(() => {
		if ($(".xb-split-up").length) {
			var waSplitup = $(".xb-split-up");
			if (waSplitup.length == 0) return;
			gsap.registerPlugin(SplitText);
			waSplitup.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});
	
				let delayValue = $(el).attr("data-split-delay") || "0s";
				delayValue = parseFloat(delayValue) || 0;
	
				if ($(el).hasClass("xb-split-up")) {
					gsap.set(el.split.chars, {
						rotate: 90,
						opacity: 0,
					});
				}
	
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
						toggleActions: "play none none reverse",
					},
					opacity: 1,
					rotate: 0,
					duration: 0.8,
					ease: "back.out(3)",
					stagger: 0.08,
					delay: delayValue,
				});
			});
		}
	})
	
	/*------------------------------------------
    = scroll-scale-up-img
    -------------------------------------------*/
	document.querySelectorAll(".scale-up-img").forEach((section) => {
		let tl = gsap.timeline({
		  scrollTrigger: {
			trigger: section,
			start: "top bottom",
			end: "bottom center",
			scrub: 1,
			markers: false,
		  },
		});
	  
		tl.to(section.querySelector(".scale-up"), {
		  scale: 1.15,
		  duration: 1,
		});
	});

	/*------------------------------------------
    = image cliping effect
    -------------------------------------------*/
	document.addEventListener("DOMContentLoaded", () => {

		const initialClipPaths = [
			"polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
			"polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
			"polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
			"polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
			"polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
			"polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
			"polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
			"polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
			"polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)"
		];

		const finalClipPaths = [
			"polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
			"polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
			"polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
			"polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
			"polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
			"polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
			"polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
			"polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
			"polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)"
		];

		// Create mask divs for each wrapper
		document.querySelectorAll(".xb-clip-animation").forEach(wrapper => {
			const img = wrapper.querySelector(".xb-animation-img[data-animate='true']");
			if (!img) return;
			const url = img.src;

			// Remove old masks if any (reuse safe)
			wrapper.querySelectorAll(".mask").forEach(m => m.remove());

			for (let i = 0; i < 9; i++) {
				const mask = document.createElement("div");
				mask.className = `mask mask-${i + 1}`;
				Object.assign(mask.style, {
					backgroundImage: `url(${url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					position: "absolute",
					inset: "0"
				});
				wrapper.appendChild(mask);
			}
		});

		// Animate masks
		gsap.utils.toArray(".xb-clip-animation").forEach(wrapper => {
			const masks = wrapper.querySelectorAll(".mask");
			if (!masks.length) return;

			gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });

			const order = [
				[".mask-1"],
				[".mask-2", ".mask-4"],
				[".mask-3", ".mask-5", ".mask-7"],
				[".mask-6", ".mask-8"],
				[".mask-9"]
			];

			const tl = gsap.timeline({
				scrollTrigger: { trigger: wrapper, start: "top 75%" }
			});

			order.forEach((targets, i) => {
				const validTargets = targets
					.map(c => wrapper.querySelector(c))
					.filter(el => el); // filter out nulls value

				if (validTargets.length) {
					tl.to(validTargets, {
						clipPath: (j, el) => finalClipPaths[Array.from(masks).indexOf(el)],
						duration: 1,
						ease: "power4.out",
						stagger: 0.1
					}, i * 0.125);
				}
			});
		});
	});

	/*------------------------------------------
    = section-triger-slider
	-------------------------------------------*/
	const triggerSlices = [...document.querySelectorAll('.sec-triger')];

	triggerSlices.forEach((section) => {
		const slices = section.querySelectorAll(".xb_uncover_slice");
		const image = section.querySelector(".myimg");

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "50% bottom",
				markers: false,
			}
		});

		tl.to(slices, { 
			height: 0,  
			ease: 'power6.inOut',
			duration: 0.6,
			stagger: { each: 0.3 }
		}, 'start')

		.to(image, {
			scale: 1.3,
			duration: 1.5,
			ease: 'power6.inOut'
		}, 'start');
	});

	/*------------------------------------------
	= scroll stricky animation
	-------------------------------------------*/
	if (window.innerWidth >= 992) {

		const cards = document.querySelectorAll('.sticky-card');

		cards.forEach((item, index) => {
			if (index === cards.length - 1) return;

			gsap.to(item, {
				scale: 0.95,
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: item,
					start: 'top 12%',
					end: 'bottom 12%',
					scrub: 1,
				}
			});
		});
	}

	/*------------------------------------------
	= text-hover animation
	-------------------------------------------*/
	document.fonts.ready.then(function() {
		// if (window.matchMedia("(min-width: 768px)").matches) {
		// }
		
		const splitLink = new SplitText("[data-link-shadow]", { 
			type: "lines, chars",
			mask: "lines",
			charsClass: "chars-link",
		});

		gsap.set(splitLink.chars, { yPercent: 0 });

		document.querySelectorAll("[data-split-link]").forEach((btnLink) => {
			btnLink.addEventListener("mouseenter", () => {
			gsap.to(btnLink.querySelectorAll("[data-split-link] .chars-link"), {
				yPercent: -85,
				duration: 0.3,
				stagger: 0.025,
				ease: "power2.out"
			});
			});

			btnLink.addEventListener("mouseleave", () => {
			gsap.to(btnLink.querySelectorAll("[data-split-link] .chars-link"), {
				yPercent: 0,
				duration: 0.3,
				stagger: 0.025,
				ease: "power2.out"
			});
			});
		});
	});

	/*----------------------------
	= SHOP PRICE SLIDER
    ------------------------------ */
	if($("#slider-range").length) {
		$("#slider-range").slider({
			range: true,
			min: 10,
			max: 200,
			values: [0, 140],
			slide: function(event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});

		$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
	}

	/*------------------------------------------
    = TOUCHSPIN FOR PRODUCT SINGLE PAGE
    -------------------------------------------*/
	if ($("input.product-count").length) {
		$("input.product-count").TouchSpin({
			min: 1,
			max: 1000,
			step: 1,
			buttondown_class: "btn btn-link",
			buttonup_class: "btn btn-link",
		});
	} 

	/*------------------------------------------
    = woocommerce
    -------------------------------------------*/
    if($(".checkout-section").length) {
        var showLogInBtn = $(".xb-cupon-info > a");
        var showCouponBtn = $(".showcoupon");
        var shipDifferentAddressBtn = $("#ship-to-different-address");
        var loginForm = $("form.login");
        var couponForm = $(".xb-checkout-coupon");
        var shippingAddress = $(".shipping_address");

        loginForm.hide();
        couponForm.hide();
        shippingAddress.hide();

        showLogInBtn.on("click", function(event) {
            event.preventDefault();
            loginForm.slideToggle();
            event.stopPropagation();
        });

        showCouponBtn.on("click", function(event2) {
            event2.preventDefault();
            couponForm.slideToggle();
            event2.stopPropagation();
        })

        shipDifferentAddressBtn.on("click", function(event3) {
            shippingAddress.slideToggle();
            event3.stopPropagation();
        })
    }

})(jQuery);
