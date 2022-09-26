let protocole = "http://";
let domaine = "localhost:3000/api/products/"
let adresse = new URLSearchParams(window.location.search);
let idKanap = adresse.get("id");
let url = `${protocole}${domaine}${idKanap}`;

let titre = document.querySelector("#title");
let price = document.querySelector("#price");
let content = document.querySelector("#description");
let containerImg = document.querySelector(".item__img");
let color = document.querySelector("#colors");
let myImg = document.createElement("img");
let im = "";

function callOneProduct() {
  fetch(url).then((response) =>
  response.json().then((product) => {
    titre.innerText = `${product.name}`;

    price.innerText = `${product.price}`;

    content.innerText = `${product.description}`;

    containerImg.appendChild(myImg);
    myImg.setAttribute("src", product.imageUrl);
    im = product.imageUrl;
    myImg.setAttribute("alt", product.altTxt);

    product.colors.forEach((element) => {
      let option = document.createElement("option");
      color.appendChild(option);
      option.setAttribute("value", element);
      option.innerText = element;
    });
  })
);
}
callOneProduct();


// Sélection du bouton 'Ajouter au panier'
let btn = document.querySelector("#addToCart");
// evenement d'écoute au bouton ajout panier
btn.addEventListener("click", () => {
  let choixQty = document.querySelector("#quantity").value; // Selection du choix de la quantité
  let choixColor = document.querySelector("#colors").value; // choix de la couleur

  if ((choixQty <= 0 || choixQty > 100) && choixColor == "") {
    alert("Choisissez une couleur !");
    alert("Choisissez une quantité comprise entre 1 et 100.");
  } else if (choixQty <= 0 || choixQty > 100) {
    // Si quantité non conforme
    alert("Choisissez une quantité comprise entre 1 et 100.");
  } else if (choixColor == "") {
    // Si choix couleur non sélectionné
    alert("Choisissez une couleur !");
  } else {
    let monProduit = {
      // récupération des données à stocker dans le panier
      id: idKanap,
      name: titre.innerText,
      color: choixColor,
      quantite: Number(choixQty),
      Image: im,
    };

    let panierStorage = JSON.parse(localStorage.getItem("monPanier")); // récupère panier si présent dans le localStorage

    if (panierStorage) {
      //controle si article dans panier pour ajouter quantité
      const getProductStorage = panierStorage.find(
        (p) => p.id == monProduit.id && p.color == monProduit.color
      );
      // si produit déja présent dans le panier
      if (getProductStorage) {
        getProductStorage.quantite += monProduit.quantite;
        localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise
        alert("panier mis à jour !");
       return; // Sors de  l'instruction pour éviter de push en doublons
      }
      panierStorage.push(monProduit);
    } else {
      panierStorage = [];
      panierStorage.push(monProduit);
    }
    localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise
    alert("panier mis à jour !");
  }
});
