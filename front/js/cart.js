const getApi = () => {
    
    fetch(`http://localhost:3000/api/products`)
    .then((response) => 
        response.json()
    )
    .then((dataFromApi) => {
        getProduct(dataFromApi);
        removeItemFromCart(dataFromApi);
    })
    .catch((error)=>{
        console.log(error, 'error')
})};

// const createElemList = ()=>{

// }
const dataFromStorage = JSON.parse(localStorage.getItem('productLocalStorage'));
console.log(dataFromStorage, 'datafrostroage');
var sum = 0;
var str = [];
const test = (pricePerArticle) =>{
    console.log(str.push(pricePerArticle), 'help');
//     for(let prix of pricePerArticle){
//     sum += prix;
//     str.push(sum);
//     return sum
// }
}

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

    // console.log(dataStorage, 'datastorage');

// };

// const appendList =()=>{


    // console.log(localStorage.getItem('productLocalStorage'), 'dataFromStorage local str');
    // const exp = (pricePerArticle) =>{
    //     for(const x of pricePerArticle){
    //         console.log(x, 'xxx')
    //     }
    //     }
    //     console.log(exp, 'exppp')

        const help = dataFromStorage.map((elem)=>{
        // console.log(elem, 'elem');
        const findId = dataFromApi.find((el)=>
        el._id === elem.id
        );

        const addTxtContent =(attr, text)=>{
            attr.textContent = text;
        };

        // console.log(elem, 'elem');

        const section = getSelector("#cart__items");
        const finalPrice = getSelector("#totalPrice");
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
        // console.log(pricePerArticle, 'price')
        addTxtContent(h2, findId.name);
        addTxtContent(pColor, elem.color);
        addTxtContent(pPrice, pricePerArticle + "€");
        addTxtContent(pQty, "Qté:");
        addTxtContent(pDelete, "Supprimer");
        addTxtContent(totalPrice, pricePerArticle);
        console.log(test(pricePerArticle), 'sum')
        // for(let x in pricePerArticle){
        // }
        // sum =+ pricePerArticle*pricePerArticle;
        // pricePerArticle.forEach(val=>{
        //     console.log(val ,"val")
        // })
        // let strg = [];
        // strg.push(pricePerArticle);
        // console.log(strg, 'strg');
        // console.log(typeof(findId.price), 'type');

        // exp(pricePerArticle)
        // const test = pricePerArticle.reduce((a, b)=> a+b, 0)
        // console.log(test, 'sum')
        // pricePerArticle.map(elem=>console.log(elem,'elemmm'))
        return pricePerArticle
    });

    // dataFromStorage.map((elem)=>{


    // })

//     let deleteItems = document.querySelectorAll(".deleteItem");
//     for (const item of deleteItems){
//      item.addEventListener('click',(event)=>{
//         // localStorage.removeItem("productLocalStorage");
//         // console.log('click');
//         // const mapped = dataFromStorage.map((elem)=>{ 
//         // const foundIndex = data.find(el=>
//         //     el._id === elem.id
//         //     );
//         console.log('foundindex');
//      }
//         // if (foundIndex > -1){
//         //     console.log('id = id');
//         // } else {
//         //     console.log('else');
//         // }
//     // });
//     // console.log(mapped, 'mapped')
//     // console.log(elem, 'elem');
// )}

};


const removeItemFromCart = (dataFromApi)=>{

    let deleteItems = document.querySelectorAll(".deleteItem");
    for (const [i, item] of deleteItems.entries()){
        item.addEventListener('click', (event)=>{
            console.log('click', i);
            // dataFromStorage.map((elem)=>{
            // dataFromStorage[0].splice(i, 1)
            const remove = dataFromStorage.splice(i, 1);
            console.log(remove, 'remov');
            console.log(dataFromStorage, 'dataFromStorage');

            localStorage.setItem('productLocalStorage', JSON.stringify(dataFromStorage));
            window.location.reload()
        })
        // })
    };


//     let deleteItems = document.querySelectorAll(".deleteItem");
//     dataFromStorage.map((elem)=>{ 
//     for (const item of deleteItems){
//         // item.findIndex((elem)=> console.log(elem, 'find index in item'));
//         // localStorage.removeItem("productLocalStorage");
//         // console.log('click');
//             console.log(elem, 'elem2');
//             item.addEventListener('click',(event)=>{
//             // const foundIndex = dataFromStorage.findIndex(el=>
//             //  el._id === elem.id
//             // );
//             console.log('foundindex')
//             // if (foundIndex > -1){
//             //     console.log('id = id');
//             // } else {
//             //     console.log('else');
//             // }
//         });
//     }
// })
        // console.log(maap, 'foundindex');
    // });
    // console.log(mapped, 'mapped')
    // console.log(elem, 'elem');
//     const deleteItems = document.querySelectorAll(".deleteItem");

}

getApi()



