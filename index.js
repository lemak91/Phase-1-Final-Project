fetch("https://api.punkapi.com/v2/beers")
  .then((response) => response.json())
  .then((beersArray) => {
    console.log(beersArray);
    beersArray.forEach(addBeer);

    setData(beersArray[0]);

    let beerContainer = document.querySelector("ul");
    beerContainer.addEventListener("click", (event) => {
      const id = event.target.id;
      if (id) {
        setData(beersArray[id]);
      }
    });
  });

function addBeer(beerObj, i) {
  // console.log(beerObj)
  let listItem = document.createElement("li");
  listItem.textContent = beerObj.name;
  listItem.id = i;
  let beerContainer = document.querySelector("ul");
  beerContainer.append(listItem);
  // console.log(listItem)
}

function fetchPage() {
  fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)
    .then((response) => response.json())
    .then((beersArray) => {
      let beerContainer = document.querySelector("ul");
      beerContainer.replaceChildren();
      beersArray.forEach(addBeer);
      beerContainer.addEventListener("click", (event) => {
        const id = event.target.id;
        if (id) {
          setData(beersArray[id]);
        }
      });
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

// fetch("https://api.punkapi.com/v2/beers?page=2&per_page=25")
//   .then((response) => response.json())
//   .then((beersArray) => {

function setData(element) {
  console.log(element);
  document.getElementById("image_url").src =
    element.image_url || "https://images.punkapi.com/v2/keg.png";
  document.getElementById("name").textContent = element.name;
  // document.getElementById("beer-info").textContent = element.beer - info;
  document.getElementById("description").textContent = element.description;
  document.getElementById("tagline").textContent = element.tagline;
  document.getElementById("firstbrewed").textContent =
    "First Brewed " + element.first_brewed;
  document.getElementById("abv").textContent = "ABV " + element.abv;
  document.getElementById("foodpairing").textContent =
    "Food Pairing:  " + element.food_pairing;
  // document.getElementById("ingredients").textContent = "Ingredients:  " + element.ingredients;
}
