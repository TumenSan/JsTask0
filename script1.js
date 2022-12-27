let number = 1;
let Products = [];
let ProductsTitle = [];
let Count = 11;

async function main(){
    for(let i = 1; i < Count; i++){
        //Products.push(GetOneProduct(i));
        await GetOneProduct(i);
    }

    await OutDivProducts();
    await changeTooltip();
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
        ProductsTitle.push(Product.title);
        Products.push(Product);
        console.log(Product);
        return Product;
    }
}

function OutDivProducts(){
    for(let i = 0; i < Count - 1; i++){
        let BLock = document.getElementsByClassName('ContainerMain')[0];
        let ObjectProduct = document.createElement('div');
        ObjectProduct.className = "ContainerBlock";
        ObjectProduct.innerHTML = ProductsTitle[i];
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