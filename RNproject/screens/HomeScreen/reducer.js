import { combineReducers } from 'redux';

const initial_state = {
  username: "",
  apartment: ""
};

const reducer = (state = initial_state , action) => {
  switch (action.type) {
    case 'INITIALIZE': 
      state = action.state;
      console.log(state);
    default:
      return state
  }
};

export default combineReducers({
  red: reducer
});