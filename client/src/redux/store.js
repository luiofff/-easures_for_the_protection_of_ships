import { createStore } from 'redux';

const initialState = {
  selectedData: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_SELECTED_DATA':
      return {
        ...state,
        selectedData: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
