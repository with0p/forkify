import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipe() {
  try {
    // get the recipe id from url
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    // render spinner while waiting for recipe to load
    recipeView.renderSpinner();

    // receive the recipe data
    await model.loadRecipe(recipeId);

    // render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(`Catched: ${err.message}`);
  }
}

async function controlRecipeSearch() {
  try {
    // render spinner while waiting for the search results
    searchResultsView.renderSpinner();

    // get query from input
    const query = searchView.getQuery();
    if (!query) return;

    // receive search result
    await model.loadRecipeSearchResult(query);

    // render first page of search result
    searchResultsView.render(model.getSearchResultsPage());

    // render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage) {
  // render required page of search result
  searchResultsView.render(model.getSearchResultsPage(goToPage));

  // re-render pagination accordingly
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // update recipe servings data
  model.updateServings(newServings);

  // update recipe view
  recipeView.update(model.state.recipe);
}

(function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlRecipeSearch);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerServings(controlServings);
})();
