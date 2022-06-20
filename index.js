let beerContainer = document.querySelector("ul");
let beers;

fetch("https://api.punkapi.com/v2/beers")
  .then((response) => response.json())
  .then((beersArray) => {
    beersArray.forEach(addBeer);
    setData(beersArray[0]);
    beers = beersArray;
  });



beerContainer.addEventListener("click", (event) => {
  const id = event.target.id;
    setData(beers[id]);
});

function addBeer(beerObj, i) {
  let listItem = document.createElement("li");
  listItem.textContent = beerObj.name;
  listItem.id = i
  beerContainer.append(listItem); 
}

function fetchPage() {
  fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)
    .then((response) => response.json())
    .then((beersArray) => {
      beerContainer.replaceChildren();
      beersArray.forEach(addBeer);
      beers = beersArray
    });
}

let pageNumber = 1;
let nextButton = document.getElementById("next");
let backButton = document.getElementById("back");

nextButton.addEventListener("click", (event) => {
  pageNumber++;
  fetchPage();
  backButton.classList.remove("disabled");
  if (pageNumber === 13) {
    nextButton.classList.add("disabled");
  }
});

backButton.addEventListener("click", (event) => {
  pageNumber--;
  fetchPage();
  nextButton.classList.remove("disabled");
  if (pageNumber === 1) {
    backButton.classList.add("disabled");
  }
});

function setData(element) {
  document.getElementById("image_url").src =
    element.image_url || "https://images.punkapi.com/v2/keg.png";
  document.getElementById("name").textContent = element.name;
  document.getElementById("description").textContent = element.description;
  document.getElementById("tagline").textContent = element.tagline;
  document.getElementById("firstbrewed").textContent =
    "First Brewed " + element.first_brewed;
  document.getElementById("abv").textContent = "ABV " + element.abv;
  document.getElementById("foodpairing").textContent =
    "Food Pairing:  " + element.food_pairing;
}
