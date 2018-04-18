import { PLAYERS_UPDATED } from 'constants/action-types';

export function updatePlayers(id, players) {
  let current = players[id]
  delete players[id]

  let enemies = []

  for(let id in players){
    enemies.push(players[id])
  }

  return {
    type: PLAYERS_UPDATED,
    enemies,
    current
  };
}

export default { updatePlayers };
