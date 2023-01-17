import {getResource} from '../services/services';

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
      getResource('http://localhost:3000/menu')
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

export default cards;