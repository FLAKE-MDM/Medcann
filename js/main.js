// all
$('.toggler').click(function(e){
  e.preventDefault();
  $(this).toggleClass('active');
});

// preloader
let loaderText = document.querySelector('.loader__text');
let progress = 0;

if(loaderText){
  let interval = setInterval(function() {
    progress += 1;
    loaderText.innerText = progress + '%';

    if (progress === 100) {
      clearInterval(interval);
      // $('.loader').addClass('hide')
    }
  }, 20);
}



Fancybox.bind("[data-fancybox]", {});

// pane
// $('.pane-open').click(function(e){
//   e.preventDefault();
//   $('body').addClass('overflow-none');
//   let paneId = $($(this)).attr('href');
//   let currentPane = document.querySelector(paneId)
//   if(!currentPane.classList.contains('show')){
//     $('.pane').removeClass('show');
//     $(currentPane).addClass('show');
//   } else{
//     $(currentPane).removeClass('show');
//     $('body').removeClass('overflow-none');
//   }
// })

// dropdown
$('.dropdown-toggle').click(function(e) {
  e.preventDefault();
  let dropdownContainer = $(this).parent();

  dropdownContainer.toggleClass('open');
  $(this).toggleClass('active');

  dropdownContainer.find('.dropdown-menu__close').click(function(e) {
    e.preventDefault();
    dropdownContainer.removeClass('open');
    $(dropdownContainer).find('.dropdown-toggle').removeClass('active');
    dropdownContainer.find('.dropdown-menu__close').off('click');
  });

  $(document).mouseup(function(e) {
    if (dropdownContainer.has(e.target).length === 0) {
      dropdownContainer.removeClass('open');
      $(dropdownContainer).find('.dropdown-toggle').removeClass('active');
      dropdownContainer.find('.dropdown-menu__close').off('click');
    }
  });
});

// fake-select
$('.fake-select__item').click(function(){
  $(this).parents(".fake-select").find('.fake-select__item').removeClass('active');
  $(this).addClass('active');
  $(this).parents('.fake-select').find('.fake-select__value').html(this.innerHTML)
  $(this).parents('.fake-select').removeClass('open');
});

// header
$(".header-collapse").click(function (e) {
  e.preventDefault();

  let $this = $(this);
  let targetSelector = $this.attr("href");
  let $target = $(targetSelector);
  let $allHeaderCollapse = $(".header-collapse");
  let $allHeaderContent = $(".header__collapse");
  let $collapseClose = $(".collapse-close");
  let isOpen = $target.hasClass('show');

  $allHeaderContent.not($target).slideUp(300).removeClass('show');
  $allHeaderCollapse.not($this).removeClass("active");
  $collapseClose.toggleClass("active", !isOpen);

  $target.slideToggle(300, function () {
    $(this).toggleClass('show');
  });

  $this.toggleClass("active");


  $("body").toggleClass("overflow-none", $this.hasClass("active"));
});

$(".collapse-close").click(function(e){
  e.preventDefault();
  $('.collapse-close').removeClass("active");
  $(".header-collapse").removeClass("active");
  $(".header__collapse").slideUp(300).removeClass('show');
  $("body").removeClass('overflow-none');
});

// collapse
$(".collapse-link").click(function(e){
  e.preventDefault();

  if($(this).hasClass("active")){
    $(this.getAttribute("href")).slideUp(300).removeClass('show');
  } else{
    $(this.getAttribute("href")).slideDown(300).addClass('show');
  }

  $(this).toggleClass("active");
});

// tabs
$('.tab-link').click(function(e){
    e.preventDefault();
    $(this).parents(".tab-nav").find('.tab-link').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.tab-section').find('.tab-pane').removeClass('active');
    $(this.getAttribute("href")).addClass('active');
});

// up-link
// let $page = $('html, body');
// $('.up-link').click(function() {
//     $page.animate({
//         scrollTop: $($.attr(this, 'href')).offset().top
//     }, 400);
//     return false;
// });

// modal
$(".modal-open").click(function(e){
  e.preventDefault();
  $(".modal").removeClass("show");
  $(this.getAttribute("href")).addClass("show");
  $('body').removeClass('overflow-none');
  $('body').addClass('overflow-none');
})

