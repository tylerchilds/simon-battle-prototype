import { GAME_CHOICES } from 'constants/action-types';

const initialState = {
  choices: []
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case GAME_CHOICES:
      return { ...state, choices: action.choices };
    default:
      return state;
  }
}
