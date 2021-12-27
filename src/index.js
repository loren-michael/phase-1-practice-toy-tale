let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  toggleForm();
  getToys();
  newToyForm();
});


const getToys = () => {
  fetch('http://localhost:3000/toys')  //A FETCH RETURNS A PROMISE
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => renderAToy(toy)))
}



const renderAToy = (toy) => {
  // create a div with class "card"
  const toyCard = document.createElement('div');
  toyCard.className = "card";
  // create an h2 for the toy name and append to card
  const toyName = document.createElement('h2');
  toyName.innerText = toy.name;
  toyCard.appendChild(toyName);
  // create an img for the toy and append to card
  const toyImage = document.createElement('img');
  toyImage.src = toy.image;
  toyImage.className = "toy-avatar";
  toyCard.appendChild(toyImage)
  // create text for number of likes and append to card
  const toyLikes = document.createElement('p');
  let numberOfLikes = 0;
  toyLikes.innerText = `${numberOfLikes} Likes`;
  toyCard.appendChild(toyLikes);
  // create a like button and append to card
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.innerText = " Like ";
  likeButton.addEventListener('click', (e) => {
    const currentLikesText = e.target.previousSibling.innerText
    const actualLikes = currentLikesText.split(" ")[0]
    e.target.previousSibling.innerText = `${parseInt(actualLikes) + 1} Likes`
  })
  toyCard.appendChild(likeButton);
  const toyCollection = document.getElementById("toy-collection")
  // console.log(toyCollection);
  toyCollection.append(toyCard);
};


const newToyForm = () => {
  // get the form
  const toyForm = document.querySelector(".add-toy-form")

  // add event listner to the form
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyName = e.target.name.value
    const newToyImage = e.target.image.value
    // console.log(newToyName, newToyImage)
    const newToyObject = {
      name: newToyName,
      image: newToyImage,
      likes: 0
    };
    renderAToy(newToyObject);
  })
}




const toggleForm = () => {
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
};

