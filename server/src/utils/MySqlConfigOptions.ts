import { config } from 'dotenv';
config();

interface MySqlConfigOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}

const MySqlConfigOptions: MySqlConfigOptions = {
  host: process.env.HOST_MYSQL!,
  user: process.env.USER_MYSQL!,
  password: process.env.PASSWORD_MYSQL!,
  database: process.env.DATABASE_MYSQL!,
};

export default MySqlConfigOptions;
