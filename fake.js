fetch("http://localhost:4005/bookings")
.then(function (response) {
  return response.json();
})
.then(function (data) {
  const characters = document.querySelector('.details');

  data.forEach(function (details) {
    // Create a new card for each product and add it to the UI
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    
      
          
          <button class="delete-button" style="background-color: #f44336; color: white; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Cancel Flight</button>
        </div>
      </div>h1>BOOK A FLIGHT</h1>
    `;
    characters.appendChild(card);

    // Add event listeners to the buttons
    
    const deleteButton = card.querySelector('.delete-button');
    
    deleteButton.addEventListener('click',() =>{
      card.remove()
      console.log(details.id)
      deleteProduct(details.id)
    });
    
   
  });
});

function deleteProduct(id){
  fetch(`http://localhost:4005/bookings/${id}`,{
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
  phone: e.target.phone.value,
  from: e.target.from.value ,
  to: e.target.to.value ,
  departure : e.target.departure.value,
  return : e.target.return.value


}

console.log(productObj)
addProduct(productObj);
}

// Define the function that will add a new product to the server
function addProduct(productObj) {
  fetch('http://localhost:3000/bookings', {
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
{/* <form  method="POST" id="productForm">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" required>
          
          <label for="phone">Phone:</label>
          <input type="text" id="phone" name="phone" required>
          
          <label for="from">From:</label>
          <select id="from" name="from" required>
            <option value="">Select an option</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
          </select>
          
          <label for="to">To:</label>
          <select id="to" name="to" required>
            <option value="">Select an option</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Sydney">Sydney</option>
          </select>
          
          <label for="departure-date">Departure Date:</label>
          <input type="date" id="departure-date" name="departure-date" required>
          
          <label for="return-date">Return Date:</label>
          <input type="date" id="return-date" name="return-date" required>
          
          <input onclick="validate()" type="submit" value="Book Flight">
          <button type="submit">Submit</button>
        </form> */}