let address = new URLSearchParams(window.location.search);
let orderId = address.get("id");
console.log(orderId);



let order = document.getElementById('orderId');
          order.innerText = orderId;
          localStorage.removeItem(orderId);