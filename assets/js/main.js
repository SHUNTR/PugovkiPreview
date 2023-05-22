// Разделяем все цифры в статистике на блоки
export let ChangeStats = function ChangeStats() {
    $('.stats__number-wrapper').each(function (index, element) {
        let Numbers = element.textContent.trim().split('').reverse();

        let size = 3;//размер подмассива
        let subarray = [];//массив в который будет выведен результат.
        for (let i = 0; i < Math.ceil(Numbers.length / size); i++) {
            subarray[i] = Numbers.slice((i * size), (i * size) + size).reverse().join("");
        }
        Numbers = subarray;
        // Очищаем место где будут хранится цифры    
        $(this).empty();
        // Вставляем число разделенные по 3 цифры
        for (let i = Numbers.length - 1; i >= 0; i--) {
            $(this).append(`<span class='stats__number'>${Numbers[i]}</span>`);
        }
    })
}
ChangeStats()

// Инициализация свиперов
const swiper = new Swiper('.main-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
        clickable: true,
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper__button-next',
        prevEl: '.swiper__button-prev',
    },
    autoplay: {
        delay: 3000,
    }

});
// Категории
const CategorySwiper = new Swiper('.category-swiper', {
    // Направление слайдера
    lazy: true,
    grabCursor: true,
    // Количество показываемых элементов
    slidesPerView: '7',

    // Количество слайдов в группе
    slidesPerGroup: 7,

    // Инициализация кнопок слайдера
    navigation: {
        nextEl: '.swiper__button-next',
        prevEl: '.swiper__button-prev',
    },
    // Ключевые точки
    breakpoints: {
        1600: {
            slidesPerView: '6',
            slidesPerGroup: 6,
        },
        1366: {
            slidesPerView: '5',
            slidesPerGroup: 5,
        },
        980: {
            slidesPerView: '4',
            slidesPerGroup: 4,
        },
        768: {
            slidesPerView: '3',
            slidesPerGroup: 3,
        },
        0: {
            slidesPerView: '2',
            slidesPerGroup: 2,
        },
    },
    // Отступ между слайдами
    spaceBetween: 20,

});
// Слайдер предметов
const ItemsSwiper = new Swiper('.items-swiper', {
    // Направление слайдера
    lazy: true,
    grabCursor: true,
    spaceBetween: 20,
    // Количество показываемых элементов
    slidesPerView: '7',

    // Количество слайдов в группе
    slidesPerGroup: 7,

    // Инициализация кнопок слайдера
    navigation: {
        nextEl: '.swiper__button-next',
        prevEl: '.swiper__button-prev',
    },
    // Ключевые точки
    breakpoints: {
        1920: {
            slidesPerView: '6',
            slidesPerGroup: 6,
        },
        1366: {
            slidesPerView: '5',
            slidesPerGroup: 5,
        },
        980: {
            slidesPerView: '4',
            slidesPerGroup: 4,
        },
        768: {
            slidesPerView: '3',
            slidesPerGroup: 3,
        },
        0: {
            slidesPerView: '2',
            slidesPerGroup: 2,
        },
    },
    // Отступ между слайдами
});
$(document).ready(function () {
    // Переопределяем высоту кнопок у свипера
    function reHeightSwiperBtns() {
        $('.swiper__btns-wrapper').each(function () {
            let TypeCentered = $(this).attr('data-type-centered');

            switch (TypeCentered) {
                case 'block':
                    let HeightWrapperSlides = $(this).siblings('.swiper-wrapper').height();
                    $(this).css('top', `${HeightWrapperSlides / 2}px`);
                    break;
                case 'img':
                    let HeightImg = $(this).siblings('.swiper-wrapper').find('.swiper-slide:first-of-type img:first-of-type').height();
                    $(this).css('top', `${HeightImg / 2}px`);
                    break;
            }


        })
    }
    reHeightSwiperBtns();



    $(window).on("scroll resize", function () {
        reHeightSwiperBtns();
        // Получаем высоту хедера и сравниваем  с текущей позицией на экране
        let HeightHeader = document.querySelector('.main-header').offsetHeight;
        let HeightFooter = document.querySelector('.main-footer').offsetHeight;
        if (GetCurrentYpos() > HeightHeader && (GetCurrentYpos() + $(window).height() < ($('html').height()) - HeightFooter)) {
            // показываем асайд
            ShowAside();
        }
        else {
            // Убираем аткивное состояние у поиска если мы добрались до верхушки страницы
            $('.search.active').removeClass('active');
            HideAside();
            //При скролле до верхней позиции страницы скрываем все активные поп'апы и снимаем класс активности у кнопок
            $('.moved-aside__btn.active').removeClass('active');
            $('.popup.active').fadeOut(100).removeClass('active');
        }
    })

    // Прослушивание на клик экрана
    $(window).on("click", function (event) {
        // Если нажали вне поп'апа скрываем активны поп'ап
        if (!event.target.closest("li[data-popup='true']")) {
            $('.popup.active').siblings('.moved-aside__btn.active').removeClass('active');
            $('.popup.active').fadeOut(100).removeClass('active');
        }
        // Если нажали вне поиска и если поисковая панель пустая то скрываем ее
        if (!event.target.closest(".search") && ($('.search.active .search__input').length != 0 && $('.search.active .search__input').val().trim() == "")) {
            $('.search.active').removeClass('active');
        }
        // Если нажали вне выплывающего меню скрываем активные выплыващие менюшки
        if (!event.target.closest("*[data-moved-menu='true']") && !event.target.closest(".moved-menu") && !event.target.closest(".item")) {
            let MenuType = $('.moved-menu.active').attr('data-type-menu');
            $('body').removeClass('scrollBlock');
            $(`button[data-type-menu='${MenuType}']`).removeClass('active');
            $('.moved-menu.active').removeClass('active');
        }
        // Если нажали вне селекта скрываем его
        if (!event.target.closest("*[data-select='true']")) {
            $('.select__body.active').removeClass('active');
        }
    })


    // При изменении размеров страницы выключаем активное состояние у кнопок
    $(window).on("resize", function () {
        $('.moved-aside__btn.active').removeClass('active');
        $('.popup.active').fadeOut(100).removeClass('active');
        $('.submenu.active').removeClass('active');
    })

    $('.favorite-btn').on('click', function () {

        let CurrentItem = CreateObjectItem($(this).parents('.item'));
        let Body = $('.moved-menu[data-type-menu="followed"] .moved-menu__body');
        let typeBody = Body.attr('data-body-type');

        if (CurrentItem.favorite == "false") {
            $(`.item[data-id-item=${CurrentItem.id}]`).attr('data-favorite', 'true');
            CurrentItem.favorite = "true";

            if (typeBody == 'empty') {
                Body.empty();
                Body.attr('data-body-type', 'filled')
                Body.append("<div class='moved-menu__wrapper'></div>")

                let InsertWrapper = Body.find('.moved-menu__wrapper');
                InsertWrapper.append(CreateDOMItem(CurrentItem));
            }
            else {
                let InsertWrapper = Body.find('.moved-menu__wrapper');
                InsertWrapper.append(CreateDOMItem(CurrentItem));
            }

            ChangeCountNotfication('followed', 'plus');

        }
        else {
            $(`.item[data-id-item=${CurrentItem.id}]`).attr('data-favorite', 'false');
            CurrentItem.favorite = "false";
            ChangeCountNotfication('followed', 'minus');
            Body.find(`.item[data-id-item='${CurrentItem.id}']`).remove();
            if (Body.find('.item').length == 0) {
                Body.find('.moved-menu__wrapper').empty();
                Body.attr('data-body-type', 'empty');
                Body.append(` <img src="assets/images/main/empty_moved-icon.svg" alt="" class="moved-menu__img">
               <hgroup class="moved-menu__hgroup">
                  <h2 class="moved-menu__title">
                      В избранном пусто
                  </h2>
                  <p class="moved-menu__subtitle">
                      Добавляйте в избранное понравившиеся изделия, чтобы быстро их находить.
                          Чтобы добавить в избранное нажимайте у изделий на сердечко:
                  </p>
               </hgroup>
               <img src="assets/images/main/heart-icon__filled.svg" alt="" class="moved-menu__img">`)
            }

        }

    })
    // Переключение состояния выплывающих кнопок
    $('.moved-aside__btn').on("click", function () {
        if (!$(this).hasClass('active')) {
            $('.moved-aside__btn.active').removeClass('active');
            $(this).addClass('active');
        }
        else {
            $('.moved-aside__btn.active').removeClass('active');
        }
    })

    // Закрытие уведомлений
    $('.notification__btn').on('click', function () {
        let CurrentAction = $(this).attr('data-action');
        switch (CurrentAction) {
            case "close":
                try {
                    let notification = $(this).parents('.notification');
                    notification.slideUp(300, function () {
                        $(this).remove();
                    });
                }
                catch (error) {

                }
                break;
        }
    })

    // Переключение состояния поиска
    $('.search__btn').on("click", function () {
        {
            if (!$(this).parents('.search').hasClass('active'))
                $(this).parents('.search').addClass('active');
            else
                $(this).parents('.search').removeClass('active');
        }
    })

    //Открытие popup
    $('.popup-opener').on('click', function () {
        if (!$(this).siblings('.popup').hasClass('active')) {
            $('.popup.active').removeClass('active').fadeOut(100).removeClass('active');
            $(this).siblings('.popup').fadeIn(100).addClass('active');
        }
        else {
            $(this).siblings('.popup').fadeOut(100).removeClass('active');
        }
    })
    // Открытие селекта
    $('.select-opener').on('click', function () {
        let select = $(this).siblings('.select__body');
        if (select.hasClass('active')) {
            select.removeClass('active')
        }
        else {
            try {
                $('.select__body.active').removeClass('active');
            }
            catch {

            }
            select.addClass('active')
        }
    })
    //Открытие выплывающего меню
    $('.moved-menu-opener').on('click', function () {
        let CurrentTypeMenu = $(this).attr('data-type-menu');
        try {
            if (!$(`.moved-menu[data-type-menu='${CurrentTypeMenu}']`).hasClass('active')) {
                $('.moved-menu.active').removeClass('active');
                $('.submenu.active').removeClass('active');
                $(`.moved-menu[data-type-menu='${CurrentTypeMenu}']`).addClass('active')
                $(this).addClass('active');
                $('body').addClass('scrollBlock');
            }
            else {
                $(`.moved-menu[data-type-menu='${CurrentTypeMenu}']`).removeClass('active');
                $(this).removeClass('active');
            }
        } catch (error) {

        }
    })
    //  Открытие подменю
    $('.submenu-opener').on("click", function () {
        $(this).siblings('.submenu').addClass('active');
    })
    //  Нажатие на кнопку внутри сабменю
    $('.submenu__btn').on("click", function () {
        let CurrentAction = $(this).attr('data-action');
        let CurentMenu = $(this).parents('.submenu');
        switch (CurrentAction) {
            case 'close':
                try {
                    CurentMenu.removeClass('active');
                } catch (error) {
                    console.log("Произошла ошибка")
                }
        }
    })
    //  Клик по кнопке внутри выплывающего мнею
    $('.moved-menu__btn').on("click", function () {
        let CurrentAction = $(this).attr('data-action');
        let CurentMenu = $(this).parents('.moved-menu');
        let MenuType = $('.moved-menu.active').attr('data-type-menu');
        switch (CurrentAction) {
            case 'close':
                try {
                    CurentMenu.removeClass('active');
                    $(`button[data-type-menu='${MenuType}']`).removeClass('active');
                    $('body').removeClass('scrollBlock');
                } catch (error) {
                }
                break;
            case 'AddBurse':
                try {
                    CurentMenu.removeClass('active');
                    $(`button[data-type-menu='${MenuType}']`).removeClass('active');
                    $('body').removeClass('scrollBlock');     
                    alert('Ваша заявка находится на расмотрении');
                } catch (error) {
                }
                break;
        }
    })
    //  Клик по опции внутри селекта
    $('.select__btn').on("click", function () {
        let CurrentOption = $(this).text().trim();
        let CurrentSelect = $(this).parents('.select__body').siblings('.select-opener').find('.select__text');

        CurrentSelect.html(CurrentOption);

        $('.select__body.active').removeClass('active');
    })

    // Фильтр
    $('.filter__checkbox').on("change", function () {
        let CountCategory = $(this).parents('.filter__block').find('.filter__title .filter__count');
        let AllCount = $('.catalog__count');
        if ($(this).is(':checked')) {
            CountCategory.text(Number(CountCategory.text().trim()) + 1);
            AllCount.text(Number(AllCount.text().trim()) + 1);
        }
        else {
            CountCategory.text(Number(CountCategory.text().trim()) - 1);
            AllCount.text(Number(AllCount.text().trim()) - 1);
            if (Number(CountCategory.text().trim()) < 1) {
                {
                    CountCategory.text("");
                }
            }
            if (Number(AllCount.text().trim()) < 1) {
                AllCount.text("");
            }
        }
    })

    $('.filter__btn').on('click', function () {
        let action = $(this).attr('data-action');

        switch (action) {
            case 'accept':
                $('.catalog__filter-wrapper').empty();

                let CheckedFilter = $('.filter__checkbox:checked');
                CheckedFilter.each(function () {
                    let label = $(this).siblings('.filter__label');
                    let TypeFilter = label.attr('data-filter-type');
                    switch (TypeFilter) {
                        case 'color':
                            let color = {
                                id: label.attr('data-id-color'),
                                index: label.attr('data-color-index'),
                                name: label.attr('data-name-color'),
                            }
                            $('.catalog__filter-wrapper').append(` 
                            <button class="catalog__btn" data-action="removefilter">
                                <span class="catalog__filter-name">
                                    ${color.name}
                                </span>
                                <i class="fa-solid fa-xmark"></i>
                            </button>`);
                            break;
                        case 'material':
                            let material = {
                                id: label.attr('data-id-material'),
                                name: label.attr('data-name-material'),
                            }

                            $('.catalog__filter-wrapper').append(` 
                            <button class="catalog__btn" data-action="removefilter">
                                <span class="catalog__filter-name">
                                    ${material.name}
                                </span>
                                <i class="fa-solid fa-xmark"></i>
                            </button>`);
                            break;
                        case 'people':
                            let people = {
                                id: label.attr('data-id-people'),
                                name: label.attr('data-name-people'),
                            }
                            $('.catalog__filter-wrapper').append(` 
                            <button class="catalog__btn" data-action="removefilter">
                                <span class="catalog__filter-name">
                                    ${people.name}
                                </span>
                                <i class="fa-solid fa-xmark"></i>
                            </button>`);
                            break;
                        case 'category':
                            let category = {
                                id: label.attr('data-id-category'),
                                name: label.attr('data-name-category'),
                            }
                            $('.catalog__filter-wrapper').append(` 
                            <button class="catalog__btn" data-action="removefilter">
                                <span class="catalog__filter-name">
                                    ${category.name}
                                </span>
                                <i class="fa-solid fa-xmark"></i>
                            </button>`);
                            break;
                    }
                })
                $(this).parents('.moved-menu').removeClass('active');
                break;
            case 'reset':
                $('.filter__checkbox:checked').prop('checked', false);
                $('.filter__count').empty();
                $('.catalog__count').empty();
                $('.catalog__filter-wrapper').empty();
                $(this).parents('.moved-menu').removeClass('active');
                break;
        }
    })

    // Показываем выплывающие менюшки при скроле
    function ShowAside() {
        $(".moved").addClass('active');
    }


    // Cкрываем выплывающие менюшки при скроле
    function HideAside() {
        $(".moved").removeClass('active');
    }

    function LoadAllNotifitations() {
        let AllNotificationCount = $('.moved-menu__count_orange');
        let total = 0;
        let OutputBody = $('span[data-notification="all"]');

        AllNotificationCount.each(function (index, element) {
            element = Number(element.textContent.trim().replace("+", ""));
            total += element;
        })
        if (total > 99) {
            total = "99+"
        }
        OutputBody.html(`${total}`);
    }
    LoadAllNotifitations();

    $('.switcher__btn').on('click', function () {
        $(this).toggleClass('active');
        $(this).parents('.switcher').toggleClass('active');
    })

    $('body').on('click', '.catalog__btn[data-action="removefilter"]', function () {
        $(this).slideUp(300, function () {
            $(this).remove();
        });
    })
})
//Инициализация двойного Range
$(".filter__range").slider({
    animate: "fast",
    range: true,
    values: [100, 19300],
    max: 19300,
    min: 100,
    slide: function (event, ui) {
        let rangeInputs = $(this).parents('.filter__range-wrapper').siblings('.filter__input-wrapper').find('.filter__input');
        rangeInputs[0].value = ui.values[0];
        rangeInputs[1].value = ui.values[1];
    }
});
// Функция изменения отображаемого числа в уведомлении избранного
function ChangeCountNotfication(type, action) {

    let notificationWrapper = $(`button[data-type-menu='${type}']`).find('.notification-count');

    notificationWrapper.each(function () {
        let CurrentCount = Number(this.textContent);

        switch (action) {
            case 'plus':
                CurrentCount++;
                break;
            case 'minus':
                CurrentCount--;
                break;
        }
        if (CurrentCount == 0) {
            CurrentCount = "";
        }
        if (CurrentCount > 99) {
            CurrentCount = "99+"
        }
        this.textContent = CurrentCount;
    })
}

