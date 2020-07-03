import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredients = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingType: type,
  };
};
export const removeIngredients = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingType: type,
  };
};

export const loadIngredientsSuccess = (loadedIngredients) => {
  return {
    type: actionTypes.LOAD_INGREDIENTS,
    loadedIngredients: loadedIngredients,
  };
};
export const loadIngredientsFailed = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_FAILED,
  };
};
export const loadIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-my-burgur-18349.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(loadIngredientsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadIngredientsFailed());
      });
  };
};
