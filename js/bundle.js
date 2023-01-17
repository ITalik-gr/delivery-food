/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

  //? калькулятор

  const result = document.querySelector('.calculating__result span'); // сюди передається результат
  let sex, height, weight, age, ratio; 

  if(localStorage.getItem('ratio')) { // якщо в локал вже є інфа, то її і підсталяємо
    ratio = localStorage.getItem('ratio');
  } else { // якщо нема то встановлюємо дефолтну
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  if(localStorage.getItem('sex')) { // якщо в локал вже є інфа, то її і підсталяємо
    sex = localStorage.getItem('sex');
  } else {  // якщо нема то встановлюємо дефолтну
    sex = 'female'
    localStorage.setItem('sex', 'female');
  }

  function setLocalData(selector, active) { // якщо в локалкі вже є інфа, то її встанов, якщо ні то дефолт
    let elements = document.querySelectorAll(selector); // беру або всі кнопки гендера або активності

    elements.forEach(elem => { // перебираю їх і прибираю клас активності
      elem.classList.remove(active);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) { // якщо цей елем з таким же значенням як і в локал, то його активність встановити
        elem.classList.add(active);
      } 
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // тут так же
        elem.classList.add(active);
      }
    })
  }

  setLocalData('#gender div', 'calculating__choose-item_active');  
  setLocalData('.calculating__choose_big div', 'calculating__choose-item_active');

  function caclTotal() { // всі данні розчитує по функції
    if (!sex || !height || !weight || !age || !ratio) {  // якщо не вірна інфа то кік
      result.textContent = '___';
      return;
    }

    if (sex === 'female') { // якщо жінка то по такій фолмурі, якщо ні то іншій
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  caclTotal();

  function calcStaticInfo(parentSelector, activeClass) { // розраховую, те що не вводить користувач
    const elements = document.querySelectorAll(`${parentSelector} div`); // звертаюсь до батька 

    elements.forEach(elem => { // перебираю всі кнопки
      elem.addEventListener('click', (e) => { // на кожну вішаю клік
        if (e.target.getAttribute('data-ratio')) { // якщо та на яку клікнули має дата атрибут, то в ratio данні атрибуту 
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else { // якщо на нажатій є id то назву цього айді
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
  
        elements.forEach(elem => { // всім прибираю активність
          elem.classList.remove(activeClass);
        });
  
        e.target.classList.add(activeClass); // назначаю активність на жмякнутого 
        caclTotal() // все перераховую
      })
    })
    
  };

  calcStaticInfo('#gender', 'calculating__choose-item_active');
  calcStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

  function calcDynamicInfo(selector) {

    let input = document.querySelector(selector); // отримую інпут

    input.addEventListener('input', e => { // якщо щось міняється в input

      if (input.value.match(/\D/g)) { // перевіряю якщо є не цифри, то помилка match чи є воно чи ні
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }


      if(e.target.getAttribute('id') === 'height') { // якщо ввів в висоту, то ці данні в переменну висоти. і тд
        height = +e.target.value;
      } else if (e.target.getAttribute('id') === 'weight') {
        weight = +e.target.value;
      } else if (e.target.getAttribute('id') === 'age') {
        age = +e.target.value;
      }

      caclTotal()
    })
  };

  calcDynamicInfo('#height'); // визиваю функцію для кожного інпута
  calcDynamicInfo('#weight');
  calcDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Class Класи

    class MenuCard {
      constructor(src, alt, title, descr, price, parent, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parent);
        this.costUSD = 41;
        this.changeToUAH();
      }
  
      changeToUAH() {
        this.price = this.price * this.costUSD;
      }
  
      createMenuCard() {
        const element = document.createElement('div');
  
        if (this.classes.length === 0) {
          this.classes = "menu__item";
          element.classList.add(this.classes);
      } else {
          this.classes.forEach(className => element.classList.add(className));
      }
        
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `
        this.parent.append(element);
      }
    }
  

  
  
      //! Другий спосіб створити карточки, мені більше подобається ніж через класи і тд menuClass
      (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => createCard(data));
  
        function createCard(data) {
          data.forEach(({img, altimg, title, descr, price}) => {
            let element = document.createElement('div');
  
            price = price * 41;
            element.classList.add('menu__item');
  
            element.innerHTML = `
              <img src=${img} alt=${altimg}>
              <h3 class="menu__item-subtitle">${title}</h3>
              <div class="menu__item-descr">${descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${price}</span> грн/день</div>
              </div>
            `;
  
            document.querySelector('.menu .container').append(element);
          })
        }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, openModalTimer) {

  // Отправка обрат связ Form

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/spinner.svg',
    sucsess: 'Все вийшло!',
    failed: 'Щось пішло не так('
  };

  forms.forEach(item => {
    bindPostData(item);
  })



  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMassege = document.createElement('img');  // роблю елемент який буде крутитись при відправці
      statusMassege.src = message.loading;
      statusMassege.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMassege);

    //! Далі старий спосіб
    //   const request = new XMLHttpRequest(); // create запрос | 
    //   request.open('POST', 'server1.php'); // налашт, який запрос і де серв

    //   request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // тіки якщо передаємо json файлом, для FormData простого не треба

    //   const formData = new FormData(form); // автоматом витягує з форми данні які відправили (input...). Щоб не треба було зчитувати з кожного інпута value та передавати. Для FormData не треба setRequestHeader(). в input потрібно щоб було name

    //   let objectJSON = {};
    //   formData.forEach(function(value, key) {
    //     objectJSON[key] = value; // щоб юзать данні як JSON треба перекинути данні з FormData в обєкт так от.
    //   });

    //   const json = JSON.stringify(objectJSON); // перероблюємо тей звич обєкт з данними форми в JSON


    //   request.send(json); // відправляю данні на серв з форми, це якщо треьа JSON, просто відправляю обєкт який JSON
    //   // request.send(formData); // відправляю на сервер данні з форми, це якщо FormData

    //   request.addEventListener('load', () => { 
    //     if(request.status === 200) { // якщо запрос на серв успішний то
    //       console.log(request.response);
    //       showThanksModal(message.sucsess); // вивиодить що успішно модалкоб
    //       form.reset();
    //       statusMassege.remove();
    //     } else {
    //       showThanksModal(message.failed); // вивиодить що failed
    //     }
    //   });
    //!

    //! Далі новий спосіб відправки данних на серв
    
    const formData = new FormData(form);

    // let objectJSON = {};
    // formData.forEach(function(value, key) {
    //   objectJSON[key] = value; // щоб юзать данні як JSON треба перекинути данні з FormData в обєкт так от.
    // }); //? Нижче як це зробити проще

    const objectJSON = JSON.stringify(Object.fromEntries(formData.entries())); // eentries преврощає в масив масивов, потім в масив і в обєкт JSON


  //? then() - якщо все вийшло, .catch() - помилка, .finally() - завжди

    // fetch('server.php', { // де серв, метод і налаштування
    //   method: "POST",
    //   headers: { // headers треба тіки для JSON
    //     'Content-Type': 'application/json'
    //   },
    //   // body: formData, // що відправляємо (не для Json)
    //   body: JSON.stringify(objectJSON) // отак відправляю данні на серв якщо JSON

    // })
    (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', objectJSON) // відправялю данні на серв на таку силку і такі данні
    // .then(data => data.text()) // переводить в норм формат, який читати можна
    .then(data => {
        console.log(data);
        showThanksModal(message.sucsess); // вивиодить що успішно модалкоб
        statusMassege.remove();
    })
    .catch(() => {
      showThanksModal(message.failed);
    })
    .finally(() => {
      form.reset();
    })

    })

    
  }


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); // блок в середині модал

    prevModalDialog.classList.add('hide'); // убираю цей блок
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', openModalTimer); // відкриваю вже пусту модалку

    const thanksModal = document.createElement('div'); // роблю такий же блок, але пустий
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times</div>
        <div class="modal__title">${message}</div>
      </div>
    `; // закидую в нього два елементи і меседж з обєкта

    document.querySelector('.modal').append(thanksModal); // закидую цей новий блок в модалку
    setTimeout(() => { // після 6 сек убираю свій блок дякую і повертаю стару модалку + закриваю, щоб можна було повторно відправити
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 6000)
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, openModalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show'); 
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden'; // так при відкритій модалці не буде прокручуватись сайт

  if(openModalTimer) {
    clearTimeout(openModalTimer); // якщо я вже відкрив модалку сам, то сама не відкриється
  }
}

function closeModal(modalSelector) { // роблю функцію закриття модалки, тк як часто використовується
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(modalSelector, triggerSelector, openModalTimer) {
    //? Modal

  const modal = document.querySelector(modalSelector),
  modalTrigger = document.querySelectorAll(triggerSelector);

modalTrigger.forEach(btn => { // у мене багато кнопок на які потрібно визивать, тому перебираю через forEach. І кожній вішаю, що при клікі на неї буде виконуватись таке
  btn.addEventListener('click', () => openModal(modalSelector, openModalTimer));
})



modal.addEventListener('click', (e) => { // при клікі на екран, за межі блоку з самою модалкою та на крестик з атрибутом убираю її
if(e.target === modal || e.target.getAttribute('data-close') == '') {
  closeModal(modalSelector);
}
});

document.addEventListener('keydown', (e) => { // при кліку на кнопку esc закриваю модалку
if(e.code === 'Escape' && modal.classList.contains('show')) {
  closeModal(modalSelector);
}
})

function showModalBySccroll() {
if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) { // якщо я долистав до кінця то відкр модалка. якщо видима частина + пролистане вверху = всій висоті документа то відкр
  openModal(modalSelector, openModalTimer);
  window.removeEventListener('scroll', showModalBySccroll); // прибираю собитие щоб не відкривалось більше
}
}
window.addEventListener('scroll', showModalBySccroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCount, currentCounter, wrapper, fill}) { 

  //? Слайдер

  //! 1 варіант (простий)

  // const sliderPrev = document.querySelector('.offer__slider-prev'),
  //       sliderNext = document.querySelector('.offer__slider-next'),
  //       sliderCurrent = document.querySelector('#current'),
  //       sliderTotal = document.querySelector('#total'),
  //       sliderItem = document.querySelectorAll('.offer__slide');

  // let slideIndex = 1;

  // showSlides(slideIndex);

  // if(sliderItem.length < 10) { // якщо слайдів меньше 10, то підставляємо в тотал з 0
  //   sliderTotal.textContent = `0${sliderItem.length}`; 
  // } else { // якщо більше то просто кількість
  //   sliderTotal.textContent = sliderItem.length;
  // }

  // function showSlides(n) {
  //   if(n > sliderItem.length) { // якщо переключило на більше ніж слайдів є, то повертати назад до 1
  //     slideIndex = 1;
  //   }

  //   if(n < 1) {
  //     slideIndex = sliderItem.length; // якщо перейшло до першого слайда, то починати з ластового
  //   }

  //   sliderItem.forEach(item => item.style.display = 'none'); // скриваю всі слайди які є

  //   sliderItem[slideIndex -1].style.display = 'block'; // відкриваю тей слайд, який вибраний, під номером


  //   if(slideIndex < 10) { // якщо слайдів меньше 10, то підставляємо в current з 0
  //     sliderCurrent.textContent = `0${slideIndex}`; 
  //   } else { // якщо більше то просто кількість
  //     sliderCurrent.textContent = slideIndex; 
  //   }


  // }

  // function plusSlide(n) { // додає або віднімає від тек слайда 1
  //   showSlides(slideIndex += n);
  // }

  // sliderPrev.addEventListener('click', () => {
  //   plusSlide(-1);
  // })
  // sliderNext.addEventListener('click', () => {
  //   plusSlide(1);
  // })

  //! 2 Варіант 

  const prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCount),
        slides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(fill),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container);

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) { // якщо слайдів меньше 10, то підставляємо в тотал з 0
    total.textContent = `0${slides.length}`; 
    current.textContent = `0${slideIndex}`;
  } else { // якщо більше то просто кількість
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%'; // щоб карусель займала стіки, скіки для слайдів треба
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slider.style.position = 'relative'; // для точок

  const indicators = document.createElement('ol'),
        dots = []; // всі точки тут
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

  slider.append(indicators); // точки в слайдер

  function createDots() {
    for(let i = 0; i < slides.length; i++) { // создає точок стіки скіки слайдов
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
      `;
      if (i == 0) {
        dot.style.opacity = 1;
      }
  
      indicators.append(dot);
  
      dots.push(dot); // закидую в масив всі точки які зроблені
    }
  }

  function calcNextOffset(int) {
    if(int) { // int. якщо вперед гортати, то true, а назад false
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) { // якщо прокрутили до кінця, ширина слайда * на кількість, то певертаємо транслейт на 0, на перший слайд
        offset = 0;
      } else {
        offset += +width.replace(/\D/g, ''); // якщо ще не в кінці, то просто гортаємо на ширину 1 слайда
      }
    } else {
      if (offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1); // якщо перший слайд, то перекидаємо на останній
      } else {
        offset -= +width.replace(/\D/g, ''); // якщо це не перший слайд, то віднімаємо ширину 1 слайда
      }
      //? replace(/\D/g, '') - замінює всі не цифри на нічого, убирає
    }
    
  }

  function calcSlidesIndex() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function dotsToggle() {
    dots.forEach(dot => dot.style.opacity = ".5"); // всім точкам прозрачность
    dots[slideIndex - 1].style.opacity = 1; // при зміні вибраного слайда давать такій же точкі по счету активность
  }

  function slidesTranslate() {
    slidesField.style.transform = `translateX(-${offset}px)`;
  }
  createDots();

  slides.forEach(slide => slide.style.width = width); // шоб слайди були однакові та влізли

  next.addEventListener('click', () => {
    calcNextOffset(true);
    slidesTranslate(); // свайпає слайди на offset

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    calcSlidesIndex();
    dotsToggle();
  
  })

  prev.addEventListener('click', () => {

    calcNextOffset(false);
    slidesTranslate();

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    calcSlidesIndex();
    dotsToggle();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to'); // та точка на яку клік дає свій номер

      slideIndex = slideTo; // цей номер клікнутой кидаємо для індекса
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesTranslate()
      calcSlidesIndex();
      dotsToggle();
    })
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  // function showTabContent(i = 0) {
  //   tabsContent[i].style.display = 'block';
  //   tabs[i].classList.add('tabheader__item_active');
  // }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent(0);

  tabsParent.addEventListener('click', (event) => { // обработчик на родителя. 
    const target = event.target; // те на що клікнули

    if (target && target.classList.contains(tabsSelector.slice(1))) { // перевіряємо що клікнули на елемент з таким класом
      tabs.forEach((item, i) => { // порівнюємо його з масивом цих же елементів
        if (target == item) { // якщо клікнули на цей то його номер та підставляємо в функ. якщо нажав на 2, то перевіряє в масиві що це другий.
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id ,deadline) {
    //? timers and test github
    function getTimeRemaining(endTime) {

      let days, hours, minutes, seconds;
      let t = Date.parse(endTime) - Date.parse(new Date());

      if(t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / (1000 * 60) % 60)),
        seconds = Math.floor((t / 1000) % 60);
      }

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      }
    }

    function setClock(selector, endTime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function getZero(num) {
        if (num >= 0 && num < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      }

      function updateClock() {
        const t = getTimeRemaining(endTime);

        days.innerHTML = getZero(t.days),
        hours.innerHTML = getZero(t.hours),
        minutes.innerHTML = getZero(t.minutes),
        seconds.innerHTML = getZero(t.seconds);

        if(t.total <= 0) {
          clearInterval(timeInterval);
        };
      }
    }

    setClock(id, deadline);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
let postData = async (url, data) => { // заготовка відправки дданих на серв
  let res = await fetch(url, {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json'
    },
    body: data
  })
  return await res.json();
};

let getResource = async (url) => {
  let res = await fetch(url)

  if(!res.ok) { // если все не окей то (ошибка)
    throw new Error(`Не можемо fetch ${url}, status: ${res.status}`); // викидаю ошибку ручну
  }
  return await res.json();
} // заготовка запроса данних з сервера

  // getResource('http://localhost:3000/menu') // запрашую данні з серва по такого путі і юзаю їх
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render(); // визиваю создание карточки (конструктора, класа) стіки, скіки там обєктів
  //   });
  // })





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");












window.addEventListener('DOMContentLoaded', () => {

  const openModalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', openModalTimer), 50000); // модалка відкривається після 5сек

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-06-11');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-open]');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form',openModalTimer);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map