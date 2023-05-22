import {ChangeStats} from './main.js';

$(document).ready(function () {
    $('.product__btn').on('click', function () {
        let Action = $(this).attr('data-action-btn');
        let CurrentPrice = $('.product__price .stats__number').text();
        let BetStep = Number($('.product__bet-step .stats__number').text())
        let BlitzPrice = Number($('.product__bet-bltz .stats__number').text())
        let InputValue = $('.product__input');
        switch (Action) {
            case 'up':
                $('.product__input').val(Number($('.product__input').val()) + BetStep);
                if (Number(InputValue.val()) == BlitzPrice) {
                    $(this).attr('disabled', true)
                }
                if (Number(InputValue.val()) > CurrentPrice) {
                    $('.product__btn[data-action-btn="down"]').removeAttr('disabled');
                }
                break;
            case 'down':
                $('.product__input').val(Number($('.product__input').val()) - BetStep);
                if (Number(InputValue.val()) == CurrentPrice) {
                    $(this).attr('disabled', true);
                }
                if (Number(InputValue.val()) < BlitzPrice) {
                    $('.product__btn[data-action-btn="up"]').removeAttr('disabled');
                }
                break;
            case 'bet':
                $('.product__price .stats__number-wrapper').text((Number(InputValue.val())));
                ChangeStats();

                if(InputValue.val() == BlitzPrice){
                    $('.product__status').attr('data-status','ended');
                    $('.status__text').text('Аукцион завершен');
                    $('.product__btn[data-action-btn="down"]').attr('disabled', true)
                    $('.product__btn[data-action-btn="up"]').attr('disabled', true)
                    $('.product__btn[data-action-btn="bet"]').attr('disabled', true)
                }

                break
        }
    })
})