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

export default tabs;