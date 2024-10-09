import { config } from 'dotenv';
config();

import mysql from 'mysql2/promise';

import MySqlConfigOptions from '../utils/MySqlConfigOptions';

export const connection = mysql.createPool({
  host: MySqlConfigOptions.host,
  user: MySqlConfigOptions.user,
  database: MySqlConfigOptions.database,
});

export default connection;
