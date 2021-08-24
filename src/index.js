// import './sass/main.scss';
import refs from './js/refs';
const axios = require('axios');

let searchValue = '';
function onSearchCocktail(e) {
  e.preventDefault();
  searchValue = refs.input.value;
  //   console.log(refs.input.value);
  axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(result => {
      renderGallery(result.data.drinks);
      refs.form.reset();
    })
    .catch(error => console.log(error));
}
refs.form.addEventListener('submit', onSearchCocktail);

function markUpItem({ strDrink, strDrinkThumb, strInstructions }) {
  const article = `<li class='gallery-item'><img class='gallery-img' src='${strDrinkThumb}' alt='${strDrink}'/><h1 class ="gallery-title">${strDrink}</h1><p class ="gallery-text">${strInstructions}</p></li>`;
  refs.gallery.insertAdjacentHTML('beforeend', article);
}

function renderGallery(arr) {
  arr.forEach(el => markUpItem(el));
}

// async function onFetchCocktails(searchValue) {
//   try {
//     const responseUrl = await fetch(
//       `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`,
//     );
//     const cocktail = await responseUrl.json();
//     return cocktail;
//   } catch (error) {
//     console.log('Error!');
//   }
// }
