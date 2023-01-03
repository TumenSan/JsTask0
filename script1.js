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

    await OutDivProducts(Count);
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
function OutDivProducts(Quantity){
    let Count = Quantity;
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