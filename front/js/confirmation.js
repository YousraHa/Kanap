// // let user = {
// //     // "firstName": "jyggkh",
// //     // "lastName": "jgkjfjg",
// //     adress: "kdbjf",
// //     city:'kdsbk',
// //     email: "kjef@htk.com"
// //   };
// //   console.log(user, 'user');
// let test = {
//     contact: {
//         firstName: "jyggkh",
//         lastName: "jgkjfjg",
//         adress: "kdbjf",
//         city:'kdsbk',
//         email: "kjef@htk.com"
//             },
//             arr : [],
//             orderId : "str"
//     };

//     console.log(typeof test)

// fetch("http://localhost:3000/api/products/order",{
//     method: 'POST',
//     body: JSON.stringify({

//     firstName: "jyggkh",
//     lastName: "jgkjfjg",
//     adress: "kdbjf",
//     city:'kdsbk',
//     email: "kjef@htk.com"
//         }
//     ),
//     headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         "Accept": "application/json"
//     }
// })
// .then(response =>response.json())
// .then((data) => 
//         // alert(user)
//         console.log(data, 'dataaaa')
//     ).catch((error) => 
//     console.error('Error:::::', error)
// )

// const postFetch = async()=>{

//     let user = {
//         "contact": {   
//         "firstName": "jyggkh",
//         "lastName": "gkjfjg",
//         "address": "kdbjf",
//         "city":"kdsbk",
//         "email": "kjef@htk.com"
//     },
//         "products": [],
//         "orderId": "dsfd"
    
//       };
      
//       let response = await fetch('http://localhost:3000/api/products/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(user)
//       });
      
//       let result = await response.json();
//       console.log(result, 'ee');
//       alert(result.message);
// }

// postFetch()



// fetch('http://localhost:3000/api/products/order')
//     .then(response =>response.json())
//     .then((data) => {
        
//     }
//     // console.log(data, 'dataaaa')
//     )   
//     .catch((error) => 
//     console.error('Error:::::', error)
// )

const getConfirmation = ()=>{
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get('orderid')

    console.log(page_type);
    const getOrder = document.querySelector("#orderId");

    getOrder.textContent = page_type
 
};

getConfirmation()