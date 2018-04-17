import { GAME_CHOICES, GAME_UPDATED } from 'constants/action-types';

export function setChoices(choices) {
  return {
    type: GAME_CHOICES,
    choices
  };
}

export function updateGame(gc, data) {
  data = data.games ? data.games[gc.id] : data
  return {
    type: GAME_UPDATED,
    data
  };
}

export default { setChoices, updateGame };
