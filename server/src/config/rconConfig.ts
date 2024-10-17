import { config } from 'dotenv';
config();

import { RconConnection } from '@scriptserver/core';

import RconConnectionOptions from '../utils/RconConnectionOptions';

// const rconConnection = new RconConnection({
//   rconConnection: {
//     host: RconConnectionOptions.host,
//     port: RconConnectionOptions.port,
//     password: RconConnectionOptions.password,
//     buffer: RconConnectionOptions.buffer,
//   },
// });

const rconConnection = new RconConnection({
  rconConnection: {
    host: 'localhost',
    port: 25575,
    password: 'password',
    buffer: 3000,
  },
});

export default rconConnection;
