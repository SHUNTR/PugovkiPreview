Fancybox.bind("[data-fancybox]", {
    hideScrollbar: true,
    closeButton: false,
});
$('.file__message').on('change', function () {
    let Arr = Array.from($(this)[0].files);
    let wrapper = $('.request__photo-wrapper');
    wrapper.empty();
    Arr.forEach(element => {
        wrapper.append(`
         <button class="request__photo photo" type="button">
                <span class="photo__name">${element['name']}</span>
                <i class="fa-solid fa-xmark"></i>
            </button>`);
    });
})
$(document).on('click','.photo',function(){
    let NamePhoto = $(this).find('.photo__name').text().trim();
    let fileinput = $('.file__message')[0].files;
    let IndexOfImg = $('.photo').index(this);
    $(this).slideUp(300,function(){
        $(this).remove();
    })
})