/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
  "use strict";

  /* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  // setTimeout(function () {
  //   $(".loader_bg").fadeToggle();
  // }, 200);

  /* JQuery Menu
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $("header nav").meanmenu();
  });

  /* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  /* sticky
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $(".sticky-wrapper-header").sticky({ topSpacing: 0 });
  });

  /* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $(".main-menu ul li.megamenu").mouseover(function () {
      if (!$(this).parent().hasClass("#wrapper")) {
        $("#wrapper").addClass("overlay");
      }
    });
    $(".main-menu ul li.megamenu").mouseleave(function () {
      $("#wrapper").removeClass("overlay");
    });
  });

  /* NiceScroll
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(".brand-box").niceScroll({
    cursorcolor: "#9b9b9c",
  });

  /* OwlCarousel - Blog Post slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  /* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(window).on("scroll", function () {
    scroll = $(window).scrollTop();
    if (scroll >= 100) {
      $("#back-to-top").addClass("b-show_scrollBut");
    } else {
      $("#back-to-top").removeClass("b-show_scrollBut");
    }
  });
  $("#back-to-top").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  //product click
  $(document).on("click", ".spoduct", function (e) {
    let src = e.currentTarget;
    let product_id = src.querySelector("input").getAttribute("value");
    window.location.href = "./product.html?id=" + product_id;
  });

  //shop click
  $(document).on("click", ".shopitem", function (e) {
    let src = e.currentTarget;
    let id = src.querySelector("input").getAttribute("value");
    let img = src.querySelector("img").getAttribute("src");
    img = img.substr(img.indexOf("/") + 1, img.indexOf("."));
    window.location.href = "./allproducts.html?id=" + id + "&img=" + img;
  });

  //create shop click
  $(document).ready(function () {
    $("#addshop").click((e) => {
      let userId = sessionStorage.getItem("userId");
      let currency = $("#countrySelectr").val();
      let url =
        "http://" +
        location.host +
        "/api/flw/shopFeePayment/" +
        userId +
        "&" +
        currency;

      $(".loader_bg").show();
      $("#progText").html("Loading ...");

      $.get(url, function (data, status, xhr) {
        if (data.status == "success") {
          window.location.href = data.msg;
        } else {
          $(".loader_bg").hide();
          alert("Error fetching URL");
        }
      });
    });
  });

  /* Contact-form
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  $.validator.setDefaults({
    submitHandler: function () {
      alert("submitted!");
    },
  });

  $(document).ready(function () {
    $("#prof").html(`Hi ${sessionStorage.getItem("userName")}`);
  });

  $(document).ready(function () {
    $("#contact-form").validate({
      rules: {
        firstname: "required",
        email: {
          required: true,
          email: true,
        },
        lastname: "required",
        message: "required",
        agree: "required",
      },
      messages: {
        firstname: "Please enter your firstname",
        email: "Please enter a valid email address",
        lastname: "Please enter your lastname",
        username: {
          required: "Please enter a username",
          minlength: "Your username must consist of at least 2 characters",
        },
        message: "Please enter your Message",
        agree: "Please accept our policy",
      },
      errorElement: "div",
      errorPlacement: function (error, element) {
        // Add the `help-block` class to the error element
        error.addClass("help-block");

        if (element.prop("type") === "checkbox") {
          error.insertAfter(element.parent("input"));
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        $(element)
          .parents(".col-md-4, .col-md-12")
          .addClass("has-error")
          .removeClass("has-success");
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element)
          .parents(".col-md-4, .col-md-12")
          .addClass("has-success")
          .removeClass("has-error");
      },
    });
  });

  /* heroslider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  var swiper = new Swiper(".heroslider", {
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: "auto",
    paginationClickable: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  });

  /* Product Filters
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  var swiper = new Swiper(".swiper-product-filters", {
    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 30,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerColumn: 1,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerColumn: 1,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerColumn: 1,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  });

  /* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $("[data-countdown]").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      var $this = $(this).html(
        event.strftime(
          "" +
            '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> ' +
            '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> ' +
            '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> ' +
            '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> ' +
            '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'
        )
      );
    });
  });

  /* Deal Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(".deal-slider").slick({
    dots: false,
    infinite: false,
    prevArrow: ".previous-deal",
    nextArrow: ".next-deal",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /* News Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $("#news-slider").slick({
    dots: false,
    infinite: false,
    prevArrow: ".previous",
    nextArrow: ".next",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /* Fancybox
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(".fancybox").fancybox({
    maxWidth: 1200,
    maxHeight: 600,
    width: "70%",
    height: "70%",
  });

  /* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
      $(this).toggleClass("active");
    });
  });

  /* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  // optional
  $("#blogCarousel").carousel({
    interval: 5000,
  });
});

function getNumForCountry(country) {
  const countries = ["Nigeria", "UK", "Kenya", "Ghana"];
  return countries.indexOf(country);
}
