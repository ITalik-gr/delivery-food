
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';



window.addEventListener('DOMContentLoaded', () => {

  const openModalTimer = setTimeout(() => openModal('.modal', openModalTimer), 50000); // модалка відкривається після 5сек

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2023-06-11');
  modal('.modal', '[data-open]');
  forms('form',openModalTimer);
  cards();
  calc();
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCount: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    fill: '.offer__slider-inner',
  });

});

