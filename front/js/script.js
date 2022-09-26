let protocole = "http://";
let domaine = "localhost:3000/api/products/"
let url = `${protocole}${domaine}`;


function callAllProducts() {
  fetch(url).then((response) =>
  response.json().then((data) => {
    
    for (const iterator of data) {
      let href = document.createElement("a");
      let section = document.querySelector("#items");
      section.appendChild(href);
      href.setAttribute("href", `./product.html?id=${iterator._id}`);
      let article = document.createElement("article");
      href.appendChild(article);
      let img = document.createElement("img");
      article.appendChild(img);
      img.setAttribute("src", iterator.imageUrl);
      img.setAttribute("alt", iterator.altTxt);
      let titre = document.createElement("h3");
      article.appendChild(titre);
      titre.classList.add("productName");
      titre.innerText = iterator.name;
      let para = document.createElement("p");
      para.classList.add("productDescription");
      article.appendChild(para);
      para.innerText = iterator.description;
  
    }
  })
  .catch(() => {
    alert("L\'api ne réponds pas");
  })
);
}

callAllProducts();