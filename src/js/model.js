import { API_URL, RES_PER_PAGE } from './config.js';

import { getJson } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    pageSize: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (recipeId) {
  try {
    const respJson = await getJson(`${API_URL}recipes/${recipeId}`);

    const { recipe } = respJson.data;

    state.recipe = recipe;
  } catch (err) {
    throw err;
  }
};

export const loadRecipeSearchResult = async function (query) {
  try {
    if (!query) return;
    const resultsJson = await getJson(`${API_URL}recipes?search=${query}`);
    state.search.results = [...resultsJson.data.recipes];
    state.search.query = query;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  return state.search.results.slice(
    (page - 1) * state.search.pageSize,
    page * state.search.pageSize
  );
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (newServings / state.recipe.servings) * ing.quantity;
  });
  state.recipe.servings = newServings;
};
