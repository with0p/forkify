import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function showRecipe() {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);
    const { recipe } = model.state;

    recipeView.render(recipe);
  } catch (err) {
    console.error(`Catched: ${err}`);
  }
}

(function init() {
  recipeView.addHandlerRender(showRecipe);
})();
