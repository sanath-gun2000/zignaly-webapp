import initialState from "../store/initialState";
import { assign } from "lodash";
import {
  SHOW_LOADER,
  SHOW_ERROR_ALERT,
  HIDE_ERROR_ALERT,
  SHOW_SUCCESS_ALERT,
  HIDE_SUCCESS_ALERT,
  ASK_2FA,
} from "../store/actions/ui";

/**
 * @typedef {import("../store/initialState").DefaultUIObject} DefaultUIObject
 */

/**
 * @typedef {Object} ActionObject
 * @property {String} type
 * @property {*} payload
 */

/**
 * @param {DefaultUIObject} state Current settings state.
 * @param {ActionObject} action Action to reduce.
 * @returns {DefaultUIObject} New settings state.
 */
const ui = (state = initialState.ui, action) => {
  const newState = assign({}, state);

  switch (action.type) {
    case SHOW_LOADER:
      newState.loader = action.payload;
      break;
    case SHOW_ERROR_ALERT:
      newState.alerts = {
        ...newState.alerts,
        error: {
          ...action.payload,
          open: true,
        },
      };
      break;
    case HIDE_ERROR_ALERT:
      newState.alerts = {
        ...newState.alerts,
        error: {
          title: "",
          body: "",
          open: false,
        },
      };
      break;
    case SHOW_SUCCESS_ALERT:
      newState.alerts = {
        ...newState.alerts,
        success: {
          ...action.payload,
          open: true,
        },
      };
      break;
    case HIDE_SUCCESS_ALERT:
      newState.alerts = {
        ...newState.alerts,
        success: {
          title: "",
          body: "",
          open: false,
        },
      };
      break;
    case ASK_2FA:
      console.log(action);
      newState.ask2FA = action.payload;
      break;

    default:
      return state;
  }

  return newState;
};

export default ui;
