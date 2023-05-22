// Категории
const product = new Swiper('.product-swiper', {
    // Направление слайдера
    lazy: true,
    // Количество показываемых элементов
    slidesPerView: '1',
    effect: 'fade',
    // Количество слайдов в группе
    slidesPerGroup: 1,
    autoplay: {
        delay: 5000,
    },
    // Инициализация кнопок слайдера
    navigation: {
        nextEl: '.custom-pagination__btn_next',
        prevEl: '.custom-pagination__btn_prev',
    },
    pagination: {
        el: ".custom-pagination__wrapper",
        clickable: true,
        renderBullet: function (index, className) {
            let current_img = $('.product__img')[index].getAttribute('src');
          return  `<img src="${current_img}" alt="" class="custom-pagination__img ${className}">`;
        },
      },
    // Отступ между слайдами
    spaceBetween: 20,

});

Fancybox.bind("[data-fancybox]", {
    hideScrollbar: true,
    closeButton:false,
});

$(document).ready(function () {
})