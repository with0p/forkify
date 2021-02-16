import { API_URL } from './config.js';

import { getJson } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
