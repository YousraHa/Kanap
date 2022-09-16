

function callFetch(){
    const id = window.location.search.substring(4);

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => 
            response.json()
        )
        .then((data) => {
            // console.log(data, 'data1');
            getProduct(data);
            addToCart(data);
        })
        .catch((error)=>{
            console.log(error, 'error')
        })
    }
    

function getProduct(data){
    
    // console.log(data,' data2');

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


    const addCart = document.querySelector("#addToCart");

    addCart.addEventListener('click', (event)=>{

        const getColor = document.querySelector("#colors").value;
        const getValue = document.querySelector("#quantity").value;
        const id = data._id;
        const getLocalStorage = localStorage.getItem('myKanap', []);
        console.log(getLocalStorage, 'kbekbdjd')
        
        const cart = {
            color : getColor,
            value : getValue,
            id : id
        }

        let storage = [];


        const product = getLocalStorage.find((item)=>{

            if (!item){
                console.log(item.id)
                storage.push(cart)
                // localStorage.setItem('myKanap', getValue)

            } else{

                console.log('else')
            }

         });
        console.log(product, 'localffeffe');

        console.log(getLocalStorage, 'local storage');
         
        // localStorage.setItem("cart", "[]");
        // let cart1 = localStorage.getItem("cart");

        // console.log(cart1, 'cart1');

        //  if(cart1.length == 0){
        //     cart1.push(product);
        //     console.log(cart1, 'cart1');
        //  }
        //   else {
        //     let res = cart1.find(element =>element);
        //     console.log(res, 'resss');
        //     // if(res === undefined){
        //     //     cart1.push(product);
        //     // }
        //  }
        //  localStorage.setItem("cart", JSON.stringify(cart1));

    // if(localStorage.getItem('myKanap')){
    //     storage = JSON.parse(localStorage.getItem('myKanap'));
    //     console.log(storage, 'str1')
    // }
    // storage.push(cart);
    // localStorage.setItem('myKanap', JSON.stringify(storage));
    // console.log(storage, 'storage')

        
        // storage.push(cart);

        // if (storage.find(elem=>
        //     // console.log(elem, "elem")
        //     elem.id === id
        // )){
        //     console.log(storage, 'storage1')
        //     elem.value === value
        // } else {
        //     storage.push(cart);

        //     localStorage.setItem("myKanap",JSON.stringify(storage));
        //     const str = localStorage.getItem('myKanap');
        //     console.log(str, 'local storage')

        //     console.log(storage, 'storage2');
        //     console.log('erreur')
        // }
        // const cartId = localStorage.getItem('myKanap');
        // console.log(cartId, 'log');

    })
}

callFetch()
    


