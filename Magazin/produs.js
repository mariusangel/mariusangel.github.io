  fetch('produse.json')
    .then(response => response.json())
    .then(products => {
      const productId = new URLSearchParams(window.location.search).get('id');
      console.log("Product ID from URL:", productId);
      const product = products.find(p => p.id == productId);
      if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `Pret: ${product.price}`;
      } else {
        document.getElementById('product-details').innerHTML = "<p>Produsul nu a fost gasit.</p>";
      }
    })
