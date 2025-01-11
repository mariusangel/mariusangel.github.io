const translations = {
    "en": {
        "home": "Home",
        "what_is_amg": "What is AMG?",
        "car_list": "Car List",
        "buy_amg": "Buy an AMG",
        "contact_us": "Contact us",
        "search_title": "Car List",
        "search_subtitle": "Search for an AMG car:",
        "search_placeholder": "Search for a car model...",
        "car_cls": "CLS 53 AMG",
        "car_gt": "AMG GT-63S 4-DOOR COUPE E"
    },
    "ro": {
        "home": "Acasă",
        "what_is_amg": "Ce este AMG?",
        "car_list": "Lista Mașinilor",
        "buy_amg": "Cumpără un AMG",
        "contact_us": "Contactează-ne",
        "search_title": "Lista Mașinilor",
        "search_subtitle": "Caută o mașină AMG:",
        "search_placeholder": "Caută un model de mașină...",
        "car_cls": "CLS 53 AMG",
        "car_gt": "AMG GT-63S COUPE CU 4 UȘI E"
    },
    "fr": {
        "home": "Accueil",
        "what_is_amg": "Qu'est-ce qu'AMG?",
        "car_list": "Liste des Voitures",
        "buy_amg": "Acheter un AMG",
        "contact_us": "Contactez-nous",
        "search_title": "Liste des Voitures",
        "search_subtitle": "Recherchez une voiture AMG :",
        "search_placeholder": "Rechercher un modèle de voiture...",
        "car_cls": "CLS 53 AMG",
        "car_gt": "AMG GT-63S COUPÉ 4 PORTES E"
    },
    "de": {
        "home": "Startseite",
        "what_is_amg": "Was ist AMG?",
        "car_list": "Fahrzeugliste",
        "buy_amg": "Einen AMG kaufen",
        "contact_us": "Kontaktieren Sie uns",
        "search_title": "Fahrzeugliste",
        "search_subtitle": "Suchen Sie nach einem AMG-Auto:",
        "search_placeholder": "Nach einem Automodell suchen...",
        "car_cls": "CLS 53 AMG",
        "car_gt": "AMG GT-63S 4-TÜRIGES COUPÉ E"
    }
};

function toggleLanguageDropdown() {
    const languageList = document.getElementById('language-list');
    const languageDropdown = document.querySelector('.language-dropdown');
    languageList.classList.toggle('hidden');
    languageDropdown.classList.toggle('open');

}
function translatePage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            if (element.placeholder) {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
}

function changeLanguage(language){
    const languageText = document.getElementById('language-text');
    const languageFlag = document.getElementById('language-flag');
    const languageList = document.getElementById('language-list');

    switch(language){
        case 'en':
            languageText.textContent = 'EN';
            languageFlag.src = '../Icons/uk.png';
            break;
        case 'ro':
            languageText.textContent = 'RO';
            languageFlag.src = '../Icons/ro.png';
            break
        case 'fr':
            languageText.textContent = 'FR';
            languageFlag.src = '../Icons/fr.png';
            break
        case 'de':
            languageText.textContent = 'DE';
            languageFlag.src = '../Icons/de.png';
            break
    }
    
    translatePage(language);
    languageList.classList.add('hidden');
}

function filterCars(){
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const carList = document.getElementById('carList');
    const cars = carList.getElementsByTagName('li');

    for(let i = 0; i < cars.length; i++){
        const carName = cars[i].textContent.toLowerCase();
        if(carName.includes(searchInput)){
            cars[i].classList.remove('hidden');
        }else{
            cars[i].classList.add('hidden');
        }
    }
}

function goToCarPage(page){
    window.location.href = page;
}

//slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");

showDivs(slideIndex);

function plusDivs(n){
    slides[slideIndex].classList.remove("active");//ascunde slide ul curent
    slideIndex = (slideIndex + n + slides.length) % slides.length;//ciclul dintre slide uri
    showDivs(slideIndex);//arata noul slide
}

function showDivs(n){
    for (let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }

    //afiseaza slide ul curent
    slides[n].style.display = "block";
    slides[n].classList.add("active");

}
