let addToy = false;

const TOYS_URL = "http://localhost:3000/toys"

function fetchToys(){
  fetch(TOYS_URL)
    .then(function(response) {
      return response.json()
    })
    .then(jsonToys => createToyCard(jsonToys))
}

function createToyCard(jsonToys){
  const toyCollectionDiv = document.getElementById("toy-collection");
  jsonToys.forEach(toy => {
    const cardDiv = document.createElement("div")
    cardDiv.className = "card"
    const toyName = document.createElement("h2")
    toyName.innerText = toy.name
    cardDiv.appendChild(toyName)
    const toyImage = document.createElement("img")
    toyImage.src = toy.image
    cardDiv.appendChild(toyImage)
    const toyLikes = document.createElement("p")
    toyLikes.innerText = `${toy.likes} Likes`
    cardDiv.appendChild(toyLikes)
    const likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    cardDiv.appendChild(likeButton)

    toyCollectionDiv.appendChild(cardDiv)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
});


