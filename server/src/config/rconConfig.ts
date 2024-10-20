import { config } from 'dotenv';
config();

import { RconConnection } from '@scriptserver/core';

import RconConnectionOptions from '../utils/RconConnectionOptions';

const rconConnection = new RconConnection({
  rconConnection: {
    host: RconConnectionOptions.host,
    port: RconConnectionOptions.port,
    password: RconConnectionOptions.password,
    buffer: RconConnectionOptions.buffer,
  },
});

export default rconConnection;
