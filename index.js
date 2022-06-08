fetch("https://api.punkapi.com/v2/beers")
  .then((response) => response.json())
  .then((beersArray) => {
    console.log(beersArray);
    beersArray.forEach(addBeer);
   

    setData(beersArray[0]);

    // const button = document.getElementById("buy-ticket");

    // button.addEventListener("click", () => {
    //   const ticksRemaining = document.getElementById("ticket-num").textContent;
    //   const newTicksRemaining = ticksRemaining - 1;
    //   document.getElementById("ticket-num").textContent = newTicksRemaining;

    //   button.disabled = newTicksRemaining === 0;
    // });

    let beerContainer = document.querySelector("ul");
    beerContainer.addEventListener("click", (event) => {
      const id = event.target.id;
      if (id) {
        setData(beersArray[id - 1]);
      }
    });
  });

function addBeer(beerObj) {
  // console.log(beerObj)
  let listItem = document.createElement("li");
  listItem.textContent = beerObj.name
  listItem.id = beerObj.id;
  let beerContainer = document.querySelector("ul");
  beerContainer.append(listItem);
  // console.log(listItem)
}

function fetchPage() {
  console.log(pageNumber)
}

let pageNumber = 1;
let nextButton = document.getElementById("next")
nextButton.addEventListener("click", (event) => {
  pageNumber++;
  // fetchPage();
  console.log(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)

  fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)
    .then((response) => response.json())
    .then((beersArray) => {
      console.log(beersArray);
      let beerContainer = document.querySelector("ul");
      beerContainer.replaceChildren();
      beersArray.forEach(addBeer);
    });
})

let backButton = document.getElementById("back");
backButton.addEventListener("click", (event) => {
  pageNumber--;
  fetchPage();
});



// fetch("https://api.punkapi.com/v2/beers?page=2&per_page=25")
//   .then((response) => response.json())
//   .then((beersArray) => {


function setData(element) {
  console.log(element);
  document.getElementById("image_url").src = element.image_url;
  document.getElementById("name").textContent = element.name;
  // document.getElementById("beer-info").textContent = element.beer - info;
  document.getElementById("description").textContent = element.description;
  document.getElementById("tagline").textContent = element.tagline;
  document.getElementById("firstbrewed").textContent = "First Brewed " + element.first_brewed;
  document.getElementById("abv").textContent = "ABV " + element.abv;
  document.getElementById("foodpairing").textContent = "Food Pairing:  " + element.food_pairing;
  // document.getElementById("ingredients").textContent = "Ingredients:  " + element.ingredients;

}
