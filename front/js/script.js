//display items in main page
function displayItems(){
    
    fetch('http://localhost:3000/api/products')
        .then((response) => 
          response.json()
        )
        .then((data) => {

            const createElem = (elem) =>{
                return document.createElement(elem)
            }

            const fnc = (data) =>{
                
                //creating dom elements
                data.map(product=>{

                    const h3 = createElem("h3");
                    const p = createElem("p");
                    const href = createElem("a");
                    href.setAttribute("href", `./product.html?id=${product._id}` );

                    const createArticle = createElem("article");
                    const pic = createElem("img");
                    pic.setAttribute("src", product.imageUrl);
                    pic.setAttribute("alt",`Lorem ipsum dolor sit amet,${product.name}`);
                    h3.setAttribute("class", "productName");
                    h3.textContent = product.name;
                    p.setAttribute("class","productDescription");
                    p.textContent = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.";

                    const div = document.querySelector("#items");
                    div.appendChild(href);
                    const article = document.querySelector(`a[href='./product.html?id=${product._id}']`);
                    
                    article.appendChild(createArticle);
                    createArticle.appendChild(pic);
                    createArticle.appendChild(h3);
                    createArticle.appendChild(p);

                })
            }

            fnc(data);

});
}

displayItems()
