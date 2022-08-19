function callFetch(){
    const id = window.location.search.substring(4);

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            console.log(data, 'data1');
            getProduct(data);
            addToCart(data);
        })
        .catch((error)=>{
            console.log(error, 'error')
        })
    }
    

function getProduct(data){
    
    console.log(data,' data2');

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

function addToCart(data){

    let storage = [];

    const addCart = document.querySelector("#addToCart");

    addCart.addEventListener('click', (event)=>{

        const getColor = document.querySelector("#colors").value;
        console.log(getColor, 'getcol');

        const getValue = document.querySelector("#quantity").value;
        console.log(getValue, 'getval');
        console.log(data, "dat");
        const id = data._id;

        const cart = {
            color : getColor,
            value : getValue,
            id : id
        }
        if (!storage.find(elem=>
            // console.log(elem, "elem")
            elem.id === id 
            // && elem.value ===getValue 
            // && elem.color === getColor
        )){

            storage.push(cart);
            
            console.log(storage, 'storage')
        }
    })
}

callFetch()
    


