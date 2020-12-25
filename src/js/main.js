// Burger menu

const nav = document.querySelector('.header__nav');
const burger = document.querySelector('.burger');


burger.addEventListener('click', () => {
  nav.classList.toggle('header__nav--active');
  burger.classList.toggle('burger--active');
});

// slider 

var reviewsSlider = new Swiper('.reviews__slider-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  spaceBetween: 16,

  // If we need pagination
  pagination: {
    el: '.reviews__slider-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.reviews__slider-button-next',
    prevEl: '.reviews__slider-button-prev',
  },
})