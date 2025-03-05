const productItems = document.querySelectorAll('.product-item');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const searchInput = document.querySelector('#searchInput');
const searchSuggestions = document.querySelector('#searchSuggestions');
const searchButton = document.getElementById('searchButton');


function filterProducts(searchText) {
  const suggestions = [];
  searchText = searchText.toLowerCase();

  productItems.forEach(item => {
    const productName = item.getAttribute('data-name');

    if (productName) {
      if (productName.toLowerCase().includes(searchText)) {
        const productLinkElement = item.querySelector('.view-product');
        const productLink = productLinkElement ? productLinkElement.href : '#';

        suggestions.push({
          name: productName,
          link: productLink,
        });
      }
    }
  });

  return suggestions;
}

function performSearch() {
  const searchText = searchInput.value.trim().toLowerCase();

  productItems.forEach(item => {
    const productName = item.getAttribute('data-name').toLowerCase();
    if (productName.includes(searchText)) {
      item.style.display = 'block';
    }else{
      item.style.display = 'none';
    }
  });
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
})

function showSuggestions(suggestions) {
  searchSuggestions.innerHTML = '';

  if (suggestions.length > 0) {
    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = suggestion.name;
      suggestionItem.addEventListener('click', () => {
        window.location.href = suggestion.link;
      });
      searchSuggestions.appendChild(suggestionItem);
    });
    searchSuggestions.style.display = 'block';
  } else {
    searchSuggestions.style.display = 'none';
  }
}

let timeoutId;

searchInput.addEventListener('input', () => {
  console.log('Input event triggered');
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const searchText = searchInput.value.trim();
    if (searchText.length > 0) {
      const suggestions = filterProducts(searchText);
      showSuggestions(suggestions);
    } else {
      searchSuggestions.style.display = 'none';
    }
  }, 300);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-bar')) {
    searchSuggestions.style.display = 'none';
  }
});

productItems.forEach(item => {
  item.addEventListener('click', () => {
    const productLink = item.querySelector('.view-product').href;
    window.location.href = productLink;
  });
});
