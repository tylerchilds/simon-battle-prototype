import { GAME_UPDATED } from 'constants/action-types';

export function updateGame(data) {
  return {
    type: GAME_UPDATED,
    data
  };
}

export default { updateGame };
