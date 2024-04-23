const displayRamens = async () => {
  try {
      const response = await fetch('http://localhost:3000/ramens');
      const ramenData = await response.json();

      const ramenMenuDiv = document.getElementById('ramen-menu');
      ramenMenuDiv.innerHTML = '';

      ramenData.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.addEventListener('click', () => handleClick(ramen));
          ramenMenuDiv.appendChild(img);
      });
  } catch (error) {
      console.error('Error fetching and displaying ramens:', error);
  }
};

const handleClick = (ramen) => {
  const detailImg = document.querySelector("#ramen-detail .detail-image");
  const detailName = document.querySelector("#ramen-detail .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const image = document.getElementById('new-image').value;
      const rating = parseInt(document.getElementById('new-rating').value);
      const comment = document.getElementById('new-comment').value;

      const newRamen = { name, restaurant, image, rating, comment };

      try {
          await fetch('http://localhost:3000/ramens', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newRamen),
          });

          displayRamens();
      } catch (error) {
          console.error('Error adding new ramen:', error);
      }
  });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener('DOMContentLoaded', main);
