const getApi = () => {
    
    fetch(`http://localhost:3000/api/products`)
    .then((response) => 
        response.json()
    )
    .then((data) => {
        getProduct(data)
    })
    .catch((error)=>{
        console.log(error, 'error')
})};

// const createElemList = ()=>{

// }

function getProduct(data){
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

    // console.log(dataStorage, 'datastorage');

// };

// const appendList =()=>{


    const data1 = JSON.parse(localStorage.getItem('productLocalStorage'));

    data1.map((elem)=>{ 

        const findId = data.find((el)=>
        el._id === elem.id
        );

        const addTxtContent =(attr, text)=>{
            attr.textContent = text;
        };

        console.log(elem, 'elem');

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
        const pQty = createElem("p");
        const pDelete = createElem("p");
        const input = createElem("input");
        // const deleteItems = document.querySelector(".deleteItem");
    // };
    
    // const setAttributesList =()=>{
    
        // createElemList();
    

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


        setAttributes(article, {"class":"cart__item", "data-id":findId.id, "data-color": findId.color});
        setAttributes(div, {"class":"cart__item__img"});
        setAttributes(divContent, {"class": "cart__item__content"});
        setAttributes(divDescription, { "class": "cart__item__content__description"});
        setAttributes(divSettings, { "class": "cart__item__content__settings"});
        setAttributes(divSettingsQty, { "class": "cart__item__content__settings__quantity"});
        setAttributes(divSettingsDelete, { "class": "cart__item__content__settings__delete"});
        setAttributes(input, {"type":"number", "class":"itemQuantity", "name":"itemQuantity", "min":"1", "max":"100", "value":elem.value});
        setAttributes(pDelete, {"class":"deleteItem"});
        setAttributes(img, {"src":findId.imageUrl, "alt":findId.altTxt});
    

        
        const finalPrice = findId.price * elem.value;
        
        addTxtContent(h2, findId.name);
        addTxtContent(pColor, elem.color);
        addTxtContent(pPrice, finalPrice + "€");
        addTxtContent(pQty, "Qté:");
        addTxtContent(pDelete, "Supprimer");

          
        // console.log(elem, 'elem');
        
    });

    // deleteItems.addEventListener('click', (event)=>{
    //     // localStorage.removeItem(elem.id);
    //     console.log('click')
    // })
}

getApi()



