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


export {postData};
export {getResource};