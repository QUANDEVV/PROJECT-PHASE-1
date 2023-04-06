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
          <span></span>
          <button class="like-button" style="background-color: transparent; border: none; font-size: 30px">&#10084;&#65039;</button>
      
          <button class="like-button" style="background-color: transparent; border: none; font-size: 30px">&#x1F4AC;&#xFE0F;
          </button>
          
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



  fetch("http://localhost:4005/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const characters = document.querySelector('.details');

    data.forEach(function (product) {
      // Create a new card for each product and add it to the UI
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        
          <h2><b>Name: ${product.name}</b></h3>
          <p>Email: ${product.email}</p>
          <p>Phone: ${product.phone}</p>
          <p>From: ${product.from}</p>
          <p>To: ${product.to}</p>
          <p>Departure Date: ${product.departure}</p>
          <p>Return Date: ${product.return}</p>

          <div class="card-actions" >
            <button class="delete-button" style="background-color: #f44336; color: white; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Cancel Flight</button>
          </div>


          
       
      `;
      characters.appendChild(card);

      // Add event listeners to the buttons
      
      const deleteButton = card.querySelector('.delete-button');
      
      deleteButton.addEventListener('click',() =>{
        card.remove()
        console.log(product.id)
        deleteProduct(product.id)
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
    .then(product => {
      console.log(product);
      alert(' Your Flight was Canceled Succefully 🎊🎉!!');
    })
  }

  

// Get the reference to the form and attach an event listener for form submit
const form = document.querySelector('#productForm');
form.addEventListener('submit', handleSubmit);

// Define the function that will be called when the form is submitted
function handleSubmit(e) {
  e.preventDefault();
  let productObj = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    from: e.target.from.value,
    to: e.target.to.value,
    departure: e.target.departure.value,
    return: e.target.return.value,
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
  .then(res => res.json())
    .then(product => {
      console.log(product);
      alert('Flight booked Succefully 🎊🎉!');
    })
    .catch(err => console.error(err)); // Add error handling
}




// Add a click event listener to the like button
const likeButton = card.querySelector('.like-button');
const likeCounter = card.querySelector('.like-counter');
let likeCount = 0;
likeButton.addEventListener('click', function() {
  likeCount++;
  likeCounter.textContent = likeCount;
});
