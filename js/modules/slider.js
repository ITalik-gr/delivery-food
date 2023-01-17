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

export default slider;