document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');

  function displayCartItems() {
    // Golește containerul
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Coșul este gol.</p>';
      totalPriceElement.textContent = '0 Ron';
      return;
    }

    // Parcurgem fiecare produs din coș
    cart.forEach((item, index) => {
      // Creăm un element pentru produs
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';

      // Se afișează numele, cantitatea, prețul și totalul pentru produs
      // Adăugăm și butonul de ștergere, asociat indexului curent
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Cantitate: ${item.quantity}</p>
        <p>Pret: ${item.price}</p>
        <p>Total: ${(parseFloat(item.price.replace('RON', '').trim()) * item.quantity).toFixed(2)} RON</p>
        <button class="delete-btn" data-index="${index}">Șterge</button>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    // Calculăm totalul coșului (folosim parseFloat pentru a extrage numărul din stringul preț)
    const total = cart.reduce((sum, item) => {
      // Dacă prețul este stocat ca "40RON" sau "40 Ron", eliminăm literele
      const priceValue = parseFloat(item.price.replace('RON', '').trim());
      return sum + (priceValue * item.quantity);
    }, 0);

    totalPriceElement.textContent = `${total.toFixed(2)} Ron`;
  }

  // Afișăm inițial produsele din coș
  displayCartItems();

  // Event delegation pentru butoanele de ștergere
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      // Eliminăm produsul din array-ul cart
      cart.splice(index, 1);
      // Actualizăm localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      // Reafișăm lista de produse din coș
      displayCartItems();
    }
  });
});