import { config } from 'dotenv';
config();

import mysql from 'mysql2';

import MySqlConfigOptions from '../utils/MySqlConfigOptions';

export const connection = mysql.createConnection({
  host: MySqlConfigOptions.host,
  user: MySqlConfigOptions.user,
  database: MySqlConfigOptions.database,
});

export default connection;
