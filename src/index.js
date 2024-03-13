// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Callbacks
const handleClick = (ramen) => {
    const ramenDetail = document.getElementById('ramen-detail');
    // Update the detail information based on the clicked ramen
    ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}">
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
        <p id="rating-display">${ramen.rating}</p>
        <p id="comment-display">${ramen.comment}</p>
    `;
};

const addSubmitListener = (ramenForm) => {
    ramenForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(ramenForm);
        const newRamen = {};
        formData.forEach((value, key) => {
            newRamen[key] = value;
        });
        // Add the new ramen to the DOM
        const ramenMenuDiv = document.getElementById('ramen-menu');
        const newRamenImage = document.createElement('img');
        newRamenImage.src = newRamen.image;
        newRamenImage.alt = newRamen.name;
        // Add event listener to display details on click
        const handleClickEvent = () => handleClick(newRamen);
        newRamenImage.addEventListener('click', handleClickEvent);
        // Append the new image to the DOM before adding the event listener
        ramenMenuDiv.appendChild(newRamenImage);
        // Reset the form
        ramenForm.reset();
    });
};

const displayRamens = async () => {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    try {
        // Fetch all ramens from the server
        const response = await fetch(`${BASE_URL}/ramens`);
        if (!response.ok) {
            throw new Error('Failed to fetch ramens');
        }
        const ramens = await response.json();
        // Display each ramen's image in the #ramen-menu div
        ramens.forEach((ramen) => {
            const ramenImage = document.createElement('img');
            ramenImage.src = ramen.image;
            ramenImage.alt = ramen.name;
            // Add event listener to display details on click
            ramenImage.addEventListener('click', () => handleClick(ramen));
            ramenMenuDiv.appendChild(ramenImage);
        });
    } catch (error) {
        console.error(error);
    }
};

const main = () => {
    // Invoke displayRamens and addSubmitListener after the DOM has fully loaded
    document.addEventListener('DOMContentLoaded', async () => {
        await displayRamens();
        const ramenForm = document.getElementById('new-ramen');
        addSubmitListener(ramenForm);
    });
};

main();
// Import the functions to be tested
import { addSubmitListener, handleClick } from './index';

// Mock document and form element
const documentBody = document.createElement('body');
document.body = documentBody;
const ramenForm = document.createElement('form');
ramenForm.id = 'new-ramen';
documentBody.appendChild(ramenForm);

// Test the addSubmitListener function
describe('addSubmitListener', () => {
    it('should add a submit event listener to the form element', () => {
        // Mock the form submission event
        const submitEvent = new Event('submit', { bubbles: true });
        const spyPreventDefault = jest.spyOn(submitEvent, 'preventDefault');
        
        // Call the addSubmitListener function
        addSubmitListener(ramenForm);

        // Trigger the form submission event
        ramenForm.dispatchEvent(submitEvent);

        // Check if preventDefault was called
        expect(spyPreventDefault).toHaveBeenCalled();
    });
});



// Export functions for testing
export {
    displayRamens,
    addSubmitListener,
    handleClick,
    main,
};
