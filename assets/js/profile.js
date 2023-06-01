$('#avatar').on('change', function (event) {
    let tmppath = URL.createObjectURL(event.target.files[0]);
    $('.user__avatar').attr(`src`, `${tmppath}`);
})
$(".profile-page__btn").on('click', function () {
    if (!$(this).hasClass('active')) {
        let typePage = $(this).attr('data-type-page');
        $(".profile-page__page.active").removeClass('active');
        $(`.profile-page__page[data-type-page='${typePage}']`).addClass('active');
        $(".profile-page__btn.active").removeClass('active');
        $(this).addClass('active')
    }
})