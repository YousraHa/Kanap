function onePicture(){
    const id = window.location.search.substring(4);

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => 
          response.json()
        )
        .then((data) => {
            // console.log(data, 'data');
            // let storage = [];
            // const pic = document.createElement("img");
            // const div = document.querySelector(".item__img");
            // const title = document.querySelector("#title");
            // const price = document.querySelector("#price");
            // const description = document.querySelector("#description");

            pic.setAttribute("src", data.imageUrl);
            pic.setAttribute("alt", data.altTxt);
            title.textContent = data.name;
            price.textContent = data.price;
            description.textContent = data.description;

            div.appendChild(pic);

            data.colors.map((color)=>{
                const option = document.createElement("option");
                const optionParent = document.querySelector("#colors");
                option.setAttribute("value", color);
                option.textContent = color;
                optionParent.appendChild(option);

            });

            const optionParent = document.querySelector("#colors");
            const qty = document.querySelector("#quantity");




            optionParent.addEventListener('change', (event)=>{

                event.preventDefault();

                const myData = {
                    id : data._id,
                    color: event.currentTarget.value
                }
                
                let addingId = [...storage, myData];

                console.log(addingId, 'spread array');

                localStorage.setItem("myId", myData.id);
                localStorage.setItem("myColor", myData.color);

                const cartId = localStorage.getItem('myId');
                const cartColor = localStorage.getItem('myColor');

                console.log(cartId, "id");
                console.log(cartColor, 'color');

                console.log(storage, 'storage initial');
            })

            qty.addEventListener('change', (event)=>{
                const quantity = {
                    qty : event.currentTarget.value
                }
                let arr = [...storage, quantity.qty];
                // console.log(arr, 'arr');

                localStorage.setItem("myQty", arr);
                const getQty = localStorage.getItem("myQty");

                console.log(getQty, 'qty in storage');

            })
                // const input = document.querySelector('#quantity');

                const addCart = document.querySelector("#addToCart");

            addCart.addEventListener('click', (event)=>{
                console.log(storage, 'storage last');

                console.log(localStorage.getItem('myId'), "id final");
                console.log(localStorage.getItem('myColor'), "couleur finale");

                console.log(localStorage.getItem("myQty"), 'quantité finale');

                // const getVal = document.querySelector("color").value;
                // console.log(getVal, 'getval')
            })
            // console.log(data)
        }
    ); 
}

onePicture()



        //     data.map(product=>{
        //         // console.log(product, 'length')
        //         // for (let i = 0; i < data.length; i++) {
        //         //     // str = str + i;
        //         //     // console.log(i, 'i')
                    
        //         // }
        //         const pic = document.createElement("img");
        //         const div = document.querySelector(".item__img");
        //         pic.setAttribute("src", product.imageUrl);
            
        //         div.appendChild(pic);
        //     // return product.imageUrl
        // })
        // console.log(data, 'data')