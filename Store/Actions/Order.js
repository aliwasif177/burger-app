import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const showOrdersStart = () => {
  return {
    type: actionTypes.SHOW_ORDERS_START
  };
};

export const showOrders = response => {
  return {
    type: actionTypes.SHOW_ORDERS,
    fetchedOrders: response
  };
};
export const loadOrders = token => {
  return dispatch => {
    dispatch(showOrdersStart());
    const fetchedOrders = [];
    axios
      .get("/orders.json?auth=" + token)
      .then(response => {
        for (let key in response.data) {
          if (response.data[key].userId == localStorage.getItem("localId")) {
            fetchedOrders.push({ ...response.data[key], id: key });
          }
        }

        dispatch(showOrders(fetchedOrders));
      })
      .catch(error => {});
  };
};
export const showForm = () => {
  return {
    type: actionTypes.LOAD_FORMS
  };
};
export const loadForm = () => {
  return dispatch => {
    dispatch(loadFormsStart());
    dispatch(showForm());
  };
};
export const loadFormsStart = () => {
  return {
    type: actionTypes.LOAD_FORMS_START
  };
};
export const inputChange = (event, id) => {
  event.persist();

  return {
    type: actionTypes.SHOW_CONTACT_DATA,
    event: event,
    id: id
  };
};
export const orderConfirmStart = () => {
  return {
    type: actionTypes.ORDER_CONFIRM_START
  };
};
export const orderConfirmSuccess = (id, orderData) => {
  return {
    type: actionTypes.ORDER_CONFIRM,
    orderId: id,
    orderData: orderData
  };
};
export const orderConfirmFailed = error => {
  return {
    type: actionTypes.ORDER_CONFIRM_FAIL,
    error: error
  };
};
export const orderConfirm = (order, token) => {
  return dispatch => {
    dispatch(orderConfirmStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then(response => {
        dispatch(orderConfirmSuccess(response.data.name, order));
      })
      .catch(error => {
        dispatch(orderConfirmFailed(error));
      });
  };
};
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
