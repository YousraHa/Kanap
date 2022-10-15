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
const dataFromStorage1 = JSON.stringify(localStorage.getItem('productLocalStorage'));

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
        addTxtContent(h2, findId.name);
        addTxtContent(pColor, elem.color);
        addTxtContent(pPrice, pricePerArticle + "€");
        addTxtContent(pQty, "Qté:");
        addTxtContent(pDelete, "Supprimer");

        return pricePerArticle
    })

        const totalPrice = getSelector("#totalPrice");
        const finalPrice = help.reduce((a, b)=> a+b, 0);
        addTxtContent(totalPrice, finalPrice);

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
    input.addEventListener('change', (evt)=>{
        dataFromStorage[i].value = parseInt(evt.target.value, 10);
        localStorage.setItem('productLocalStorage', JSON.stringify(dataFromStorage));
        console.log(dataFromStorage, 'dataFromStorage');
        window.location.reload();
        })
    };
};

const placeOrder = () =>{
    const getOrder = document.querySelector("#order");
    const getEmail = document.querySelector("#email");
    const getFirstName = document.querySelector("#firstName");
    const getLastName = document.querySelector("#lastName");
    const getAddress = document.querySelector("#address");
    const getCity = document.querySelector("#city");

    const getFNErr = document.querySelector('#firstNameErrorMsg');
    const getLNErr = document.querySelector('#lastNameErrorMsg');
    const getCityErr = document.querySelector('#cityErrorMsg');
    const getAddressErr = document.querySelector('#addressErrorMsg');

    const booleen = true;
    //var bool if input false = bool false
    const getEmailErr = document.querySelector("#emailErrorMsg")
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regNoDigit = /^([^0-9]*)$/

    console.log(getEmail.value, 'value');

    getEmail.addEventListener('change', (evt)=>{
        event1 = evt.target.value
        event1 = event1.replace(regEx);
        console.log(event1);
        let test = regEx.test(getEmail.value); //use this
        if(test === false){
            evt.preventDefault();
            getEmailErr.textContent = 'Adresse email incorrecte !';
        } else {
            console.log('right address email')
        }
    });

    //func for all inputs

    const checkInputs = () =>{
        let boolEmail = regEx.test(getEmail.value);
        let boolFN = regNoDigit.test(getFirstName.value);
        let boolLN = regNoDigit.test(getLastName.value);

        console.log(boolEmail, 'boolEmail');
        console.log(boolFN, 'boolFN');
        console.log(boolLN, 'boolLN');

    }

    getOrder.addEventListener('click', (event)=>{
        event.preventDefault();
        checkInputs()
        alert('submitting');
        //call bool func
        //commenter toutes les fonctions
        // window.history.back();
        const getFN= document.querySelector("#firstName").value
        console.log(getFN, 'dnksjn');
        const getLN = document.querySelector("#lastName").value;
        const getAddress = document.querySelector("#address").value;
        const getCity = document.querySelector("#city").value;
        const getEmail = document.querySelector("#email").value;

    console.log(dataFromStorage, 'storage');

    const products = dataFromStorage.map(elem=>{
        return elem.id
    })
        let user = {    
            "contact": {   
            "firstName": getFN,
            "lastName": getLN,
            "address": getAddress,
            "city":getCity,
            "email": getEmail
        },
            "products": products,
          };
          
          fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          })
            .then(response =>response.json())
            .then((data) => {
                window.location = `./confirmation.html?orderid=${data.orderId}`;
                localStorage.clear();
            })   
            .catch((error) => 
            console.error('Error:::::', error)
        )
        console.log('click')
    })

      
    //   let result = response.json();
    //   alert(result.message);
}

// const test = ()=>{

//     let user = {    
//         "contact": {   
//         "firstName": "jyggkh",
//         "lastName": "gkjfjg",
//         "address": "kdbjf",
//         "city":"kdsbk",
//         "email": "getEmail"
//     },
//         "products": [],
//         "orderId": "dsfd"
    
//       };
      
//       let response = fetch('http://localhost:3000/api/products/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(user)
//       })
//         .then(response =>response.json())
//         .then((data) => 
//         console.log(data, 'dataaaa'))   
//         .catch((error) => 
//         console.error('Error:::::', error)
//     )

// }

getApi()



