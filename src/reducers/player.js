import { SET_PLAYER } from 'constants/action-types';

const initialState = {
  id: null
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER:
    return { ...state, id: action.id };
    default:
      return state;
  }
}
