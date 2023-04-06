const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});





fetch("http://localhost:4005/flights")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Loop through each movie in the data and add it to the filmList
    

    // Select the .body element
    const characters = document.querySelector('.bodyy');

    // Loop through each movie in the data and create a new card for it
    data.forEach(function (flight) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="can">
          <img src="${flight.poster}" alt="Product Image" style="width:50%; height:50%">
          <h1><b>${flight.title}</b></h1>
       
          <p>Depature: ${flight.Depature}</p>
          <p>Available Tickets: <span class="available-tickets">${flight.capacity - flight.tickets_sold}</span></p>
          <button class="buy-ticket">Buy</button>
        </div>
      `;
      characters.appendChild(card);


      // Add a click event listener to the "Buy Ticket" button
      const buyButton = card.querySelector('.buy-ticket');
      buyButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the page from reloading
        // Check if there are any available tickets
        const availableTickets = card.querySelector('.available-tickets');
        const numAvailableTickets = parseInt(availableTickets.textContent);
        if (numAvailableTickets > 0) {
          // Update the number of available tickets and display it on the frontend
          availableTickets.textContent = numAvailableTickets - 1;

          // Update the movie data in the backend
          const newTicketsSold = movie.tickets_sold + 1;
          fetch(`http://localhost:4000/films/${flight.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tickets_sold: newTicketsSold })
          })
            .then(function(response) {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            })
            .catch(function(error) {
              console.error('There was a problem updating the movie data:', error);
            });
        } else {
          alert('Sorry, this showing is sold out!');
        }
      });
    });
  })
  .catch(function(error) {
    console.log('There was an error fetching the movie data:', error);
  });





  // Fetch the list of products from the server and display them in the UI
fetch("http://localhost:4005/bookings")
.then(function (response) {
  return response.json();
})
.then(function (data) {
  const characters = document.querySelector('.details');

  data.forEach(function (produc) {
    // Create a new card for each product and add it to the UI
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${product.image}" alt="Product Image" style="width:50%; height:50%">
      <div class="can">
        <h3><b>${product.name}</b></h3>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <div class="card-actions">
          
          <button class="delete-button" style="background-color: #f44336; color: white; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Cancel Flight</button>
        </div>
      </div>h1>BOOK A FLIGHT</h1>
    `;
    characters.appendChild(card);

    // Add event listeners to the buttons
    const editButton = card.querySelector('.edit-button');
    const deleteButton = card.querySelector('.delete-button');
    
    deleteButton.addEventListener('click',() =>{
      card.remove()
      console.log(product.id)
      deleteProduct(product.id)
    });
    
    editButton.addEventListener('click', () => {
      // Handle edit action
      console.log('Edit clicked for product', product.id);
    });
  });
});

function deleteProduct(id){
  fetch(`http://localhost:4005/products/${id}`,{
    method:'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(res => res.json)
  .then(product =>console.log(product))
}


// Get the reference to the form and attach an event listener for form submit
const form = document.querySelector('#productForm');
form.addEventListener('submit', handleSubmit);

// Define the function that will be called when the form is submitted
function handleSubmit(e) {
e.preventDefault();
let productObj = {
  name: e.target.name.value,
  image: e.target.image_url.value,
  description: e.target.description.value,
  price: e.target.price.value // Fixed typo here, should be price
}

console.log(productObj)
addProduct(productObj);
}

// Define the function that will add a new product to the server
function addProduct(productObj) {
fetch('http://localhost:4005/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productObj)
})
.then(res => res.json
())
  .then(product => console.log(product))
  .catch(err => console.error(err)); // Add error handling
}


function validate() {
  const form = document.getElementById("#productForm");
  const name = document.getElementById('name').value;
  const Email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  if (  name == "" || Email ==""|| phone == ""|| from == "" || to == "") { 
    Swal.fire('oop', "all fiields are rquired", 'error');
   } else {

   }


}