$(".modal").mousedown(function(e){
  let closeLinks = document.querySelectorAll(".modal-close");
  let modalsGroup = document.querySelectorAll(".modal");

  for(let elem of closeLinks){
    if(e.target == elem){
      $(this).removeClass("show");
      $('body').removeClass('overflow-none');
      $('.login__mobile-link').removeClass('active');
    }
  }
  for(let elem of modalsGroup){
    if(e.target == elem){
      $(this).removeClass("show");
      $('body').removeClass('overflow-none');
      $('.login__mobile-link').removeClass('active');
    }
  }
});

// checkResolution
function checkResolution() {

  if (window.innerWidth > 991) {
    $(function(){
      var topPos = $('.floating').offset().top;
       $(window).scroll(function() {
       var top = $(document).scrollTop(),
           pip = $('.stoper').offset().top,
           height = $('.floating').outerHeight();
       if (top > topPos && top < pip - height) {$('.floating').addClass('fixed').removeAttr("style");}
       else if (top > pip - height) {$('.floating').removeClass('fixed').css({'position':'absolute','bottom':'0'});}
       else {$('.floating').removeClass('fixed');}
       });
     });
  }

  if (window.innerWidth > 768) {
    $(window).scroll(function() {
      let top = $(document).scrollTop();
      if (top > 0){
       $('.product-pane').slideDown(300);
      } else{
       $('.product-pane').slideUp(300);
      }
     })
  }

  if (window.innerWidth < 768) {

    new Swiper(".blog-slider", {
      slidesPerView: 1,
      spaceBetween: 26,
      loop: true,
    });
  }

  if (window.innerWidth < 992) {
    $('.category-block').click(function(e){
      if(!$(this).hasClass('active')){
        e.preventDefault();
        $(this).addClass('active');
        $(this).find('.category-block__image').slideDown(300);
      }
    });
  }
}

window.addEventListener('load', checkResolution);
window.addEventListener('resize', checkResolution);


// form
(function() {
  // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }

  [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
    // in case the input is already filled..
    if( inputEl.value.trim() !== '' ) {
      classie.add( inputEl.parentNode, 'input--filled' );
    }

    // events:
    inputEl.addEventListener( 'focus', onInputFocus );
    inputEl.addEventListener( 'blur', onInputBlur );
  } );

  function onInputFocus( ev ) {
    classie.add( ev.target.parentNode, 'input--filled' );
  }

  function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
      classie.remove( ev.target.parentNode, 'input--filled' );
    }
  }
})();

// mask
// $('.mask').mask("+79999999999").on('click', function () {
//   if ($(this).val() === '+7') {
//       $(this).get(0).setSelectionRange(0, 0);
//   }
// });

// desktop2
new Swiper(".logos-slider", {
  slidesPerView: 2,
  spaceBetween: 20,
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1900: {
      slidesPerView: 4,
      spaceBetween: 100,
    },
  },
});

// desktop3
new Swiper(".products-slider", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// desktop 5
new Swiper(".product-slider", {
  loop: true,
  slidesPerView: 1,
  thumbs: {
    swiper: {
      el: ".product-slider-thumbs",
      slidesPerView: 3,
      spaceBetween: 13,
      breakpoints: {
        992: {
          spaceBetween: 25,
        },
      },
    },
  },
});

//date
$( ".form-control_date" ).change( 'blur', function(){
  if($(this).val()){
    $(this).parent('.input').addClass('input--filled');
  }
})
$("#birthday").datepicker($.datepicker.regional["ru"]);
$("#birthday").datepicker("option", "dateFormat", "d MM y");

$('.order-item__link').click(function(){
  $(this).parents('.order-item').toggleClass('active')
})

// map
google.maps.event.addDomListener(window, 'load', init);

function init() {
  var mapOptions = {
      zoom: 12,

      center: new google.maps.LatLng(55.762315958749454, 37.58558162154966),

      styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  };

  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, mapOptions);

  var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.751926759398245, 37.53823495349505),
        map: map,
        title: 'Гучжень',
        icon: 'img/icons/map.svg'
  });
  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
  });
  marker.addListener('click', function() {
      infowindow.open(map, marker);
  });
}

