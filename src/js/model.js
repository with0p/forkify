import { API_URL, RES_PER_PAGE, DEV_KEY } from './config.js';

import { AJAX } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    unsortedResultsStored: [],
    page: 1,
    pageSize: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (recipeId) {
  try {
    const respJson = await AJAX(`${API_URL}/${recipeId}?key=${DEV_KEY}`);

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
    const resultsJson = await AJAX(`${API_URL}?search=${query}&key=${DEV_KEY}`);
    state.search.results = [...resultsJson.data.recipes];
    state.search.unsortedResultsStored = [...state.search.results];
    state.search.query = query;
    state.search.page = 1;
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
/**
 *
 * @param {Array<Object>} results Array of objects
 * @param {string} field Object field to sort by
 * @param {string} direction Sort order, value in ['asc', 'desc']
 */
export const sortSearchResults = function (field, direction = 'asc') {
  // state.search.unsortedResultsStored = [...state.search.results];
  if (direction === 'asc') {
    state.search.results.sort((a, b) => stringCompare(a[field], b[field]));
  }
  if (direction === 'desc') {
    state.search.results.sort((a, b) => stringCompare(b[field], a[field]));
  }
};

export const unsortSearchResults = function () {
  state.search.results = [...state.search.unsortedResultsStored];
  // state.search.unsortedResultsStored.splice(0);
};
function stringCompare(x, y) {
  return elementCompare(x.toUpperCase(), y.toUpperCase());
}

function elementCompare(el1, el2) {
  if (el1 === el2) return 0;
  if (el1 > el2) return 1;
  if (el1 < el2) return -1;
}

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
      const ingArr = ing[1].split(',').map(el => el.trim());
      if (ingArr.length !== 3)
        throw new Error(
          'Please use format: "Quantity,Unit,Description" to input an ingredient data'
        );
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? Number.parseFloat(quantity) : null,
        unit,
        description,
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
  const resp = await AJAX(`${API_URL}?key=${DEV_KEY}`, recipe);
  state.recipe = resp.data.recipe;
  addBookmark(state.recipe);
};
