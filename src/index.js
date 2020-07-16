let addToy = false;

const TOYS_URL = "http://localhost:3000/toys"

function fetchToys(){
  fetch(TOYS_URL)
    .then(response => response.json())
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
    toyImage.className = "toy-avatar"
    cardDiv.appendChild(toyImage)

    const toyLikes = document.createElement("p")
    toyLikes.innerText = `${toy.likes} Likes`
    cardDiv.appendChild(toyLikes)

    const likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    likeButton.addEventListener("click", (event) => {
      increaseLikes(toy, toyLikes);
    })
    cardDiv.appendChild(likeButton)

    toyCollectionDiv.appendChild(cardDiv)

  })
}

function increaseLikes(toy, toyLikes) {
  toy.likes++;
  toyLikes.innerText = `${toy.likes} Likes`;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    }),
  });

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

  const toyForm = document.getElementById("add-toy-form");
  
  toyForm.addEventListener("submit", event => {
    event.preventDefault();

    const toy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };

    fetch(TOYS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy),
    });

    createToyCard(toy);

  })

  fetchToys();

});


