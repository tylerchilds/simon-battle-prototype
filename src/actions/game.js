import { GAME_CHOICES } from 'constants/action-types';

export function setChoices(choices) {
  return {
    type: GAME_CHOICES,
    choices
  };
}

export default { setChoices };
