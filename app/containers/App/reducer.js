import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  CHANGE_FORM_PAGE,
  STORE_ADDRESS_DATA,
  STORE_PAYMENT_DATA
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  formPage: 0,
  currentUser: false,
  addressForm: {},
  userData: {
    repositories: false,
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        formPage: 0,
        addressForm:{},
        paymentForm:{},
        userData: {
          repositories: false,
        },
      };

      return newState;
    }
    case LOAD_REPOS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        formPage: 0,
        userData: {
          repositories: action.repos,
        },
        currentUser: action.username,
      };
      return newState;
    }

    case LOAD_REPOS_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    case STORE_ADDRESS_DATA: {
      const newState = {
        ...state,
        addressForm: action.addressForm
      };
      return newState;
    }

    case STORE_PAYMENT_DATA: {
      const newState = {
        ...state,
        paymentForm: action.paymentForm
      };
      return newState;
    }
    case CHANGE_FORM_PAGE: {
      console.log("CHANGED PAGE", action.formPage)
      const newState = {
        ...state,
        formPage: action.formPage
      };
      return newState;
    }
    default:
      return state;
  }
}

export default appReducer;
