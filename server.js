import path from 'path';
import express from 'express';
import { createServer } from 'http';
import socket from 'socket.io';

import GamesDatabase from './lib/GamesDatabase';

const app = express();
const server = createServer(app)
const io = socket(server)

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
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
    game.instance.action(data)
    console.log(game.instance.serialize())
    client.emit('update', game.instance.serialize());
  });
});

server.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});
