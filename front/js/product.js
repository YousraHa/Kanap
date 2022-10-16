//fetch data from api
function callFetch(){
    const id = window.location.search.substring(4);

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            getProduct(data);
            addToCart(data);
        })
        .catch((error)=>{
            console.log(error, 'error')
        })
    }
    
//create dom elements
function getProduct(data){
    
    const createElem = (elem) =>{
        return document.createElement(elem)
    }
    const querySelector = (elem)=>{
        return document.querySelector(elem)
    }


    const img = createElem("img");
    const div = querySelector(".item__img");
    const title = querySelector("#title");
    const price = querySelector("#price");
    const description = querySelector("#description");

    img.setAttribute("src", data.imageUrl);
    img.setAttribute("alt", data.altTxt);
    title.textContent = data.name;
    price.textContent = data.price;
    description.textContent = data.description;
    
    div.appendChild(img);

    data.colors.map((color)=>{
        const option = createElem("option");
        const optionParent = querySelector("#colors");
        option.setAttribute("value", color);
        option.textContent = color;
        optionParent.appendChild(option);

    });


}
//adds items to cart and local storage
function addToCart(data){

    const addCart = document.querySelector("#addToCart");

    addCart.addEventListener('click', (event)=>{

        const getColor = document.querySelector("#colors").value;
        let getValue = parseInt(document.querySelector("#quantity").value, 10);
        const id = data._id;
        
        const cartItems = {
            color : getColor,
            value : getValue,
            id : id
        };

        let products = [];

        if(localStorage.getItem('productLocalStorage')){
            
            products = JSON.parse(localStorage.getItem('productLocalStorage'));
        };

        const foundIndex = products.findIndex(elem=>
            elem.id === id && elem.color === getColor
        )

        if (foundIndex > -1){

            const finalValue = products[foundIndex].value + getValue;
            products[foundIndex].value = finalValue;

        } else {
            products.push(cartItems);
        }
        
        localStorage.setItem('productLocalStorage', JSON.stringify(products));
        window.location = `./index.html`
    })
}




callFetch()
    


