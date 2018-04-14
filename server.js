import path from 'path';
import express from 'express';
import { createServer } from 'http';
import socket from 'socket.io';

import ConnectionManager from './lib/ConnectionManager';

const app = express();
const server = createServer(app)
const io = socket(server)

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

io.on('connection', (client) => new ConnectionManager(client));

server.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});
