// index.js
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById("ramen-detail");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
const newRamenForm = document.getElementById("new-ramen");
const deleteButton = document.getElementById('Delete');
const url = "http://localhost:3000/ramens"
// Callbacks
const handleClick = (ramen) => {
  // Add code  
  ratingDisplay.innerHTML = ramen.rating
  commentDisplay.innerHTML = ramen.comment  
  ramenDetail.innerHTML = ''
  ramenDetail.innerHTML+= `<img class="img"src=${ramen.image} width= "300" height= "300"/>`  
};

const addSubmitListener = () => {
  const nameText = newRamenForm.querySelector("#new-name")
  const restaurantText = newRamenForm.querySelector("#new-restaurant")
  const imageText = newRamenForm.querySelector("#new-image")
  const ratingText = newRamenForm.querySelector("#new-rating")
  const commentText = newRamenForm.querySelector("#new-comment")
  
  newRamenForm.addEventListener("submit", (e)=>{
  e.preventDefault() 
  let newRamen={   
    name: nameText.value,
    restaurant: restaurantText.value,
    image: imageText.value,
    rating: ratingText.value,
    comment: commentText.value
  }
    
  fetch(url,{
   method: "POST",
   headers: {"Content-Type": "application/json"},
   body : JSON.stringify(newRamen)
  })
  .then(res=>res.json())
  .then(data=>data)
  })

}

const displayRamens = () => {
  // Add code
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      let ramenHTML = ''
      data.forEach(ramen => {
        ramenHTML += `<img class="img"src=${ramen.image} width= "200"/>`
      })
      ramenMenu.innerHTML = ramenHTML
        let imgClick = ramenMenu.querySelectorAll(".img");
        imgClick.forEach((img, index)=>{
          img.addEventListener("click", ()=>handleClick(data[index]))
        })
     
    
    })
};

const main = () => {
  displayRamens()
  addSubmitListener()
  delBtn()
  
}
// Practice Functions
const delBtn = ()=>{
  deleteButton.addEventListener("click", ()=>{
    ramenDetail.innerHTML = ''
  })
}
main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

