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

const test = async()=>{

    let user = {
        firstName: 'jyggkh',
        lastName: 'jgkjfjg',
        adress: 'kdbjf',
        city:'kdsbk',
        email: 'kjef@htk.com'
      };
      
      let response = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      
      let result = await response.json();
      console.log(result);
      alert(result.message);
}

test()