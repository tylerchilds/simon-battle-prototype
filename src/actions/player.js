import { PLAYERS_UPDATED } from 'constants/action-types';

export function updatePlayers(id, players) {
  let current = players[id]
  delete players[id]

  return {
    type: PLAYERS_UPDATED,
    enemies: players,
    current
  };
}

export default { updatePlayers };
