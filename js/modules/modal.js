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

export default modal;
export {closeModal};
export {openModal};