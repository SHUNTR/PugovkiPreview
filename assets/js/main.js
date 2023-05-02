$(document).ready(function(){

    // Разделяем все цифры в статистике на блоки
    function ChangeStats(){
        $('.stats__number-wrapper').each(function(index,element){
            let Numbers  = element.textContent.trim().split('').reverse();

            let size = 3; //размер подмассива
            let subarray = []; //массив в который будет выведен результат.
            for (let i = 0; i <Math.ceil(Numbers.length/size); i++){
                subarray[i] = Numbers.slice((i*size), (i*size) + size).reverse().join("");
            }
            Numbers = subarray;
            // Очищаем место где будут хранится цифры    
            $(this).empty();
            // Вставляем число разделенные под 3 цифры
            for(let i = Numbers.length-1; i>=0;i--){
                $(this).append(`<span class='stats__number'>${Numbers[i]}</span>`);
            }
        })
    }
    ChangeStats();



    $(window).on("scroll resize",function(){
        // Получаем высоту хедера и сравниваем  с текущей позицией на экране
        let HeightHeader = document.querySelector('.main-header').offsetHeight;
        let HeightFooter = document.querySelector('.main-footer').offsetHeight;
        if(GetCurrentYpos() > HeightHeader && (GetCurrentYpos()+$(window).height() < ($('html').height()) - HeightFooter)) {
            // показываем асайд
            ShowAside();
        }
        else
        {
            // Убираем аткивное состояние у поиска если мы добрались до верхушки страницы
            $('.search.active').removeClass('active');
            // Прячем асайд
            HideAside();
            //При скролле до верхней позиции страницы скрываем все активные поп'апы и снимаем класс активности у кнопок
            $('.moved-aside__btn.active').removeClass('active');
            $('.popup.active').fadeOut(100).removeClass('active');
        }
    })

    // Прослушивание на клик экрана
    $(window).on("click",function(event){
        // Если нажали вне поп'апа скрываем активны поп'ап
        if(!event.target.closest("li[data-popup='true']")){
            $('.popup.active').siblings('.moved-aside__btn.active').removeClass('active');
            $('.popup.active').fadeOut(100).removeClass('active');
        }
        // Если нажали вне поиска и если поисковая панель пустая то скрываем ее
        if(!event.target.closest(".search") && ($('.search.active .search__input').length !=0 && $('.search.active .search__input').val().trim() == "")){
            $('.search.active').removeClass('active');
        }
         // Если нажали вне выплывающего меню скрываем активные выплыващие менюшки
         if(!event.target.closest("*[data-moved-menu='true']") && !event.target.closest(".moved-menu")){
            let MenuType = $('.moved-menu.active').attr('data-type-menu');
            $('body').removeClass('scrollBlock');
            $(`button[data-type-menu='${MenuType}']`).removeClass('active');
            $('.moved-menu.active').removeClass('active');
        }
    })


    // При изменении размеров страницы выключаем активное состояние у кнопок
    $(window).on("resize",function(){
        $('.moved-aside__btn.active').removeClass('active');
        $('.popup.active').fadeOut(100).removeClass('active');
        $('.moved-menu.active').removeClass('active');
        $('.submenu.active').removeClass('active');
    })


    // Переключение состояния выплывающих кнопок
    $('.moved-aside__btn').on("click",function(){
        if(!$(this).hasClass('active')){
            $('.moved-aside__btn.active').removeClass('active');
            $(this).addClass('active');
        }
        else{
            $('.moved-aside__btn.active').removeClass('active');
        }
    })

    // Закрытие уведомлений
    $('.notification__btn').on('click',function(){
        let CurrentAction = $(this).attr('data-action');
        switch (CurrentAction){
            case "close":
                try{
                    let notification = $(this).parents('.notification');
                    notification.slideUp(300,function(){
                        $(this).remove();
                    });
                }
                catch(error){

                }
            break;
        }
    })

    // Переключение состояния поиска
    $('.search__btn').on("click",function(){{
        if(!$(this).parents('.search').hasClass('active'))
            $(this).parents('.search').addClass('active');
        else
             $(this).parents('.search').removeClass('active');
    }})

    //Открытие popup
    $('.popup-opener').on('click',function(){
       if(!$(this).siblings('.popup').hasClass('active')){
        $('.popup.active').removeClass('active').fadeOut(100).removeClass('active');
        $(this).siblings('.popup').fadeIn(100).addClass('active');
       }
       else{
        $(this).siblings('.popup').fadeOut(100).removeClass('active');
       }
    })

    //Открытие выплывающего меню
    $('.moved-menu-opener').on('click',function(){
        let CurrentTypeMenu = $(this).attr('data-type-menu');
        try {
            if(!$(`.moved-menu[data-type-menu='${CurrentTypeMenu}']`).hasClass('active')){
                $('.moved-menu.active').removeClass('active');
                $('.submenu.active').removeClass('active');
                 $(`.moved-menu[data-type-menu='${CurrentTypeMenu}']`).addClass('active')
                 $(this).addClass('active');
                 $('body').addClass('scrollBlock');
            }
            else{
                    $(`.moved-menu[data-type-menu='${CurrentTypeMenu}']`).removeClass('active');
                     $(this).removeClass('active');
            }
        } catch (error) {
            
        }
     })
    //  Открытие подменю
     $('.submenu-opener').on("click",function(){
        $(this).siblings('.submenu').addClass('active');
     })
    //  Нажатие на кнопку внутри сабменю
    $('.submenu__btn').on("click",function(){
        let CurrentAction =  $(this).attr('data-action');
        let CurentMenu  = $(this).parents('.submenu');
        switch (CurrentAction){
             case 'close':
                 try {
                     CurentMenu.removeClass('active');
                 } catch (error) {
                     console.log("Произошла ошибка")
                 }
        }
     })
    //  Клик по кнопке внутри выплывающего мнею
    $('.moved-menu__btn').on("click",function(){
       let CurrentAction =  $(this).attr('data-action');
       let CurentMenu  = $(this).parents('.moved-menu');
       let MenuType = $('.moved-menu.active').attr('data-type-menu');
       switch (CurrentAction){
            case 'close':
                try {
                    CurentMenu.removeClass('active');
                    $(`button[data-type-menu='${MenuType}']`).removeClass('active');
                    $('body').removeClass('scrollBlock');
                } catch (error) {
                }
       }
    })


    // Показываем выплывающие менюшки при скроле
    function ShowAside(){
        $(".moved").addClass('active');
    }


    // Cкрываем выплывающие менюшки при скроле
    function HideAside(){
        $(".moved").removeClass('active');
    }

})


// Получаем текущую позицуию на странице
function GetCurrentYpos(){
    return document.body.scrollTop || document.documentElement.scrollTop;
}

// Получаем полную высоту страницы
function GetHeightPage(){
    return document.documentElement.scrollHeight - document.documentElement.clientHeight;
}