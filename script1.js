let number = 1;
let Products = [];
let Count = 10;
//по умолчанию
main();

//количество продуктов изменено
async function mainValue(){
    await remove();
    //Count = Number(document.getElementById("selvalue").value);
    Count = Number(selvalue.value);
    await main();
}

//удаляем все блоки
function remove(){
    for(let i = 0; i < Count; i++){
        document.getElementById(i).remove();
    }
}

//Основные функции
async function main(){
    for(let i = 1; i < Count + 1; i++){
        await GetOneProduct(i);
    }

    await OutDivProducts();
    await changeTooltip();
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
        let Product = await response.json();
        Products.push(Product);
        console.log(Product);
        return Product;
    }
}

//добавление блоков с продуктами
function OutDivProducts(){
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
        ObjectProductDescr.innerText = Products[i].id + '\n' + Products[i].brand
        + '\n' + Products[i].category + '\n' + Products[i].description 
        + '\n' + Products[i].discountPercentage + '\n' + Products[i].price
        + '\n' + Products[i].rating + '\n' + Products[i].stock + '\n' + Products[i].thumbnail
        + '\n' + Products[i].title;
        ObjectProductDescr.id = 'descr_' + i;
        BLockDescr.append(ObjectProductDescr);
    }
}

function changeTooltip() {
    for(let i = 0; i < Count; i++){
        let str = Products[i].id + ' ' + Products[i].title;
        document.getElementById(i).setAttribute('data-tooltip', str);
    }
}