import timer from './modules/timer';
import modal from './modules/modal';
import tabs from './modules/tabs';
import slider from './modules/slider';
import forms from './modules/forms';
import cars from './modules/cards';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    timer('.timer' , '2021-12-31');
    modal('[data-modal]','.modal', modalTimerId);
    tabs(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active");
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    forms( 'form' ,modalTimerId);
    cars();
    calc();

});