// Функция создания обьекта
function CreateObjectItem(Item) {

    let CurrentItem = {
        id: Item.attr('data-id-item').trim(),
        type: Item.attr('data-item-type'),
        favorite: Item.attr('data-favorite'),
        name: [Item.find('.item__name').text().trim(), Item.find('.item__name').attr('date-decoration')],
        like_count: Item.find('.item__likes').text().trim(),
        views_count: Item.find('.item__views').text().trim(),
        img: Item.find('.item__img').attr('src'),
        user: {
            id: Item.find('.item__user').attr('data-id-user'),
            name: Item.find('.item__user-name').text().trim(),
            img: Item.find('.item__avatar').attr('src'),
        },

    }
    if (Item.find('.item__user-status').length != 0) {
        CurrentItem.user.status = 'PRO'
    }
    else
        CurrentItem.user.status = "default";


    switch (CurrentItem.type) {
        case 'action':
            CurrentItem.actionType = Item.attr('data-type-action');
            CurrentItem.dateTime = Item.find('.item__date-time').text().trim();
            CurrentItem.BetStatus = Item.find('.item__price-status').attr('data-status');
            CurrentItem.BetCount = Item.find('.item__price').text().trim();
            break;
        case 'onsell':
            CurrentItem.price = Item.find('.item__price').text().trim();
            if (Item.find('.discount')) {
                CurrentItem.discount = Item.find('.discount').text().trim();
            }
            else
                CurrentItem.discount = '0'
            break;
    }

    return CurrentItem;
}
// Функция создания DOM элемента с свойствами
function CreateDOMItem(Item) {
    if (Item.type == 'action') {
        let betWord;
        let status = "";
        let arrow;
        if (Item.BetStatus == 'start') {
            betWord = "Начальная ставка"
            arrow = '<i class="fa-solid fa-caret-right"></i>'
        }
        else {
            betWord = "Текущая ставка";
            arrow = '<i class="fa-solid fa-sort-up"></i>';
        }

        if (Item.user.status == "PRO") {
            status = '<img src="assets/images/main/pro.svg" alt="" class="item__user-status"></img>'
        }

        return `
    <div class="item" data-favorite="${Item.favorite}"" data-id-item="${Item.id}" data-item-type="action" data-type-action="${Item.actionType}">
        <a class="item__img-wrapper" href="">
            <img src="${Item.img}" alt="" class="item__img">
        </a>
        <button class="favorite-btn" type="button" onclick='DeleteFavorite(event)'>           
        </button>
        <div class="item__body">
            <div class="item__element">
                <span class="item__type">
                    Аукцион
                </span>
                <span class="item__price-status" data-status="${Item.BetStatus}">
                    ${betWord}
                </span>
                <span class="item__name" date-decoration="${Item.name[1]}">
                    ${Item.name[0]}
                </span>
                <span class="item__price" data-status="${Item.BetStatus}">
                    ${arrow} ${Item.BetCount}
                </span>
            </div>
            <div class="item__element">
                <div class="item__date-time">
                    ${Item.dateTime}
                </div>
                <div class="item__user" data-id-user="${Item.user.id}">
                    <img src="${Item.user.img}" alt="" class="item__avatar">
                    <a class="item__user-name" href="">
                        ${Item.user.name}
                        ${status}
                    </a>
                    <span class="item__likes">
                        <i class="fa-solid fa-thumbs-up"></i>${Item.like_count}
                    </span>
                    <span class="item__views">
                        <i class="fa-solid fa-eye"></i>${Item.views_count}
                    </span>
                </div>
            </div>
        </div>
        </div>`;
    }
    if (Item.type == 'onsell') {
        let status = "";
        if (Item.user.status == "PRO") {
            status = '<img src="assets/images/main/pro.svg" alt="" class="item__user-status"></img>'
        }


        return `
    <div class="item" data-favorite="${Item.favorite}"" data-id-item="${Item.id}" data-item-type="onsell">
        <a class="item__img-wrapper" href="">
            <img src="${Item.img}" alt="" class="item__img">
        </a>
        <button class="favorite-btn" type="button" onclick='DeleteFavorite(event)'>           
        </button>
        <div class="item__body">
            <div class="item__element">
                <span class="item__name" date-decoration="${Item.name[1]}">
                    ${Item.name[0]}
                </span>
                <span class="item__price">
                             ${Item.price}
                </span>
            </div>
            <div class="item__element">
                <div class="item__user" data-id-user="${Item.user.id}">
                    <img src="${Item.user.img}" alt="" class="item__avatar">
                    <a class="item__user-name" href="">
                        ${Item.user.name}
                        ${status}
                    </a>
                    <span class="item__likes">
                        <i class="fa-solid fa-thumbs-up"></i>${Item.like_count}
                    </span>
                    <span class="item__views">
                        <i class="fa-solid fa-eye"></i>${Item.views_count}
                    </span>
                </div>
            </div>
        </div>
        </div>`;
    }
}


