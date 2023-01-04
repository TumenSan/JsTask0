let Products = [];

//по умолчанию 10
main();

//Основные функции
async function main(){
    Products = [];
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
        ObjectProductDescr.innerText = 'title: ' + Products[i].title + '\n' + 'id: ' + Products[i].id 
        + '\n' + 'brand: ' + Products[i].brand + '\n' + 'category: ' + Products[i].category 
        + '\n' + 'description: ' + Products[i].description + '\n' + 'discountPercentage: ' 
        + Products[i].discountPercentage + '\n' + 'price: ' + Products[i].price
        + '\n' + 'rating: ' + Products[i].rating + '\n' + 'stock: ' + Products[i].stock 
        + '\n' + 'thumbnail: ' + Products[i].thumbnail;
        ObjectProductDescr.id = 'descr_' + i;
        BLockDescr.append(ObjectProductDescr);
    }

    //логика движения объектов
    MoveObjects();
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


//логика движения объектов
function MoveObjects(){
    //По умолчанию большинство элементов не может перемещаться, 
    //поэтому присвоим им атрибут draggable со значением 
    //true, чтобы изменить это поведение.
    const tasksListElement = document.querySelector(`.ContainerMain`);
    const taskElements = tasksListElement.querySelectorAll(`.ContainerBlock`);

    for (const task of taskElements) {
        task.draggable = true;
    }

    //какой элемент на данный момент перетаскивается
    tasksListElement.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);
    });

    //В момент окончания перетаскивания нужно убирать класс selected у элемента
    tasksListElement.addEventListener(`dragend`, (evt) => {
        evt.target.classList.remove(`selected`);
    });

    //вставку только после того, как курсор пересечёт 
    //центральную ось, а не сразу после наведения на элемент
    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
        
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
        
        return nextElement;
    }; 
    
    //отслеживаем местоположение перемещаемого элемента относительно других, 
    //подписавшись на событие dragover
    tasksListElement.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();

        const activeElement = tasksListElement.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`ContainerBlock`);

        if (!isMoveable) {
            return;
        }

        //найдём элемент, перед которым нужно осуществить вставку
        const nextElement = getNextElement(evt.clientY, currentElement);

        //учесть ситуацию, когда во время перемещения курсор был 
        //наведён на какой-то элемент и при этом центральную ось так и не пересёк
        if (
            nextElement && 
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;
        }

        tasksListElement.insertBefore(activeElement, nextElement);
    });
      
}
