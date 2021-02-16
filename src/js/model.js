export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const resp = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const respJson = await resp.json();
    if (!resp.ok) throw new Error(respJson.message);

    const { recipe } = respJson.data;

    state.recipe = recipe;
    console.log(state.recipe);
  } catch (err) {
    console.error(err);
  }
};
