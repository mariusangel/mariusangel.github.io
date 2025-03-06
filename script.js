document.addEventListener("DOMContentLoaded", () => {
  fetch("../header.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);
      const wrapper = document.querySelector('.wrapper'),
            loginLink = document.querySelector('.login-link'),
            registerLink = document.querySelector('.register-link'),
            btnPopup = document.querySelector('.profile-button'),
            iconClose = document.querySelector('.icon-close'),
            cartIcon = document.querySelector('.cart-icon'),
            cartDropdown = document.querySelector('.cart-dropdown');

      registerLink.addEventListener('click', event => {
        event.preventDefault();
        wrapper.classList.add('active');
      });
      
      loginLink.addEventListener('click', event => {
        event.preventDefault();
        wrapper.classList.remove('active');
      });
      
      btnPopup.addEventListener('click', event => {
        event.preventDefault();
        wrapper.classList.add('active-popup');
      });
      
      iconClose.addEventListener('click', () => wrapper.classList.remove('active-popup'));

      // Coș cumpărături
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const updateCartDisplay = () => {
        // Actualizează numărul total de produse (badge)
        document.querySelector('.cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      
        // Containerul din dropdown unde se afișează produsele
        const cartItemsContainer = document.querySelector('.cart-items-container');
      
        // Variabilă pentru sub-total
        let total = 0;
      
        // Construim HTML-ul pentru fiecare produs din coș
        const itemsHtml = cart.map(item => {
          // Dacă produsul are imagine, o folosim, altfel fallback
          const imageUrl = item.image;
      
          // Extragem numărul din preț (eliminăm "ron", "RON", "lei", etc.)
          // și îl convertim în float pentru calcule
          let numericPrice = parseFloat(
            item.price
              .toLowerCase()
              .replace('ron', '')
              .replace('lei', '')
              .trim()
          );
          if (isNaN(numericPrice)) {
            numericPrice = 0; // dacă nu se poate parsa, setăm 0
          }
      
          // Calculează sub-totalul pentru produsul curent
          const itemSubtotal = numericPrice * item.quantity;
          // Adunăm la totalul general
          total += itemSubtotal;
      
          // Returnăm blocul HTML pentru produs
          return `
            <a href="produs.html?id=${item.id}" class="cart-item-link">
              <div class="cart-item">
                <img src="${imageUrl}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                  <p class="cart-item-name">${item.name}</p>
                  <p class="cart-item-quantity">${item.quantity} x ${item.price}</p>
                </div>
              </div>
            </a>
          `;
        }).join('');
      
        // Inserăm toate produsele în container
        cartItemsContainer.innerHTML = itemsHtml;
      
        // Afișăm sub-totalul (într-un element cu clasa .cart-subtotal-price)
        const subtotalElement = document.querySelector('.cart-subtotal-price');
        if (subtotalElement) {
          subtotalElement.textContent = `${total.toFixed(2)} RON`;
        }
      
        // Salvăm coșul în localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
      };
      

      cartIcon.addEventListener('mouseenter', () => {
        cartDropdown.classList.add('active');
        updateCartDisplay();
      });

      cartIcon.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!cartDropdown.matches(':hover')) {
            cartDropdown.classList.remove('active');
          }
        }, 100);
      });

      document.querySelector('.cart-icon').addEventListener('hover', e => {
        e.stopPropagation();
        const dropdown = document.querySelector('.cart-dropdown');
        dropdown.classList.toggle('active');
        updateCartDisplay();
      });

      document.querySelector('.view-cart-btn').addEventListener('click', () => {
        window.location.href = '/Magazin/cos.html';
      });

      // document.addEventListener('click', () => {
      //   document.querySelector('.cart-dropdown').classList.remove('active');
      // });

      const addToCartButtons = document.querySelectorAll('.add-to-cart');

      addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
          event.stopPropagation();
      
          // Găsești elementul .product-item părinte
          const productItem = event.target.closest('.product-item');
      
          // Extragi datele necesare:
          const productId = productItem.querySelector('.view-product').href.split('id=')[1];
          const productName = productItem.dataset.name;
          const productPrice = productItem.dataset.price + ' RON';
          
          // Aici extragi și sursa imaginii
          const productImg = productItem.querySelector('img').src;
          console.log("Imagine extrasă:", productImg);
      
          // Creezi obiectul de produs pe care îl adaugi în coș
          const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImg,
            quantity: 1
          };
      
          // Verifici dacă produsul există deja în coș
          const existingItem = cart.find(item => item.id === productId);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            cart.push(product);
          }
      
          // Actualizezi afișarea coșului
          updateCartDisplay();
        });
      }); 

      updateCartDisplay();
    });
});
