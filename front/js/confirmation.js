//get id from URL
const getConfirmation = ()=>{
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get('orderid')

    const getOrder = document.querySelector("#orderId");

    getOrder.textContent = page_type
 
};

getConfirmation()