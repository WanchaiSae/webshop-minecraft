import { config } from 'dotenv';
config();

interface RconConnectionOptions {
  host: string;
  port: number;
  password: string;
  buffer: number;
}

if (
  !process.env.HOST_RCON ||
  !process.env.PORT_RCON ||
  !process.env.PASSWORD_RCON ||
  !process.env.BUFFER_RCON
) {
  throw new Error(
    'Environment variables for RCON connection are not properly defined.'
  );
}

const RconConnectionOptions: RconConnectionOptions = {
  host: process.env.HOST_RCON,
  port: Number(process.env.PORT_RCON),
  password: process.env.PASSWORD_RCON,
  buffer: Number(process.env.BUFFER_RCON),
};

export default RconConnectionOptions;
