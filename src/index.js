// import './sass/main.scss';
import refs from './js/refs';
const axios = require('axios');
import { notice } from '@pnotify/core';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import * as basicLightbox from 'basiclightbox';

let searchValue = '';
function onSearchCocktail(e) {
  e.preventDefault();
  searchValue = refs.input.value;

  axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(result => {
      refs.gallery.innerHTML = '';
      console.log(result.data.drinks);
      if (result.data.drinks === null) {
        noFound();
      }
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
function noFound() {
  error({
    text: 'No matches found. Please enter another query!',
    delay: 2500,
  });
}
function onOpenLightbox(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
    <img src='${e.target.src}' >
`);

  instance.show();
  window.addEventListener('keydown', e => {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
      instance.close();
    }
  });
}
refs.gallery.addEventListener('click', onOpenLightbox);

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
