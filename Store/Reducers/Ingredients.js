import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../utility";
const INGREDIENT_PRICES = {
  Salad: 0.4,
  Cheese: 0.6,
  Bacon: 0.3,
  Meat: 0.7
};
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};
const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingType]: state.ingredients[action.ingType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
      });

      break;
    case actionTypes.REMOVE_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,

          [action.ingType]: state.ingredients[action.ingType] - 1
        },
        toatlPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
      });
      break;
    case actionTypes.LOAD_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.loadedIngredients,
        error: false,
        totalPrice: 4
      });
      break;
    case actionTypes.LOAD_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true,
        totalPrice: 4
      });
    case actionTypes.RESET_ALL:
      return updateObject(state, { ingredients: null });
    default:
      return state;
  }
};
export default ingredients;
