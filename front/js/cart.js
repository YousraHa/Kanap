//fetching data from api and call functions
const getApi = () => {
    
    fetch(`http://localhost:3000/api/products`)
    .then((response) => 
        response.json()
    )
    .then((dataFromApi) => {
        getProduct(dataFromApi);
        removeItemFromCart(dataFromApi);
        updateCount();
        placeOrder(dataFromApi);
    })
    .catch((error)=>{
        console.log(error, 'error')
})};

const dataFromStorage = JSON.parse(localStorage.getItem('productLocalStorage'));
const dataFromStorage1 = JSON.stringify(localStorage.getItem('productLocalStorage'));

    //automation 
    const addTxtContent =(attr, text)=>{
        attr.textContent = text;
    }
    const createElem = (elem) =>{
        return document.createElement(elem);
    };

    const getSelector = (elem)=>{
        return document.querySelector(elem);
    };

    function setAttributes(el, attrs) {
        for(const key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

//creating dom elements
function getProduct(dataFromApi){
    if(dataFromStorage){
    const help = dataFromStorage.map((elem, index, array)=>{
        
        const findId = dataFromApi.find((el)=>
        el._id === elem.id
        );

        console.log(dataFromStorage.length, 'dataFromStorage');

        const section = getSelector("#cart__items");
        const getForm = getSelector('.cart__order__form');
        const totalQty = getSelector('#totalQuantity');
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
        addTxtContent(pPrice, pricePerArticle + "???");
        addTxtContent(pQty, "Qt??:");
        addTxtContent(pDelete, "Supprimer");
        addTxtContent(totalQty, dataFromStorage.length)

        return pricePerArticle
    })

        const totalPrice = getSelector("#totalPrice");
        const finalPrice = help.reduce((a, b)=> a+b, 0);
        addTxtContent(totalPrice, finalPrice);
} else {
    console.log('undefined');
}

};

//removes item from cart and in local storage
const removeItemFromCart = () =>{
    let deleteItems = document.querySelectorAll(".deleteItem");
    for (const [i, item] of deleteItems.entries()){
        item.addEventListener('click', (event)=>{
            const remove = dataFromStorage.splice(i, 1);
            localStorage.setItem('productLocalStorage', JSON.stringify(dataFromStorage));
            window.location.reload();
        })
    }
};

//update local storage when quantity changes
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

//placing order function to check inputs and POST request
const placeOrder = (dataFromApi) =>{
    console.log(dataFromStorage, 'dataFromStorage');

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
    const getEmailErr = document.querySelector("#emailErrorMsg");
    // const storage = JSON.parse(localStorage.getItem('productLocalStorage'))
    // console.log(storage, 'storage');

    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regNoDigit = /^([^0-9]*)$/


    //check inputs individually
    getEmail.addEventListener('change', (evt)=>{
        let test = regEx.test(getEmail.value); //use this
        if(test === false || getEmail.value === ""){
            evt.preventDefault();
            getEmailErr.textContent = 'Champ incorrect !';
        } else {
            getEmailErr.textContent = '';
        }
    });

    getFirstName.addEventListener('change', (evt)=>{
        let test = regNoDigit.test(getFirstName.value);
        if(test === false || getFirstName.value === ""){
            evt.preventDefault();
            getFNErr.textContent = 'Champ incorrect !';
        } else {
            getFNErr.textContent = '';
        }
    });

    getLastName.addEventListener('change', (evt)=>{
        let test = regNoDigit.test(getLastName.value);
        if(test === false || getLastName.value === ""){
            evt.preventDefault();
            getLNErr.textContent = 'Champ incorrect !';
        } else {
            getLNErr.textContent = '';
        }
    });

    getAddress.addEventListener('change', (evt)=>{
        let test = /^[a-zA-Z0-9\s,'-]*$/.test(getAddress.value);
        if(test === false || getAddress.value === ""){
            evt.preventDefault();
            getAddressErr.textContent = 'Champ incorrect !';
        } else {
            getAddressErr.textContent = '';
        }
    });

    getCity.addEventListener('change', (evt)=>{
        let test = regNoDigit.test(getCity.value); 
        if(test === false || getCity.value === ""){
            evt.preventDefault();
            getCityErr.textContent = 'Champ incorrect !';
        } else {
            getCityErr.textContent = '';
        }
    });

    //end check input individually

    //check all inputs
    const checkInputs = () =>{
        console.log('test');

        let boolEmail = regEx.test(getEmail.value);
        let boolFN = regNoDigit.test(getFirstName.value);
        let boolLN = regNoDigit.test(getLastName.value);
        let boolCity = regNoDigit.test(getCity.value);
        let boolAddress = /^[a-zA-Z0-9\s,'-]*$/.test(getAddress.value);

        if (    boolEmail === false ||
                boolFN === false ||
                boolLN === false||
                boolCity === false|| 
                boolAddress === false ||
                getFirstName.value === ""|| 
                getLastName.value === ""|| 
                getAddress.value === ""|| 
                getCity.value === ""|| 
                getEmail.value === ""
            ){
            return false
        } else {
            return true
        }
    }
    //listens to click event on submit button and checks if form is correct
    getOrder.addEventListener('click', (event)=>{

        event.preventDefault();

        if (checkInputs() === false || dataFromStorage === null){
            alert('Commande incorrecte !')
        } else {
        const getFN= document.querySelector("#firstName").value;
        const getLN = document.querySelector("#lastName").value;
        const getAddress = document.querySelector("#address").value;
        const getCity = document.querySelector("#city").value;
        const getEmail = document.querySelector("#email").value;
        
        //loop through storage to return item
        const products = dataFromStorage.map(elem=>{
            return elem.id
        });

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

          //POST request to send data to the server after submit
          fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          })
            .then(response => response.json())
            .then((data) => {
                // if(dataFromStorage == null){
                //     alert('no')
                // } else {
                window.location = `./confirmation.html?orderid=${data.orderId}`;
                localStorage.clear();
                // }
            })   
            .catch((error) => 
            console.error('Error:::::', error)
        )
    }
    // }
    })

}


getApi()



