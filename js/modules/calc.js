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

export default calc;