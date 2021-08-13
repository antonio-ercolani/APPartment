import { combineReducers } from 'redux';

const initial_state = {
  username: "",
  apartment: ""
};

const reducer = (state = initial_state , action) => {
  switch (action.type) {
    case 'INITIALIZE': 
      state = action.state;
      console.log("INITIALIZED STATE");
      console.log(state);
      return state
    case 'UPDATE':
      state = action.state;
      console.log("UPDATED STATE");
      console.log(state);
      return state
    default:
      return state
  }
};

export default combineReducers({
  red: reducer
});