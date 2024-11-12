// When the page loads, call the fetchProducts function
document.addEventListener('DOMContentLoaded', fetchProducts);

function fetchProducts() {
  // Fetch the JSON file
  fetch('products.json')
    .then(response => response.json())  // Parse the JSON data
    .then(products => {
      displayCatalog(products);  // Call function to display products
    })
    .catch(error => {
      console.error('Error loading the JSON file:', error);
    });
}

function displayCatalog(products) {
  const catalogContainer = document.getElementById('catalog');
  catalogContainer.innerHTML = '';  // Clear any existing content

  // Iterate over each product and create HTML for it
  products.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('catalog-item');
    
    itemElement.innerHTML = `
      <img src="${item['Image URL']}" alt="${item.Name}" class="product-image" />
      <p class="style-price">
        <strong>Style # </strong> ${item['Style Number']}<br><br>
        <span class="price"><strong>Price $${item.Price}</strong></span>
      </p>
      <p>${item.Description}</p>
    `;

    catalogContainer.appendChild(itemElement);  // Add the item to the catalog container
  });
}
