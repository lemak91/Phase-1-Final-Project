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
let img = document.querySelector("img");

//highlights all the li's blue
beerContainer.addEventListener("mouseenter", (event) => {
  event.target.style.color = "blue";

  setTimeout(() => {
    event.target.style.color = "";
  }, 500);
});

//highlights the li's orange when cursor is over
beerContainer.addEventListener("mouseover", (event) => {
  event.target.style.color = "orange";

  setTimeout(() => {
    event.target.style.color = "";
  }, 500);
});

//next button Event Listener
nextButton.addEventListener("click", () => {
  pageNumber++;
  fetchPage();
  backButton.classList.remove("disabled");
  if (pageNumber === 13) {
    nextButton.classList.add("disabled");
  }
});

//back button event Listener
backButton.addEventListener("click", () => {
  pageNumber--;
  fetchPage();
  nextButton.classList.remove("disabled");
  if (pageNumber === 1) {
    backButton.classList.add("disabled");
  }
});

//tilt & enlarge image when cursor is over
img.addEventListener("mouseenter", () => {
  img.classList.add("entered");
});

//remove tilt & enlarge image when cursor leaves
img.addEventListener("mouseleave", () => {
  img.classList.remove("entered");
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
