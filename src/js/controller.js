import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipe() {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);
    const { recipe } = model.state;

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError(`Catched: ${err.message}`);
  }
}

(function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlRecipeSearch);
})();

async function controlRecipeSearch() {
  try {
    await model.loadRecipeSearchResult(searchView.getQuery());
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}
