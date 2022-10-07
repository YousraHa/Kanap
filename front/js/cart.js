const getApi = () => {
    
    fetch(`http://localhost:3000/api/products`)
    .then((response) => 
        response.json()
    )
    .then((dataFromApi) => {
        getProduct(dataFromApi);
        removeItemFromCart(dataFromApi);
        updateCount();
        placeOrder();
    })
    .catch((error)=>{
        console.log(error, 'error')
})};

const dataFromStorage = JSON.parse(localStorage.getItem('productLocalStorage'));
// console.log(dataFromStorage, 'datafrostroage');
    // var sum = 0;
    // var str = [];
    // const test = (pricePerArticle) =>{
    //     console.log(str.push(pricePerArticle), 'help');
    // }
    const addTxtContent =(attr, text)=>{
        attr.textContent = text;
    }
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

function getProduct(dataFromApi){

    const help = dataFromStorage.map((elem, index, array)=>{
        
        const findId = dataFromApi.find((el)=>
        el._id === elem.id
        )

        const section = getSelector("#cart__items");
        const getForm = getSelector('.cart__order__form')
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
        // console.log(pPrice, 'pprice')
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
        // setAttributes(getForm, {"action":"http://localhost:3000/api/order"});
        
        const pricePerArticle = findId.price * elem.value;
        // console.log(pPrice.value, 'price');
        addTxtContent(h2, findId.name);
        addTxtContent(pColor, elem.color);
        addTxtContent(pPrice, pricePerArticle + "€");
        addTxtContent(pQty, "Qté:");
        addTxtContent(pDelete, "Supprimer");
        // console.log(test(pricePerArticle), 'sum');
        // console.log(index, 'index');
        // console.log(array, 'array');

        return pricePerArticle
    })

    // const totalPrice = getSelector("#totalPrice");
    // const finalPrice = help.reduce((a, b)=> a+b, 0);
    // addTxtContent(totalPrice, finalPrice);
    // const getInput = document.querySelectorAll(".itemQuantity");
    // for (const [i, input] of getInput.entries()){

        
    //     getInput.addEventListener('click', (evt)=>{
        const totalPrice = getSelector("#totalPrice");
        const finalPrice = help.reduce((a, b)=> a+b, 0);
        addTxtContent(totalPrice, finalPrice);
    //     console.log(evt.target.value);
    
    // })

// }

};


const removeItemFromCart = () =>{

    let deleteItems = document.querySelectorAll(".deleteItem");
    for (const [i, item] of deleteItems.entries()){
        item.addEventListener('click', (event)=>{
            console.log('click', i);
            const remove = dataFromStorage.splice(i, 1);
            console.log(remove, 'remove');
            console.log(dataFromStorage, 'dataFromStorage');

            localStorage.setItem('productLocalStorage', JSON.stringify(dataFromStorage));
            window.location.reload();
        })
    }

};

const updateCount = () =>{
    const getInput = document.querySelectorAll(".itemQuantity");
    for (const [i, input] of getInput.entries()){
        // const mapping = dataFromStorage.map((elem, index, array)=>{
        input.addEventListener('change', (evt)=>{
        // console.log(evt.target.value, 'value');
        // let arr1 = [... dataFromStorage];
        // console.log(arr1[i], 'array copié')
        dataFromStorage[i].value = parseInt(evt.target.value, 10);
        localStorage.setItem('productLocalStorage', JSON.stringify(dataFromStorage));
        console.log(dataFromStorage, 'dataFromStorage');
        window.location.reload();

        // console.log(i, 'i');

        // })
        })
    };
};

const placeOrder = () =>{
    const getOrder = document.querySelector("#order");
    const getEmail = document.querySelector("#email");
    const getNameErr = document.querySelector('#firstNameErrorMsg');
    const getEmailErr = document.querySelector("#emailErrorMsg")
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


    // setAttributes(getEmail, {"pattern": regEx})

    console.log(getEmail.value, 'value');
    getEmail.addEventListener('change', (evt)=>{
        event1 = evt.target.value
        event1 = event1.replace(regEx);
        console.log(event1);
        let test = regEx.test(getEmail.value);
        if(test === false){
            getEmailErr.textContent = 'wrong address email'
            // alert('wrong address email')
        } else {
            alert('right address email')
        }
    });
    getOrder.addEventListener('click', ()=>{
        console.log('click');

    });

      
    //   let result = response.json();
    //   alert(result.message);
}

getApi()



