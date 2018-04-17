import { SET_PLAYER } from 'constants/action-types';

export function setPlayer(id) {
  return {
    type: SET_PLAYER,
    id
  };
}

export default { setPlayer };
