import { PLAYERS_UPDATED } from 'constants/action-types';

const initialState = {
  enemies: {},
  current: {}
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case PLAYERS_UPDATED:
      return { ...state, 
        enemies: action.enemies,
        current: action.current 
      };
    default:
      return state;
  }
}
