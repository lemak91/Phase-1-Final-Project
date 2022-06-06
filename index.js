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

button.addEventListener("click", () => {
  const ticksRemaining = document.getElementById("ticket-num").textContent;
  const newTicksRemaining = ticksRemaining - 1;
  document.getElementById("ticket-num").textContent = newTicksRemaining;

  button.disabled = newTicksRemaining === 0;
});

   let beerContainer = document.querySelector("ul");
    beerContainer.addEventListener("click", (event) => {
      const id = event.target.id;

      if (id) {
        setData(beerArray[id - 1]);
        button.disabled = false;
      }
    });

// function addBeer(beerObj) {
//   // console.log(beerObj)
//   let listItem = document.createElement("li");
//   listItem.textContent = beerObj.title;
//   listItem.id = beerObj.id;
//   let beerContainer = document.querySelector("ul");
//   beerContainer.append(listItem);
//   // console.log(listItem)
// }

function setData(element) {
  console.log(element);
  document.getElementById("image_url").src = element.image_url;
  document.getElementById("name").textContent = element.name;
  document.getElementById("beer-info").textContent = element.beer-info;
  document.getElementById("description").textContent = element.description;
}





