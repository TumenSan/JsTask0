//import mainJs from 'main';
//const mainJs = require('main');
//import Func from "./func.js";
//Func.Sum();

let number = 1;
let Products = [];
let Count = 10;

async function main(){
    for(let i = 1; i < Count + 1; i++){
        await GetOneProduct(i);
    }

    await OutDivProducts();
    await changeTooltip();

    await main2();
    //await mainJs();
}
main();

async function GetOneProduct(number) {
    // отправляет запрос и получаем ответ
    const response = await fetch("https://dummyjson.com/products/" + number, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        let Product = await response.json();
        Products.push(Product);
        console.log(Product);
        return Product;
    }
}

function OutDivProducts(){
    for(let i = 0; i < Count; i++){
        let BLock = document.getElementsByClassName('tasks__list')[0];
        let ObjectProduct = document.createElement('li');
        ObjectProduct.className = "tasks__item";
        ObjectProduct.innerHTML = Products[i].title;
        //ObjectProduct.tagName = 'li';
        ObjectProduct.id = i;
        BLock.append(ObjectProduct);
    }
}

function changeTooltip() {
    for(let i = 0; i < Count; i++){
        let str = Products[i].id + ' ' + Products[i].title;
        document.getElementById(i).setAttribute('data-tooltip', str);
    }
}








function main2(){
const tasksListElement = document.querySelector(`.tasks__list`);
const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

for (const task of taskElements) {
  task.draggable = true;
}

tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
  
  return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();
  
  const activeElement = tasksListElement.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);
    
  if (!isMoveable) {
    return;
  }
  
  const nextElement = getNextElement(evt.clientY, currentElement);
  
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