let number = 1;
let Products = [];
let Count = 10;

main();

async function mainValue(){
    await remove();
    //Count = Number(document.getElementById("selvalue").value);
    Count = Number(selvalue.value);
    await main();
}

function remove(){
    for(let i = 0; i < Count; i++){
        document.getElementById(i).remove();
    }
}

async function main(){
    for(let i = 1; i < Count + 1; i++){
        await GetOneProduct(i);
    }

    await OutDivProducts();
    await changeTooltip();
}

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
        let BLock = document.getElementsByClassName('ContainerMain')[0];
        let ObjectProduct = document.createElement('div');
        ObjectProduct.className = "ContainerBlock";
        ObjectProduct.innerHTML = Products[i].title;
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