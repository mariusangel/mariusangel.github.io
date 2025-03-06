document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const backToShopButton = document.getElementById('back-to-shop-btn');

  function displayCartItems() {
    // Golește containerul
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<tr><td colspan="5">Coșul este gol.</td></tr>';
      totalPriceElement.textContent = '0 Ron';
      return;
    }

    // Parcurgem fiecare produs din coș
    cart.forEach((item, index) => {
      const row = document.createElement('tr');
      
      const priceValue = parseFloat(item.price.replace('RON', '').trim());
      const totalValue = (priceValue * item.quantity).toFixed(2);

      row.innerHTML = `
        <td>${item.name}</td>
        <td>Pret: ${item.price}</td>
        <td>
          <div class="quantity-selector">
            <button class="minus-btn" data-index="${index}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="plus-btn" data-index="${index}">+</button>
          </div>
        </td>
        <td>${totalValue} RON</td>
        <td><button class="delete-btn" data-index="${index}">x</button></td>
      `;

      cartItemsContainer.appendChild(row);
    });

    const total = cart.reduce((sum, item) => {
      // Dacă prețul este stocat ca "40RON" sau "40 Ron", eliminăm literele
      const priceValue = parseFloat(item.price.replace('RON', '').trim());
      return sum + (priceValue * item.quantity);
    }, 0);

    totalPriceElement.textContent = `${total.toFixed(2)} Ron`;
  }

  displayCartItems();

  cartItemsContainer.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');

    if (e.target && e.target.classList.contains('delete-btn')) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
    }else if (e.target && e.target.classList.contains('plus-btn')) {
      cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
    }else if (e.target && e.target.classList.contains('minus-btn')) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
      }
    }
  });

  if (backToShopButton) {
    backToShopButton.addEventListener('click', () => {
      window.location.href = 'magazin.html'; // Redirecționează către magazin
    });
  }

  displayCartItems();
});