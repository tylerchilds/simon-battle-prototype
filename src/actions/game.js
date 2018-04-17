import { GAME_CHOICES, GAME_UPDATED } from 'constants/action-types';

export function setChoices(choices) {
  return {
    type: GAME_CHOICES,
    choices
  };
}

export function updateGame(data) {
  console.log(data)
  console.log('whiiii')
  return {
    type: GAME_UPDATED,
    data
  };
}

export default { setChoices, updateGame };
