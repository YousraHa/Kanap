    const getApi = () => {
        
        fetch(`http://localhost:3000/api/products`)
        .then((response) => 
            response.json()
        )
        .then((dataFromApi) => {
            getProduct(dataFromApi);
            removeItemFromCart();
        })
        .catch((error)=>{
            console.log(error, 'error')
    })};

    const dataFromStorage = JSON.parse(localStorage.getItem('productLocalStorage'));
    console.log(dataFromStorage, 'datafrostroage');
    // var sum = 0;
    // var str = [];
    // const test = (pricePerArticle) =>{
    //     console.log(str.push(pricePerArticle), 'help');
    // }

function getProduct(dataFromApi){
    const createElem = (elem) =>{
        return document.createElement(elem)
    };

    const getSelector = (elem)=>{
        return document.querySelector(elem)
    };

    function setAttributes(el, attrs) {
        for(const key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };


    const addTxtContent =(attr, text)=>{
        attr.textContent = text;
    };
    const help = dataFromStorage.map((elem, index, array)=>{
        
        const findId = dataFromApi.find((el)=>
        el._id === elem.id
        );

        const section = getSelector("#cart__items");
        const article = createElem("article");
        const div = createElem("div");
        const img = createElem("img");
        const divContent = createElem("div");
        const divDescription = createElem("div");
        const divSettings = createElem("div");
        const divSettingsQty = createElem("div");
        const divSettingsDelete = createElem("div");
        const h2 = createElem("h2");
        const p = createElem("p");
        const pColor = createElem("p");
        const pPrice = createElem("p");
        console.log(pPrice, 'pprice')
        const pQty = createElem("p");
        const pDelete = createElem("p");
        const input = createElem("input");    

        section.appendChild(article);
        article.appendChild(div);
        article.appendChild(divContent);
        divContent.appendChild(divDescription);
        divContent.appendChild(divSettings);
        divSettings.appendChild(divSettingsQty);
        divSettings.appendChild(divSettingsDelete);
        divDescription.appendChild(h2);
        divDescription.appendChild(pColor);
        divDescription.appendChild(pPrice);
        divSettingsQty.appendChild(pQty);
        divSettingsQty.appendChild(input);
        divSettingsDelete.appendChild(pDelete);
        div.appendChild(img);


        setAttributes(article, {"class":"cart__item", "data-id":elem._id, "data-color": elem.color});
        setAttributes(div, {"class":"cart__item__img"});
        setAttributes(divContent, {"class": "cart__item__content"});
        setAttributes(divDescription, { "class": "cart__item__content__description"});
        setAttributes(divSettings, { "class": "cart__item__content__settings"});
        setAttributes(divSettingsQty, { "class": "cart__item__content__settings__quantity"});
        setAttributes(divSettingsDelete, { "class": "cart__item__content__settings__delete"});
        setAttributes(input, {"type":"number", "class":"itemQuantity", "name":"itemQuantity", "min":"1", "max":"100", "value":elem.value});
        setAttributes(pDelete, {"class":"deleteItem"});
        setAttributes(img, {"src":findId.imageUrl, "alt":findId.altTxt});
        
        const pricePerArticle = findId.price * elem.value;
        console.log(pPrice.value, 'price')
        addTxtContent(h2, findId.name);
        addTxtContent(pColor, elem.color);
        addTxtContent(pPrice, pricePerArticle + "€");
        addTxtContent(pQty, "Qté:");
        addTxtContent(pDelete, "Supprimer");
        // console.log(test(pricePerArticle), 'sum');
        // console.log(index, 'index');
        // console.log(array, 'array');

        return pricePerArticle
    });

    const totalPrice = getSelector("#totalPrice");
    const finalPrice = help.reduce((a, b)=> a+b, 0);
    addTxtContent(totalPrice, finalPrice)


};


const removeItemFromCart = ()=>{

    let deleteItems = document.querySelectorAll(".deleteItem");
    for (const [i, item] of deleteItems.entries()){
        item.addEventListener('click', (event)=>{
            console.log('click', i);
            const remove = dataFromStorage.splice(i, 1);
            console.log(remove, 'remov');
            console.log(dataFromStorage, 'dataFromStorage');

            localStorage.setItem('productLocalStorage', JSON.stringify(dataFromStorage));
            window.location.reload()
        })
    };

}

getApi()



