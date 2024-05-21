import { createStore } from 'redux';

const initialState = {
    selectedData: [],
    toggleSwitch: false
  };
  
  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case 'UPDATE_SELECTED_DATA':
        return {
          ...state,
          selectedData: action.payload
        };
      case 'TOGGLE_SWITCH':
        return {
          ...state,
          toggleSwitch: !state.toggleSwitch
        };
      default:
        return state;
    }
}

const store = createStore(rootReducer);

export default store;
