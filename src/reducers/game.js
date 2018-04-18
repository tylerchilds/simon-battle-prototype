import { GAME_CHOICES, GAME_UPDATED } from 'constants/action-types';

const initialState = {
  choices: [],
  newItems: []
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case GAME_UPDATED:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
