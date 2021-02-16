import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
