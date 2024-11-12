document.getElementById('excelFileInput').addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    displayCatalog(rows);
  };

  reader.readAsArrayBuffer(file);
}

function displayCatalog(data) {
  const catalogContainer = document.getElementById('catalog');
  catalogContainer.innerHTML = '';

  data.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('catalog-item');
    
    itemElement.innerHTML = `
      <img src="${item['Image URL']}" alt="${item.Name}" class="product-image" />
      <p class="style-price">
        <strong>Style # </strong> ${item['Style Number']}
        <span class="price"><strong>Price $${item.Price}</span>
      </p>
      <p>${item.Description}</p>
    `;

    catalogContainer.appendChild(itemElement);
  });
}
