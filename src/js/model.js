import { API_URL } from './config.js';

import { getJson } from './helpers.js';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const respJson = await getJson(`${API_URL}recipes/${recipeId}`);

    const { recipe } = respJson.data;

    state.recipe = recipe;
  } catch (err) {
    console.error(`Handeled in model ${err}`);
    throw err;
  }
};
