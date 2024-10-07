import { config } from 'dotenv';
config();

import { RconConnection } from '@scriptserver/core';

interface RconConnectionOptions {
  host: string;
  port: number;
  password: string;
  buffer: number;
}

const rconConnection = new RconConnection({
  rconConnection: {
    host: process.env.HOST_RCON,
    port: Number(process.env.PORT_RCON),
    password: process.env.PASSWORD_RCON,
    buffer: Number(process.env.BUFFER_RCON),
  } as RconConnectionOptions,
});

export default rconConnection;
