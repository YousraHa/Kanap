function onePicture(){
    
    fetch('http://localhost:3000/api/products')
        .then((response) => 
          response.json()
        )
        .then((data) => {

            // const createElements = ()=>{

                const createElem = (elem) =>{
                    // return document.createElement(elem)
                    return document.createElement(elem)
                }
            // }
                
                // const createTag = (tag) =>{
            //     return `const ${tag} =`
            // }

            // console.log(createElem("href", "a"), 'createelem')

            const fnc = (data) =>{

                // console.log(data, 'function');

                data.map(product=>{

                // console.log(product, 'products');
                // createElem("href", "a");
                // const h3 = createElem("h3");
                // const p = createElem("p");
                // const href = createElem("a");
                const h3 = createElem("h3");
                const p = createElem("p");
                const href = createElem("a");

                // createElements()
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

                    // let href = document.querySelector("a");
                    
                    // href.setAttribute("href", `./product.html?id=${product._id}` );
                    // const div = document.querySelector("#items");
                    // div.appendChild(href);
                    
                    // const article = document.querySelector(`a[href='./product.html?id=${product._id}']`);
                    // // const article = document.getElementsByTagName("a");
                    // const createArticle = document.createElement("article");

                    // article.append(createArticle);

                    // const img = document.querySelector("article");
                    // const pic = document.createElement("img");

                    // img.append(pic)
                    // pic.setAttribute("src", product.imageUrl)
                    // pic.setAttribute("src", product.imageUrl );

                // return product.imageUrl
            })
            }

            fnc(data);

});
}

onePicture()




// const div = document.querySelector("#items");
// const href = document.createElement("a");

// div.appendChild(href);
// href.setAttribute("href", `./product.html?id=${product._id}` );

// const article = document.querySelector(`a[href='./product.html?id=${product._id}']`);
// // const article = document.getElementsByTagName("a");
// const createArticle = document.createElement("article");

// article.appendChild(createArticle);

// const img = document.querySelectorAll("article");
// const pic = document.createElement("img");