// Получаем текущую позицуию на странице
function GetCurrentYpos() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}

// Получаем полную высоту страницы
function GetHeightPage() {
    return document.documentElement.scrollHeight - document.documentElement.clientHeight;
}
// Функция удаления из избранного
function DeleteFavorite(event) {
    let item = event.target.closest('.item');
    let Body = $('.moved-menu[data-type-menu="followed"] .moved-menu__body');
    let id = item.getAttribute('data-id-item');
    item.remove();
    ChangeCountNotfication('followed', 'minus');
    $(`.item[data-id-item='${id}']`).attr('data-favorite', 'false')
    Body.find(`.item[data-id-item='${id}']`).remove();
    if (Body.find('.item').length == 0) {
        Body.find('.moved-menu__wrapper').empty();
        Body.attr('data-body-type', 'empty');
        Body.append(` <img src="assets/images/main/empty_moved-icon.svg" alt="" class="moved-menu__img">
               <hgroup class="moved-menu__hgroup">
                  <h2 class="moved-menu__title">
                      В избранном пусто
                  </h2>
                  <p class="moved-menu__subtitle">
                      Добавляйте в избранное понравившиеся изделия, чтобы быстро их находить.
                          Чтобы добавить в избранное нажимайте у изделий на сердечко:
                  </p>
               </hgroup>
               <img src="assets/images/main/heart-icon__filled.svg" alt="" class="moved-menu__img">`)
    }
}