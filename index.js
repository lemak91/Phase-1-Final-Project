fetch("https://api.punkapi.com/v2/beers")
  .then((response) => response.json())
  .then((beersArray) => {
    console.log(beersArray);
    beersArray.forEach(addBeer);
  });

function addBeer(beerObj) {
  // console.log(filmObj)
  let listItem = document.createElement("li");
  listItem.textContent = beerObj.name;
  listItem.id = beerObj.id;
  let beersContainer = document.querySelector("ul");
  beersContainer.append(listItem);
  // console.log(listItem)
}
