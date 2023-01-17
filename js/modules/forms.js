import {closeModal, openModal} from './modal';
import {postData} from '../services/services'

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
    postData('http://localhost:3000/requests', objectJSON) // відправялю данні на серв на таку силку і такі данні
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
    openModal('.modal', openModalTimer); // відкриваю вже пусту модалку

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
      closeModal('.modal');
    }, 6000)
  };
}

export default forms;