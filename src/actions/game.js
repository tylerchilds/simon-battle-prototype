import { GAME_CHOICES, GAME_UPDATED } from 'constants/action-types';

export function setChoices(choices) {
  return {
    type: GAME_CHOICES,
    choices
  };
}

export function updateGame(data) {
  return {
    type: GAME_UPDATED,
    data
  };
}

export default { setChoices, updateGame };
