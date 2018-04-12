import path from 'path';
import express from 'express';
import socket from 'socket.io';

import GamesDatabase from './lib/GamesDatabase';

const io = socket()
const app = express();

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});

let db = new GamesDatabase()

io.on('connection', function(client){
  let game = db.create()

  client.emit('initialize', game.instance.serialize());

  client.on('disconnect', function(){
    game = db.update(game.id, {activePlayers: --game.activePlayers})
    if(game.activePlayers < 1) db.delete(game.id)
  });

  client.on('action', function(data){
    console.log(game.instance.action(data))
  });
});


io.listen(8000);
console.log('listening on port ', 8000);
