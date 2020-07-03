import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  orderForm: {
    name: {
      elementType: "input",
      elementConfig: {
        inputtype: "text",
        placeholder: "Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },

    email: {
      elementType: "input",
      elementConfig: {
        inputtype: "email",
        placeholder: "E-mail"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },

    street: {
      elementType: "input",
      elementConfig: {
        inputtype: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        inputtype: "text",
        placeholder: "Zip-Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false
    },
    postalCode: {
      elementType: "input",
      elementConfig: {
        inputtype: "text",
        placeholder: "Postal Code"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },
    dilveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Fastest", displayValue: "Fastest" },
          { value: "Cheapest", displayValue: "Cheapest" }
        ]
      },
      value: ""
    }
  }
};
const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.LOAD_FORMS_START:
      return updateObject(state, {
        loading: true
      });
    case actionTypes.LOAD_FORMS:
      return updateObject(state, {
        loading: false
      });
    case actionTypes.SHOW_ORDERS:
      return updateObject(state, {
        orders: action.fetchedOrders,
        loading: false
      });
    case actionTypes.SHOW_ORDERS_START:
      return updateObject(state, {
        loading: true
      });
    case actionTypes.SHOW_CONTACT_DATA:
      const updatedForm = {
        ...state.orderForm
      };
      const updatedFormElement = { ...updatedForm[action.id] };
      updatedFormElement.value = action.event.target.value;
      updatedForm[action.id] = updatedFormElement;

      return updateObject(state, {
        orderForm: updatedForm
      });
    case actionTypes.ORDER_CONFIRM_START:
      return updateObject(state, {
        loading: true
      });
    case actionTypes.ORDER_CONFIRM:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      });
    case actionTypes.ORDER_CONFIRM_FAIL:
      return updateObject(state, {
        loading: false
      });
  }

  return state;
};
export default order;
