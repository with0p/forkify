import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

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

    // update search results
    searchResultsView.update(model.getSearchResultsPage());

    // update bookmarks list

    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(`Catched: ${err.message}`);
    console.error(err);
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

function controlAddBookmark() {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe);
  }

  // update bookmark icon
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

(function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlRecipeSearch);
  paginationView.addHandlerClick(controlPagination);
})();
