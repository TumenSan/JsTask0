let number = 1;
let Products = [];
//let Count = 10;
//по умолчанию
main();

//Основные функции
async function main(){
    //удаляем все блоки
    let container = document.getElementById('ContainerMain');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    //добавляем блоки
    let Count = Number(selvalue.value);
    for(let i = 1; i < Count + 1; i++){
        await GetOneProduct(i);
    }

    await OutDivProducts();
}

//получаем запросом один продукт
async function GetOneProduct(number) {
    // отправляет запрос и получаем ответ
    const response = await fetch("https://dummyjson.com/products/" + number, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        let OneProduct = await response.json();
        Products.push(OneProduct);
        console.log(OneProduct);
    }
}

//добавление блоков с продуктами
function OutDivProducts(){
    let Count = Products.length;
    for(let i = 0; i < Count; i++){
        //добавление блока с названием продукта
        let BLock = document.getElementsByClassName('ContainerMain')[0];
        let ObjectProduct = document.createElement('div');
        ObjectProduct.className = "ContainerBlock";
        ObjectProduct.innerHTML = Products[i].title;
        ObjectProduct.id = i;
        BLock.append(ObjectProduct);

        //добавления всплывающего блока с параметрами
        let BLockDescr = document.getElementsByClassName('ContainerBlock')[i];
        let ObjectProductDescr = document.createElement('div');
        ObjectProductDescr.className = "descr";
        ObjectProductDescr.innerText = 'id: ' + Products[i].id + '\n' + 'brand: ' + Products[i].brand
        + '\n' + 'category: ' + Products[i].category + '\n' + 'description: ' + Products[i].description 
        + '\n' + 'discountPercentage: ' + Products[i].discountPercentage + '\n' + 'price: ' + Products[i].price
        + '\n' + 'rating: ' + Products[i].rating + '\n' + 'stock: ' + Products[i].stock 
        + '\n' + 'thumbnail: ' + Products[i].thumbnail + '\n' + 'title: ' + Products[i].title;
        ObjectProductDescr.id = 'descr_' + i;
        BLockDescr.append(ObjectProductDescr);
    }
}


//сортировка блоков с продуктами по Price
function sortId(){
  //удаляем все блоки
  let container = document.getElementById('ContainerMain');
  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }

  let n = Products.length;
        
  for(let i = 0; i < n; i++) {
      // Находим наименьшее число в правой части массива
      let min = i;
      for(let j = i; j < n; j++) {
          if(Products[j].id < Products[min].id) {
              min=j; 
          }
        }
        if (min != i) {
            // Заменяем элементы
            let tmp = Products[i]; 
            Products[i] = Products[min];
            Products[min] = tmp;      
      }
  }

  OutDivProducts();
}

//сортировка блоков с продуктами по Price
function sortPrice(){
  //удаляем все блоки
  let container = document.getElementById('ContainerMain');
  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }

  let n = Products.length;
        
  for(let i = 0; i < n; i++) {
      // Находим наименьшее число в правой части массива
      let min = i;
      for(let j = i; j < n; j++) {
          if(Products[j].price < Products[min].price) {
              min=j; 
          }
        }
        if (min != i) {
            // Заменяем элементы
            let tmp = Products[i]; 
            Products[i] = Products[min];
            Products[min] = tmp;      
      }
  }

  OutDivProducts();
}