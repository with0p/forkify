import { API_URL, RES_PER_PAGE, DEV_KEY } from './config.js';

import { getJson, sendJson } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    pageSize: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (recipeId) {
  try {
    const respJson = await getJson(`${API_URL}/${recipeId}`);

    const { recipe } = respJson.data;

    state.recipe = recipe;
    if (state.bookmarks.some(bmrk => bmrk.id === recipeId)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

function persistBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const loadRecipeSearchResult = async function (query) {
  try {
    if (!query) return;
    const resultsJson = await getJson(`${API_URL}?search=${query}`);
    state.search.results = [...resultsJson.data.recipes];
    state.search.query = query;
    state.search.page = 1;
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

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (recipeId) {
  const index = state.bookmarks.findIndex(b => b.id === recipeId);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};

const initData = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
initData();

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1])
    .map(ing => {
      const ingArr = ing[1].split(',');
      if (ingArr.length !== 3)
        throw new Error(
          'Please use format: "Quantity,Unit,Description" to input an ingredient data'
        );
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? Number.parseFloat(quantity) : null,
        unit: unit.trim(),
        description: description.trim(),
      };
    });
  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: Number.parseFloat(newRecipe.cookingTime),
    servings: Number.parseInt(newRecipe.servings),
    ingredients,
  };
  const resp = await sendJson(`${API_URL}?key=${DEV_KEY}`, recipe);
  state.recipe = resp.data.recipe;
  addBookmark(state.recipe);
};
