let beerContainer = document.querySelector("ul");
let beers;

//initial fetch
fetch("https://api.punkapi.com/v2/beers")
  .then((response) => response.json())
  .then((beersArray) => {
    beersArray.forEach(createAndAppendBeerLi);
    setImageAndDescription(beersArray[0]);
    beers = beersArray;
  });

//list click event
beerContainer.addEventListener("click", (event) => {
  const index = event.target.id;
  setImageAndDescription(beers[index]);
});

//creating beer list
function createAndAppendBeerLi(beerObj, index) {
  let listItem = document.createElement("li");
  listItem.textContent = beerObj.name;
  listItem.id = index;
  beerContainer.append(listItem);
}

//fetch page with page number
function fetchPage() {
  fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)
    .then((response) => response.json())
    .then((beersArray) => {
      beerContainer.replaceChildren();
      beersArray.forEach(createAndAppendBeerLi);
      beers = beersArray;
    });
}

let pageNumber = 1;
let nextButton = document.getElementById("next");
let backButton = document.getElementById("back");

//next button Event Listener
nextButton.addEventListener("click", (event) => {
  pageNumber++;
  fetchPage();
  backButton.classList.remove("disabled");
  if (pageNumber === 13) {
    nextButton.classList.add("disabled");
  }
});

let test = document.getElementById("beers");

test.addEventListener(
  "mouseenter",
  function (event) {
    event.target.style.color = "blue";

    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);

test.addEventListener(
  "mouseover",
  function (event) {
    event.target.style.color = "orange";

    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);

//back button event Listener
backButton.addEventListener("click", (event) => {
  pageNumber--;
  fetchPage();
  nextButton.classList.remove("disabled");
  if (pageNumber === 1) {
    backButton.classList.add("disabled");
  }
});

//image and description elements
function setImageAndDescription(element) {
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
