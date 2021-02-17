import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';

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

async function controlRecipeSearch() {
  try {
    searchResultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadRecipeSearchResult(query);
    // searchResultsView.render(model.state.search.results);
    searchResultsView.render(
      model.getSearchResultsPage(model.state.search.page)
    );
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage) {
  // model.updateCurrentPage(goToPage);
  searchResultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

(function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlRecipeSearch);
  paginationView.addHandlerClick(controlPagination);
})();
