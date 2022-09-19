let panierStorage = JSON.parse(localStorage.getItem("monPanier"));
let monprix = [] ; // Création d'un tableau  => stocker les prix des canapés via l'api


// récupère les infos à afficher dans le panier depuis LS
for (const iterator of panierStorage) {
  let section = document.querySelector("#cart__items");
  let article = document.createElement("article");

  section.appendChild(article);
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", iterator.id); // data.id du canapé
  let iter = iterator.id; // Stockage ID dans une variable

  article.setAttribute("data-color", iterator.color); // data.couleur du canapé
  let div = document.createElement("div");
  article.appendChild(div);
  div.setAttribute("class", "cart__item__img");

  let img = document.createElement("img");
  div.appendChild(img);
  img.setAttribute("src", "");
  img.src = iterator.Image; // image du canapé
  img.setAttribute("alt", "Photographie d'un canapé");

  let div2 = document.createElement("div");
  article.appendChild(div2);
  div2.setAttribute("class", "cart__item__content");
  let div3 = document.createElement("div");
  div3.setAttribute("class", "cart__item__content__description");
  div2.appendChild(div3);
  let titre = document.createElement("h2");
  div3.appendChild(titre);
  titre.innerText = iterator.name; // nom du canapé

  let para = document.createElement("p");
  // let para2 = document.createElement("p");
  let para3 = document.createElement("p");
  let para4 = document.createElement("p");
  div3.appendChild(para);
  para.innerText = iterator.color; // couleur du canapé

  let div4 = document.createElement("div");
  let div5 = document.createElement("div");
  let div6 = document.createElement("div");

  article.appendChild(div4);
  div4.setAttribute("class", "cart__item__content__settings");
  div4.appendChild(div5);
  div5.setAttribute("class", "cart__item__content__settings__quantity");
  div5.appendChild(para3);
  para3.innerText = "Qté :";

  let input = document.createElement("input");
  div5.appendChild(input);
  input.setAttribute("type", "number");
  input.setAttribute("class", "itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "0");
  input.setAttribute("max", "100");
  input.setAttribute("value", iterator.quantite);
  let iterQ = iterator.quantite; // Stockage quantité dans une variable

  div4.appendChild(div6);
  div6.setAttribute("class", "cart__item__content__settings__delete");
  div6.appendChild(para4);
  para4.setAttribute("class", "deleteItem");
  para4.innerText = "Supprimer";

  //Appel de l'API => prix

  let url = `http://localhost:3000/api/products/${iter}`;

  div3.setAttribute("class", "cart__item__content__description");
  let para2 = document.createElement("p");
  div3.appendChild(para2);

  fetch(url).then((response) =>
    response
      .json()
      .then((product) => {
        para2.innerText = product.price * iterQ;
        monprix.push(product.price * iterQ);
         total = monprix.reduce((a, b) => a + b, 0, monprix); // tableau prix total pour tous les canapés
         const prixTotal = document.getElementById("totalPrice");
        prixTotal.textContent = total;
      })
      .catch((err) => console.log("mess : " + err))
  );
  
}


  

 




// Calcul quantité total du panier
function totalArticle() {
  let calculQ = [];
  for (q = 0; q < panierStorage.length; q++) {
    const qte = panierStorage[q].quantite;
    calculQ.push(qte);
    totalQ = calculQ.reduce((a, b) => a + b, 0);
  }

  const prixTotalQ = document.getElementById("totalQuantity");
  prixTotalQ.textContent = totalQ;
}
totalArticle();

// modifier quantité panier
let modifQty = document.querySelectorAll(".itemQuantity"); // Selection de l'input modif qty

function modifQtyEle() {
  for (let k = 0; k < modifQty.length; k++) {
    modifQty[k].addEventListener("change", (event) => {
      // pour chaque input...
      event.preventDefault();

      let id = modifQty[k].closest("article").dataset.id; // id de chaque canapé selon input
      let color = modifQty[k].closest("article").dataset.color; // color de chaque canapé selon input

      if (modifQty[k].value >= 1) {
        let kanapFind = panierStorage.find((item) => {
          return item.id == id && item.color == color;
        });
        kanapFind.quantite = parseInt(event.target.value);
        localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise

        window.location.reload();
      } else {
        //Sinon si qty à 0 =>suppr canapé
        panierStorage = panierStorage.filter(
          (elt) => elt.id !== id || elt.color !== color
        );

        localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise

        window.location.reload();
      }
    });
  }
}

modifQtyEle();

//  supprimer élément du panier
let supprimer = document.querySelectorAll(".deleteItem");

function supprEle() {
  for (let s = 0; s < supprimer.length; s++) {
    supprimer[s].addEventListener("click", (event) => {
      event.preventDefault();

      let supprId = supprimer[s].closest("article").dataset.id; // id de chaque canapé selon input
      let supprColor = supprimer[s].closest("article").dataset.color; // color de chaque canapé selon input

      // Nouveau panier avec ID et color
      panierStorage = panierStorage.filter(
        (elt) => elt.id !== supprId || elt.color !== supprColor
      );

      localStorage.setItem("monPanier", JSON.stringify(panierStorage)); // Sauvegarde et sérialise

      window.location.reload();
    });
  }
}
supprEle();

//////////////////////////// Valider les données du formulaire ///////////////////////

//Séléection du form
let form = document.querySelector(".cart__order__form");

// Séléction des inputs
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let adress = document.getElementById("adress");
let city = document.getElementById("city");
let email = document.getElementById("email");

// Evénement d'écoute pour chaque input

form.firstName.addEventListener("change", function () {
  validFirstName(this);
});
form.lastName.addEventListener("change", function () {
  validLastName(this);
});
form.address.addEventListener("change", function () {
  validAddress(this);
});
form.city.addEventListener("change", function () {
  validCity(this);
});
form.email.addEventListener("change", function () {
  validEmail(this);
});

//Fonctions de validation

//Validation firstName
const validFirstName = function (element) {
  let filtre = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/g;

  // true or false
  let testFirstName = filtre.test(element.value);
  console.log(testFirstName); // true or false

  // Récup balise message erreur
  let errorFirstName = document.querySelector("#firstNameErrorMsg");

  // Test regex
  if (testFirstName == true) {
    errorFirstName.innerText = "Prénom valide";
    errorFirstName.style.color = "green";
  } else {
    errorFirstName.innerText = "Prénom invalide";
    errorFirstName.style.color = "red";
  }
};
// Validation lastName
const validLastName = function (element) {
  let filtre = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/g;

  // Récup balise message erreur
  let errorLastName = document.querySelector("#lastNameErrorMsg");
  // true or false
  let testLastName = filtre.test(element.value);
  console.log(testLastName); // true or false

  // Test regex
  if (testLastName) {
    errorLastName.innerText = "Nom valide";
    errorLastName.style.color = "green";
  } else {
    errorLastName.innerText = "Nom invalide";
    errorLastName.style.color = "red";
  }
};
// Validation address
const validAddress = function (element) {
  let filtreAddress = /^[\w ÖØ-öø-ÿ-]+$/g;

  // Récup balise message erreur
  let errorAddress = document.querySelector("#addressErrorMsg");

  let testAddress = filtreAddress.test(element.value);
  console.log(testAddress); // true or false

  // Test regex
  if (testAddress) {
    errorAddress.innerText = "Adresse saisie valide";
    errorAddress.style.color = "green";
  } else {
    errorAddress.innerText = "Adresse saisie invalide";
    errorAddress.style.color = "red";
  }
};
// Validation city
const validCity = function (element) {
  let filtreCity = /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/g;

  // Récup balise message erreur
  let errorCity = document.querySelector("#cityErrorMsg");

  let testCity = filtreCity.test(element.value);
  console.log(testCity); // true or false

  // Test regex
  if (testCity) {
    errorCity.innerText = "Ville saisie valide";
    errorCity.style.color = "green";
  } else {
    errorCity.innerText = "Ville saisie invalide";
    errorCity.style.color = "red";
  }
};
// Validation email
const validEmail = function (element) {
  let filtreEmail = /^[\w.-]+[@]{1}[\w.-]+[.]{1}[a-z]{2,63}$/g;

  // Récup balise message erreur
  let errorEmail = document.querySelector("#emailErrorMsg");

  let testEmail = filtreEmail.test(element.value);
  console.log(testEmail); // true or false

  // Test regex
  if (testEmail) {
    errorEmail.innerText = "Mail saisie valide";
    errorEmail.style.color = "green";
  } else {
    errorEmail.innerText = "Mail saisie invalide";
    errorEmail.style.color = "red";
  }
};

////////// Envoi formulaire ////////////////

const order = document.querySelector("#order"); //variable du bouton commander

order.addEventListener("click", (e) => {
  e.preventDefault();

  //Création objet fiche client
  let contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };
  //Tableau avec ID
  let products = panierStorage.map((product) => product.id);

  console.log(contact, products);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },

    body: JSON.stringify({ contact, products }),
  }).then((response) =>
    response.json().then((data) => {
      location.href = `confirmation.html?id=${data.orderId}`;
      console.log(data.orderId);
    })
  );
});
